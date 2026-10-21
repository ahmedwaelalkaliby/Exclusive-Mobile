import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { subscribeToToasts, type ToastMessage } from "../lib/toast";

const palette = {
  success: {
    background: "#ecfdf5",
    border: "#10b981",
    icon: "check-circle" as const,
  },
  error: {
    background: "#fef2f2",
    border: "#ef4444",
    icon: "alert-circle" as const,
  },
  info: { background: "#eff6ff", border: "#3b82f6", icon: "info" as const },
  warning: {
    background: "#fffbeb",
    border: "#f59e0b",
    icon: "alert-triangle" as const,
  },
};

export default function ToastViewport() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  useEffect(
    () =>
      subscribeToToasts((message) => {
        setMessages((current) => [...current, message]);
        setTimeout(
          () =>
            setMessages((current) =>
              current.filter((item) => item.id !== message.id),
            ),
          message.duration,
        );
      }),
    [],
  );

  return (
    <View
      pointerEvents="box-none"
      accessibilityLiveRegion="polite"
      style={styles.viewport}
    >
      {messages.map((message) => {
        const style = palette[message.kind];
        return (
          <View
            key={message.id}
            accessibilityRole="alert"
            style={[
              styles.toast,
              {
                backgroundColor: style.background,
                borderLeftColor: style.border,
              },
            ]}
          >
            <Feather name={style.icon} size={20} color={style.border} />
            <Text style={styles.message}>{message.message}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss notification"
              hitSlop={10}
              onPress={() =>
                setMessages((current) =>
                  current.filter((item) => item.id !== message.id),
                )
              }
            >
              <Feather name="x" size={18} color="#475569" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    position: "absolute",
    top: 44,
    left: 16,
    right: 16,
    zIndex: 100,
    gap: 8,
  },
  toast: {
    minHeight: 56,
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  message: { flex: 1, color: "#172033", fontSize: 14, fontWeight: "500" },
});
