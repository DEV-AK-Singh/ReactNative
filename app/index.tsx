import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const RealWorldPressable = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Real-World Pressable Examples</Text>

      {/* 1. Like Button with Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Like Button</Text>
        <Pressable
          style={({ pressed }) => [
            styles.likeButton,
            liked && styles.likedButton,
            pressed && styles.likeButtonPressed,
          ]}
          onPress={() => setLiked(!liked)}
        >
          <Text style={styles.likeEmoji}>{liked ? "❤️" : "🤍"}</Text>
          <Text style={[styles.likeText, liked && styles.likedText]}>
            {liked ? "Liked" : "Like"}
          </Text>
        </Pressable>
      </View>

      {/* 2. Card with Pressable */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Pressable Card</Text>
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.cardHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=7" }}
              style={styles.cardAvatar}
            />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardName}>John Doe</Text>
              <Text style={styles.cardTime}>2 hours ago</Text>
            </View>
            <Text style={styles.cardArrow}>{expanded ? "▼" : "▶"}</Text>
          </View>

          {expanded && (
            <View style={styles.cardContent}>
              <Text style={styles.cardBio}>
                Software developer passionate about React Native. Love building
                mobile apps and learning new technologies.
              </Text>

              <View style={styles.cardStats}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>234</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>56</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
              </View>
            </View>
          )}
        </Pressable>
      </View>

      {/* 3. Action Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Action Buttons</Text>
        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={() => alert("Share")}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionLabel}>Share</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={() => alert("Comment")}
          >
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionLabel}>Comment</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={() => setBookmarked(!bookmarked)}
          >
            <Text style={styles.actionIcon}>{bookmarked ? "🔖" : "📑"}</Text>
            <Text style={styles.actionLabel}>
              {bookmarked ? "Saved" : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* 4. Settings Item */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Settings Item</Text>
        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            pressed && styles.settingItemPressed,
          ]}
          onPress={() => alert("Navigate to settings")}
        >
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>⚙️</Text>
            <View>
              <Text style={styles.settingTitle}>Settings</Text>
              <Text style={styles.settingSubtitle}>
                App preferences and account
              </Text>
            </View>
          </View>
          <Text style={styles.settingArrow}>→</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.settingItem,
            pressed && styles.settingItemPressed,
          ]}
          onPress={() => alert("Navigate to help")}
        >
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>❓</Text>
            <View>
              <Text style={styles.settingTitle}>Help & Support</Text>
              <Text style={styles.settingSubtitle}>FAQs and contact us</Text>
            </View>
          </View>
          <Text style={styles.settingArrow}>→</Text>
        </Pressable>
      </View>

      {/* 5. Segmented Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Segmented Control</Text>
        <View style={styles.segmentedControl}>
          <Pressable
            style={({ pressed }) => [
              styles.segment,
              styles.segmentLeft,
              pressed && styles.segmentPressed,
            ]}
            onPress={() => alert("Day view")}
          >
            <Text style={styles.segmentText}>Day</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.segment,
              styles.segmentMiddle,
              pressed && styles.segmentPressed,
            ]}
            onPress={() => alert("Week view")}
          >
            <Text style={styles.segmentText}>Week</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.segment,
              styles.segmentRight,
              pressed && styles.segmentPressed,
            ]}
            onPress={() => alert("Month view")}
          >
            <Text style={styles.segmentText}>Month</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 10,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#666",
  },
  // Like Button Styles
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  likedButton: {
    backgroundColor: "#FFE5E5",
  },
  likeButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  likeEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  likeText: {
    fontSize: 16,
    color: "#666",
  },
  likedText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  // Card Styles
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cardPressed: {
    backgroundColor: "#e9ecef",
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 10,
  },
  cardContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  cardBio: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  // Action Buttons Styles
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    minWidth: 70,
  },
  actionButtonPressed: {
    backgroundColor: "#e9ecef",
    transform: [{ scale: 0.95 }],
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 12,
    color: "#666",
  },
  // Settings Item Styles
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItemPressed: {
    backgroundColor: "#f8f9fa",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 18,
    color: "#ccc",
  },
  // Segmented Control Styles
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  segmentLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  segmentMiddle: {
    borderRadius: 0,
  },
  segmentRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  segmentPressed: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default RealWorldPressable;
