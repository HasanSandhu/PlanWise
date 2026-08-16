import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getThemeColors } from "../theme";

type AuthButtonProps = {
  label: string;
  loading: boolean;
  onPress: () => void;
  darkMode?: boolean;
};

export function AuthButton({
  label,
  loading,
  onPress,
  darkMode = false,
}: AuthButtonProps) {
  const palette = getThemeColors(darkMode);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.blue },
        (pressed || loading) && styles.buttonMuted,
      ]}
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{
        disabled: loading,
        busy: loading,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <>
          <Text style={styles.label}>{label}</Text>

          <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 51,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  buttonMuted: {
    opacity: 0.7,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
