import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Define types for navigation
export type RootStackParamList = {
  Welcome: undefined;
  PhoneAuth: undefined;
  QRLogin: undefined;
  OTPVerification: undefined;
  ProfileSetup: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Placeholder for other screens (we'll build these next)
const PlaceholderScreen = ({ route }: any) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#0A0A0A",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: 20 }}>{route.name} Screen</Text>
    <Text style={{ color: "#9CA3AF", marginTop: 10 }}>Coming soon...</Text>
  </View>
);

// Import View and Text
import { Text, View } from "react-native";
import MainApp from "./screens/MainApp";
import OTPVerification from "./screens/OTPVerification";
import PhoneAuth from "./screens/PhoneAuth";
import ProfileSetup from "./screens/ProfileSetup";
import QRLogin from "./screens/QRLogin";
import WelcomeCarousel from "./screens/WelcomeCarousel";

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeCarousel} />
        <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
        <Stack.Screen name="QRLogin" component={QRLogin} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default App;
