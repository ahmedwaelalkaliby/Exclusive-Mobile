import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch } from "../store/hooks";
import { wishlistActions } from "../store/wishlistSlice";
import { toast } from "../lib/toast";
import type { WishlistItem as WishlistItemType } from "../types";

export default function WishlistCard({
  item,
  onMoveToCart,
}: {
  item: WishlistItemType;
  onMoveToCart: (item: WishlistItemType) => void;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const remove = () => {
    dispatch(wishlistActions.removeFromWishlist(item.id));
    toast.info("Removed from wishlist");
  };
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/productdetails/[id]/[category]",
            params: { id: item.id, category: item.category ?? "uncategorized" },
          })
        }
        style={styles.product}
      >
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.image}
          accessibilityLabel={item.name}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        <Pressable
          accessibilityLabel={`Remove ${item.name} from wishlist`}
          onPress={remove}
          hitSlop={8}
        >
          <Feather name="trash-2" size={20} color="#db4444" />
        </Pressable>
        <Pressable onPress={() => onMoveToCart(item)} style={styles.move}>
          <Feather name="shopping-cart" size={16} color="#fff" />
          <Text style={styles.moveText}>Move to cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  product: { flexDirection: "row", alignItems: "center", gap: 14 },
  image: { width: 82, height: 82, backgroundColor: "#f9fafb", borderRadius: 8 },
  info: { flex: 1, gap: 8 },
  name: { color: "#111827", fontWeight: "600", lineHeight: 20 },
  price: { color: "#db4444", fontWeight: "700" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  move: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  moveText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});
