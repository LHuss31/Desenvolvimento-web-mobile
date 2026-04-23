import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { usePathname } from "expo-router";
import { useAuth } from "../hooks/auth/useAuth";
import { useModal } from "../hooks/useModal";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { setOpenModal } = useModal();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  function isActive(route: string) {
    return pathname.includes(route);
  }

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>VitalGoal</Text>

      <TouchableOpacity onPress={() => router.push("/(app)/inicio")}>
        <Text style={[styles.item, isActive("inicio") && styles.active]}>
          Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(app)/anamnese")}>
        <Text style={[styles.item, isActive("anamnese") && styles.active]}>
          Anamnese
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(app)/consultas")}>
        <Text style={[styles.item, isActive("consultas") && styles.active]}>
          Consultas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(app)/protocolos")}>
        <Text style={[styles.item, isActive("protocolos") && styles.active]}>
          Protocolos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(app)/perfil")}>
        <Text style={[styles.item, isActive("perfil") && styles.active]}>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: "#f5f5f5",
    padding: 20,
    height: "100%",
  },

  logo: {
    fontWeight: "bold",
    marginBottom: 20,
  },

  item: {
    marginVertical: 10,
    padding: 8,
    borderRadius: 8,
  },

  active: {
    backgroundColor: "#d4f7d4",
    color: "#19c10f",
    fontWeight: "bold",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#19c10f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center", // 👈 centraliza horizontal
    justifyContent: "center", // 👈 centraliza vertical
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  logoutButton: {
    marginTop: 10,
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
