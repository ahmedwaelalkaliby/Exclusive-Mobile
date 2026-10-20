import { StyleSheet, Text, View } from 'react-native';

export default function RatingStars({ value }: { value: number }) {
  const roundedValue = Math.round(value);
  return <View accessibilityLabel={`Rated ${value.toFixed(1)} out of 5`} accessibilityRole="image" style={styles.row}><Text style={styles.stars}>{Array.from({ length: 5 }, (_, index) => index < roundedValue ? '★' : '☆').join('')}</Text><Text style={styles.score}>{value.toFixed(1)}</Text></View>;
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 5 }, stars: { color: '#f59e0b', fontSize: 15, letterSpacing: 1 }, score: { color: '#6b7280', fontSize: 12 } });
