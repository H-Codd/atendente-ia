"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { loginUser, registerUser } from "@/services/api";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "atendente-admin-auth";

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as { user: AuthUser };
    return parsed.user ?? null;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function AuthGate() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@atendenteia.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    if (mode === "register" && (!name.trim() || name.trim().length < 2)) {
      setError("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (password.trim().length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register(name.trim(), email.trim(), password.trim());
      } else {
        await login(email.trim(), password.trim());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao autenticar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#040404] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">
          Área restrita
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          {mode === "login" ? "Entrar no painel" : "Criar conta"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Faça login ou cadastre-se para acessar o painel administrativo e
          gerenciar usuários.
        </p>

        <div className="mt-6 flex rounded-full border border-white/10 bg-black/20 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 rounded-full px-3 py-2 text-sm transition ${mode === "login" ? "bg-white text-black" : "text-white/70"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 rounded-full px-3 py-2 text-sm transition ${mode === "register" ? "bg-white text-black" : "text-white/70"}`}
          >
            Registrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" ? (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-white/70"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#070707] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                placeholder="Seu nome"
                required={mode === "register"}
              />
            </div>
          ) : null}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/70">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#070707] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-white/70"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#070707] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
              placeholder="Digite sua senha"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? mode === "register"
                ? "Cadastrando..."
                : "Entrando..."
              : mode === "register"
                ? "Criar conta"
                : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.24em] text-white/40">
          Demo: admin@atendenteia.com / admin1234
        </p>
      </div>
    </div>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredSession();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated && user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [isAuthenticated, loading, user]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    const nextUser: AuthUser = {
      id: response.id,
      name: response.name,
      email: response.email ?? email,
      role: response.role ?? "user",
    };

    setUser(nextUser);
    setIsAuthenticated(true);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await registerUser({ name, email, password });
      const nextUser: AuthUser = {
        id: response.id,
        name: response.name,
        email: response.email ?? email,
        role: response.role ?? "user",
      };

      setUser(nextUser);
      setIsAuthenticated(true);
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
    }),
    [isAuthenticated, loading, login, register, logout, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-[#040404] text-sm uppercase tracking-[0.24em] text-white/50">
          Carregando...
        </div>
      ) : isAuthenticated ? (
        children
      ) : (
        <AuthGate />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
