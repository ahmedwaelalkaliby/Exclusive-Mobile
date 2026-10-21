import { FlatList, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import WishlistCard from "../components/WishlistCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions } from "../store/cartSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { toast } from "../lib/toast";
import type { WishlistItem } from "../types";

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);
  const moveToCart = (item: WishlistItem) => {
    dispatch(
      cartActions.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      }),
    );
    dispatch(wishlistActions.removeFromWishlist(item.id));
    toast.success("Moved to cart");
  };
  return (
    <Layout scroll={false}>
      <FlatList<WishlistItem>
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WishlistCard item={item} onMoveToCart={moveToCart} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <PageTitle title="Wishlist" subtitle="Your saved favorites" />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Your wishlist is empty.</Text>
          </View>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  list: { padding: 18, paddingBottom: 28 },
  empty: { alignItems: "center", paddingVertical: 46 },
  emptyText: { color: "#6b7280" },
});
