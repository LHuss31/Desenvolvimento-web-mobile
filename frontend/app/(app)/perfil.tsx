import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserProfile } from "../../hooks/useUserProfile";

export default function Perfil() {
  const [tab, setTab] = useState("dados");
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#19c10f" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar perfil</Text>
      </View>
    );
  }

  const tipoLabel = profile.tipo === "paciente" ? "Paciente" : "Médico";

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />

        <View>
          <Text style={styles.name}>{profile.nome}</Text>
          <Text style={styles.sub}>{tipoLabel}</Text>
          <Text style={styles.sub}>{profile.email}</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setTab("dados")}>
            <Text style={tab === "dados" ? styles.activeTab : styles.tab}>
              Dados pessoais
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("historico")}>
            <Text style={styles.tab}>Histórico de saúde</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("metas")}>
            <Text style={styles.tab}>Metas</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        {tab === "dados" && (
          <>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Nome Completo</Text>
                <Text style={styles.value}>{profile.nome}</Text>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Tipo</Text>
                <Text style={styles.value}>{tipoLabel}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profile.email}</Text>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Telefone</Text>
                <Text style={styles.value}>
                  {profile.telefone || "Não informado"}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.fullWidth}>
                <Text style={styles.label}>Membro desde</Text>
                <Text style={styles.value}>
                  {new Date(profile.criadoEm).toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </View>
          </>
        )}

        {tab === "historico" && (
          <Text style={styles.placeholder}>Seção não implementada</Text>
        )}

        {tab === "metas" && (
          <Text style={styles.placeholder}>Seção não implementada</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#19c10f",
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  sub: {
    color: "#666",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },

  tab: {
    color: "#999",
    fontSize: 13,
  },

  activeTab: {
    color: "#19c10f",
    fontWeight: "bold",
    fontSize: 13,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },

  halfWidth: {
    flex: 1,
  },

  fullWidth: {
    flex: 1,
  },

  label: {
    color: "#999",
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  placeholder: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 20,
  },

  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
