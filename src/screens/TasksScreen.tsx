import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { ScreenName, Task } from "../types";
import { Header } from "../components/Header";
import { TaskCard } from "../components/TaskCard";

const filters = ["All", "Study", "Personal", "Work"] as const;
type Filter = (typeof filters)[number];

export function TasksScreen({
  tasks,
  onToggleTask,
  onNavigate,
  onAdd,
}: {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onNavigate: (screen: ScreenName) => void;
  onAdd: () => void;
}) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? tasks : tasks.filter((t) => t.category === filter)),
    [tasks, filter]
  );

  const urgent = tasks.filter((t) => t.priority === "High" && !t.completed).length;

  return (
    <View style={styles.screen}>
      <Header title="Tasks" back onBack={() => onNavigate("Home")} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.focusRow}>
          <View>
            <Text style={styles.focusTitle}>Today's Focus</Text>
            <Text style={styles.focusSub}>{tasks.filter((t) => !t.completed).length} tasks remaining.</Text>
          </View>
          <View style={styles.calendarBox}>
            <Ionicons name="calendar-outline" size={28} color={COLORS.blue} />
          </View>
        </View>

        <View style={styles.filters}>
          {filters.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.filter, filter === item && styles.filterActive]}
            >
              <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.activeHeader}>
          <Text style={styles.activeTitle}>Active Tasks</Text>
          <Text style={styles.urgent}>{urgent} URGENT</Text>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle-outline" size={55} color={COLORS.green} />
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptySub}>No tasks in this category.</Text>
          </View>
        ) : (
          filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
          ))
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={onAdd}>
        <Ionicons name="add" size={34} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 80 },
  focusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  focusTitle: { fontSize: 27, fontWeight: "800", color: COLORS.ink },
  focusSub: { fontSize: 15, color: COLORS.text, marginTop: 3 },
  calendarBox: {
    width: 50, height: 50, borderRadius: 12, backgroundColor: "#B5D1F9",
    alignItems: "center", justifyContent: "center",
  },
  filters: { flexDirection: "row", gap: 9, marginTop: 18, marginBottom: 25 },
  filter: { backgroundColor: "#E9E6E6", paddingHorizontal: 17, paddingVertical: 9, borderRadius: 15 },
  filterActive: { backgroundColor: COLORS.blue },
  filterText: { color: COLORS.text, fontSize: 14 },
  filterTextActive: { color: "white", fontWeight: "700" },
  activeHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  activeTitle: { fontSize: 19, fontWeight: "700", color: COLORS.ink },
  urgent: { color: COLORS.blue, fontSize: 12, fontWeight: "800" },
  fab: {
    position: "absolute", right: 20, bottom: 86, width: 58, height: 58, borderRadius: 15,
    backgroundColor: COLORS.blue, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  empty: { alignItems: "center", marginTop: 80 },
  emptyTitle: { fontSize: 21, fontWeight: "800", color: COLORS.ink, marginTop: 10 },
  emptySub: { color: COLORS.gray, marginTop: 4 },
});
