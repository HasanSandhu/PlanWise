import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getThemeColors } from "../theme";
import { Task } from "../types";

export function TaskCard({
  task,
  onToggle,
  darkMode = false,
}: {
  task: Task;
  onToggle: () => void;
  darkMode?: boolean;
}) {
  const palette = getThemeColors(darkMode);
  const priorityColor =
    task.priority === "High"
      ? palette.danger
      : task.priority === "Medium"
        ? palette.blue
        : palette.gray;

  const styles = StyleSheet.create({
    card: {
      minHeight: 118,
      borderRadius: 10,
      backgroundColor: palette.card,
      marginBottom: 14,
      padding: 16,
      flexDirection: "row",
      shadowColor: "#000",
      shadowOpacity: darkMode ? 0.24 : 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    check: {
      width: 52,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 2,
    },
    circle: {
      width: 37,
      height: 37,
      borderRadius: 12,
      backgroundColor: darkMode ? "#243244" : "#F0EEEE",
      borderWidth: 2,
      borderColor: darkMode ? "#4F6076" : "#8B9CAE",
      alignItems: "center",
      justifyContent: "center",
    },
    circleDone: {
      backgroundColor: palette.blue,
      borderColor: palette.blue,
    },
    content: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor: darkMode ? "#2B415D" : "#B7D2FA",
    },
    badgeText: {
      fontSize: 15,
      color: palette.text,
    },
    priority: {
      fontSize: 14,
      fontWeight: "600",
    },
    title: {
      color: palette.ink,
      fontSize: 16,
      marginTop: 8,
      marginBottom: 6,
    },
    completed: {
      textDecorationLine: "line-through",
      color: palette.gray,
    },
    dueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    due: {
      color: palette.text,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.check}>
        <View style={[styles.circle, task.completed && styles.circleDone]}>
          {task.completed && (
            <Ionicons name="checkmark" size={18} color="white" />
          )}
        </View>
      </Pressable>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
          <Text style={[styles.priority, { color: priorityColor }]}>
            {task.priority === "High"
              ? "! "
              : task.priority === "Medium"
                ? "≋ "
                : "— "}
            {task.priority}
          </Text>
        </View>

        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>

        <View style={styles.dueRow}>
          <Ionicons name="calendar-outline" size={17} color={palette.text} />
          <Text style={styles.due}>{task.due}</Text>
        </View>
      </View>
    </View>
  );
}
