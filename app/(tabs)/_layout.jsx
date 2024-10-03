import { Redirect, Tabs } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";

export default function TabsLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Início",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Conta",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(sheets)"
        options={{
          tabBarLabel: "Fichas",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
