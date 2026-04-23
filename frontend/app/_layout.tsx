import { Stack } from "expo-router";
import { AuthProvider } from "../hooks/auth/AuthContext";
import { ModalProvider } from "../hooks/ModalContext";

export default function Layout() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ModalProvider>
    </AuthProvider>
  );
}
