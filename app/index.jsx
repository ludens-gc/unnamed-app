import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalContext";

const Onboarding = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <Text style={styles.infoText}>Um texto qualquer</Text>

      <Link href="/sign-in" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafcfd",
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: "95%",
    height: 300,
    backgroundColor: "#4cadc6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fafcfd",
  },
  infoText: {
    fontSize: 18,
    color: "#080b0c",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#54d1f0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fafcfd",
  },
});
