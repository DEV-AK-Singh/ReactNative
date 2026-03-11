import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const GalleryModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      url: "https://picsum.photos/400/400?random=1",
      title: "Mountain View",
    },
    {
      id: 2,
      url: "https://picsum.photos/400/400?random=2",
      title: "Ocean Sunset",
    },
    {
      id: 3,
      url: "https://picsum.photos/400/400?random=3",
      title: "City Lights",
    },
    {
      id: 4,
      url: "https://picsum.photos/400/400?random=4",
      title: "Forest Path",
    },
    {
      id: 5,
      url: "https://picsum.photos/400/400?random=5",
      title: "Desert Dunes",
    },
    {
      id: 6,
      url: "https://picsum.photos/400/400?random=6",
      title: "Northern Lights",
    },
  ];

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.galleryTitle}>Image Gallery</Text>

      <ScrollView contentContainerStyle={styles.galleryGrid}>
        {images.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={styles.imageThumbnail}
            onPress={() => openImage(image)}
          >
            <Image source={{ uri: image.url }} style={styles.thumbnail} />
            <View style={styles.thumbnailOverlay}>
              <Text style={styles.thumbnailTitle}>{image.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullImageContainer}>
          <TouchableOpacity
            style={styles.closeImageButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeImageIcon}>✕</Text>
          </TouchableOpacity>

          {selectedImage && (
            <>
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.fullImage}
              />

              <View style={styles.imageInfo}>
                <Text style={styles.imageTitle}>{selectedImage.title}</Text>

                <View style={styles.imageActions}>
                  <TouchableOpacity style={styles.imageAction}>
                    <Text style={styles.actionIcon}>❤️</Text>
                    <Text style={styles.actionText}>Like</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.imageAction}>
                    <Text style={styles.actionIcon}>💬</Text>
                    <Text style={styles.actionText}>Comment</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.imageAction}>
                    <Text style={styles.actionIcon}>⬇️</Text>
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    color: "#333",
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  imageThumbnail: {
    width: (width - 30) / 2,
    height: 150,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
  },
  thumbnailTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  fullImageContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  closeImageButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeImageIcon: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  fullImage: {
    width: width,
    height: height * 0.7,
    resizeMode: "contain",
  },
  imageInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
  },
  imageTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imageActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageAction: {
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    color: "white",
    fontSize: 12,
  },
});

export default GalleryModal;
