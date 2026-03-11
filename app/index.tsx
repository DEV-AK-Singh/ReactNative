import { useState } from "react";
import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
  const [name, setName] = useState("");
  return (
    <>
      <View
        style={{
          flex: 1,
          gap: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
        <Text style={{ fontSize: 16 }}>Welcome to the home screen!</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name..."
          style={{
            height: 40,
            width: 200,
            paddingStart: 12,
            paddingEnd: 12,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 4,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="Greet me"
            color="green"
            onPress={() => {
              Alert.alert("Hello", `Hello, ${name}!`);
            }}
          />
          <Pressable
            onPress={() => Alert.alert("Hello", "Press me!")}
            onLongPress={() => Alert.alert("Hello", "Long press me!")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "blue",
                backgroundColor: "orange",
                padding: 12,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              Press me
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
