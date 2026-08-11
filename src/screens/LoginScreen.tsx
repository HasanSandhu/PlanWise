import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }
    onLogin();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.brandHeader}>
        <Text style={styles.brand}>PlanWise</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={25} color={COLORS.ink} />
          <View style={styles.profileDot}>
            <Ionicons name="person-outline" size={18} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.heroShape} />
      <View style={styles.logoBox}>
        <Ionicons name="pulse-outline" size={58} color="white" />
      </View>

      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subtitle}>Log in to continue your journey.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={22} color="#74818F" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="name@company.com"
            placeholderTextColor="#9BA8B6"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>
          <Pressable onPress={() => Alert.alert("Demo", "Password recovery is a UI demo.")}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </Pressable>
        </View>

        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={22} color="#74818F" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#9BA8B6"
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <Pressable onPress={() => setShowPassword((v) => !v)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={23}
              color="#65717D"
            />
          </Pressable>
        </View>

        <Pressable style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Log In</Text>
          <Ionicons name="arrow-forward" size={22} color="white" />
        </Pressable>

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.or}>OR CONTINUE WITH</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.social} onPress={() => Alert.alert("Demo", "Google login is not connected.")}>
            <Text style={styles.google}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.social} onPress={() => Alert.alert("Demo", "Apple login is not connected.")}>
            <Ionicons name="logo-apple" size={20} color={COLORS.ink} />
            <Text style={styles.socialText}>Apple</Text>
          </Pressable>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Pressable onPress={() => Alert.alert("Demo", "Registration screen can be connected here.")}>
            <Text style={styles.registerLink}>Register Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  brandHeader: {
    height: 66,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEAE9",
    zIndex: 2,
  },
  brand: { fontSize: 24, fontWeight: "800", color: COLORS.ink },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 18 },
  profileDot: {
    width: 34, height: 34, borderRadius: 12, backgroundColor: COLORS.blue,
    alignItems: "center", justifyContent: "center",
  },
  heroShape: {
    position: "absolute", top: 66, right: 0, width: 165, height: 165,
    borderBottomLeftRadius: 165, backgroundColor: "#CFD9E7",
  },
  logoBox: {
    width: 84, height: 84, borderRadius: 16, backgroundColor: COLORS.blue,
    alignItems: "center", justifyContent: "center", alignSelf: "center",
    marginTop: 48, shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }, elevation: 5,
  },
  heading: {
    textAlign: "center", fontSize: 31, fontWeight: "800", color: COLORS.ink, marginTop: 18,
  },
  subtitle: { textAlign: "center", color: COLORS.text, fontSize: 16, marginTop: 4 },
  form: { paddingHorizontal: 20, marginTop: 64 },
  label: { color: COLORS.text, fontSize: 15, marginBottom: 7 },
  inputWrap: {
    height: 52, borderWidth: 1.5, borderColor: "#D5D9E0", borderRadius: 9,
    flexDirection: "row", alignItems: "center", paddingHorizontal: 14, gap: 10,
    backgroundColor: "#FFFFFF",
  },
  input: { flex: 1, fontSize: 15, color: COLORS.ink },
  passwordHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 18,
  },
  forgot: { color: COLORS.blue, fontSize: 14, fontWeight: "600" },
  loginButton: {
    marginTop: 31, height: 51, borderRadius: 8, backgroundColor: COLORS.blue,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    shadowColor: "#000", shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 5 },
  },
  loginText: { color: "white", fontSize: 16, fontWeight: "700" },
  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 27, gap: 14 },
  line: { flex: 1, height: 1.5, backgroundColor: "#D6D9DE" },
  or: { color: "#7B838C", fontSize: 13, letterSpacing: 1.5 },
  socialRow: { flexDirection: "row", gap: 14 },
  social: {
    flex: 1, height: 51, borderRadius: 8, borderWidth: 1, borderColor: "#E0E1E4",
    backgroundColor: "#FAF8F7", flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 9,
  },
  google: { fontSize: 20, fontWeight: "800", color: "#4285F4" },
  socialText: { fontSize: 15, color: COLORS.ink },
  registerRow: { flexDirection: "row", justifyContent: "center", marginTop: 47 },
  registerText: { color: COLORS.text, fontSize: 14 },
  registerLink: { color: COLORS.blue, fontSize: 14, fontWeight: "600" },
});
