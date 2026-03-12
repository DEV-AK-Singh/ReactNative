import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// Simple QR code placeholder component
const QRPlaceholder = () => {
  // Generate a random pattern for visual interest
  const generatePattern = () => {
    const pattern = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        // Create a pattern that looks like a QR code
        const isBlack =
          i === 0 ||
          i === 8 ||
          j === 0 ||
          j === 8 || // Border
          (i < 3 && j < 3) || // Top-left square
          (i < 3 && j > 5) || // Top-right square
          (i > 5 && j < 3) || // Bottom-left square
          Math.random() > 0.6; // Random dots
        row.push(isBlack);
      }
      pattern.push(row);
    }
    return pattern;
  };

  const pattern = generatePattern();

  return (
    <View style={styles.qrGrid}>
      {pattern.map((row, i) => (
        <View key={i} style={styles.qrRow}>
          {row.map((isBlack, j) => (
            <View
              key={j}
              style={[
                styles.qrDot,
                { backgroundColor: isBlack ? "#000" : "#fff" },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const QRLogin = ({ navigation }: any) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [qrCode, setQrCode] = useState(1); // Used to force re-render of QR

  // Timer for QR code expiry
  useEffect(() => {
    if (timeLeft > 0 && !isConnected) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isConnected) {
      // Auto refresh when timer hits 0
      handleRefresh();
    }
  }, [timeLeft, isConnected]);

  // Simulate connection (in real app, this would be WebSocket)
  const simulateConnection = () => {
    setIsConnecting(true);

    // Simulate scanning after 5 seconds
    const scanTimer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);

      Alert.alert("Success!", "Device linked successfully", [
        {
          text: "Continue to App",
          onPress: () => navigation.replace("MainApp"),
        },
      ]);
    }, 25000);

    return () => clearTimeout(scanTimer);
  };

  // Handle refresh
  const handleRefresh = () => {
    setQrCode((prev) => prev + 1);
    setTimeLeft(60);
    setIsConnecting(false);
    setIsConnected(false);
  };

  // Handle manual code entry
  const handleManualCode = () => {
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();

    Alert.alert(
      "Manual Code",
      `Enter this 6-digit code on your primary device:\n\n${mockCode}`,
      [
        {
          text: "Copy Code",
          onPress: () => {
            // In real app, copy to clipboard
            Alert.alert("Copied!", "Code copied to clipboard");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  // Start connection simulation when component mounts
  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      simulateConnection();
    }, 2000);

    return () => clearTimeout(connectionTimer);
  }, [qrCode]);

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
          <Text style={styles.headerTitle}>Link Device</Text>
          <View style={styles.headerRight} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.title}>Link this device</Text>
            <Text style={styles.subtitle}>
              Scan this QR code with your primary device to connect
            </Text>

            {/* QR Code Container */}
            <View style={styles.qrContainer}>
              <View style={styles.qrWrapper}>
                <QRPlaceholder key={qrCode} />

                {/* Timer Badge */}
                <View
                  style={[
                    styles.timerBadge,
                    timeLeft < 10 && styles.timerBadgeWarning,
                  ]}
                >
                  <Text style={styles.timerText}>{timeLeft}s</Text>
                </View>
              </View>

              {/* Connection Status */}
              <View style={styles.statusContainer}>
                {isConnecting && (
                  <>
                    <ActivityIndicator size="small" color="#6366F1" />
                    <Text style={styles.statusText}>Waiting for scan...</Text>
                  </>
                )}
                {isConnected && (
                  <>
                    <Text style={styles.statusIcon}>✓</Text>
                    <Text style={[styles.statusText, styles.successText]}>
                      Connected!
                    </Text>
                  </>
                )}
                {!isConnecting && !isConnected && (
                  <>
                    <Text style={styles.statusIcon}>📷</Text>
                    <Text style={styles.statusText}>Ready to scan</Text>
                  </>
                )}
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefresh}
                activeOpacity={0.7}
              >
                <Text style={styles.refreshIcon}>↻</Text>
                <Text style={styles.refreshText}>Generate New Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.manualButton}
                onPress={handleManualCode}
                activeOpacity={0.7}
              >
                <Text style={styles.manualIcon}>⌨️</Text>
                <Text style={styles.manualText}>Enter Code Manually</Text>
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>How to link:</Text>

              <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>1</Text>
                <Text style={styles.instructionText}>
                  Open WhatsApp on your primary phone
                </Text>
              </View>

              <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>2</Text>
                <Text style={styles.instructionText}>
                  Go to Settings → Linked Devices
                </Text>
              </View>

              <View style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>3</Text>
                <Text style={styles.instructionText}>
                  Tap "Link a Device" and scan this QR code
                </Text>
              </View>
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <Text style={styles.securityIcon}>🔒</Text>
              <Text style={styles.securityText}>
                End-to-end encrypted. Your messages stay private.
              </Text>
            </View>
          </View>
        </ScrollView>
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
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  qrWrapper: {
    position: "relative",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 24,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  qrGrid: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  qrRow: {
    flexDirection: "row",
  },
  qrDot: {
    width: 22,
    height: 22,
    borderWidth: 0.2,
    borderColor: "#e0e0e0",
  },
  timerBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#6366F1",
  },
  timerBadgeWarning: {
    borderColor: "#F59E0B",
  },
  timerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  statusIcon: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  statusText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  successText: {
    color: "#10B981",
  },
  actionsContainer: {
    width: "100%",
    marginBottom: 30,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  refreshIcon: {
    fontSize: 20,
    marginRight: 8,
    color: "#9CA3AF",
  },
  refreshText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  manualButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6366F1",
  },
  manualIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  manualText: {
    color: "#6366F1",
    fontSize: 16,
    fontWeight: "500",
  },
  instructionsContainer: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  instructionsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 24,
    marginRight: 12,
  },
  instructionText: {
    flex: 1,
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 20,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 12,
    marginTop: 10,
  },
  securityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  securityText: {
    flex: 1,
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 16,
  },
});

export default QRLogin;
