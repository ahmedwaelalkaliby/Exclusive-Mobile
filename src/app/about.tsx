import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";

export default function AboutScreen() {
  return (
    <Layout>
      <PageTitle title="About Exclusive" subtitle="A little more about us" />
      <Image
        source={require("../../assets/images/portrait-two-african-femal.png")}
        resizeMode="cover"
        accessibilityLabel="Customers enjoying a shopping trip"
        style={styles.image}
      />
      <View style={styles.card}>
        <Text style={styles.heading}>Shopping made simple</Text>
        <Text style={styles.body}>
          Exclusive brings carefully selected fashion, technology, and everyday
          essentials together in one place. Browse the collection, save the
          things you love, and keep your cart close wherever you go.
        </Text>
      </View>
      <Text style={styles.teamTitle}>Meet the team</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.team}
      >
        {[
          { name: "Tom", image: require("../../assets/images/tom.png") },
          { name: "Emma", image: require("../../assets/images/emma.png") },
          { name: "Will", image: require("../../assets/images/will.png") },
        ].map((member) => (
          <View key={member.name} style={styles.member}>
            <Image
              source={member.image}
              resizeMode="cover"
              accessibilityLabel={`${member.name}, Exclusive team member`}
              style={styles.portrait}
            />
            <Text style={styles.memberName}>{member.name}</Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 230, borderRadius: 14, marginBottom: 18 },
  card: { backgroundColor: "#f9fafb", borderRadius: 14, padding: 20, gap: 12 },
  heading: { color: "#111827", fontWeight: "700", fontSize: 19 },
  body: { color: "#4b5563", lineHeight: 23 },
  teamTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 12,
  },
  team: { gap: 12 },
  member: {
    width: 130,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  portrait: { width: "100%", height: 145 },
  memberName: { color: "#111827", fontWeight: "700", padding: 10 },
});
