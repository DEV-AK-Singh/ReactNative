import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ProfileSetup = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate random avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#673AB7",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    if (!name.trim()) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Handle avatar press (simulate photo selection)
  const handleAvatarPress = () => {
    Alert.alert("Set Profile Photo", "Choose a photo for your profile", [
      {
        text: "Take Photo",
        onPress: () => {
          // Simulate taking photo
          setTimeout(() => {
            setAvatar("📸");
            Alert.alert("Success", "Photo captured!");
          }, 500);
        },
      },
      {
        text: "Choose from Library",
        onPress: () => {
          // Simulate choosing photo
          setTimeout(() => {
            setAvatar("🖼️");
            Alert.alert("Success", "Photo selected!");
          }, 500);
        },
      },
      {
        text: "Remove Photo",
        onPress: () => setAvatar(null),
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Handle complete setup
  const handleComplete = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      Alert.alert("Welcome!", `Your profile is ready, ${name}!`, [
        {
          text: "Start Chatting",
          onPress: () => navigation.replace("MainApp"),
        },
      ]);
    }, 1500);
  };

  // Handle skip for now
  const handleSkip = () => {
    Alert.alert(
      "Skip for now?",
      "You can always set up your profile later from Settings",
      [
        {
          text: "Skip",
          onPress: () => navigation.replace("MainApp"),
        },
        {
          text: "Continue Setup",
          style: "cancel",
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {/* Profile Photo Section */}
              <View style={styles.avatarSection}>
                <Text style={styles.sectionTitle}>Profile Photo</Text>

                <TouchableOpacity
                  style={styles.avatarContainer}
                  onPress={handleAvatarPress}
                  activeOpacity={0.8}
                >
                  {avatar ? (
                    <View style={styles.avatarImageContainer}>
                      <Text style={styles.avatarEmoji}>{avatar}</Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.avatarPlaceholder,
                        {
                          backgroundColor: name
                            ? getAvatarColor(name)
                            : "#2A2A2A",
                        },
                      ]}
                    >
                      <Text style={styles.avatarInitials}>
                        {getInitials(name)}
                      </Text>
                    </View>
                  )}

                  <View style={styles.cameraBadge}>
                    <Text style={styles.cameraIcon}>📷</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.avatarHint}>
                  Tap to add photo (optional)
                </Text>
              </View>

              {/* Name Input */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Your Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#6B7280"
                  value={name}
                  onChangeText={setName}
                  maxLength={50}
                  autoFocus
                />
                <Text style={styles.inputHint}>
                  {name.length}/50 characters
                </Text>
              </View>

              {/* Status Input */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Status (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.statusInput]}
                  placeholder="What's on your mind?"
                  placeholderTextColor="#6B7280"
                  value={status}
                  onChangeText={setStatus}
                  maxLength={100}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                <Text style={styles.inputHint}>
                  {status.length}/100 characters
                </Text>
              </View>

              {/* Privacy Note */}
              <View style={styles.privacyNote}>
                <Text style={styles.privacyIcon}>🔒</Text>
                <Text style={styles.privacyText}>
                  Your profile information is end-to-end encrypted and only
                  visible to your contacts
                </Text>
              </View>

              {/* Complete Button */}
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  name.trim()
                    ? styles.completeButtonActive
                    : styles.completeButtonDisabled,
                ]}
                onPress={handleComplete}
                disabled={!name.trim() || isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.completeButtonText}>
                  {isLoading ? "Setting up..." : "Complete Setup"}
                </Text>
              </TouchableOpacity>

              {/* Later Option */}
              <TouchableOpacity style={styles.laterButton} onPress={handleSkip}>
                <Text style={styles.laterButtonText}>I'll do this later</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Setting up your profile...</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#6366F1",
    fontSize: 24,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  skipText: {
    color: "#9CA3AF",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#2A2A2A",
  },
  avatarImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 3,
    borderColor: "#6366F1",
  },
  avatarEmoji: {
    fontSize: 60,
  },
  avatarInitials: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6366F1",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
  cameraIcon: {
    fontSize: 16,
  },
  avatarHint: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "white",
    fontSize: 16,
  },
  statusInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputHint: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 6,
    textAlign: "right",
  },
  privacyNote: {
    flexDirection: "row",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: "center",
  },
  privacyIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  privacyText: {
    flex: 1,
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 20,
  },
  completeButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  completeButtonActive: {
    backgroundColor: "#6366F1",
  },
  completeButtonDisabled: {
    backgroundColor: "#2A2A2A",
  },
  completeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  laterButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  laterButtonText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
});

export default ProfileSetup;
