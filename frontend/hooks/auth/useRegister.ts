import { router } from "expo-router";
import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { useAuth } from "./useAuth";

type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
  tipo: "paciente" | "medico";
};

type RegisterResponse = {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipo: "paciente" | "medico";
  };
};

export function useRegister() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(payload: RegisterPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetch<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await login(data.token, data.usuario);
      router.replace("/(app)/inicio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  }

  return { handleRegister, isLoading, error };
}
