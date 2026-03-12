import React, { useState } from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// Mock data for chats
const initialChats = [
  {
    id: "1",
    name: "John Doe",
    avatar: "👨",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    avatar: "👩",
    lastMessage: "See you tomorrow! 👋",
    time: "9:15 AM",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Tech Group",
    avatar: "👥",
    lastMessage: "Mike: Check out this new library",
    time: "Yesterday",
    unread: 5,
    online: true,
  },
  {
    id: "4",
    name: "Mom",
    avatar: "👵",
    lastMessage: "Call me when you get a chance",
    time: "Yesterday",
    unread: 1,
    online: false,
  },
  {
    id: "5",
    name: "Alex Chen",
    avatar: "👨‍💻",
    lastMessage: "The project is looking great!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "6",
    name: "Emma Watson",
    avatar: "👩‍🎤",
    lastMessage: "Thanks for the help! 🙏",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: "7",
    name: "Family Group",
    avatar: "👪",
    lastMessage: "Lisa: Who's coming to dinner?",
    time: "Monday",
    unread: 12,
    online: true,
  },
  {
    id: "8",
    name: "James Brown",
    avatar: "👨‍🎨",
    lastMessage: "Did you see the game last night?",
    time: "Sunday",
    unread: 0,
    online: false,
  },
];

// Chat Item Component
const ChatItem = ({
  item,
  onPress,
}: {
  item: (typeof initialChats)[0];
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.chatItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.avatarContainer}>
      <Text style={styles.avatar}>{item.avatar}</Text>
      {item.online && <View style={styles.onlineIndicator} />}
    </View>

    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatTime}>{item.time}</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Chat Screen Component
const ChatScreen = ({ route, navigation }: any) => {
  const { chat } = route.params;

  return (
    <View style={styles.chatDetailContainer}>
      <Text style={styles.comingSoonText}>
        Chat with {chat.name} would open here
      </Text>
    </View>
  );
};

// Main App Screen
const MainApp = ({ navigation }: any) => {
  const [chats, setChats] = useState(initialChats);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("chats");

  // Filter chats based on search
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => navigation.replace("Welcome"),
        style: "destructive",
      },
    ]);
  };

  // Handle chat press
  const handleChatPress = (chat: (typeof initialChats)[0]) => {
    navigation.navigate("ChatDetail", { chat });
  };

  // Handle new chat
  const handleNewChat = () => {
    Alert.alert("New Chat", "Start a new conversation");
  };

  // Calculate unread count
  const unreadCount = chats.reduce((acc, chat) => acc + chat.unread, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>WhatsApp Clone</Text>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon} onPress={handleNewChat}>
              <Text style={styles.iconText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Text style={styles.iconText}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
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
              Chats {unreadCount > 0 && `(${unreadCount})`}
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Content based on selected tab */}
        {selectedTab === "chats" && (
          <>
            {/* Chats List */}
            <FlatList
              data={filteredChats}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChatItem item={item} onPress={() => handleChatPress(item)} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatList}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>💬</Text>
                  <Text style={styles.emptyTitle}>No chats yet</Text>
                  <Text style={styles.emptyText}>
                    Start a conversation by tapping the pencil icon
                  </Text>
                </View>
              }
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={handleNewChat}>
              <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
          </>
        )}

        {selectedTab === "status" && (
          <View style={styles.tabContent}>
            <View style={styles.myStatusContainer}>
              <View style={styles.myStatusAvatar}>
                <Text style={styles.statusAvatarText}>👤</Text>
                <View style={styles.addStatusBadge}>
                  <Text style={styles.addStatusIcon}>+</Text>
                </View>
              </View>
              <View style={styles.myStatusInfo}>
                <Text style={styles.myStatusName}>My Status</Text>
                <Text style={styles.myStatusTime}>
                  Tap to add status update
                </Text>
              </View>
            </View>

            <Text style={styles.statusSectionTitle}>Recent updates</Text>

            <View style={styles.statusEmptyContainer}>
              <Text style={styles.statusEmptyIcon}>📷</Text>
              <Text style={styles.statusEmptyTitle}>No status updates</Text>
              <Text style={styles.statusEmptyText}>
                Contacts who have updated their status will appear here
              </Text>
            </View>
          </View>
        )}

        {selectedTab === "calls" && (
          <View style={styles.tabContent}>
            <View style={styles.callLogs}>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.callItem}>
                  <View style={styles.callAvatar}>
                    <Text style={styles.callAvatarText}>👤</Text>
                  </View>
                  <View style={styles.callInfo}>
                    <Text style={styles.callName}>Contact {item}</Text>
                    <View style={styles.callDetails}>
                      <Text style={styles.callIcon}>📞</Text>
                      <Text style={styles.callTime}>
                        Yesterday, {2 + item}:30 PM
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.callEmptyContainer}>
              <Text style={styles.callEmptyIcon}>📞</Text>
              <Text style={styles.callEmptyTitle}>No call history</Text>
              <Text style={styles.callEmptyText}>
                Your call logs will appear here
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

// Chat Detail Screen (for navigation)
export const ChatDetailScreen = ({ route, navigation }: any) => {
  const { chat } = route.params;

  return (
    <View style={styles.chatDetailContainer}>
      <View style={styles.chatDetailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.chatDetailUser}>
          <Text style={styles.chatDetailName}>{chat.name}</Text>
          <Text style={styles.chatDetailStatus}>
            {chat.online ? "🟢 Online" : "● Last seen recently"}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatDetailContent}>
        <Text style={styles.comingSoonText}>
          Chat interface would appear here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  headerLeft: {
    width: 60,
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
  },
  headerIcon: {
    padding: 4,
  },
  iconText: {
    color: "white",
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6366F1",
  },
  tabText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#6366F1",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#6B7280",
  },
  searchInput: {
    flex: 1,
    color: "white",
    paddingVertical: 12,
    fontSize: 16,
  },
  chatList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
    textAlign: "center",
    lineHeight: 50,
    fontSize: 24,
    overflow: "hidden",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#0A0A0A",
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
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  chatTime: {
    color: "#6B7280",
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    flex: 1,
    color: "#9CA3AF",
    fontSize: 14,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#6366F1",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabIcon: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  myStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  myStatusAvatar: {
    position: "relative",
    marginRight: 12,
  },
  statusAvatarText: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
    textAlign: "center",
    lineHeight: 50,
    fontSize: 24,
  },
  addStatusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
  addStatusIcon: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  myStatusInfo: {
    flex: 1,
  },
  myStatusName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  myStatusTime: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  statusSectionTitle: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 16,
  },
  statusEmptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  statusEmptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  statusEmptyTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  statusEmptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  callLogs: {
    paddingVertical: 16,
  },
  callItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  callAvatar: {
    marginRight: 12,
  },
  callAvatarText: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#2A2A2A",
    textAlign: "center",
    lineHeight: 45,
    fontSize: 20,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  callDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  callIcon: {
    fontSize: 14,
    marginRight: 6,
    color: "#9CA3AF",
  },
  callTime: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  callEmptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  callEmptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  callEmptyTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  callEmptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  // Chat Detail Screen Styles
  chatDetailContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  chatDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
    backgroundColor: "#0A0A0A",
  },
  backButton: {
    color: "#6366F1",
    fontSize: 24,
    marginRight: 16,
  },
  chatDetailUser: {
    flex: 1,
  },
  chatDetailName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  chatDetailStatus: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  menuButton: {
    color: "white",
    fontSize: 24,
  },
  chatDetailContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  comingSoonText: {
    color: "#9CA3AF",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default MainApp;
