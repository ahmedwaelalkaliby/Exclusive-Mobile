import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { clearCredentials } from "../../store/authStorage";
import { toast } from "../../lib/toast";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useAppSelector(
    (state) => state.wishlist.items.length,
  );
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const handleLogout = async () => {
    dispatch(logout());
    try {
      await clearCredentials();
    } catch {
      toast.warning("Could not clear the saved session");
    }
    toast.success("Successfully logged out");
    setMenuOpen(false);
    router.replace("/Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.promo}>
        Summer Sale: Free express delivery — 50% off selected items
      </Text>
      <View style={styles.row}>
        <Link href="/" style={styles.brand}>
          Exclusive
        </Link>
        <View style={styles.actions}>
          <Link
            href="/wishlist"
            accessibilityLabel={`Wishlist, ${wishlistQuantity} items`}
            style={styles.iconLink}
          >
            <Feather name="heart" size={22} color="#111827" />
            {wishlistQuantity > 0 && (
              <Text style={styles.badge}>{wishlistQuantity}</Text>
            )}
          </Link>
          <Link
            href="/cart"
            accessibilityLabel={`Cart, ${cartQuantity} items`}
            style={styles.iconLink}
          >
            <Feather name="shopping-cart" size={22} color="#111827" />
            {cartQuantity > 0 && (
              <Text style={styles.badge}>{cartQuantity}</Text>
            )}
          </Link>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle navigation menu"
            onPress={() => setMenuOpen((open) => !open)}
            style={styles.iconLink}
          >
            <Feather name={menuOpen ? "x" : "menu"} size={24} color="#111827" />
          </Pressable>
        </View>
      </View>
      {menuOpen && (
        <View style={styles.menu}>
          <TextInput
            accessibilityLabel="Search products"
            placeholder="Search products"
            returnKeyType="search"
            onSubmitEditing={({ nativeEvent }) => {
              setMenuOpen(false);
              router.push({
                pathname: "/products",
                params: { search: nativeEvent.text },
              });
            }}
            style={styles.search}
          />
          {(
            [
              ["Home", "/"],
              ["Products", "/products"],
              ["Contact", "/contact"],
              ["About", "/about"],
              ["Wishlist", "/wishlist"],
              ["Cart", "/cart"],
            ] as const
          ).map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onPress={() => setMenuOpen(false)}
              style={styles.menuLink}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Pressable onPress={handleLogout} style={styles.menuLink}>
              <Text style={styles.menuText}>Log out</Text>
            </Pressable>
          ) : (
            <Link
              href="/signup"
              onPress={() => setMenuOpen(false)}
              style={styles.menuLink}
            >
              Create account
            </Link>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    zIndex: 10,
  },
  promo: {
    backgroundColor: "#111827",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 11,
  },
  row: {
    minHeight: 62,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { fontSize: 23, fontWeight: "800", color: "#111827" },
  actions: { flexDirection: "row", alignItems: "center", gap: 18 },
  iconLink: {
    position: "relative",
    minWidth: 28,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -9,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    overflow: "hidden",
    backgroundColor: "#db4444",
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    lineHeight: 17,
  },
  menu: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  search: {
    height: 42,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  menuLink: { paddingVertical: 10, color: "#1f2937", fontSize: 15 },
  menuText: { color: "#1f2937", fontSize: 15 },
});
