import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { Task } from "../types";

export function TaskCard({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: () => void;
}) {
  const priorityColor =
    task.priority === "High"
      ? COLORS.danger
      : task.priority === "Medium"
      ? COLORS.blue
      : COLORS.gray;

  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.check}>
        <View style={[styles.circle, task.completed && styles.circleDone]}>
          {task.completed && <Ionicons name="checkmark" size={18} color="white" />}
        </View>
      </Pressable>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={[styles.badge, badgeColor(task.category)]}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
          <Text style={[styles.priority, { color: priorityColor }]}>
            {task.priority === "High" ? "! " : task.priority === "Medium" ? "≋ " : "— "}
            {task.priority}
          </Text>
        </View>

        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>

        <View style={styles.dueRow}>
          <Ionicons name="calendar-outline" size={17} color={COLORS.text} />
          <Text style={styles.due}>{task.due}</Text>
        </View>
      </View>
    </View>
  );
}

function badgeColor(category: Task["category"]) {
  if (category === "Study") return { backgroundColor: "#B7D2FA" };
  if (category === "Work") return { backgroundColor: "#DCE7F3" };
  return { backgroundColor: "#E9E7E7" };
}

const styles = StyleSheet.create({
  card: {
    minHeight: 118,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    marginBottom: 14,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.04,
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
    backgroundColor: "#F0EEEE",
    borderWidth: 2,
    borderColor: "#8B9CAE",
    alignItems: "center",
    justifyContent: "center",
  },
  circleDone: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
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
  },
  badgeText: {
    fontSize: 15,
    color: COLORS.text,
  },
  priority: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: COLORS.ink,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 6,
  },
  completed: {
    textDecorationLine: "line-through",
    color: COLORS.gray,
  },
  dueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  due: {
    color: COLORS.text,
    fontSize: 14,
  },
});
