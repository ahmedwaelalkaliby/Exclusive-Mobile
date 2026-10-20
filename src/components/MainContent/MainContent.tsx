import { StyleSheet, Text, View } from 'react-native';
import Product from '../Product/Product';

export default function MainContent() {
  return <View style={styles.container}><Text style={styles.title}>Featured products</Text><Product horizontal /></View>;
}

const styles = StyleSheet.create({ container: { gap: 12 }, title: { color: '#111827', fontSize: 20, fontWeight: '700' } });
