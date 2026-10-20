import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import RatingStars from '../RatingStars';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { toast } from '../../lib/toast';
import type { Product } from '../../types';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const authenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wished = wishlistItems.some((item) => item.id === product.id);
  const openProduct = () => router.push({ pathname: '/productdetails/[id]/[category]', params: { id: product.id, category: product.category?.name ?? 'uncategorized' } });
  const addCart = () => {
    if (!authenticated) return toast.error('Please log in to continue');
    dispatch(cartActions.addToCart({ id: product.id, name: product.title, price: product.price * 0.9, image: product.imageCover })); toast.success('Added to cart');
  };
  const toggleWishlist = () => {
    if (!authenticated) return toast.error('Please log in to continue');
    if (wished) { dispatch(wishlistActions.removeFromWishlist(product.id)); toast.info('Removed from wishlist'); }
    else { dispatch(wishlistActions.addToWishlist({ id: product.id, name: product.title, price: product.price * 0.9, image: product.imageCover, category: product.category?.name, ratingsAverage: product.ratingsAverage })); toast.success('Added to wishlist'); }
  };

  return <View style={styles.card}>
    <View style={styles.imageBox}>
      <Pressable accessibilityRole="button" accessibilityLabel={product.title} onPress={openProduct} style={styles.imageButton}><Image source={{ uri: product.imageCover }} accessibilityLabel={product.title} resizeMode="contain" style={styles.image} /></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={wished ? 'Remove from wishlist' : 'Add to wishlist'} hitSlop={8} onPress={toggleWishlist} style={styles.heart}><Feather name="heart" size={20} color={wished ? '#db4444' : '#111827'} /></Pressable>
    </View>
    <Pressable onPress={openProduct} style={styles.details}><Text numberOfLines={2} style={styles.title}>{product.title}</Text><View style={styles.priceRow}><Text style={styles.price}>${(product.price * 0.9).toFixed(2)}</Text><Text style={styles.oldPrice}>${product.price}</Text></View><RatingStars value={product.ratingsAverage ?? 0} /></Pressable>
    <Pressable accessibilityRole="button" onPress={addCart} style={styles.add}><Feather name="shopping-cart" size={16} color="#fff" /><Text style={styles.addText}>Add to cart</Text></Pressable>
  </View>;
}

const styles = StyleSheet.create({ card: { flex: 1, margin: 6, minWidth: 145, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden', backgroundColor: '#fff' }, imageBox: { height: 155, backgroundColor: '#f9fafb' }, imageButton: { flex: 1, padding: 12 }, image: { width: '100%', height: '100%' }, heart: { position: 'absolute', right: 10, top: 10, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }, details: { padding: 11, gap: 8 }, title: { minHeight: 38, color: '#111827', fontSize: 13, lineHeight: 18, fontWeight: '600' }, priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, price: { color: '#db4444', fontWeight: '700' }, oldPrice: { color: '#9ca3af', textDecorationLine: 'line-through', fontSize: 12 }, add: { minHeight: 42, backgroundColor: '#111827', flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }, addText: { color: '#fff', fontSize: 13, fontWeight: '600' } });
