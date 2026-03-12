import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const OTPVerification = ({ navigation, route }: any) => {
  // Get phone number from previous screen
  const { phone } = route.params || { phone: "+1 234 567 8900" };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Timer for resend
  useEffect(() => {
    let interval: number;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Handle OTP input change
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (newOtp.every((digit) => digit !== "") && !isVerifying) {
      handleVerify(newOtp.join(""));
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle verification
  const handleVerify = (code: string) => {
    setIsVerifying(true);

    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);

      // For demo, accept any 4-digit code
      if (code.length === 4) {
        Alert.alert("Success!", "Phone number verified successfully", [
          {
            text: "Continue",
            onPress: () => navigation.navigate("ProfileSetup"),
          },
        ]);
      } else {
        Alert.alert("Error", "Invalid verification code");
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  // Handle resend code
  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    Alert.alert(
      "Code Sent",
      `A new verification code has been sent to ${phone}`,
    );
  };

  // Handle edit phone number
  const handleEditPhone = () => {
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Verify Phone</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📱</Text>
          </View>

          <Text style={styles.title}>Enter Verification Code</Text>

          {/* Phone Number Display */}
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneText}>{phone}</Text>
            <TouchableOpacity onPress={handleEditPhone}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                editable={!isVerifying}
              />
            ))}
          </View>

          {/* Timer and Resend */}
          <View style={styles.resendContainer}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendActive}>Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendInactive}>Resend code in {timer}s</Text>
            )}
          </View>

          {/* Verify Button (for manual submission) */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              otp.every((d) => d)
                ? styles.verifyButtonActive
                : styles.verifyButtonDisabled,
            ]}
            onPress={() => handleVerify(otp.join(""))}
            disabled={!otp.every((d) => d) || isVerifying}
          >
            <Text style={styles.verifyButtonText}>
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Didn't receive the code? Check your spam folder or{" "}
            <Text style={styles.helpLink}>get help</Text>
          </Text>
        </View>

        {/* Loading Overlay */}
        {isVerifying && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Verifying...</Text>
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
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  phoneText: {
    fontSize: 18,
    color: "#9CA3AF",
    marginRight: 8,
  },
  editText: {
    fontSize: 16,
    color: "#6366F1",
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    gap: 8,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  otpInputFilled: {
    borderColor: "#6366F1",
    backgroundColor: "#2A2A2A",
  },
  resendContainer: {
    marginBottom: 30,
  },
  resendActive: {
    color: "#6366F1",
    fontSize: 16,
    fontWeight: "600",
  },
  resendInactive: {
    color: "#6B7280",
    fontSize: 16,
  },
  verifyButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  verifyButtonActive: {
    backgroundColor: "#6366F1",
  },
  verifyButtonDisabled: {
    backgroundColor: "#2A2A2A",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  helpText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  helpLink: {
    color: "#6366F1",
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

export default OTPVerification;
