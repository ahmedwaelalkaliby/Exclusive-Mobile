import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/PageTitle';
import FormField from '../components/FormField';
import { toast } from '../lib/toast';

export default function ContactScreen() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState('');
  const sendMessage = async () => {
    if (!name || !email || !message) return toast.warning('Complete all fields first');
    try { await Linking.openURL(`mailto:exclusive@gmail.com?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`); }
    catch { toast.error('No email app is available on this device'); }
  };
  return <Layout><PageTitle title="Contact us" subtitle="We’d love to hear from you" /><View style={styles.details}><Text style={styles.detailTitle}>Customer support</Text><Text style={styles.copy}>exclusive@gmail.com</Text><Text style={styles.copy}>+88015-88888-9999</Text><Text style={styles.copy}>111 Bijoy Sarani, Dhaka, Bangladesh</Text></View><View style={styles.form}><FormField label="Your name" value={name} onChangeText={setName} /><FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" /><FormField label="Message" value={message} onChangeText={setMessage} multiline numberOfLines={5} textAlignVertical="top" style={styles.message} /><Pressable onPress={sendMessage} style={styles.button}><Text style={styles.buttonText}>Send message</Text></Pressable></View></Layout>;
}

const styles = StyleSheet.create({ details: { backgroundColor: '#f9fafb', padding: 17, borderRadius: 12, gap: 8, marginBottom: 20 }, detailTitle: { color: '#111827', fontSize: 16, fontWeight: '700' }, copy: { color: '#4b5563', fontSize: 13 }, form: { gap: 16 }, message: { minHeight: 120, paddingTop: 12 }, button: { height: 48, borderRadius: 9, backgroundColor: '#db4444', alignItems: 'center', justifyContent: 'center' }, buttonText: { color: '#fff', fontWeight: '700' } });
