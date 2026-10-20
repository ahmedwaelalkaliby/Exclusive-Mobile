import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGetProductsQuery } from '../../store/api';
import ProductCard from './ProductCard';
import type { Product as ProductType } from '../../types';

export default function Product({ search = '', horizontal = false }: { search?: string; horizontal?: boolean }) {
  const { data, isLoading, isError, refetch } = useGetProductsQuery(undefined, { pollingInterval: 300000 });
  const products = (data ?? []).filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  if (isLoading) return <View style={styles.state}><ActivityIndicator size="large" color="#db4444" /><Text style={styles.stateText}>Loading products…</Text></View>;
  if (isError) return <View style={styles.state}><Text style={styles.error}>Unable to load products.</Text><Pressable onPress={refetch} style={styles.retry}><Text style={styles.retryText}>Try again</Text></Pressable></View>;
  if (!products.length) return <Text style={styles.empty}>No products found.</Text>;
  return <FlatList<ProductType> data={products} key={horizontal ? 'horizontal' : 'grid'} keyExtractor={(item) => item.id} renderItem={({ item }) => <ProductCard product={item} />} numColumns={horizontal ? undefined : 2} horizontal={horizontal} showsHorizontalScrollIndicator={false} contentContainerStyle={horizontal ? styles.horizontal : styles.grid} columnWrapperStyle={horizontal ? undefined : styles.columns} />;
}

const styles = StyleSheet.create({ state: { padding: 40, alignItems: 'center', gap: 12 }, stateText: { color: '#64748b' }, error: { color: '#dc2626', marginBottom: 12 }, retry: { paddingHorizontal: 20, paddingVertical: 11, borderRadius: 8, backgroundColor: '#111827' }, retryText: { color: '#fff', fontWeight: '600' }, empty: { padding: 30, textAlign: 'center', color: '#64748b' }, grid: { paddingBottom: 14 }, columns: { justifyContent: 'space-between' }, horizontal: { paddingHorizontal: 4 } });
