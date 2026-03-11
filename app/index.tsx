import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const categories = [
  { id: 1, name: "Electronics", icon: "📱", color: "#3498db" },
  { id: 2, name: "Fashion", icon: "👕", color: "#e74c3c" },
  { id: 3, name: "Home", icon: "🏠", color: "#2ecc71" },
  { id: 4, name: "Sports", icon: "⚽", color: "#f39c12" },
  { id: 5, name: "Books", icon: "📚", color: "#9b59b6" },
  { id: 6, name: "Toys", icon: "🎮", color: "#1abc9c" },
  { id: 7, name: "Beauty", icon: "💄", color: "#e84342" },
  { id: 8, name: "Automotive", icon: "🚗", color: "#34495e" },
];

export default function HorizontalScrollView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.horizontalContent}
      >
        {categories.map((item) => (
          <View
            key={item.id}
            style={[styles.categoryCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  horizontalContent: { paddingRight: 16 },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: { fontSize: 32, marginBottom: 8 },
  categoryName: { color: "white", fontWeight: "bold" },
});
