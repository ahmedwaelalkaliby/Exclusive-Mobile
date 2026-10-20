import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

export default function FormField({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput {...props} accessibilityLabel={props.accessibilityLabel ?? label} style={[styles.input, props.style]} placeholderTextColor="#9ca3af" /></View>;
}

const styles = StyleSheet.create({ field: { gap: 7 }, label: { color: '#374151', fontWeight: '600', fontSize: 13 }, input: { height: 48, paddingHorizontal: 13, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 9, color: '#111827', backgroundColor: '#fff' } });
