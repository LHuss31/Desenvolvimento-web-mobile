import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function Register() {
  const [tipo, setTipo] = useState<"paciente" | "medico">("paciente");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegister() {
    console.log({ tipo, nome, email, senha });
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>VitalGoal</Text>

      {/* Texto topo */}
      <Text style={styles.title}>
        Esse é o primeiro passo{"\n"}para agendar sua consulta.
      </Text>

      {/* Seletor */}
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setTipo("paciente")}>
          <Text style={tipo === "paciente" ? styles.active : styles.inactive}>
            Paciente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTipo("medico")}>
          <Text style={tipo === "medico" ? styles.active : styles.inactive}>
            Médico
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barra */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            tipo === "paciente" ? { width: "50%" } : { width: "100%" },
          ]}
        />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Criar conta</Text>

        <Text style={styles.label}>Nome completo:</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Crie uma senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        {/* Termos */}
        <Text style={styles.terms}>
          Concordo com os <Text style={styles.link}>Termos e Condições</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(app)/inicio")}
        >
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    position: "absolute",
    top: 50,
    left: 20,
    fontWeight: "bold",
    fontSize: 18,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  switchContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 5,
  },

  active: {
    color: "#19c10f",
    fontWeight: "bold",
  },

  inactive: {
    color: "#999",
  },

  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
  },

  progress: {
    height: 4,
    backgroundColor: "#19c10f",
    borderRadius: 10,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
  },

  terms: {
    marginTop: 10,
    fontSize: 12,
  },

  link: {
    color: "#19c10f",
  },

  button: {
    marginTop: 15,
    backgroundColor: "#19c10f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
  },

  socialContainer: {
    flexDirection: "row",
  },

  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#19c10f",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
});
