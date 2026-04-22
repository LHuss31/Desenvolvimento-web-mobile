import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Inicio() {
  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Bem-vindo, Nome!!!</Text>

      {/* Cards topo */}
      <View style={styles.cardsContainer}>
        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Próxima consulta</Text>
          <Text style={styles.cardValue}>17/12/2025</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Link para a consulta</Text>
          <Text style={styles.link}>Entrar na chamada</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Protocolos ativos</Text>
          <Text style={styles.cardValue}>3</Text>
        </View>
      </View>

      {/* CONSULTAS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Consultas</Text>

        <View style={styles.rowHeader}>
          <Text>Data</Text>
          <Text>Doutor</Text>
          <Text>Tipo</Text>
          <Text>Status</Text>
          <Text>Ação</Text>
        </View>

        <View style={styles.row}>
          <Text>17-12-2025</Text>
          <Text>Dr. Emily Carter</Text>
          <Text style={styles.tag}>Ativo</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "75%" }]} />
          </View>
          <Text style={styles.link}>Entrar na chamada</Text>
        </View>

        <View style={styles.row}>
          <Text>17-10-2025</Text>
          <Text>Dr. Casa</Text>
          <Text style={styles.tag}>Async</Text>
          <Text style={styles.completed}>Completo</Text>
          <Text style={styles.link}>Ver Detalhes</Text>
        </View>

        <View style={styles.row}>
          <Text>09-09-2025</Text>
          <Text>Dr. Carlos Chagas</Text>
          <Text style={styles.tag}>Async</Text>
          <Text style={styles.completed}>Completo</Text>
          <Text style={styles.link}>Ver Detalhes</Text>
        </View>
      </View>

      {/* PROTOCOLOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Protocolos</Text>

        <View style={styles.rowHeader}>
          <Text>Data envio</Text>
          <Text>Médico</Text>
          <Text>Tipo</Text>
          <Text>Ação</Text>
        </View>

        <View style={styles.row}>
          <Text>17-12-2025</Text>
          <Text>Dr. Emily Carter</Text>
          <Text>Fortalecimento</Text>
          <Text>👁️ ⬇️</Text>
        </View>

        <View style={styles.row}>
          <Text>17-10-2025</Text>
          <Text>Dr. Casa</Text>
          <Text>Dieta</Text>
          <Text>👁️ ⬇️</Text>
        </View>

        <View style={styles.row}>
          <Text>09-09-2025</Text>
          <Text>Dr. Carlos Chagas</Text>
          <Text>Hipertrofia</Text>
          <Text>👁️ ⬇️</Text>
        </View>
      </View>

      {/* PAGAMENTOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Histórico Pagamento</Text>

        <View style={styles.rowHeader}>
          <Text>Data envio</Text>
          <Text>Descrição</Text>
          <Text>Valor</Text>
          <Text>Status</Text>
        </View>

        <View style={styles.row}>
          <Text>17-12-2025</Text>
          <Text>Dr. Emily Carter</Text>
          <Text>R$100.00</Text>
          <Text style={styles.success}>Concluído</Text>
        </View>

        <View style={styles.row}>
          <Text>17-10-2025</Text>
          <Text>Dr. Casa</Text>
          <Text>R$100.00</Text>
          <Text style={styles.pending}>Aguardando</Text>
        </View>

        <View style={styles.row}>
          <Text>09-09-2025</Text>
          <Text>Dr. Carlos Chagas</Text>
          <Text>R$100.00</Text>
          <Text style={styles.pending}>Aguardando</Text>
        </View>
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

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cardsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },

  cardSmall: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  cardTitle: {
    color: "#666",
    marginBottom: 10,
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  link: {
    color: "#1a73e8",
    fontWeight: "600",
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  progressBar: {
    width: 80,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },

  progress: {
    height: 6,
    backgroundColor: "#19c10f",
    borderRadius: 10,
  },

  completed: {
    color: "green",
  },

  success: {
    color: "green",
    fontWeight: "bold",
  },

  pending: {
    color: "orange",
  },
});
