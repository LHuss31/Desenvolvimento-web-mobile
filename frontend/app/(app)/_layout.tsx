import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";
import Sidebar from "../../components/sidebar";

export default function AppLayout() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#19c10f" />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  const [openSidebar, setOpenSidebar] = useState(true);

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {openSidebar && <Sidebar onOpenModal={() => setOpenModal(true)} />}

      <View style={styles.content}>
        {/* Toggle */}
        <TouchableOpacity
          onPress={() => setOpenSidebar(!openSidebar)}
          style={styles.toggle}
        >
          <Text>☰</Text>
        </TouchableOpacity>

        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* 🔥 MODAL GLOBAL */}
      <Modal visible={openModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Text style={styles.title}>Nova Consulta</Text>

                <View style={styles.grid}>
                  {["Dr. Anda", "Dr. Ken", "Dr. Ru", "Dr. Opeor"].map(
                    (doc, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.card,
                          selectedDoctor === doc && styles.selectedCard,
                        ]}
                        onPress={() => setSelectedDoctor(doc)}
                      >
                        <Text>{doc}</Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenModal(false);
                      setStep(1);
                    }}
                  >
                    <Text>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Text style={styles.title}>{selectedDoctor}</Text>

                <Text style={{ marginTop: 10 }}>Horários disponíveis</Text>

                <View style={styles.times}>
                  {["08:00", "10:00", "14:00", "16:00", "18:00"].map(
                    (time, i) => (
                      <TouchableOpacity key={i} style={styles.timeButton}>
                        <Text style={{ color: "#fff" }}>{time}</Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => setStep(1)}>
                    <Text>Voltar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setOpenModal(false);
                      setStep(1);
                    }}
                  >
                    <Text style={styles.buttonText}>Agendar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  toggle: {
    padding: 10,
  },

  /* MODAL */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },

  card: {
    width: "45%",
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  selectedCard: {
    backgroundColor: "#d4f7d4",
  },

  times: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
  },

  timeButton: {
    backgroundColor: "#19c10f",
    padding: 10,
    borderRadius: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#19c10f",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
