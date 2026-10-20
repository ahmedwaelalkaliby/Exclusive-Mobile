import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Layout from '../components/Layout/Layout';
import Product from '../components/Product/Product';
import Sidebar from '../components/Sidebar/Sidebar';

export default function HomeScreen() {
  const router = useRouter();
  return <Layout scroll={false}><ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <Sidebar />
    <View style={styles.hero}>
      <Pressable accessibilityRole="button" accessibilityLabel="Shop the iPhone 14 promotion" onPress={() => router.push('/products')}>
        <Image source={require('../../assets/images/Frame.png')} resizeMode="contain" accessibilityLabel="iPhone 14 Series, up to 10% off voucher" style={styles.heroImage} />
      </Pressable>
    </View>
    <View style={styles.sectionHead}><Text style={styles.kicker}>Our collection</Text><Text style={styles.sectionTitle}>Explore products</Text></View>
    <Product horizontal />
  </ScrollView></Layout>;
}

const styles = StyleSheet.create({ content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 28 }, hero: { backgroundColor: '#000', borderRadius: 16, overflow: 'hidden', marginBottom: 26 }, heroImage: { width: '100%', aspectRatio: 875 / 321 }, sectionHead: { gap: 7, marginBottom: 12 }, kicker: { color: '#db4444', fontSize: 13, fontWeight: '700' }, sectionTitle: { color: '#111827', fontSize: 22, fontWeight: '800' } });
