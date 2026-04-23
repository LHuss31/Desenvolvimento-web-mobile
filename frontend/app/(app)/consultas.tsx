import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useModal } from "../../hooks/useModal";
import { useConsultas } from "../../hooks/useConsultas";

export default function Consultas() {
  const { setOpenModal } = useModal();
  const { consultas, isLoading, error } = useConsultas();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#19c10f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar consultas</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Próximas consultas</Text>

      {/* Topo */}
      <View style={styles.topBar}>
        <TextInput placeholder="Pesquisar Consulta" style={styles.search} />

        <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      {consultas.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>Nenhuma consulta agendada</Text>
        </View>
      ) : (
        consultas.map((consulta) => (
          <View key={consulta.id} style={styles.card}>
            <Text style={styles.header}>{consulta.paciente.nome}</Text>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Data / Horário</Text>
                <Text>
                  {new Date(consulta.dataHora).toLocaleDateString("pt-BR")} -{" "}
                  {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <View>
                <Text style={styles.label}>Status pagamento</Text>
                <Text
                  style={
                    consulta.statusPagamento === "Aprovado"
                      ? styles.approved
                      : styles.pending
                  }
                >
                  {consulta.statusPagamento}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Tipo</Text>
                <Text>{consulta.tipo}</Text>
              </View>

              <View>
                <Text style={styles.label}>Status</Text>
                <Text>{consulta.status}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#19c10f",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  header: {
    fontWeight: "600",
    marginBottom: 15,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    color: "#666",
    marginBottom: 5,
    fontSize: 12,
  },

  pending: {
    color: "orange",
    fontWeight: "bold",
  },

  approved: {
    color: "green",
    fontWeight: "bold",
  },

  emptyText: {
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
