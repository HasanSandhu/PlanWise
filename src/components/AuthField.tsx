import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getThemeColors } from "../theme";

type AuthFieldProps = TextInputProps & {
  label: string;
  error?: string;
  icon: keyof typeof Ionicons.glyphMap;
  darkMode?: boolean;
  isPassword?: boolean;
};

export function AuthField({
  label,
  error,
  icon,
  darkMode = false,
  isPassword = false,
  style,
  ...inputProps
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const palette = getThemeColors(darkMode);

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: palette.text }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: darkMode ? "#182230" : "#FFFFFF",
            borderColor: error
              ? palette.danger
              : darkMode
                ? "#3E4E63"
                : "#D5D9E0",
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={21}
          color={darkMode ? "#9BA8B6" : "#74818F"}
        />

        <TextInput
          {...inputProps}
          style={[styles.input, { color: palette.ink }, style]}
          placeholderTextColor={
            darkMode ? "#8A98A8" : "#9BA8B6"
          }
          secureTextEntry={isPassword && !passwordVisible}
        />

        {isPassword && (
          <Pressable
            onPress={() =>
              setPasswordVisible((visible) => !visible)
            }
            accessibilityRole="button"
            accessibilityLabel={
              passwordVisible ? "Hide password" : "Show password"
            }
          >
            <Ionicons
              name={
                passwordVisible
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color={darkMode ? "#AEBAC8" : "#65717D"}
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={[styles.error, { color: palette.danger }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 17,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },

  inputWrap: {
    minHeight: 52,
    borderWidth: 1.5,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },

  input: {
    flex: 1,
    minHeight: 48,
    fontSize: 15,
  },

  error: {
    fontSize: 13,
    marginTop: 5,
  },
});