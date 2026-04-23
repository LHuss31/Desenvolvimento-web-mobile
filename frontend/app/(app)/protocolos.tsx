import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProtocolos } from "../../hooks/useProtocolos";

export default function Protocolos() {
  const { protocolos, isLoading, error } = useProtocolos();
  const [selected, setSelected] = useState(0);

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
        <Text style={styles.errorText}>Erro ao carregar protocolos</Text>
      </View>
    );
  }

  if (protocolos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Nenhum protocolo encontrado</Text>
      </View>
    );
  }

  const protocoloSelecionado = protocolos[selected];

  const renderExercicios = () => {
    if (!protocoloSelecionado.conteudoExercicios) return null;

    let exercicios = protocoloSelecionado.conteudoExercicios;
    if (typeof exercicios === "string") {
      try {
        exercicios = JSON.parse(exercicios);
      } catch {
        return <Text style={styles.text}>{exercicios}</Text>;
      }
    }

    if (!Array.isArray(exercicios) || exercicios.length === 0) return null;

    return (
      <>
        <Text style={styles.section}>Exercícios</Text>
        {exercicios.map((ex, idx) => (
          <View key={idx} style={styles.contentItem}>
            <Text style={styles.contentTitle}>• {ex.nome}</Text>
            {ex.series && <Text style={styles.contentText}>  Séries: {ex.series}</Text>}
            {ex.duracao && <Text style={styles.contentText}>  Duração: {ex.duracao}</Text>}
            {ex.frequencia && <Text style={styles.contentText}>  Frequência: {ex.frequencia}</Text>}
            {ex.carga && <Text style={styles.contentText}>  Carga: {ex.carga}</Text>}
          </View>
        ))}
      </>
    );
  };

  const renderDieta = () => {
    if (!protocoloSelecionado.conteudoDieta) return null;

    let dieta = protocoloSelecionado.conteudoDieta;
    if (typeof dieta === "string") {
      try {
        dieta = JSON.parse(dieta);
      } catch {
        return <Text style={styles.text}>{dieta}</Text>;
      }
    }

    if (!Array.isArray(dieta) || dieta.length === 0) return null;

    return (
      <>
        <Text style={styles.section}>Dieta</Text>
        {dieta.map((item, idx) => (
          <View key={idx} style={styles.contentItem}>
            <Text style={styles.contentTitle}>
              • {item.refeicao || "Refeição"}
            </Text>
            {item.descricao && (
              <Text style={styles.contentText}>  {item.descricao}</Text>
            )}
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* LADO ESQUERDO */}
      <View style={styles.left}>
        <Text style={styles.title}>Meus protocolos</Text>

        <TextInput placeholder="Pesquisar Protocolo" style={styles.search} />

        <ScrollView>
          {protocolos.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, selected === index && styles.selectedCard]}
              onPress={() => setSelected(index)}
            >
              <Text style={styles.cardTitle}>{item.titulo}</Text>

              <Text style={styles.cardText}>
                Criado em: {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
              </Text>
              <Text style={styles.cardText}>Doutor: {item.medico.nome}</Text>
              <Text style={styles.cardText}>Versão: {item.versao}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* DIVISOR */}
      <View style={styles.divider} />

      {/* LADO DIREITO */}
      <View style={styles.right}>
        <ScrollView>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>{protocoloSelecionado.titulo}</Text>

            <Text style={styles.doctorText}>Doutor: {protocoloSelecionado.medico.nome}</Text>

            {protocoloSelecionado.tipo && (
              <Text style={styles.typeText}>Tipo: {protocoloSelecionado.tipo}</Text>
            )}

            {renderExercicios()}

            {renderDieta()}

            {protocoloSelecionado.caloriasTotal && (
              <Text style={styles.total}>
                Total de calorias: {protocoloSelecionado.caloriasTotal} kcal
              </Text>
            )}

            <Text style={styles.createdText}>
              Criado em: {new Date(protocoloSelecionado.criadoEm).toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.createdText}>
              Versão: {protocoloSelecionado.versao}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },

  left: {
    width: 300,
  },

  right: {
    flex: 1,
    paddingLeft: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  selectedCard: {
    backgroundColor: "#d4f7d4",
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },

  cardText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },

  divider: {
    width: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 15,
  },

  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  doctorText: {
    marginBottom: 8,
    fontSize: 14,
    color: "#333",
  },

  typeText: {
    marginBottom: 15,
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
  },

  section: {
    marginTop: 18,
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 15,
    color: "#19c10f",
  },

  contentItem: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#19c10f",
  },

  contentTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#333",
    marginBottom: 4,
  },

  contentText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  text: {
    marginTop: 5,
    fontSize: 13,
    color: "#333",
  },

  total: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 15,
    color: "#19c10f",
    backgroundColor: "#f0f9f0",
    padding: 12,
    borderRadius: 8,
  },

  createdText: {
    marginTop: 10,
    fontSize: 12,
    color: "#999",
  },

  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },

  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
});
