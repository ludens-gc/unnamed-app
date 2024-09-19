import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [objective, setObjective] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch('<ip>:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, birthDate, email, password, objective }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message);
        return;
      }

      const data = await response.json();
      Alert.alert(data.message);
      router.replace('(auth)/sign-in');
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={birthDate}
        onChangeText={setBirthDate}
      />

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

      <Text style={styles.label}>Objetivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu objetivo"
        value={objective}
        onChangeText={setObjective}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafcfd',
    padding: 20,
  },
  logoContainer: {
    width: 200,
    height: 100,
    backgroundColor: '#4cadc6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fafcfd',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#080b0c',
    marginBottom: 5,
    marginLeft: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#080b0c',
    borderWidth: 1,
    backgroundColor: '#e7e9ea',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  registerButton: {
    width: '90%',
    backgroundColor: '#54d1f0',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fafcfd',
  },
});
