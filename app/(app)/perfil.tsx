import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Perfil() {
  const [tab, setTab] = useState("dados");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />

        <View>
          <Text style={styles.name}>Nome Nome</Text>
          <Text style={styles.sub}>30 Anos</Text>
          <Text style={styles.sub}>email@email.com</Text>
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
              <View>
                <Text style={styles.label}>Nome Completo</Text>
                <Text>Nome Nome Nome</Text>
              </View>

              <View>
                <Text style={styles.label}>Idade</Text>
                <Text>30 Anos</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Contato</Text>
                <Text>(+55) 11 981031-0045</Text>
              </View>

              <View>
                <Text style={styles.label}>Email</Text>
                <Text>email@email.com</Text>
              </View>
            </View>
          </>
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
  },

  tab: {
    color: "#999",
  },

  activeTab: {
    color: "#19c10f",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  label: {
    color: "#666",
    marginBottom: 5,
  },
});
