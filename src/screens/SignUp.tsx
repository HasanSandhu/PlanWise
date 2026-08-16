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
  SignUpFormData,
  signUpSchema,
} from "../auth/authSchemas";

type SignUpCredentials = Omit<
  SignUpFormData,
  "confirmPassword"
>;

type SignUpProps = {
  onSignUp: (
    credentials: SignUpCredentials
  ) => void | Promise<void>;

  onShowSignIn: () => void;
  darkMode?: boolean;
};

function friendlyRegistrationError(error: unknown) {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("already") ||
    message.includes("registered")
  ) {
    return "An account with this email already exists.";
  }

  if (
    message.includes("password") ||
    message.includes("weak")
  ) {
    return "The password is too weak. Please choose a stronger password.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch")
  ) {
    return "Unable to connect. Check your internet connection and try again.";
  }

  return (
    error.message ||
    "Unable to create your account. Please try again."
  );
}

export function SignUp({
  onSignUp,
  onShowSignIn,
  darkMode = false,
}: SignUpProps) {
  const [requestError, setRequestError] = useState("");
  const palette = getThemeColors(darkMode);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = handleSubmit(
    async ({
      email,
      password,
    }) => {
      setRequestError("");

      try {
        await onSignUp({
          email: email.trim(),
          password,
        });
      } catch (error) {
        setRequestError(
          friendlyRegistrationError(error)
        );
      }
    }
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.screen,
        {
          backgroundColor: palette.background,
        },
      ]}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
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
          <Pressable
            onPress={onShowSignIn}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Back to sign in"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={palette.ink}
            />
          </Pressable>

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

          <View style={styles.headerSpacer} />
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
            name="person-add-outline"
            size={48}
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
          Create account
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: palette.text,
            },
          ]}
        >
          Start organizing your plans in one place.
        </Text>

        <View style={styles.form}>
          {requestError ? (
            <View
              style={[
                styles.errorBox,
                {
                  backgroundColor:
                    palette.dangerSoft,
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
                placeholder="At least 8 characters"
                autoCapitalize="none"
                textContentType="newPassword"
                isPassword
                darkMode={darkMode}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({
              field: {
                onChange,
                onBlur,
                value,
              },
            }) => (
              <AuthField
                label="Confirm password"
                icon="shield-checkmark-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={
                  errors.confirmPassword?.message
                }
                placeholder="Enter the password again"
                autoCapitalize="none"
                textContentType="newPassword"
                isPassword
                darkMode={darkMode}
              />
            )}
          />

          <AuthButton
            label="Create account"
            loading={isSubmitting}
            onPress={submit}
            darkMode={darkMode}
          />

          <View style={styles.loginRow}>
            <Text
              style={[
                styles.loginText,
                {
                  color: palette.text,
                },
              ]}
            >
              Already registered?{" "}
            </Text>

            <Pressable
              onPress={onShowSignIn}
              disabled={isSubmitting}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.loginLink,
                  {
                    color: palette.blue,
                  },
                ]}
              >
                Sign in
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
    fontSize: 22,
    fontWeight: "800",
  },

  headerSpacer: {
    width: 25,
  },

  logoBox: {
    width: 78,
    height: 78,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 28,
    elevation: 5,
  },

  heading: {
    textAlign: "center",
    fontSize: 29,
    fontWeight: "800",
    marginTop: 15,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 4,
    paddingHorizontal: 20,
  },

  form: {
    paddingHorizontal: 20,
    marginTop: 29,
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

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 26,
  },

  loginText: {
    fontSize: 14,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
