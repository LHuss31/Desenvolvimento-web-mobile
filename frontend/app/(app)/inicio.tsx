import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";
import { useConsultas } from "../../hooks/useConsultas";
import { useProtocolos } from "../../hooks/useProtocolos";
import { usePagamentos } from "../../hooks/usePagamentos";

export default function Inicio() {
  const { usuario } = useAuth();
  const { consultas, isLoading: loadingConsultas, error: errorConsultas } = useConsultas();
  const { protocolos, isLoading: loadingProtocolos, error: errorProtocolos } = useProtocolos();
  const { pagamentos, isLoading: loadingPagamentos, error: errorPagamentos } = usePagamentos();

  const isLoading = loadingConsultas || loadingProtocolos || loadingPagamentos;
  const hasError = errorConsultas || errorProtocolos || errorPagamentos;

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#19c10f" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar dados. Tente novamente.</Text>
      </View>
    );
  }

  const proximaConsulta = consultas[0];
  const protocolosAtivos = protocolos.length;

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Bem-vindo, {usuario?.nome}!</Text>

      {/* Cards topo */}
      <View style={styles.cardsContainer}>
        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Próxima consulta</Text>
          <Text style={styles.cardValue}>
            {proximaConsulta
              ? new Date(proximaConsulta.dataHora).toLocaleDateString("pt-BR")
              : "—"}
          </Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Link para a consulta</Text>
          <Text style={styles.link}>{proximaConsulta?.linkMeet ? "Entrar na chamada" : "—"}</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Protocolos ativos</Text>
          <Text style={styles.cardValue}>{protocolosAtivos}</Text>
        </View>
      </View>

      {/* CONSULTAS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Consultas</Text>

        {consultas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma consulta encontrada</Text>
        ) : (
          <>
            <View style={styles.rowHeader}>
              <Text>Data</Text>
              <Text>Paciente</Text>
              <Text>Tipo</Text>
              <Text>Status</Text>
            </View>

            {consultas.map((consulta) => (
              <View key={consulta.id} style={styles.row}>
                <Text>{new Date(consulta.dataHora).toLocaleDateString("pt-BR")}</Text>
                <Text>{consulta.paciente.nome}</Text>
                <Text style={styles.tag}>{consulta.tipo}</Text>
                <Text style={getStatusStyle(consulta.status)}>{consulta.status}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* PROTOCOLOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Protocolos</Text>

        {protocolos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum protocolo encontrado</Text>
        ) : (
          <>
            <View style={styles.rowHeader}>
              <Text>Data envio</Text>
              <Text>Médico</Text>
              <Text>Tipo</Text>
              <Text>Versão</Text>
            </View>

            {protocolos.map((protocolo) => (
              <View key={protocolo.id} style={styles.row}>
                <Text>{new Date(protocolo.criadoEm).toLocaleDateString("pt-BR")}</Text>
                <Text>{protocolo.medico.nome}</Text>
                <Text>{protocolo.tipo || "—"}</Text>
                <Text>v{protocolo.versao}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* PAGAMENTOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Histórico Pagamento</Text>

        {pagamentos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum pagamento encontrado</Text>
        ) : (
          <>
            <View style={styles.rowHeader}>
              <Text>Data</Text>
              <Text>Descrição</Text>
              <Text>Valor</Text>
              <Text>Status</Text>
            </View>

            {pagamentos.map((pagamento) => (
              <View key={pagamento.id} style={styles.row}>
                <Text>{new Date(pagamento.criadoEm).toLocaleDateString("pt-BR")}</Text>
                <Text>{pagamento.descricao || "Consulta"}</Text>
                <Text>R$ {pagamento.valor.toFixed(2)}</Text>
                <Text style={getPaymentStatusStyle(pagamento.status)}>{pagamento.status}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

function getStatusStyle(status: string) {
  if (status === "Concluído") return styles.success;
  if (status === "Pendente") return styles.pending;
  return styles.tag;
}

function getPaymentStatusStyle(status: string) {
  if (status === "Concluído") return styles.success;
  if (status === "Pendente") return styles.pending;
  return styles.tag;
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
    fontWeight: "600",
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

  success: {
    color: "green",
    fontWeight: "bold",
  },

  pending: {
    color: "orange",
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
