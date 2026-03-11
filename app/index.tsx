import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const productData = [
  {
    id: 1,
    name: "iPhone 15",
    price: "$999",
    rating: 4.8,
    image: "https://picsum.photos/200/200?tech=1",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: "$1999",
    rating: 4.9,
    image: "https://picsum.photos/200/200?tech=2",
  },
  {
    id: 3,
    name: "iPad Air",
    price: "$599",
    rating: 4.7,
    image: "https://picsum.photos/200/200?tech=3",
  },
  {
    id: 4,
    name: "AirPods",
    price: "$249",
    rating: 4.8,
    image: "https://picsum.photos/200/200?tech=4",
  },
  {
    id: 5,
    name: "Apple Watch",
    price: "$399",
    rating: 4.6,
    image: "https://picsum.photos/200/200?tech=5",
  },
  {
    id: 6,
    name: "iMac",
    price: "$1299",
    rating: 4.9,
    image: "https://picsum.photos/200/200?tech=6",
  },
];

export default function ProductScrollView() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {productData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  contentContainer: { padding: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: { padding: 16 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "#2ecc71", marginTop: 4 },
  rating: { fontSize: 14, color: "#f39c12", marginTop: 4 },
});
