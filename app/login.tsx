import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    console.log(email, senha);
  }

  return (
    <View style={styles.container}>
      {/* Logo / Nome */}
      <Text style={styles.logo}>VitalGoal</Text>

      {/* Texto topo */}
      <Text style={styles.title}>Que bom ter você aqui!</Text>
      <Text style={styles.subtitle}>Faça login para continuar.</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>
        {/* Email */}
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {/* Senha */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Crie uma senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
        {/* Recuperar senha */}
        <Text style={styles.forgot}>Recuperar senha</Text>
        {/* Botão */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text>Ainda não tem uma conta? Criar conta</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ou Continuar com:</Text>
          <View style={styles.line} />
        </View>
        {/* Social */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },

  createAccount: {
    marginTop: 15,
    textAlign: "center",
    color: "#19c10f",
    fontWeight: "500",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 40,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,

    // sombra (web + mobile)
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
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
  },

  forgot: {
    marginTop: 10,
    marginBottom: 15,
    color: "#555",
  },

  button: {
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
    justifyContent: "space-between",
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
