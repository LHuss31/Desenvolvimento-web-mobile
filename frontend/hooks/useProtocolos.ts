import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import { apiFetch } from "../lib/api";

export type Protocolo = {
  id: number;
  titulo: string;
  tipo: string | null;
  caloriasTotal: number | null;
  versao: number;
  criadoEm: string;
  conteudoExercicios?: string | any[] | null;
  conteudoDieta?: string | any[] | null;
  medico: { id: number; nome: string };
};

export function useProtocolos() {
  const { token } = useAuth();
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiFetch<Protocolo[]>("/api/protocolos", { token })
      .then(setProtocolos)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [token]);

  return { protocolos, isLoading, error };
}
