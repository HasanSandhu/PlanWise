import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { ScreenName, Task } from "../types";
import { Header } from "../components/Header";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const calendarNumbers = ["28", "29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

export function CalendarScreen({
  tasks,
  onNavigate,
  onAdd,
}: {
  tasks: Task[];
  onNavigate: (screen: ScreenName) => void;
  onAdd: () => void;
}) {
  const [selected, setSelected] = useState("9");
  const visibleTasks = useMemo(() => tasks.slice(0, 2), [tasks]);

  return (
    <View style={styles.screen}>
      <Header title="PlanWise" back onBack={() => onNavigate("Home")} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.month}>SEPTEMBER 2024</Text>
        <View style={styles.monthRow}>
          <Text style={styles.semester}>Fall Semester</Text>
          <View style={styles.arrows}>
            <Pressable style={styles.arrow}><Ionicons name="chevron-back" size={22} color={COLORS.text} /></Pressable>
            <Pressable style={styles.arrow}><Ionicons name="chevron-forward" size={22} color={COLORS.text} /></Pressable>
          </View>
        </View>

        <View style={styles.calendar}>
          <View style={styles.week}>
            {days.map((d, i) => <Text key={i} style={styles.dayName}>{d}</Text>)}
          </View>
          <View style={styles.grid}>
            {calendarNumbers.map((n, i) => (
              <Pressable
                key={`${n}-${i}`}
                onPress={() => setSelected(n)}
                style={[styles.cell, n === selected && styles.selectedCell]}
              >
                <Text style={[styles.number, i < 3 && styles.muted, n === selected && styles.selectedText]}>{n}</Text>
                {(n === "2" || n === "6" || n === "9") && <View style={[styles.dot, n === selected && { backgroundColor: "white" }]} />}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>Tasks for Today</Text>
          <Text style={styles.assignments}>{visibleTasks.length} assignments</Text>
        </View>

        {visibleTasks.map((task, index) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={[styles.taskIcon, index === 0 ? styles.iconDark : styles.iconLight]}>
              <Ionicons name={index === 0 ? "flask-outline" : "calculator-outline"} size={24} color={index === 0 ? "white" : COLORS.blue} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.taskTop}>
                <Text style={styles.taskTitle} numberOfLines={1}>{index === 0 ? "Modern History Essay" : "Calculus Quiz Prep"}</Text>
                <Text style={styles.duePill}>{index === 0 ? "11:59 PM" : "Tomorrow"}</Text>
              </View>
              <Text style={styles.taskDesc} numberOfLines={1}>{index === 0 ? "Final draft on Industrial Revolution..." : "Review derivatives and chain rule..."}</Text>
              {index === 0 && (
                <View style={styles.progressRow}>
                  <View style={styles.smallTrack}><View style={styles.smallFill} /></View>
                  <Text style={styles.percent}>75%</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <View style={styles.greatCard}>
          <View style={styles.sparkle}><Ionicons name="sparkles" size={28} color={COLORS.blue} /></View>
          <Text style={styles.greatTitle}>Doing Great!</Text>
          <Text style={styles.greatText}>You're keeping your schedule on track.</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.fab} onPress={onAdd}>
        <Ionicons name="add" size={34} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 85 },
  month: { color: COLORS.text, fontSize: 12, letterSpacing: 1, marginTop: 5 },
  monthRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  semester: { color: COLORS.ink, fontSize: 27, fontWeight: "800" },
  arrows: { flexDirection: "row", gap: 8 },
  arrow: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#F0EEEE", alignItems: "center", justifyContent: "center" },
  calendar: { backgroundColor: "white", borderRadius: 10, borderWidth: 1, borderColor: "#E7E5E5", overflow: "hidden" },
  week: { height: 38, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F0EEEE" },
  dayName: { flex: 1, textAlign: "center", paddingTop: 11, fontSize: 12, color: COLORS.gray },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.2857%", height: 52, alignItems: "center", justifyContent: "center", position: "relative" },
  selectedCell: { backgroundColor: COLORS.blue, borderRadius: 5 },
  number: { fontSize: 14, color: COLORS.ink },
  selectedText: { color: "white", fontWeight: "800" },
  muted: { color: "#B5BAC0" },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.blue, position: "absolute", bottom: 8 },
  tasksHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 36, marginBottom: 14 },
  tasksTitle: { fontSize: 20, fontWeight: "800", color: COLORS.ink },
  assignments: { fontSize: 12, color: COLORS.blue, fontWeight: "700" },
  taskItem: { minHeight: 100, borderRadius: 10, backgroundColor: "white", borderWidth: 1, borderColor: "#E7E5E5", padding: 15, flexDirection: "row", gap: 14, marginBottom: 13 },
  taskIcon: { width: 50, height: 50, borderRadius: 5, alignItems: "center", justifyContent: "center" },
  iconDark: { backgroundColor: COLORS.blue },
  iconLight: { backgroundColor: "#B6D3F9" },
  taskTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5 },
  taskTitle: { fontSize: 16, fontWeight: "700", color: COLORS.ink, flex: 1 },
  duePill: { backgroundColor: "#F3E4E3", paddingHorizontal: 7, paddingVertical: 5, borderRadius: 10, color: COLORS.danger, fontSize: 11 },
  taskDesc: { color: COLORS.text, fontSize: 13, marginTop: 5 },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  smallTrack: { height: 6, flex: 1, borderRadius: 5, backgroundColor: "#E6E6E6", overflow: "hidden" },
  smallFill: { width: "75%", height: 6, backgroundColor: COLORS.blue, borderRadius: 5 },
  percent: { fontSize: 11, color: COLORS.gray },
  greatCard: { minHeight: 160, backgroundColor: "#EAF2FC", borderRadius: 16, marginTop: 28, alignItems: "center", justifyContent: "center", padding: 20 },
  sparkle: { width: 64, height: 64, borderRadius: 12, backgroundColor: "white", alignItems: "center", justifyContent: "center" },
  greatTitle: { fontSize: 20, fontWeight: "800", color: COLORS.ink, marginTop: 10 },
  greatText: { color: COLORS.text, marginTop: 4 },
  fab: { position: "absolute", right: 20, bottom: 85, width: 58, height: 58, borderRadius: 15, backgroundColor: COLORS.blue, alignItems: "center", justifyContent: "center", elevation: 6 },
});
