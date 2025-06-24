'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient"; // assumes you created this already
import type { Session } from "@supabase/supabase-js";

// Define the structure of your app-level user
type User = {
  email: string;
  username: string;
  teamCode?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch additional user data (like username/team) from your `users` table
  const fetchUserProfile = async (email: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("username, team_code")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return {
      email,
      username: data.username,
      teamCode: data.team_code ?? undefined,
    };
  };

  // On mount: check session and load user
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session?.user?.email) {
        const profile = await fetchUserProfile(session.user.email);
        if (profile) setUser(profile);
      }
    };

    loadSession();

    // Optional: listen to auth changes (for example after logout in another tab)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user?.email) {
        const profile = await fetchUserProfile(session.user.email);
        if (profile) setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user?.email) return false;

    const profile = await fetchUserProfile(data.user.email);
    if (profile) {
      setUser(profile);
      return true;
    }

    return false;
  };

  // Signup
  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error || !data.user?.email) return false;

    // Insert extra profile info into your `users` table
    const { error: insertError } = await supabase.from("users").insert({
      email,
      username,
      team_code: null,
    });

    if (insertError) {
      console.error("Failed to create user profile:", insertError);
      return false;
    }

    setUser({ email, username, teamCode: undefined });
    return true;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
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