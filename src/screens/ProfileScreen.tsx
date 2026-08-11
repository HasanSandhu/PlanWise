import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";
import { ScreenName, Task } from "../types";
import { Header } from "../components/Header";

export function ProfileScreen({
  tasks,
  darkMode,
  onToggleTheme,
  onLogout,
  onNavigate,
}: {
  tasks: Task[];
  darkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={[styles.screen, darkMode && styles.darkScreen]}>
      <Header title="PlanWise" back onBack={() => onNavigate("Home")} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Ionicons name="person-outline" size={64} color={COLORS.blue} /></View>
          <View style={styles.edit}><Ionicons name="pencil" size={16} color="white" /></View>
          <Text style={styles.name}>Hasanpreet Kaur</Text>
          <Text style={styles.email}>h.kaur@university.edu</Text>
        </View>

        <View style={styles.stats}>
          <Stat number={tasks.length} label="TASKS" />
          <Stat number="3.8" label="GPA" />
          <Stat number="5" label="COURSES" />
        </View>

        <Text style={styles.settingsTitle}>Settings & Preferences</Text>

        <SettingRow icon="notifications-outline" label="Notifications" onPress={() => Alert.alert("Notifications", "Notifications are enabled for this demo.")} />
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}><Ionicons name="sunny-outline" size={22} color={COLORS.blue} /></View>
          <Text style={styles.settingLabel}>App Theme</Text>
          <Switch value={darkMode} onValueChange={onToggleTheme} trackColor={{ false: "#B8C0D0", true: COLORS.blue }} />
        </View>
        <SettingRow icon="help-circle-outline" label="Help & Support" onPress={() => Alert.alert("Help & Support", "PlanWise support is available in this project demo.")} />
        <SettingRow icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => Alert.alert("Privacy Policy", "Your demo data is stored only in app memory.")} />

        <Pressable style={styles.logout} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
          <Text style={styles.logoutText}>LOG OUT</Text>
        </Pressable>

        <View style={styles.focusCard}>
          <Text style={styles.focusSmall}>WEEKLY FOCUS</Text>
          <Text style={styles.focusBig}>Deep Work: 18h</Text>
          <View style={styles.wave}>
            <View style={styles.waveA} />
            <View style={styles.waveB} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ number, label }: { number: string | number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.settingRow} onPress={onPress}>
      <View style={styles.settingIcon}><Ionicons name={icon} size={22} color={COLORS.blue} /></View>
      <Text style={styles.settingLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={21} color="#B7C0CA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  darkScreen: { backgroundColor: "#111820" },
  content: { padding: 20, paddingBottom: 30 },
  profileCard: { backgroundColor: "#0967BC", minHeight: 230, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  avatar: { width: 100, height: 100, borderRadius: 13, backgroundColor: "#FFFDFC", alignItems: "center", justifyContent: "center" },
  edit: { position: "absolute", top: 95, marginLeft: 82, width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.blue, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#0967BC" },
  name: { color: "white", fontSize: 27, fontWeight: "800", marginTop: 15 },
  email: { color: "#D9E9FB", fontSize: 15, marginTop: 3 },
  stats: { flexDirection: "row", gap: 12, marginTop: 22 },
  stat: { flex: 1, minHeight: 88, borderRadius: 9, backgroundColor: "#F7F4F3", alignItems: "center", justifyContent: "center" },
  statNumber: { fontSize: 26, color: COLORS.blue, fontWeight: "800" },
  statLabel: { fontSize: 11, color: COLORS.text, marginTop: 3 },
  settingsTitle: { color: COLORS.text, fontSize: 14, fontWeight: "600", marginTop: 27, marginBottom: 9 },
  settingRow: { minHeight: 52, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#EEEDEE", flexDirection: "row", alignItems: "center", paddingHorizontal: 12 },
  settingIcon: { width: 40, height: 40, borderRadius: 7, backgroundColor: "#E7F1FD", alignItems: "center", justifyContent: "center", marginRight: 13 },
  settingLabel: { flex: 1, color: COLORS.ink, fontSize: 15 },
  logout: { height: 53, backgroundColor: "#FFF3F1", marginTop: 23, borderRadius: 9, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 },
  logoutText: { color: COLORS.danger, fontWeight: "700", letterSpacing: 1 },
  focusCard: { minHeight: 125, backgroundColor: "#DCE9F7", borderRadius: 13, marginTop: 25, padding: 22, overflow: "hidden" },
  focusSmall: { color: COLORS.text, fontSize: 11, letterSpacing: 1 },
  focusBig: { color: COLORS.ink, fontSize: 21, fontWeight: "800", marginTop: 3 },
  wave: { position: "absolute", right: 18, top: 34, width: 120, height: 65 },
  waveA: { position: "absolute", width: 85, height: 55, borderTopWidth: 4, borderColor: COLORS.blue, borderRadius: 40, transform: [{ rotate: "-18deg" }] },
  waveB: { position: "absolute", left: 55, top: 8, width: 65, height: 50, borderTopWidth: 4, borderColor: COLORS.blue, borderRadius: 40, transform: [{ rotate: "18deg" }] },
});
