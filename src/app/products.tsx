import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/Product/ProductCard";
import { useGetProductsQuery } from "../store/api";
import type { Product } from "../types";

export default function ProductsScreen() {
  const { search } = useLocalSearchParams<{ search?: string }>();
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery(undefined, { pollingInterval: 300000 });
  const products = data.filter((product) =>
    product.title.toLowerCase().includes((search ?? "").toLowerCase()),
  );
  return (
    <Layout scroll={false}>
      <FlatList<Product>
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columns}
        ListHeaderComponent={
          <PageTitle
            title="Products"
            subtitle={
              search ? `Results for “${search}”` : "Discover something you love"
            }
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            {isLoading ? (
              <PageTitle title="Loading products…" />
            ) : isError ? (
              <>
                <PageTitle
                  title="Unable to load products"
                  subtitle="Check your connection and retry."
                />
                <Pressable onPress={refetch} style={styles.retry}>
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </>
            ) : (
              <PageTitle
                title="No products found"
                subtitle="Try a different search."
              />
            )}
          </View>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 24 },
  columns: { justifyContent: "space-between" },
  empty: { paddingVertical: 30 },
  retry: {
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "600" },
});
