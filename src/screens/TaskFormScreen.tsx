import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { Category, Priority, ScreenName, Task } from "../types";
import { Header } from "../components/Header";

export function TaskFormScreen({
  onCancel,
  onSave,
  onNavigate,
}: {
  onCancel: () => void;
  onSave: (task: Task) => void;
  onNavigate: (screen: ScreenName) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Work");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [description, setDescription] = useState("");

  const categories: { label: string; value: Category }[] = [
    { label: "Study", value: "Study" },
    { label: "Project", value: "Work" },
    { label: "Assignment", value: "Study" },
  ];

  const save = () => {
    if (!title.trim()) return;
    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      category,
      due: dueDate.trim() || "No due date",
      priority,
      description,
      completed: false,
    });
  };

  return (
    <View style={styles.screen}>
      <Header title="Add Task" back onBack={onCancel} onProfile={() => onNavigate("Profile")} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepRow}>
          <View>
            <Text style={styles.step}>STEP 2 OF 3</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <Text style={styles.details}>Task Details</Text>
        </View>

        <Text style={styles.heading}>What's on the horizon?</Text>
        <Text style={styles.subtitle}>Fill in the essentials to keep your momentum going.</Text>

        <Text style={styles.label}>Task Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Design System Audit"
          placeholderTextColor="#A7B1BD"
          style={styles.input}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.wrap}>
          {categories.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => setCategory(item.value)}
              style={[styles.category, category === item.value && styles.categoryActive]}
            >
              <Ionicons
                name={item.label === "Study" ? "school-outline" : item.label === "Project" ? "briefcase-outline" : "clipboard-outline"}
                size={17}
                color={category === item.value ? "white" : COLORS.text}
              />
              <Text style={[styles.categoryText, category === item.value && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Due Date</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="yyyy-mm-dd"
            placeholderTextColor="#A7B1BD"
            style={styles.inputInner}
          />
          <Ionicons name="calendar-outline" size={22} color={COLORS.text} />
        </View>

        <Text style={styles.label}>Priority Level</Text>
        <View style={styles.priorityRow}>
          {(["Low", "Medium", "High"] as Priority[]).map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[styles.priority, priority === item && styles.prioritySelected]}
            >
              <Text style={styles.priorityText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Break down the steps or add reminders..."
          placeholderTextColor="#A7B1BD"
          multiline
          style={[styles.input, styles.description]}
        />

        <View style={styles.actions}>
          <Pressable onPress={onCancel} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={save} style={[styles.save, !title.trim() && { opacity: 0.5 }]}>
            <Text style={styles.saveText}>Save Task</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 30 },
  stepRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  step: { color: COLORS.blue, fontSize: 12, fontWeight: "800", letterSpacing: 1.1 },
  details: { color: COLORS.gray, fontSize: 12 },
  progressTrack: { width: 245, height: 7, borderRadius: 5, backgroundColor: "#ECE9E9", marginTop: 10 },
  progressFill: { width: "66%", height: 7, borderRadius: 5, backgroundColor: COLORS.blue },
  heading: { fontSize: 28, fontWeight: "800", color: COLORS.ink, marginTop: 25 },
  subtitle: { fontSize: 15, color: COLORS.text, lineHeight: 22, marginTop: 5, marginBottom: 26 },
  label: { color: COLORS.ink, fontSize: 14, fontWeight: "600", marginTop: 20, marginBottom: 8 },
  input: {
    height: 50, borderWidth: 1.5, borderColor: "#C9CFD8", borderRadius: 9,
    backgroundColor: "white", paddingHorizontal: 15, fontSize: 15, color: COLORS.ink,
  },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  category: {
    minHeight: 48, paddingHorizontal: 15, borderRadius: 12, backgroundColor: "#E9E6E6",
    flexDirection: "row", alignItems: "center", gap: 6,
  },
  categoryActive: { backgroundColor: COLORS.blue },
  categoryText: { color: COLORS.text, fontSize: 15 },
  activeText: { color: "white", fontWeight: "700" },
  inputWrap: {
    height: 50, borderWidth: 1.5, borderColor: "#C9CFD8", borderRadius: 9,
    backgroundColor: "white", paddingHorizontal: 15, flexDirection: "row", alignItems: "center",
  },
  inputInner: { flex: 1, fontSize: 15, color: COLORS.ink },
  priorityRow: { flexDirection: "row", backgroundColor: "#EEEAEA", borderRadius: 8, overflow: "hidden" },
  priority: { flex: 1, height: 52, alignItems: "center", justifyContent: "center" },
  prioritySelected: { backgroundColor: "white", margin: 2, borderRadius: 6 },
  priorityText: { color: COLORS.text, fontSize: 15 },
  description: { height: 100, paddingTop: 14, textAlignVertical: "top" },
  actions: { flexDirection: "row", gap: 10, marginTop: 25 },
  cancel: { flex: 1, height: 50, borderRadius: 8, borderWidth: 1, borderColor: "#CDD1D8", alignItems: "center", justifyContent: "center" },
  cancelText: { color: COLORS.text, fontWeight: "600" },
  save: { flex: 1, height: 50, borderRadius: 8, backgroundColor: COLORS.blue, alignItems: "center", justifyContent: "center" },
  saveText: { color: "white", fontWeight: "700" },
});
