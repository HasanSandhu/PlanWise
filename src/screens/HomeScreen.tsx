import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { ScreenName, Task } from "../types";
import { Header } from "../components/Header";

export function HomeScreen({
  tasks,
  completedCount,
  onNavigate,
}: {
  tasks: Task[];
  completedCount: number;
  onNavigate: (screen: ScreenName) => void;
}) {
  const progress = Math.round((completedCount / Math.max(tasks.length, 1)) * 100);

  return (
    <View style={styles.screen}>
      <Header title="PlanWise" onProfile={() => onNavigate("Profile")} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hello, PlanWise Student!</Text>
        <Text style={styles.subtitle}>You have 4 milestones to hit this week. ✨</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>WEEKLY GOAL PROGRESS</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressNumber}>{progress || 68}%</Text>
            <Text style={styles.progressDelta}>+12% from yesterday</Text>
          </View>
          <View style={styles.graph}>
            <View style={styles.graphLine1} />
            <View style={styles.graphLine2} />
            <View style={styles.graphDot} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Critical Deadlines</Text>
          <Pressable onPress={() => onNavigate("Tasks")} style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        <Deadline
          icon="alert"
          title="Advanced Calculus Thesis"
          due="Due in 4 hours • 11:59 PM"
          danger
        />
        <Deadline
          icon="book-outline"
          title="Macroeconomics Quiz"
          due="Due Tomorrow • 2:00 PM"
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Planner</Text>
          <View style={styles.totalPill}>
            <Text style={styles.totalText}>{tasks.length} Tasks Total</Text>
          </View>
        </View>

        {tasks.slice(3, 5).map((task) => (
          <View key={task.id} style={styles.plannerRow}>
            <View style={styles.checkbox} />
            <View>
              <Text style={styles.plannerTitle}>{task.title}</Text>
              <Text style={styles.plannerDue}>
                {task.category} • {task.due}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Deadline({
  icon,
  title,
  due,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  due: string;
  danger?: boolean;
}) {
  return (
    <View style={styles.deadline}>
      <View style={[styles.deadlineIcon, danger ? styles.redIcon : styles.blueIcon]}>
        <Ionicons name={icon} size={22} color={danger ? COLORS.danger : COLORS.blue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.deadlineTitle}>{title}</Text>
        <Text style={styles.deadlineDue}>{due}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={COLORS.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 25 },
  greeting: { fontSize: 25, fontWeight: "800", color: COLORS.ink, marginTop: 3 },
  subtitle: { fontSize: 15, color: COLORS.text, marginTop: 3 },
  progressCard: {
    marginTop: 24, height: 228, borderRadius: 9, backgroundColor: COLORS.blue,
    padding: 17, overflow: "hidden",
  },
  progressLabel: { color: "white", fontSize: 14, fontWeight: "800", letterSpacing: 0.4 },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 13 },
  progressNumber: { color: "white", fontSize: 34, fontWeight: "800" },
  progressDelta: { color: "#CFE4FB", fontSize: 13, fontWeight: "600" },
  graph: { height: 105, marginTop: 18, position: "relative" },
  graphLine1: {
    position: "absolute", left: 0, top: 47, width: 250, height: 52,
    borderTopWidth: 4, borderColor: "#C9DFFF", borderRadius: 50,
    transform: [{ rotate: "-8deg" }],
  },
  graphLine2: {
    position: "absolute", left: 175, top: 30, width: 190, height: 70,
    borderTopWidth: 4, borderColor: "#C9DFFF", borderRadius: 60,
    transform: [{ rotate: "-25deg" }],
  },
  graphDot: {
    position: "absolute", left: 244, top: 21, width: 8, height: 8, borderRadius: 4,
    backgroundColor: "white",
  },
  sectionHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25, marginBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: COLORS.ink },
  viewAll: { backgroundColor: COLORS.blue, paddingHorizontal: 15, paddingVertical: 9, borderRadius: 9 },
  viewAllText: { color: "white", fontWeight: "700", fontSize: 14 },
  deadline: {
    minHeight: 82, borderRadius: 9, backgroundColor: "#F5F2F1", marginBottom: 13,
    padding: 14, flexDirection: "row", alignItems: "center", gap: 13,
  },
  deadlineIcon: { width: 48, height: 48, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  redIcon: { backgroundColor: "#FFD9D6" },
  blueIcon: { backgroundColor: "#B8D4FA" },
  deadlineTitle: { color: COLORS.ink, fontSize: 15, fontWeight: "600" },
  deadlineDue: { color: COLORS.gray, fontSize: 13, marginTop: 4 },
  totalPill: { backgroundColor: "#F1EFEE", paddingHorizontal: 11, paddingVertical: 7, borderRadius: 14 },
  totalText: { color: COLORS.gray, fontSize: 12 },
  plannerRow: {
    borderWidth: 1, borderColor: "#E5E4E3", borderRadius: 9, backgroundColor: "white",
    minHeight: 70, marginBottom: 10, padding: 12, flexDirection: "row", alignItems: "center", gap: 15,
  },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: "#CBD2DC", borderRadius: 4 },
  plannerTitle: { fontSize: 15, color: COLORS.ink },
  plannerDue: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
});
