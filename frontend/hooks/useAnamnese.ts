import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "./auth/useAuth";

export type AnamnesePaciente = {
  id: number;
  pacienteId: number;
  idade: number | null;
  peso: string | null;
  altura: string | null;
  bmi: string | null;
  condicoesSaude: string[] | null;
  alergias: string | null;
  horasSono: string | null;
  nivelAtividade: string | null;
  tipoAlimentacao: string[] | null;
  habitos: string[] | null;
  objetivo: string | null;
  criadoEm: string;
  atualizadoEm: string;
};

export type AnamneseSubmitInput = {
  idade?: number | null;
  peso?: number | null;
  altura?: number | null;
  condicoesSaude?: string[] | null;
  alergias?: string | null;
  horasSono?: number | null;
  nivelAtividade?: "sedentario" | "leve" | "moderado" | "intenso" | null;
  tipoAlimentacao?: string[] | null;
  habitos?: string[] | null;
  objetivo?: string | null;
};

export function useAnamnese() {
  const { token } = useAuth();
  const [anamnese, setAnamnese] = useState<AnamnesePaciente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiFetch<AnamnesePaciente | null>("/api/anamneses", { token })
      .then(setAnamnese)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [token]);

  const submit = useCallback(
    async (data: AnamneseSubmitInput): Promise<boolean> => {
      if (!token) return false;
      setIsSubmitting(true);
      setError(null);
      try {
        await apiFetch("/api/anamneses", {
          method: "POST",
          token,
          body: JSON.stringify(data),
        });

        // Rebusca a anamnese atualizada do servidor
        const atualizada = await apiFetch<AnamnesePaciente | null>(
          "/api/anamneses",
          { token },
        );
        setAnamnese(atualizada);

        return true;
      } catch (e: any) {
        setError(e.message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [token],
  );

  return { anamnese, isLoading, isSubmitting, error, submit };
}
