import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Layout from '../components/Layout/Layout';
import FormField from '../components/FormField';
import { useLoginMutation } from '../store/api';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';
import { persistCredentials } from '../store/authStorage';
import { toast } from '../lib/toast';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const submit = async () => {
    try {
      const result = await login({ email: email.trim(), password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      try { await persistCredentials(result.user, result.token); }
      catch { toast.warning('Logged in, but this device could not save your session'); }
      toast.success('Welcome back'); router.replace('/');
    } catch (error) {
      const message = typeof error === 'object' && error !== null && 'data' in error && typeof error.data === 'object' && error.data !== null && 'message' in error.data ? String(error.data.message) : 'Unable to log in. Check your details and try again.';
      toast.error(message);
    }
  };
  return <Layout><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}><View style={styles.form}><Text style={styles.title}>Welcome back</Text><Text style={styles.subtitle}>Log in to your Exclusive account.</Text><FormField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" /><FormField label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry autoComplete="password" /><Pressable accessibilityRole="button" disabled={isLoading || !email || !password} onPress={submit} style={[styles.button, (isLoading || !email || !password) && styles.disabled]}><Text style={styles.buttonText}>{isLoading ? 'Logging in…' : 'Log in'}</Text></Pressable><Text style={styles.switch}>New here? <Link href="/signup" style={styles.link}>Create an account</Link></Text></View></KeyboardAvoidingView></Layout>;
}

const styles = StyleSheet.create({ container: { flex: 1 }, form: { gap: 17, paddingVertical: 25 }, title: { color: '#111827', fontSize: 27, fontWeight: '800' }, subtitle: { color: '#6b7280', marginTop: -10 }, button: { height: 50, borderRadius: 9, backgroundColor: '#db4444', alignItems: 'center', justifyContent: 'center', marginTop: 2 }, disabled: { opacity: .55 }, buttonText: { color: '#fff', fontWeight: '700' }, switch: { textAlign: 'center', color: '#4b5563' }, link: { color: '#db4444', fontWeight: '700' } });
