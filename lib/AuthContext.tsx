'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the structure of a User object
type User = {
  email: string;
  password: string;
  username: string;
};

// Define what values and functions our AuthContext will provide
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, username: string) => boolean;
  logout: () => void;
};

// Create a context with that shape, initially undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The AuthProvider wraps your whole app and manages the auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // On app load, check if someone is already logged in and restore their session
  useEffect(() => {
    const storedUser = localStorage.getItem("codex-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function: check if email/password match an existing user
  const login = (email: string, password: string): boolean => {
    //Looks through all users and find user with inputted info
    const existingUser = (JSON.parse(localStorage.getItem("codex-users") || "[]") as User[])
    .find(u => u.email === email && u.password === password);

    if (!existingUser) return false;

    //Logs in
    localStorage.setItem("codex-user", JSON.stringify(existingUser));
    setUser(existingUser);
    return true;
  };

  // Signup function: add a new user if email not taken
  const signup = (email: string, password: string, username: string): boolean => {
    //Caches all users in the database
    const users: User[] = JSON.parse(localStorage.getItem("codex-users") || "[]");

    //If user is found
    if (users.find(u => u.email === email)) return false;

    //Creates a new user
    const newUser: User = { email, password, username };

    //Updates database and sets new user
    localStorage.setItem("codex-users", JSON.stringify([...users, newUser]));
    localStorage.setItem("codex-user", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  // Logout: remove the session and clear state
  const logout = () => {
    localStorage.removeItem("codex-user");
    setUser(null);
  };

  // Provide the user state and auth functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};