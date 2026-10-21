import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { readCredentials } from "../store/authStorage";
import { hydrateCredentials } from "../store/authSlice";
import ToastViewport from "../components/ToastViewport";

function AppNavigator() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    readCredentials().then((credentials) => {
      store.dispatch(hydrateCredentials(credentials));
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#db4444" />
      </View>
    );

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: styles.screen }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="products" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="about" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="wishlist" />
        <Stack.Screen name="productdetails/[id]/[category]" />
      </Stack>
      <ToastViewport />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#fff" },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
