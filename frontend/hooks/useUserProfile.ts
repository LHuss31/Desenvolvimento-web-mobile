import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import { apiFetch } from "../lib/api";

export type UserProfile = {
  id: number;
  nome: string;
  email: string;
  tipo: "paciente" | "medico";
  telefone: string | null;
  fotoUrl: string | null;
  criadoEm: string;
};

export function useUserProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiFetch<UserProfile>("/api/users/me", { token })
      .then(setProfile)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [token]);

  return { profile, isLoading, error };
}
