import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "./auth/useAuth";
import type { AnamneseMedico } from "./useAnamneses";

export function useAnamnesePaciente(pacienteId: number | null) {
  const { token } = useAuth();
  const [anamnese, setAnamnese] = useState<AnamneseMedico | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !pacienteId) return;

    setIsLoading(true);
    setError(null);

    // Reutiliza o GET /anamneses que retorna a lista do médico
    // e filtra pelo pacienteId localmente para evitar endpoint extra
    apiFetch<AnamneseMedico[]>("/api/anamneses", { token })
      .then((lista) => {
        const found = lista.find((a) => a.pacienteId === pacienteId) ?? null;
        setAnamnese(found);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [token, pacienteId]);

  return { anamnese, isLoading, error };
}
