import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { ScreenName } from "../types";

const items: { name: Exclude<ScreenName, "TaskForm">; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { name: "Home", icon: "home-outline", label: "Home" },
  { name: "Calendar", icon: "calendar-outline", label: "Calendar" },
  { name: "Tasks", icon: "clipboard-outline", label: "Tasks" },
  { name: "Profile", icon: "person-outline", label: "Profile" },
];

export function BottomNav({
  current,
  onNavigate,
}: {
  current: Exclude<ScreenName, "TaskForm">;
  onNavigate: (screen: Exclude<ScreenName, "TaskForm">) => void;
}) {
  return (
    <View style={styles.nav}>
      {items.map((item) => {
        const active = current === item.name;
        return (
          <Pressable
            key={item.name}
            onPress={() => onNavigate(item.name)}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`Go to ${item.label}`}
          >
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Ionicons
                name={active ? item.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap : item.icon}
                size={24}
                color={active ? COLORS.blue : COLORS.gray}
              />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFDFC",
    borderTopWidth: 1,
    borderTopColor: "#DDE3EA",
    paddingHorizontal: 4,
    zIndex: 100,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
  },
  button: {
    width: 92,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  pressed: { opacity: 0.65 },
  iconWrap: {
    width: 40,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: { backgroundColor: "#E7F0FC" },
  label: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.gray,
  },
  labelActive: { color: COLORS.blue, fontWeight: "800" },
});
