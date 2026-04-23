import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useModal } from "../../hooks/useModal";

export default function Consultas() {
  const { setOpenModal } = useModal();

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
      <View style={styles.card}>
        <Text style={styles.header}>Nome Medico Especialidade Medico</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Data / Horario</Text>
            <Text>31/10 - 15:00</Text>
          </View>

          <View>
            <Text style={styles.label}>Status pagamento</Text>
            <Text style={styles.pending}>Pendente</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Documentos</Text>
            <TouchableOpacity style={styles.docButton}>
              <Text>Ver documentos</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.label}>Reunião</Text>
            <TouchableOpacity style={styles.meetButton}>
              <Text style={{ color: "#fff" }}>Entrar via meet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* CARD 2 */}
      <View style={styles.card}>
        <Text style={styles.header}>Nome Medico Especialidade Medico</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Data / Horario</Text>
            <Text>05/11 - 15:00</Text>
          </View>

          <View>
            <Text style={styles.label}>Status pagamento</Text>
            <Text style={styles.approved}>Aprovado</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Documentos</Text>
            <TouchableOpacity style={styles.docButton}>
              <Text>Ver documentos</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.label}>Reunião</Text>
            <TouchableOpacity style={styles.meetButton}>
              <Text style={{ color: "#fff" }}>Entrar via meet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    color: "#666",
    marginBottom: 5,
  },

  pending: {
    color: "orange",
    fontWeight: "bold",
  },

  approved: {
    color: "green",
    fontWeight: "bold",
  },

  docButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },

  meetButton: {
    backgroundColor: "#19c10f",
    padding: 8,
    borderRadius: 8,
  },
});
