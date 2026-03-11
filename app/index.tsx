import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AdvancedRadioGroup = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$9.99/month",
      description: "Access to basic features",
      disabled: false,
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$19.99/month",
      description: "Advanced features + priority support",
      disabled: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99/month",
      description: "Custom solutions for teams",
      disabled: true, // This option is disabled
    },
  ];

  const RadioCard = ({ plan }: { plan: (typeof plans)[number] }) => {
    const isSelected = selectedPlan === plan.id;
    const isDisabled = plan.disabled;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isDisabled && styles.disabledCard,
        ]}
        onPress={() => !isDisabled && setSelectedPlan(plan.id)}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.radioSection}>
            <View
              style={[
                styles.radioOuter,
                isSelected && styles.selectedRadioOuter,
                isDisabled && styles.disabledRadioOuter,
              ]}
            >
              {isSelected && (
                <View
                  style={[
                    styles.radioInner,
                    isDisabled && styles.disabledRadioInner,
                  ]}
                />
              )}
            </View>
          </View>

          <View style={styles.textSection}>
            <View style={styles.titleRow}>
              <Text
                style={[styles.planName, isDisabled && styles.disabledText]}
              >
                {plan.name}
              </Text>
              <Text
                style={[styles.planPrice, isDisabled && styles.disabledText]}
              >
                {plan.price}
              </Text>
            </View>
            <Text
              style={[
                styles.planDescription,
                isDisabled && styles.disabledText,
              ]}
            >
              {plan.description}
            </Text>
            {isDisabled && (
              <Text style={styles.disabledBadge}>Currently Unavailable</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Plan</Text>
      {plans.map((plan) => (
        <RadioCard key={plan.id} plan={plan} />
      ))}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Selected Plan: {plans.find((p) => p.id === selectedPlan)?.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  disabledCard: {
    opacity: 0.6,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    flexDirection: "row",
  },
  radioSection: {
    marginRight: 15,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadioOuter: {
    borderColor: "#007AFF",
  },
  disabledRadioOuter: {
    borderColor: "#ccc",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  disabledRadioInner: {
    backgroundColor: "#999",
  },
  textSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  planName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  planDescription: {
    fontSize: 14,
    color: "#666",
  },
  disabledText: {
    color: "#999",
  },
  disabledBadge: {
    marginTop: 8,
    fontSize: 12,
    color: "#ff3b30",
    fontWeight: "600",
  },
  summary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AdvancedRadioGroup;
