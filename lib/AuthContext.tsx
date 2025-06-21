'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useTeam } from "./TeamContext"; 

type User = {
  email: string;
  password: string;
  username: string;
  teamCode?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, username: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { resetTeam } = useTeam(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("codex-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const existingUser = (JSON.parse(localStorage.getItem("codex-users") || "[]") as User[])
      .find(u => u.email === email && u.password === password);

    if (!existingUser) return false;

    localStorage.setItem("codex-user", JSON.stringify(existingUser));
    setUser(existingUser);
    return true;
  };

  const signup = (email: string, password: string, username: string): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem("codex-users") || "[]");
    if (users.find(u => u.email === email)) return false;

    const newUser: User = { email, password, username, teamCode: undefined };

    localStorage.setItem("codex-users", JSON.stringify([...users, newUser]));
    localStorage.setItem("codex-user", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("codex-user");
    setUser(null);
    resetTeam();
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