import { StyleSheet, Text, View } from "react-native";

export default function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 18, gap: 4 },
  title: { color: "#111827", fontSize: 24, fontWeight: "800" },
  subtitle: { color: "#6b7280", fontSize: 14 },
});
