import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions } from "../store/cartSlice";
import { toast } from "../lib/toast";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector(
    (state) => state.cart,
  );
  return (
    <Layout>
      <PageTitle
        title="Your cart"
        subtitle={`${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`}
      />
      {!items.length ? (
        <View style={styles.empty}>
          <Feather name="shopping-bag" size={38} color="#9ca3af" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.muted}>
            Add something you love and it will show up here.
          </Text>
        </View>
      ) : (
        <>
          {items.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.product}>
                <Text numberOfLines={2} style={styles.name}>
                  {item.name}
                </Text>
                <Text style={styles.muted}>
                  Qty {item.quantity}
                  {item.size ? ` · Size ${item.size}` : ""}
                </Text>
                <Text style={styles.price}>${item.totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.controls}>
                <Pressable
                  accessibilityLabel={`Remove one ${item.name}`}
                  onPress={() => dispatch(cartActions.removeFromCart(item.id))}
                  style={styles.counter}
                >
                  <Text style={styles.counterText}>−</Text>
                </Pressable>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Pressable
                  accessibilityLabel={`Add one ${item.name}`}
                  onPress={() =>
                    dispatch(cartActions.addToCart({ ...item, quantity: 1 }))
                  }
                  style={styles.counter}
                >
                  <Text style={styles.counterText}>+</Text>
                </Pressable>
                <Pressable
                  accessibilityLabel={`Remove ${item.name}`}
                  onPress={() => {
                    for (let count = item.quantity; count > 0; count -= 1)
                      dispatch(cartActions.removeFromCart(item.id));
                  }}
                  style={styles.trash}
                >
                  <Feather name="trash-2" size={19} color="#db4444" />
                </Pressable>
              </View>
            </View>
          ))}
          <View style={styles.total}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalPrice}>${totalAmount.toFixed(2)}</Text>
          </View>
          <Pressable
            onPress={() => toast.info("Checkout is not available yet")}
            style={styles.checkout}
          >
            <Text style={styles.checkoutText}>Continue to checkout</Text>
          </Pressable>
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: "center", gap: 12, paddingVertical: 54 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  muted: { color: "#6b7280", fontSize: 13 },
  row: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    gap: 12,
  },
  product: { gap: 7 },
  name: { color: "#111827", fontWeight: "600", fontSize: 15 },
  price: { color: "#db4444", fontWeight: "700" },
  controls: { flexDirection: "row", alignItems: "center", gap: 10 },
  counter: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: { color: "#111827", fontSize: 20 },
  qty: { minWidth: 20, textAlign: "center", color: "#111827" },
  trash: { marginLeft: "auto", padding: 8 },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  totalLabel: { color: "#111827", fontSize: 16, fontWeight: "700" },
  totalPrice: { color: "#111827", fontSize: 16, fontWeight: "700" },
  checkout: {
    alignItems: "center",
    backgroundColor: "#db4444",
    padding: 14,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontWeight: "700" },
});
