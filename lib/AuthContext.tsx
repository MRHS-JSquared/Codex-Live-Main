'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("codex-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string): boolean => {
    const saved = localStorage.getItem(`codex-${email}`);
    if (!saved) return false;
    const parsed = JSON.parse(saved);
    if (parsed.password !== password) return false;
    localStorage.setItem("codex-user", JSON.stringify({ email }));
    setUser({ email });
    return true;
  };

  const signup = (email: string, password: string): boolean => {
    const exists = localStorage.getItem(`codex-${email}`);
    if (exists) return false;
    localStorage.setItem(`codex-${email}`, JSON.stringify({ password }));
    localStorage.setItem("codex-user", JSON.stringify({ email }));
    setUser({ email });
    return true;
  };

  const logout = () => {
    localStorage.removeItem("codex-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};