import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function CalculatorGrid() {
  const [display, setDisplay] = useState("0");

  const rows = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["C", "0", "=", "+"],
  ];

  const handlePress = (value: string) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Display */}
      <View
        style={{
          backgroundColor: "#f0f0f0",
          padding: 20,
          marginTop: 40,
          marginBottom: 20,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 32, textAlign: "right" }}>{display}</Text>
      </View>

      {/* Buttons grid */}
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          {row.map((btn, colIndex) => (
            <View
              key={colIndex}
              style={{
                flex: 1,
                marginHorizontal: 5,
              }}
            >
              <Button
                title={btn === "C" ? "Clear" : btn}
                onPress={() => handlePress(btn)}
                color={
                  btn === "C"
                    ? "red"
                    : ["/", "*", "-", "+", "="].includes(btn)
                      ? "black"
                      : "green"
                }
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
