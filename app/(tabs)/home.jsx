import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalContext";

const mockAtendimentos = [
  { id: 1, nome: "Profissional 1" },
  { id: 2, nome: "Profissional 2" },
  { id: 3, nome: "Profissional 3" },
  { id: 4, nome: "Profissional 4" },
];

const mockSolicitacoes = [
  { id: 1, descricao: "Solicitação 1", status: "Aceita" },
  { id: 2, descricao: "Solicitação 2", status: "Aberta" },
  { id: 3, descricao: "Solicitação 3", status: "Recusada" },
  { id: 4, descricao: "Solicitação 4", status: "Aberta" },
];

const UserCard = ({ name, email, objective }) => (
  <View style={styles.userCard}>
    <View style={styles.userAvatar}>
      <Text style={styles.userAvatarText}>👤</Text>
    </View>
    <View>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <Text style={styles.userObjective}>{objective}</Text>
    </View>
  </View>
);

const HomeScreen = () => {
  const { user } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Atendimentos");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (activeTab === "Solicitações") {
      setData(mockSolicitacoes);
    } else {
      setData(mockAtendimentos);
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      <UserCard
        name={user?.name}
        email={user?.email}
        objective={user?.objective}
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Atendimentos" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Atendimentos")}
        >
          <Text style={styles.tabButtonText}>Atendimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Solicitações" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Solicitações")}
        >
          <Text style={styles.tabButtonText}>Solicitações</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {data.map((item) =>
          activeTab === "Atendimentos" ? (
            <TouchableOpacity key={item.id} style={styles.item}>
              <View style={styles.itemAvatar}>
                <Text style={styles.itemAvatarText}>👤</Text>
              </View>
              <Text style={styles.itemText}>{item.nome}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={item.id} style={styles.item}>
              <Text style={styles.itemText}>{item.descricao}</Text>
              <View
                style={[
                  styles.statusBadge,
                  item.status === "Aceita" && styles.statusAceita,
                  item.status === "Aberta" && styles.statusAberta,
                  item.status === "Recusada" && styles.statusRecusada,
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#45B5C4",
    padding: 20,
    marginBottom: 20,
    width: "100%",
  },
  userAvatar: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    padding: 20,
    marginRight: 20,
  },
  userAvatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  userEmail: {
    fontSize: 16,
    color: "#FFF",
  },
  userObjective: {
    fontSize: 16,
    color: "#FFF",
  },
  tabContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#60D2F5",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  listContainer: {
    width: "80%",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemAvatar: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  itemAvatarText: {
    fontSize: 24,
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  statusAceita: {
    backgroundColor: "#4CAF50",
  },
  statusAberta: {
    backgroundColor: "#2196F3",
  },
  statusRecusada: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
