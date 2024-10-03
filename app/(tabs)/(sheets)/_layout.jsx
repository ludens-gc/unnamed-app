import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SheetsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: " Fichas" }} />
      <Stack.Screen
        name="perimetry"
        options={{ title: " Ficha de Perimetria" }}
      />
      <Stack.Screen
        name="exercises"
        options={{ title: " Fichas de Exercícios" }}
      />
    </Stack>
  );
};

export default SheetsLayout;
