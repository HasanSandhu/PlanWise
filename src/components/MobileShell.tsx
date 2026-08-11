import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { COLORS } from "../theme";
import { ScreenName } from "../types";
import { BottomNav } from "./BottomNav";

export function MobileShell({
  children,
  darkMode = false,
  showNavigation = false,
  currentScreen = "Home",
  onNavigate,
}: {
  children: React.ReactNode;
  darkMode?: boolean;
  showNavigation?: boolean;
  currentScreen?: Exclude<ScreenName, "TaskForm">;
  onNavigate?: (screen: Exclude<ScreenName, "TaskForm">) => void;
}) {
  return (
    <View style={styles.outer}>
      <View
        style={[
          styles.phone,
          darkMode && styles.phoneDark,
          Platform.OS === "web" && ({ boxShadow: "0 18px 55px rgba(24,39,55,.20)" } as any),
        ]}
      >
        <View style={styles.content}>{children}</View>
        {showNavigation && onNavigate && (
          <BottomNav current={currentScreen} onNavigate={onNavigate} />
        )}
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
    maxHeight: "96%",
    borderRadius: 38,
    borderWidth: 8,
    borderColor: "#AAB2BD",
    backgroundColor: COLORS.background,
    overflow: "hidden",
    flexDirection: "column",
  },
  phoneDark: { backgroundColor: "#111820" },
  content: {
    flex: 1,
    minHeight: 0,
    backgroundColor: COLORS.background,
  },
});
