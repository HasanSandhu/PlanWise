import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { COLORS } from "../theme";

export function MobileShell({
  children,
  darkMode = false,
}: {
  children: React.ReactNode;
  darkMode?: boolean;
}) {
  return (
    <View style={styles.outer}>
      <View
        style={[
          styles.phone,
          darkMode && { backgroundColor: "#111820" },
          Platform.OS === "web" && ({ boxShadow: "0 18px 55px rgba(24,39,55,.20)" } as any),
        ]}
      >
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: 430,
    height: 860,
    maxWidth: "94%",
    borderRadius: 38,
    borderWidth: 8,
    borderColor: "#AAB2BD",
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
