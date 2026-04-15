import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Sidebar from "../../components/sidebar";

export default function AppLayout() {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {open && <Sidebar />}

      <View style={styles.content}>
        {/* Botão de toggle */}
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.toggle}>
          <Text>☰</Text>
        </TouchableOpacity>

        <Stack screenOptions={{ headerShown: false }} />
      </View>
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
});
