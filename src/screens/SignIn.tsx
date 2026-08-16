import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { getThemeColors } from "../theme";
import {
  SignInFormData,
  signInSchema,
} from "../schema/authSchemas";

type SignInProps = {
  onSignIn: (
    credentials: SignInFormData
  ) => void | Promise<void>;

  onShowSignUp: () => void;
  darkMode?: boolean;
};

function friendlyAuthError(error: unknown) {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("invalid") ||
    message.includes("credentials")
  ) {
    return "The email or password is incorrect.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch")
  ) {
    return "Unable to connect. Check your internet connection and try again.";
  }

  return error.message || "Unable to sign in. Please try again.";
}

export function SignIn({
  onSignIn,
  onShowSignUp,
  darkMode = false,
}: SignInProps) {
  const [requestError, setRequestError] = useState("");
  const palette = getThemeColors(darkMode);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (values) => {
    setRequestError("");

    try {
      await onSignIn({
        ...values,
        email: values.email.trim(),
      });
    } catch (error) {
      setRequestError(friendlyAuthError(error));
    }
  });

  return (
    <KeyboardAvoidingView
      style={[
        styles.screen,
        {
          backgroundColor: palette.background,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.brandHeader,
            {
              borderBottomColor: palette.line,
            },
          ]}
        >
          <Text
            style={[
              styles.brand,
              {
                color: palette.ink,
              },
            ]}
          >
            PlanWise
          </Text>

          <View
            style={[
              styles.profileDot,
              {
                backgroundColor: palette.blue,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View
          style={[
            styles.logoBox,
            {
              backgroundColor: palette.blue,
            },
          ]}
        >
          <Ionicons
            name="pulse-outline"
            size={56}
            color="#FFFFFF"
          />
        </View>

        <Text
          style={[
            styles.heading,
            {
              color: palette.ink,
            },
          ]}
        >
          Welcome back
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: palette.text,
            },
          ]}
        >
          Sign in to continue planning your day.
        </Text>

        <View style={styles.form}>
          {requestError ? (
            <View
              style={[
                styles.errorBox,
                {
                  backgroundColor: palette.dangerSoft,
                },
              ]}
              accessibilityRole="alert"
            >
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={palette.danger}
              />

              <Text
                style={[
                  styles.errorText,
                  {
                    color: palette.danger,
                  },
                ]}
              >
                {requestError}
              </Text>
            </View>
          ) : null}

          <Controller
            control={control}
            name="email"
            render={({
              field: {
                onChange,
                onBlur,
                value,
              },
            }) => (
              <AuthField
                label="Email address"
                icon="mail-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                placeholder="name@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                darkMode={darkMode}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: {
                onChange,
                onBlur,
                value,
              },
            }) => (
              <AuthField
                label="Password"
                icon="lock-closed-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                placeholder="Enter your password"
                textContentType="password"
                autoCapitalize="none"
                isPassword
                darkMode={darkMode}
              />
            )}
          />

          <AuthButton
            label="Sign in"
            loading={isSubmitting}
            onPress={submit}
            darkMode={darkMode}
          />

          <View style={styles.registerRow}>
            <Text
              style={[
                styles.registerText,
                {
                  color: palette.text,
                },
              ]}
            >
              Don&apos;t have an account?{" "}
            </Text>

            <Pressable
              onPress={onShowSignUp}
              disabled={isSubmitting}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.registerLink,
                  {
                    color: palette.blue,
                  },
                ]}
              >
                Create one
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 36,
  },

  brandHeader: {
    height: 66,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },

  brand: {
    fontSize: 24,
    fontWeight: "800",
  },

  profileDot: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  logoBox: {
    width: 84,
    height: 84,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 42,
    elevation: 5,
  },

  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 18,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    paddingHorizontal: 20,
  },

  form: {
    paddingHorizontal: 20,
    marginTop: 42,
  },

  errorBox: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  errorText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  registerText: {
    fontSize: 14,
  },

  registerLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});