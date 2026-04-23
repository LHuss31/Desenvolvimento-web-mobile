import { useState } from "react";
import { useAuth } from "./auth/useAuth";
import { apiFetch } from "../lib/api";

type AgendarConsultaPayload = {
  medicoId: number;
  dataHora: string;
  tipo: "presencial" | "teleconsulta";
};

export function useAgendarConsulta() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function agendar(payload: AgendarConsultaPayload) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFetch("/api/consultas", {
        method: "POST",
        token: token!,
        body: JSON.stringify(payload),
      });
      return result;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Erro ao agendar";
      setError(errorMessage);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return { agendar, isLoading, error };
}
