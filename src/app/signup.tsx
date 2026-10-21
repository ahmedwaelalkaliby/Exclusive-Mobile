import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Layout from "../components/Layout/Layout";
import FormField from "../components/FormField";
import { useSignupMutation } from "../store/api";
import { toast } from "../lib/toast";

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();
  const update = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = async () => {
    if (form.password !== form.rePassword)
      return toast.error("Passwords do not match");
    try {
      await signup(form).unwrap();
      toast.success("Account created. Please log in.");
      router.replace("/Login");
    } catch {
      toast.error("Unable to create your account. Please check your details.");
    }
  };
  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Join Exclusive to save favorites and shop.
          </Text>
          <FormField
            label="Name"
            value={form.name}
            onChangeText={update("name")}
            autoComplete="name"
          />
          <FormField
            label="Email"
            value={form.email}
            onChangeText={update("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <FormField
            label="Phone"
            value={form.phone}
            onChangeText={update("phone")}
            keyboardType="phone-pad"
          />
          <FormField
            label="Password"
            value={form.password}
            onChangeText={update("password")}
            secureTextEntry
            autoComplete="new-password"
          />
          <FormField
            label="Confirm password"
            value={form.rePassword}
            onChangeText={update("rePassword")}
            secureTextEntry
          />
          <Pressable
            accessibilityRole="button"
            disabled={isLoading || Object.values(form).some((value) => !value)}
            onPress={submit}
            style={[
              styles.button,
              (isLoading || Object.values(form).some((value) => !value)) &&
                styles.disabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating account…" : "Create account"}
            </Text>
          </Pressable>
          <Text style={styles.switch}>
            Already registered?{" "}
            <Link href="/Login" style={styles.link}>
              Log in
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { gap: 14, paddingVertical: 20 },
  title: { color: "#111827", fontSize: 27, fontWeight: "800" },
  subtitle: { color: "#6b7280", marginTop: -8, marginBottom: 2 },
  button: {
    height: 50,
    borderRadius: 9,
    backgroundColor: "#db4444",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  disabled: { opacity: 0.55 },
  buttonText: { color: "#fff", fontWeight: "700" },
  switch: { textAlign: "center", color: "#4b5563" },
  link: { color: "#db4444", fontWeight: "700" },
});
