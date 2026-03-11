import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const sections = [
  {
    title: "Trending Now",
    data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    title: "Recommended for You",
    data: ["Product A", "Product B", "Product C", "Product D"],
  },
  {
    title: "Recently Viewed",
    data: ["Product X", "Product Y", "Product Z"],
  },
  {
    title: "Deals of the Day",
    data: ["Deal 1", "Deal 2", "Deal 3", "Deal 4", "Deal 5"],
  },
  {
    title: "Recommended for You",
    data: ["Product A", "Product B", "Product C", "Product D"],
  },
  {
    title: "Recently Viewed",
    data: ["Product X", "Product Y", "Product Z"],
  },
  {
    title: "Deals of the Day",
    data: ["Deal 1", "Deal 2", "Deal 3", "Deal 4", "Deal 5"],
  },
];

export default function NestedScrollView() {
  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalSection}
          >
            {section.data.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.horizontalItem}>
                <Text>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { marginVertical: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 8,
  },
  horizontalSection: { paddingHorizontal: 16 },
  horizontalItem: {
    width: 120,
    height: 120,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
