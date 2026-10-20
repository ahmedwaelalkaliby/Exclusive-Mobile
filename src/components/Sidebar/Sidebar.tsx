import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

const categories = ['Men’s fashion', 'Women’s fashion', 'Electronics', 'Home & furniture', 'Sportswear', 'Toys', 'Health & beauty'];
const promotions = ['A little something for every day', 'Fresh finds for the new season', 'Your favorites, all in one place'];

export default function Sidebar() {
  const [slide, setSlide] = useState(0);
  return <View style={styles.container}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>{categories.map((category) => <Link key={category} href="/products" style={styles.category}>{category}</Link>)}</ScrollView><View style={styles.promo}><Text style={styles.eyebrow}>Exclusive picks</Text><Text style={styles.message}>{promotions[slide]}</Text><Link href="/products" style={styles.link}>Shop now  →</Link><View style={styles.dots}>{promotions.map((item, index) => <Pressable key={item} accessibilityRole="button" accessibilityLabel={`Show promotion ${index + 1}`} onPress={() => setSlide(index)} style={[styles.dot, slide === index && styles.activeDot]} />)}</View></View></View>;
}

const styles = StyleSheet.create({ container: { gap: 12, marginBottom: 20 }, categories: { gap: 8, paddingVertical: 5 }, category: { color: '#374151', backgroundColor: '#f3f4f6', borderRadius: 18, paddingHorizontal: 13, paddingVertical: 9, overflow: 'hidden', fontSize: 12 }, promo: { minHeight: 160, borderRadius: 14, padding: 20, backgroundColor: '#f4e9df', justifyContent: 'center', gap: 10 }, eyebrow: { color: '#db4444', fontSize: 12, fontWeight: '700' }, message: { color: '#111827', fontSize: 23, fontWeight: '800', maxWidth: 260 }, link: { color: '#111827', fontWeight: '700' }, dots: { position: 'absolute', bottom: 14, right: 16, flexDirection: 'row', gap: 7 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }, activeDot: { backgroundColor: '#db4444' } });
