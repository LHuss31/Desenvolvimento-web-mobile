import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Anamnese() {
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Anamnese</Text>

      {/* DADOS BÁSICOS */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text>Idade:</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Peso:</Text>
            <TextInput
              style={styles.input}
              value={peso}
              onChangeText={setPeso}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text>Altura:</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>BMI:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cálculo automático"
              editable={false}
            />
          </View>
        </View>
      </View>

      {/* HISTÓRICO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Histórico de saúde</Text>

        <View style={styles.checkboxGrid}>
          {[
            "Hipertensão",
            "Diabetes",
            "Doença cardíaca",
            "Colesterol alto",
            "Problemas ortopédicos",
          ].map((item, i) => (
            <Text key={i}>☑ {item}</Text>
          ))}
        </View>

        <Text style={styles.label}>Outro (especificar):</Text>
        <TextInput style={styles.inputLarge} />

        <Text style={styles.label}>Alergias:</Text>
        <TextInput
          style={styles.inputLarge}
          placeholder="Camarão, Amendoim..."
        />
      </View>

      {/* ESTILO DE VIDA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Estilo de Vida</Text>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text>Média de horas (sono):</Text>
            <TextInput style={styles.input} placeholder="8h" />
          </View>

          <View style={styles.inputGroup}>
            <Text>Atividade física:</Text>
            <Text>☑ Sedentário</Text>
            <Text>☑ Leve</Text>
            <Text>☑ Moderado</Text>
            <Text>☑ Intenso</Text>
          </View>
        </View>

        <Text style={styles.label}>Alimentação:</Text>
        <Text>☑ Vegetariana</Text>
        <Text>☑ Vegana</Text>
        <Text>☑ Low carb</Text>

        <Text style={styles.label}>Hábitos:</Text>
        <Text>☑ Não fumo</Text>
        <Text>☑ Socialmente</Text>
      </View>

      {/* OBJETIVO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Seus Objetivos</Text>
        <TextInput
          style={styles.inputLarge}
          placeholder="Descreva seu objetivo com a consulta"
        />
      </View>

      {/* UPLOAD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Arquivos</Text>
        <View style={styles.uploadBox}>
          <Text>Clique para ou arraste arquivos</Text>
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Anamnese</Text>
      </TouchableOpacity>
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

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  inputGroup: {
    flex: 1,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  inputLarge: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  label: {
    marginTop: 10,
    fontWeight: "500",
  },

  checkboxGrid: {
    marginBottom: 10,
    gap: 5,
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },

  button: {
    backgroundColor: "#19c10f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
