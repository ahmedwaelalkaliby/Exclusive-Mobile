import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

export default function SearchableDropdown() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const results = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onFocus={() => setOpen(true)}
        onChangeText={(value) => {
          setSearch(value);
          setOpen(true);
        }}
        placeholder={selected || "Search options…"}
        accessibilityLabel="Search options"
        style={styles.input}
      />
      {open && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          style={styles.results}
          data={results}
          keyExtractor={(item) => item}
          ListEmptyComponent={
            <Text style={styles.empty}>No options found</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSelected(item);
                setSearch("");
                setOpen(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", maxWidth: 340 },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 9,
    paddingHorizontal: 13,
    color: "#111827",
  },
  results: {
    maxHeight: 220,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 9,
  },
  option: { padding: 13, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  optionText: { color: "#111827" },
  empty: { padding: 13, color: "#6b7280" },
});
