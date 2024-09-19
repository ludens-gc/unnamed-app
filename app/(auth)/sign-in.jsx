import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useGlobalContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("<ip>:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message);
        return;
      }

      const data = await response.json();
      console.log(data);
      login(data.user);
      router.replace("(tabs)/home");
    } catch (error) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/sign-up" asChild>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafcfd",
    padding: 20,
  },
  logoContainer: {
    width: 200,
    height: 200,
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
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#080b0c",
    marginBottom: 5,
    marginLeft: 20,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#080b0c",
    borderWidth: 1,
    backgroundColor: "#e7e9ea",
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  loginButton: {
    width: "60%",
    backgroundColor: "#54d1f0",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fafcfd",
  },
  registerButton: {
    width: "60%",
    backgroundColor: "#d5d7d8",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#080b0c",
  },
});
