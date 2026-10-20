import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Layout from '../../../components/Layout/Layout';
import PageTitle from '../../../components/PageTitle';
import RatingStars from '../../../components/RatingStars';
import ProductCard from '../../../components/Product/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { cartActions } from '../../../store/cartSlice';
import { wishlistActions } from '../../../store/wishlistSlice';
import { useGetProductQuery, useGetProductsQuery } from '../../../store/api';
import { toast } from '../../../lib/toast';
import type { Product } from '../../../types';

export default function ProductDetailsScreen() {
  const { id, category } = useLocalSearchParams<{ id: string; category: string }>();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const authenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: product, isLoading, isError, refetch } = useGetProductQuery(id ?? '', { skip: !id });
  const { data: products = [] } = useGetProductsQuery();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  if (isLoading) return <Layout><View style={styles.center}><ActivityIndicator size="large" color="#db4444" /></View></Layout>;
  if (isError || !product) return <Layout><View style={styles.center}><Text style={styles.error}>Unable to load this product.</Text><Pressable style={styles.button} onPress={refetch}><Text style={styles.buttonText}>Try again</Text></Pressable></View></Layout>;
  const images = [product.imageCover, ...(product.images ?? [])];
  const wished = wishlist.some((item) => item.id === product.id);
  const toggleWish = () => {
    if (!authenticated) return toast.error('Please log in to continue');
    if (wished) { dispatch(wishlistActions.removeFromWishlist(product.id)); toast.info('Removed from wishlist'); }
    else { dispatch(wishlistActions.addToWishlist({ id: product.id, name: product.title, price: product.price * .9, image: product.imageCover, category: product.category.name, ratingsAverage: product.ratingsAverage })); toast.success('Added to wishlist'); }
  };
  const addToCart = () => {
    if (!authenticated) return toast.error('Please log in to continue');
    if (!selectedSize) return toast.warning('Please select a size first');
    dispatch(cartActions.addToCart({ id: product.id, name: product.title, price: product.price * .9, image: activeImage ?? product.imageCover, quantity, size: selectedSize })); toast.success('Added to cart');
  };
  const related = products.filter((item) => item.category?.name === category && item.id !== id).slice(0, 8);
  return <Layout scroll={false}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Image source={{ uri: activeImage ?? product.imageCover }} resizeMode="contain" accessibilityLabel={product.title} style={styles.image} />
    <FlatList horizontal data={images} keyExtractor={(image, index) => `${image}-${index}`} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbs} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel="Show product image" onPress={() => setActiveImage(item)} style={[styles.thumb, (activeImage ?? product.imageCover) === item && styles.thumbActive]}><Image source={{ uri: item }} resizeMode="contain" style={styles.thumbImage} /></Pressable>} />
    <Text style={styles.title}>{product.title}</Text><View style={styles.rating}><RatingStars value={product.ratingsAverage ?? 0} /><Text style={styles.muted}>({product.ratingsQuantity ?? 0} reviews)</Text><Text style={product.quantity ? styles.stock : styles.outStock}>{product.quantity ? 'In stock' : 'Out of stock'}</Text></View>
    <Text style={styles.price}>${(product.price * .9).toFixed(2)}</Text><Text style={styles.description}>{product.description}</Text>
    <Text style={styles.label}>Size</Text><View style={styles.sizes}>{['S', 'M', 'L', 'XL', 'XXL'].map((size) => <Pressable key={size} accessibilityRole="button" accessibilityState={{ selected: selectedSize === size }} onPress={() => setSelectedSize(size)} style={[styles.size, selectedSize === size && styles.sizeSelected]}><Text style={[styles.sizeText, selectedSize === size && styles.selectedText]}>{size}</Text></Pressable>)}</View>
    <View style={styles.buyRow}><View style={styles.quantity}><Pressable accessibilityLabel="Decrease quantity" onPress={() => setQuantity((count) => Math.max(1, count - 1))} style={styles.qtyButton}><Text>−</Text></Pressable><Text style={styles.qtyText}>{quantity}</Text><Pressable accessibilityLabel="Increase quantity" onPress={() => setQuantity((count) => count + 1)} style={styles.qtyButton}><Text>+</Text></Pressable></View><Pressable onPress={addToCart} style={styles.buy}><Text style={styles.buttonText}>Add to cart</Text></Pressable><Pressable accessibilityLabel={wished ? 'Remove from wishlist' : 'Add to wishlist'} onPress={toggleWish} style={styles.wish}><Feather name="heart" size={21} color={wished ? '#db4444' : '#111827'} /></Pressable></View>
    <View style={styles.delivery}><Feather name="truck" size={22} color="#111827" /><View style={styles.deliveryCopy}><Text style={styles.label}>Free Delivery</Text><Text style={styles.muted}>Enter your postal code for delivery availability.</Text></View></View>
    <PageTitle title="Related items" /><View style={styles.related}>{related.map((item: Product) => <ProductCard key={item.id} product={item} />)}</View>
  </ScrollView></Layout>;
}

const styles = StyleSheet.create({ content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 28 }, center: { minHeight: 300, alignItems: 'center', justifyContent: 'center', gap: 14 }, error: { color: '#dc2626' }, image: { width: '100%', height: 300, backgroundColor: '#f9fafb', borderRadius: 14 }, thumbs: { gap: 10, paddingVertical: 12 }, thumb: { width: 66, height: 66, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', padding: 5 }, thumbActive: { borderColor: '#db4444', borderWidth: 2 }, thumbImage: { width: '100%', height: '100%' }, title: { color: '#111827', fontSize: 22, lineHeight: 28, fontWeight: '700', marginTop: 10 }, rating: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 10 }, muted: { color: '#6b7280', fontSize: 13, lineHeight: 19 }, stock: { color: '#059669', fontSize: 13 }, outStock: { color: '#dc2626', fontSize: 13 }, price: { color: '#111827', fontSize: 24, fontWeight: '700', marginTop: 14 }, description: { color: '#4b5563', lineHeight: 23, marginTop: 10 }, label: { color: '#111827', fontWeight: '700' }, sizes: { flexDirection: 'row', gap: 9, marginTop: 10 }, size: { minWidth: 42, height: 42, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', alignItems: 'center', justifyContent: 'center' }, sizeSelected: { backgroundColor: '#db4444', borderColor: '#db4444' }, sizeText: { color: '#111827', fontWeight: '600' }, selectedText: { color: '#fff' }, buyRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginVertical: 18 }, quantity: { height: 46, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8 }, qtyButton: { width: 38, height: 44, alignItems: 'center', justifyContent: 'center' }, qtyText: { minWidth: 25, textAlign: 'center' }, buy: { flex: 1, height: 46, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#db4444' }, button: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#111827', borderRadius: 8 }, buttonText: { color: '#fff', fontWeight: '700' }, wish: { height: 46, width: 46, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }, delivery: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 14, marginBottom: 24, flexDirection: 'row', gap: 12, alignItems: 'center' }, deliveryCopy: { flex: 1, gap: 4 }, related: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 } });
