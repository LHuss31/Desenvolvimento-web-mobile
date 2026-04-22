import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Protocolos() {
  const [selected, setSelected] = useState(0);

  const protocolos = [
    {
      titulo: "Ganho de massa - Davi",
      data: "28/10",
      doutor: "Lucas Omejor",
      conteudo: "Musculação 5x/semana + dieta rica em proteínas",
    },
    {
      titulo: "Perda de Peso - Marcel",
      data: "03/08",
      doutor: "Lucas Omejor",
      conteudo: "Cardio + déficit calórico",
    },
    {
      titulo: "Comer melhor - Pedro",
      data: "02/03",
      doutor: "Lucas Omejor",
      conteudo: "Reeducação alimentar",
    },
  ];

  const protocoloSelecionado = protocolos[selected];

  return (
    <View style={styles.container}>
      {/* LADO ESQUERDO */}
      <View style={styles.left}>
        <Text style={styles.title}>Meus protocolos</Text>

        <TextInput placeholder="Pesquisar Protocolo" style={styles.search} />

        <ScrollView>
          {protocolos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => setSelected(index)}
            >
              <Text style={styles.cardTitle}>{item.titulo}</Text>

              <Text>Criado em: {item.data}</Text>
              <Text>Doutor: {item.doutor}</Text>
              <Text>Versão: 1.0</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* DIVISOR */}
      <View style={styles.divider} />

      {/* LADO DIREITO */}
      <View style={styles.right}>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>
            Título: {protocoloSelecionado.titulo}
          </Text>

          <Text>Doutor: {protocoloSelecionado.doutor}</Text>

          <Text style={styles.section}>Exercício + Dieta</Text>

          <Text style={styles.text}>
            Exercício:
            {"\n"}• musculação 5x na semana
            {"\n"}• corrida 1x na semana
          </Text>

          <Text style={styles.text}>
            Dieta:
            {"\n"}• Café da manhã: ovos + pão
            {"\n"}• Almoço: arroz + frango
            {"\n"}• Lanche: frutas + whey
          </Text>

          <Text style={styles.total}>Total: 2711 calorias</Text>
        </View>
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

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
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

  section: {
    marginTop: 10,
    fontWeight: "600",
  },

  text: {
    marginTop: 5,
  },

  total: {
    marginTop: 15,
    fontWeight: "bold",
  },
});
