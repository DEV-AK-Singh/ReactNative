import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// Country data with flags and dial codes
const countries = [
  {
    name: "United States",
    flag: "🇺🇸",
    code: "US",
    dialCode: "+1",
    minLength: 10,
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    code: "GB",
    dialCode: "+44",
    minLength: 10,
  },
  { name: "India", flag: "🇮🇳", code: "IN", dialCode: "+91", minLength: 10 },
  { name: "Canada", flag: "🇨🇦", code: "CA", dialCode: "+1", minLength: 10 },
  { name: "Australia", flag: "🇦🇺", code: "AU", dialCode: "+61", minLength: 9 },
  { name: "Germany", flag: "🇩🇪", code: "DE", dialCode: "+49", minLength: 10 },
  { name: "France", flag: "🇫🇷", code: "FR", dialCode: "+33", minLength: 9 },
  { name: "Japan", flag: "🇯🇵", code: "JP", dialCode: "+81", minLength: 10 },
  { name: "Brazil", flag: "🇧🇷", code: "BR", dialCode: "+55", minLength: 11 },
  { name: "Mexico", flag: "🇲🇽", code: "MX", dialCode: "+52", minLength: 10 },
  { name: "Spain", flag: "🇪🇸", code: "ES", dialCode: "+34", minLength: 9 },
  { name: "Italy", flag: "🇮🇹", code: "IT", dialCode: "+39", minLength: 10 },
  { name: "Russia", flag: "🇷🇺", code: "RU", dialCode: "+7", minLength: 10 },
  { name: "China", flag: "🇨🇳", code: "CN", dialCode: "+86", minLength: 11 },
  {
    name: "South Korea",
    flag: "🇰🇷",
    code: "KR",
    dialCode: "+82",
    minLength: 10,
  },
  { name: "Singapore", flag: "🇸🇬", code: "SG", dialCode: "+65", minLength: 8 },
  { name: "UAE", flag: "🇦🇪", code: "AE", dialCode: "+971", minLength: 9 },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    code: "SA",
    dialCode: "+966",
    minLength: 9,
  },
  { name: "Egypt", flag: "🇪🇬", code: "EG", dialCode: "+20", minLength: 10 },
  {
    name: "South Africa",
    flag: "🇿🇦",
    code: "ZA",
    dialCode: "+27",
    minLength: 9,
  },
];

const PhoneAuth = ({ navigation }: any) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Format phone number based on country
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const digits = text.replace(/\D/g, "");

    // Apply country-specific formatting (simplified)
    if (selectedCountry.code === "US" || selectedCountry.code === "CA") {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6)
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }

    // Default: just return digits
    return digits;
  };

  // Handle phone number change
  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  // Validate phone number
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  const isValid = digitsOnly.length >= selectedCountry.minLength;

  // Handle next button press
  const handleNext = () => {
    if (isValid) {
      navigation.navigate("OTPVerification", {
        phone: `${selectedCountry.dialCode} ${phoneNumber}`,
        country: selectedCountry,
      });
    }
  };

  // Render country item for modal
  const renderCountryItem = ({ item }: { item: (typeof countries)[0] }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
        setSearchQuery("");
      }}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryDialCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Phone Number</Text>
          <View style={styles.headerRight} />
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
              <Text style={styles.title}>Your phone number</Text>
              <Text style={styles.subtitle}>
                We'll send a verification code to this number
              </Text>

              {/* Country Selector */}
              <TouchableOpacity
                style={styles.countrySelector}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
              >
                <View style={styles.countrySelectorLeft}>
                  <Text style={styles.selectedFlag}>
                    {selectedCountry.flag}
                  </Text>
                  <Text style={styles.selectedCountryName}>
                    {selectedCountry.name}
                  </Text>
                </View>
                <View style={styles.countrySelectorRight}>
                  <Text style={styles.selectedDialCode}>
                    {selectedCountry.dialCode}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </View>
              </TouchableOpacity>

              {/* Phone Input */}
              <View
                style={[
                  styles.inputContainer,
                  phoneNumber.length > 0 && !isValid && styles.inputError,
                ]}
              >
                <Text style={styles.prefix}>{selectedCountry.dialCode}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor="#6B7280"
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  autoFocus
                  maxLength={15}
                />
              </View>

              {/* Validation Message */}
              {phoneNumber.length > 0 && !isValid && (
                <Text style={styles.errorText}>
                  Please enter a valid {selectedCountry.name} number
                </Text>
              )}

              {/* Next Button */}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  isValid ? styles.nextButtonActive : styles.nextButtonDisabled,
                ]}
                onPress={handleNext}
                disabled={!isValid}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>

              {/* QR Option */}
              <View style={styles.qrContainer}>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.qrButton}
                  onPress={() => navigation.navigate("QRLogin")}
                >
                  <Text style={styles.qrButtonText}>📱 Login with QR Code</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Country Picker Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSearchQuery("");
                }}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search country or code"
                placeholderTextColor="#6B7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoFocus
              />
            </View>

            {/* Countries List */}
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.countryList}
              initialNumToRender={20}
            />
          </View>
        </Modal>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 40,
    lineHeight: 22,
  },
  countrySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  countrySelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countrySelectorRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedFlag: {
    fontSize: 24,
  },
  selectedCountryName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedDialCode: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  dropdownIcon: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  prefix: {
    color: "#9CA3AF",
    fontSize: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingVertical: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 16,
    marginLeft: 4,
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  nextButtonActive: {
    backgroundColor: "#6366F1",
  },
  nextButtonDisabled: {
    backgroundColor: "#2A2A2A",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  qrContainer: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2A2A2A",
  },
  dividerText: {
    color: "#9CA3AF",
    marginHorizontal: 16,
    fontSize: 14,
  },
  qrButton: {
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366F1",
    borderRadius: 12,
  },
  qrButtonText: {
    color: "#6366F1",
    fontSize: 16,
    fontWeight: "500",
  },
  termsText: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: "#6366F1",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalClose: {
    color: "#9CA3AF",
    fontSize: 24,
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
    paddingVertical: 14,
    fontSize: 16,
  },
  countryList: {
    paddingHorizontal: 16,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  countryFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  countryDialCode: {
    color: "#9CA3AF",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PhoneAuth;
