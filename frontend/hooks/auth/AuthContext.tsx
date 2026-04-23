import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  tipo: "paciente" | "medico";
};

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStoredAuth() {
      const storedToken = await AsyncStorage.getItem("@vitalgoal:token");
      const storedUser = await AsyncStorage.getItem("@vitalgoal:usuario");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUsuario(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
    loadStoredAuth();
  }, []);

  async function login(newToken: string, newUsuario: Usuario) {
    await AsyncStorage.setItem("@vitalgoal:token", newToken);
    await AsyncStorage.setItem("@vitalgoal:usuario", JSON.stringify(newUsuario));
    setToken(newToken);
    setUsuario(newUsuario);
  }

  async function logout() {
    await AsyncStorage.removeItem("@vitalgoal:token");
    await AsyncStorage.removeItem("@vitalgoal:usuario");
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
