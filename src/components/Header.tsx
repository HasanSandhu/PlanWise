import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getThemeColors } from "../theme";

export function Header({
  title,
  back = false,
  onBack,
  showSearch = true,
  onProfile,
  darkMode = false,
}: {
  title: string;
  back?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  onProfile?: () => void;
  darkMode?: boolean;
}) {
  const palette = getThemeColors(darkMode);

  const styles = StyleSheet.create({
    header: {
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      backgroundColor: palette.card,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      zIndex: 10,
    },
    leftSide: {
      width: 82,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    rightSide: {
      width: 82,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 8,
    },
    title: {
      flex: 1,
      textAlign: "center",
      fontSize: 21,
      fontWeight: "800",
      color: palette.ink,
    },
    backButton: {
      minWidth: 78,
      height: 40,
      paddingHorizontal: 8,
      borderRadius: 12,
      backgroundColor: darkMode ? "#1C2734" : "#F0F4F9",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
    },
    backText: {
      color: palette.ink,
      fontSize: 14,
      fontWeight: "700",
    },
    homeButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: darkMode ? "#223448" : "#EAF2FC",
      alignItems: "center",
      justifyContent: "center",
    },
    iconButton: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
    },
    profileButton: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: palette.blue,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.leftSide}>
        {back ? (
          <Pressable
            onPress={onBack}
            style={styles.backButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={25} color={palette.ink} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={onBack}
            style={styles.homeButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Home"
          >
            <Ionicons name="home-outline" size={21} color={palette.blue} />
          </Pressable>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSide}>
        {showSearch && (
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search-outline" size={21} color={palette.ink} />
          </Pressable>
        )}
        <Pressable
          style={styles.profileButton}
          onPress={onProfile}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Profile"
        >
          <Ionicons name="person" size={17} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
