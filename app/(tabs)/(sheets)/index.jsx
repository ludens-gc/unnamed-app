import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const SelectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Suas Fichas</Text>

      <Link href="(sheets)/perimetry" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Perimetria</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.divider} />

      <Link href="(sheets)/exercises" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Exercícios</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default SelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  button: {
    width: '80%',
    backgroundColor: '#60D2F5',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#000',
    marginBottom: 20,
  },
});
