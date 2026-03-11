import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Create Tab Navigator for inside Drawer
const Tab = createBottomTabNavigator();

// Home Tabs (Bottom Tab Navigator inside Drawer)
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBar,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
            📰
          </Text>
        ),
        tabBarLabel: "Feed",
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
            🔍
          </Text>
        ),
        tabBarLabel: "Explore",
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
            ❤️
          </Text>
        ),
        tabBarLabel: "Favorites",
      }}
    />
  </Tab.Navigator>
);

// Screen Components
const FeedScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>📰 Feed</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      {[1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.feedCard}>
          <View style={styles.feedHeader}>
            <View style={styles.feedAvatar} />
            <View>
              <Text style={styles.feedName}>User {item}</Text>
              <Text style={styles.feedTime}>2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.feedContent}>
            This is post number {item}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const ExploreScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>🔍 Explore</Text>
    <View style={styles.exploreGrid}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <TouchableOpacity key={item} style={styles.exploreItem}>
          <Text style={styles.exploreIcon}>📁</Text>
          <Text style={styles.exploreText}>Category {item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const FavoritesScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>❤️ Favorites</Text>
    {[1, 2, 3].map((item) => (
      <View key={item} style={styles.favoriteItem}>
        <Text style={styles.favoriteIcon}>⭐</Text>
        <Text style={styles.favoriteText}>Favorite Item {item}</Text>
      </View>
    ))}
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=7" }}
        style={styles.profileAvatar}
      />
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileEmail}>john.doe@example.com</Text>
    </View>

    <View style={styles.profileStats}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>234</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>1.2K</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>456</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
    </View>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>⚙️ Settings</Text>

    <View style={styles.settingsSection}>
      <Text style={styles.settingsSectionTitle}>Account</Text>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingIcon}>👤</Text>
        <Text style={styles.settingLabel}>Edit Profile</Text>
        <Text style={styles.settingArrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingIcon}>🔒</Text>
        <Text style={styles.settingLabel}>Privacy</Text>
        <Text style={styles.settingArrow}>→</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.settingsSection}>
      <Text style={styles.settingsSectionTitle}>Preferences</Text>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingIcon}>🔔</Text>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Text style={styles.settingValue}>On</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingIcon}>🌙</Text>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Text style={styles.settingValue}>Off</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const HelpScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>❓ Help</Text>

    {[1, 2, 3, 4].map((item) => (
      <TouchableOpacity key={item} style={styles.helpItem}>
        <Text style={styles.helpQuestion}>How do I do thing {item}?</Text>
        <Text style={styles.helpAnswer}>
          Tap here to learn more about this feature...
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const AboutScreen = () => (
  <View style={styles.screen}>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.screenTitle}>ℹ️ About</Text>

    <View style={styles.aboutCard}>
      <Text style={styles.appName}>My Awesome App</Text>
      <Text style={styles.appVersion}>Version 1.0.0</Text>
      <Text style={styles.appDescription}>
        This is a demo app showcasing drawer navigation with bottom tabs. Built
        with React Navigation.
      </Text>
      <Text style={styles.appCopyright}>© 2024 My Company</Text>
    </View>
  </View>
);

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=7" }}
          style={styles.drawerAvatar}
        />
        <Text style={styles.drawerName}>John Doe</Text>
        <Text style={styles.drawerEmail}>john.doe@example.com</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Custom Drawer Footer */}
      <View style={styles.drawerFooter}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Text style={styles.drawerFooterIcon}>🚪</Text>
          )}
          onPress={() => alert("Logged out")}
          labelStyle={styles.drawerFooterLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawer,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveTintColor: "#007AFF",
        drawerInactiveTintColor: "#666",
        drawerActiveBackgroundColor: "#e6f0ff",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          drawerIcon: ({ focused }) => (
            <Text
              style={[styles.drawerIcon, focused && styles.drawerIconFocused]}
            >
              🏠
            </Text>
          ),
          drawerLabel: "Home",
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Text
              style={[styles.drawerIcon, focused && styles.drawerIconFocused]}
            >
              👤
            </Text>
          ),
          drawerLabel: "My Profile",
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Text
              style={[styles.drawerIcon, focused && styles.drawerIconFocused]}
            >
              ⚙️
            </Text>
          ),
          drawerLabel: "Settings",
        }}
      />

      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Text
              style={[styles.drawerIcon, focused && styles.drawerIconFocused]}
            >
              ❓
            </Text>
          ),
          drawerLabel: "Help & Support",
        }}
      />

      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Text
              style={[styles.drawerIcon, focused && styles.drawerIconFocused]}
            >
              ℹ️
            </Text>
          ),
          drawerLabel: "About",
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  // Screen Styles
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },

  // Feed Styles
  feedCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  feedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    marginRight: 10,
  },
  feedName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  feedTime: {
    fontSize: 12,
    color: "#999",
  },
  feedContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // Explore Styles
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  exploreItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exploreIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  exploreText: {
    fontSize: 14,
    color: "#333",
  },

  // Favorites Styles
  favoriteItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  favoriteText: {
    fontSize: 16,
    color: "#333",
  },

  // Profile Styles
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  // Settings Styles
  settingsSection: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    padding: 15,
    paddingBottom: 5,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  settingIcon: {
    fontSize: 20,
    width: 30,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  settingValue: {
    fontSize: 16,
    color: "#666",
  },
  settingArrow: {
    fontSize: 18,
    color: "#ccc",
  },

  // Help Styles
  helpItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  helpAnswer: {
    fontSize: 14,
    color: "#666",
  },

  // About Styles
  aboutCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  appCopyright: {
    fontSize: 12,
    color: "#999",
  },

  // Tab Bar Styles
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: 60,
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.7,
  },
  tabIconFocused: {
    opacity: 1,
    color: "#007AFF",
  },

  // Drawer Styles
  drawer: {
    width: 280,
    backgroundColor: "white",
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 10,
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  drawerEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  drawerIcon: {
    fontSize: 20,
    marginRight: -10,
  },
  drawerIconFocused: {
    color: "#007AFF",
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 20,
    paddingTop: 10,
  },
  drawerFooterIcon: {
    fontSize: 20,
  },
  drawerFooterLabel: {
    fontSize: 16,
    color: "#FF3B30",
    marginLeft: 10,
  },

  // Header Styles
  header: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default DrawerNavigator;
