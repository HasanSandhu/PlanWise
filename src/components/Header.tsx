import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";

export function Header({
  title,
  back,
  onBack,
  showSearch = true,
}: {
  title: string;
  back?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {back ? (
          <Pressable onPress={onBack} hitSlop={10}>
            <Ionicons name="arrow-back" size={26} color={COLORS.ink} />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={[styles.side, styles.right]}>
        {showSearch && (
          <Ionicons name="search-outline" size={25} color={COLORS.ink} />
        )}
        <View style={styles.profileDot}>
          <Ionicons name="person-outline" size={18} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 68,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEAE9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  side: {
    width: 76,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
  },
  profileDot: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },
});
