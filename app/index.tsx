import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 📱 WhatsApp-like Home Screen - iOS Fixed
const WhatsAppHome = () => {
  const [selectedTab, setSelectedTab] = useState("chats");
  const [searchText, setSearchText] = useState("");

  // Dummy data for chats
  const chatsData = [
    {
      id: "1",
      name: "John Doe",
      message: "Hey, how are you?",
      time: "10:30 AM",
      avatar: "https://i.pravatar.cc/100?img=1",
      unread: 2,
      online: true,
      verified: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      message: "See you tomorrow!",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/100?img=2",
      unread: 0,
      online: false,
      verified: true,
    },
    {
      id: "3",
      name: "Mike Wilson",
      message: "📸 Photo",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/100?img=3",
      unread: 5,
      online: true,
      verified: false,
      isMedia: true,
    },
    {
      id: "4",
      name: "Emma Brown",
      message: "🎤 Voice message",
      time: "Monday",
      avatar: "https://i.pravatar.cc/100?img=4",
      unread: 0,
      online: false,
      verified: false,
      isVoice: true,
    },
    {
      id: "5",
      name: "David Miller",
      message: "Can you send the files?",
      time: "Monday",
      avatar: "https://i.pravatar.cc/100?img=5",
      unread: 1,
      online: true,
      verified: false,
    },
    {
      id: "6",
      name: "Lisa Anderson",
      message: "Thanks! 🙏",
      time: "Sunday",
      avatar: "https://i.pravatar.cc/100?img=6",
      unread: 0,
      online: false,
      verified: true,
    },
    {
      id: "7",
      name: "James Taylor",
      message: "The meeting is at 3pm",
      time: "Sunday",
      avatar: "https://i.pravatar.cc/100?img=7",
      unread: 3,
      online: true,
      verified: false,
    },
    {
      id: "8",
      name: "Anna White",
      message: "📍 Location",
      time: "Saturday",
      avatar: "https://i.pravatar.cc/100?img=8",
      unread: 0,
      online: false,
      verified: false,
      isLocation: true,
    },
    {
      id: "9",
      name: "Robert Green",
      message: "Happy Birthday! 🎂",
      time: "Saturday",
      avatar: "https://i.pravatar.cc/100?img=9",
      unread: 0,
      online: false,
      verified: false,
    },
    {
      id: "10",
      name: "Maria Garcia",
      message: "See the document",
      time: "Friday",
      avatar: "https://i.pravatar.cc/100?img=10",
      unread: 1,
      online: true,
      verified: true,
    },
  ];

  // Dummy data for status
  const statusData = [
    {
      id: "1",
      name: "My Status",
      time: "Tap to add status",
      avatar: "https://i.pravatar.cc/100?img=12",
      isMine: true,
      viewed: false,
    },
    {
      id: "2",
      name: "Alice Cooper",
      time: "5 minutes ago",
      avatar: "https://i.pravatar.cc/100?img=13",
      viewed: false,
      online: true,
    },
    {
      id: "3",
      name: "Tom Harris",
      time: "1 hour ago",
      avatar: "https://i.pravatar.cc/100?img=14",
      viewed: true,
      online: false,
    },
    {
      id: "4",
      name: "Rachel Lee",
      time: "3 hours ago",
      avatar: "https://i.pravatar.cc/100?img=15",
      viewed: false,
      online: true,
    },
    {
      id: "5",
      name: "Chris Evans",
      time: "5 hours ago",
      avatar: "https://i.pravatar.cc/100?img=16",
      viewed: true,
      online: false,
    },
  ];

  // Dummy data for calls
  const callsData = [
    {
      id: "1",
      name: "Mom",
      time: "Today, 09:30",
      avatar: "https://i.pravatar.cc/100?img=17",
      type: "incoming",
      missed: false,
    },
    {
      id: "2",
      name: "Dad",
      time: "Yesterday, 18:45",
      avatar: "https://i.pravatar.cc/100?img=18",
      type: "outgoing",
      missed: false,
    },
    {
      id: "3",
      name: "Sister",
      time: "Yesterday, 10:15",
      avatar: "https://i.pravatar.cc/100?img=19",
      type: "incoming",
      missed: true,
    },
    {
      id: "4",
      name: "Brother",
      time: "Monday, 14:30",
      avatar: "https://i.pravatar.cc/100?img=20",
      type: "video",
      missed: false,
    },
    {
      id: "5",
      name: "Grandma",
      time: "Sunday, 11:00",
      avatar: "https://i.pravatar.cc/100?img=21",
      type: "incoming",
      missed: true,
    },
  ];

  // Render chat item
  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineDot} />}
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>

        <View style={styles.chatFooter}>
          <View style={styles.messageContainer}>
            {item.isMedia && <Text style={styles.messageIcon}>📸</Text>}
            {item.isVoice && <Text style={styles.messageIcon}>🎤</Text>}
            {item.isLocation && <Text style={styles.messageIcon}>📍</Text>}
            <Text
              style={[
                styles.chatMessage,
                item.unread > 0 && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {item.message}
            </Text>
          </View>

          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render status item
  const renderStatusItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.statusItem}>
      <View
        style={[
          styles.statusAvatarContainer,
          !item.viewed && styles.unseenStatus,
        ]}
      >
        <Image source={{ uri: item.avatar }} style={styles.statusAvatar} />
        {item.isMine && (
          <View style={styles.addStatusButton}>
            <Text style={styles.addStatusIcon}>+</Text>
          </View>
        )}
      </View>

      <View style={styles.statusInfo}>
        <Text style={styles.statusName}>{item.name}</Text>
        <Text style={styles.statusTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render call item
  const renderCallItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.callItem}>
      <Image source={{ uri: item.avatar }} style={styles.callAvatar} />

      <View style={styles.callInfo}>
        <Text style={styles.callName}>{item.name}</Text>
        <View style={styles.callDetails}>
          <Text style={[styles.callTypeIcon, item.missed && styles.missedCall]}>
            {item.type === "incoming"
              ? "⬇️"
              : item.type === "outgoing"
                ? "⬆️"
                : "📹"}
          </Text>
          <Text style={[styles.callTime, item.missed && styles.missedCall]}>
            {item.time}
          </Text>
        </View>
      </View>

      <Text style={styles.callIcon}>📞</Text>
    </TouchableOpacity>
  );

  // Get current data based on selected tab
  const getCurrentData = () => {
    switch (selectedTab) {
      case "chats":
        return chatsData;
      case "status":
        return statusData;
      case "calls":
        return callsData;
      default:
        return chatsData;
    }
  };

  // Get render function based on selected tab
  const getRenderItem = () => {
    switch (selectedTab) {
      case "chats":
        return renderChatItem;
      case "status":
        return renderStatusItem;
      case "calls":
        return renderCallItem;
      default:
        return renderChatItem;
    }
  };

  return (
    <View style={styles.container}>
      {/* StatusBar - iOS Compatible */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* iOS Header Wrapper - This ensures color extends under status bar */}
      <View style={styles.headerWrapper}>
        {/* This view creates the colored background that extends under status bar on iOS */}
        <View style={styles.headerBackground} />

        {/* Header Content */}
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>WhatsApp</Text>

            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>🔍</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>⁝</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "chats" && styles.activeTab]}
              onPress={() => setSelectedTab("chats")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "chats" && styles.activeTabText,
                ]}
              >
                Chats
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTab === "status" && styles.activeTab]}
              onPress={() => setSelectedTab("status")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "status" && styles.activeTabText,
                ]}
              >
                Status
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTab === "calls" && styles.activeTab]}
              onPress={() => setSelectedTab("calls")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "calls" && styles.activeTabText,
                ]}
              >
                Calls
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Main Content */}
      <FlatList
        data={getCurrentData()}
        renderItem={getRenderItem()}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
      />

      {/* New Chat Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>✎</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  // iOS Fixed Header
  headerWrapper: {
    backgroundColor: "#128C7E", // Base color
    ...Platform.select({
      ios: {
        // This ensures the color extends under status bar on iOS
        paddingTop: 0,
      },
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  headerBackground: {
    ...Platform.select({
      ios: {
        position: "absolute",
        top: -1000, // Extend way up to cover any possible status bar area
        left: 0,
        right: 0,
        height: 1100, // Tall enough to cover
        backgroundColor: "#128C7E",
      },
      android: {
        display: "none", // Not needed on Android
      },
    }),
  },
  headerSafeArea: {
    backgroundColor: "#128C7E",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        position: "relative", // Ensure it's above the background
        zIndex: 1,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 12 : 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 20,
    padding: 4,
  },
  iconText: {
    color: "white",
    fontSize: 20,
  },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
  },
  searchIcon: {
    color: "rgba(255, 255, 255, 0.7)",
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    padding: 0,
  },

  // Tab Bar
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "white",
  },

  // List Content
  listContent: {
    paddingTop: 8,
  },
  footer: {
    height: 80,
  },

  // Chat Item Styles
  chatItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
    backgroundColor: "#0A0A0A",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
  verifiedBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#128C7E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#0A0A0A",
  },
  verifiedIcon: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  messageIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  chatMessage: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  unreadMessage: {
    color: "white",
    fontWeight: "500",
  },
  unreadBadge: {
    backgroundColor: "#128C7E",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

  // Status Item Styles
  statusItem: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
    backgroundColor: "#0A0A0A",
  },
  statusAvatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
    marginRight: 12,
  },
  unseenStatus: {
    borderColor: "#128C7E",
  },
  statusAvatar: {
    width: 51,
    height: 51,
    borderRadius: 26,
  },
  addStatusButton: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#128C7E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
  addStatusIcon: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 18,
  },
  statusInfo: {
    flex: 1,
  },
  statusName: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 13,
    color: "#888",
  },

  // Call Item Styles
  callItem: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
    backgroundColor: "#0A0A0A",
  },
  callAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  callTypeIcon: {
    marginRight: 6,
    fontSize: 14,
    color: "#888",
  },
  callTime: {
    fontSize: 13,
    color: "#888",
  },
  missedCall: {
    color: "#FF3B30",
  },
  callIcon: {
    fontSize: 22,
    color: "#128C7E",
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#128C7E",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabIcon: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default WhatsAppHome;
