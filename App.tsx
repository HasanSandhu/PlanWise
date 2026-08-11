import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { Task, ScreenName } from "./src/types";
import { getThemeColors } from "./src/theme";
import { MobileShell } from "./src/components/MobileShell";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { TaskFormScreen } from "./src/screens/TaskFormScreen";
import { CalendarScreen } from "./src/screens/CalendarScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Advanced Macroeconomics Review",
    category: "Study",
    due: "Today, 4:00 PM",
    priority: "High",
    completed: false,
  },
  {
    id: "2",
    title: "Update Project Roadmap",
    category: "Work",
    due: "Tomorrow",
    priority: "Medium",
    completed: false,
  },
  {
    id: "3",
    title: "Weekly Meal Prep",
    category: "Personal",
    due: "Oct 24",
    priority: "Low",
    completed: false,
  },
  {
    id: "4",
    title: "Research Ethics Paper",
    category: "Study",
    due: "Friday",
    priority: "Medium",
    completed: false,
  },
  {
    id: "5",
    title: "Submit Lab Report 4",
    category: "Study",
    due: "Saturday",
    priority: "High",
    completed: false,
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<ScreenName>("Home");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [darkMode, setDarkMode] = useState(false);
  const palette = useMemo(() => getThemeColors(darkMode), [darkMode]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = (task: Task) => {
    setTasks((current) => [task, ...current]);
    setScreen("Tasks");
  };

  const openMainScreen = (next: ScreenName) => {
    setScreen(next);
  };

  const styles = StyleSheet.create({
    browserBackground: {
      flex: 1,
      minHeight: "100vh" as any,
      backgroundColor: palette.background,
      alignItems: "center",
      justifyContent: "center",
    },
    nav: {
      height: 74,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      backgroundColor: palette.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 12,
    },
    navButton: {
      width: 76,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    navLabel: {
      marginTop: 3,
      fontSize: 11,
      color: palette.gray,
    },
    navLabelActive: {
      color: palette.blue,
      fontWeight: "700",
    },
  });

  if (!loggedIn) {
    return (
      <View style={styles.browserBackground}>
        <StatusBar style={darkMode ? "light" : "dark"} />
        <MobileShell darkMode={darkMode}>
          <LoginScreen darkMode={darkMode} onLogin={() => setLoggedIn(true)} />
        </MobileShell>
      </View>
    );
  }

  return (
    <View style={styles.browserBackground}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <MobileShell darkMode={darkMode}>
        {screen === "Home" && (
          <HomeScreen
            tasks={tasks}
            completedCount={completedCount}
            darkMode={darkMode}
            onNavigate={openMainScreen}
          />
        )}

        {screen === "Tasks" && (
          <TasksScreen
            tasks={tasks}
            onToggleTask={toggleTask}
            darkMode={darkMode}
            onNavigate={openMainScreen}
            onAdd={() => setScreen("TaskForm")}
          />
        )}

        {screen === "TaskForm" && (
          <TaskFormScreen
            darkMode={darkMode}
            onNavigate={openMainScreen}
            onCancel={() => setScreen("Tasks")}
            onSave={addTask}
          />
        )}

        {screen === "Calendar" && (
          <CalendarScreen
            tasks={tasks}
            darkMode={darkMode}
            onNavigate={openMainScreen}
            onAdd={() => setScreen("TaskForm")}
          />
        )}

        {screen === "Profile" && (
          <ProfileScreen
            tasks={tasks}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((value) => !value)}
            onLogout={() => {
              setLoggedIn(false);
              setScreen("Home");
            }}
            onNavigate={openMainScreen}
          />
        )}

        {screen !== "TaskForm" && (
          <BottomNav
            current={screen}
            darkMode={darkMode}
            onNavigate={openMainScreen}
          />
        )}
      </MobileShell>
    </View>
  );
}

function BottomNav({
  current,
  darkMode,
  onNavigate,
}: {
  current: ScreenName;
  darkMode: boolean;
  onNavigate: (screen: ScreenName) => void;
}) {
  const palette = getThemeColors(darkMode);
  const items: {
    name: ScreenName;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }[] = [
    { name: "Home", icon: "home-outline", label: "Home" },
    { name: "Calendar", icon: "calendar-outline", label: "Calendar" },
    { name: "Tasks", icon: "clipboard-outline", label: "Tasks" },
    { name: "Profile", icon: "person-circle-outline", label: "Profile" },
  ];

  const navStyles = StyleSheet.create({
    nav: {
      height: 74,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      backgroundColor: palette.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 12,
    },
    navButton: {
      width: 76,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    navLabel: {
      marginTop: 3,
      fontSize: 11,
      color: palette.gray,
    },
    navLabelActive: {
      color: palette.blue,
      fontWeight: "700",
    },
  });

  return (
    <View style={navStyles.nav}>
      {items.map((item) => {
        const active = current === item.name;
        return (
          <Pressable
            key={item.name}
            style={navStyles.navButton}
            onPress={() => onNavigate(item.name)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Ionicons
              name={
                active
                  ? (item.icon.replace(
                      "-outline",
                      "",
                    ) as keyof typeof Ionicons.glyphMap)
                  : item.icon
              }
              size={24}
              color={active ? palette.blue : palette.gray}
            />
            <Text
              style={[navStyles.navLabel, active && navStyles.navLabelActive]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
