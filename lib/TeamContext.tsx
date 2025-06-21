'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

//Updates user database with new team
const updateUserInList = (updatedUser: any) => {
  const users = JSON.parse(localStorage.getItem("codex-users") || "[]");
  const newUsers = users.map((u: any) =>
    u.email === updatedUser.email ? updatedUser : u
  );
  localStorage.setItem("codex-users", JSON.stringify(newUsers));
};

// Define the shape of a Team object
type Team = {
  name: string;
  difficulty: "beginner" | "advanced";
  code: string; // Unique team identifier
};

// Define the shape of what this context provides
type TeamContextType = {
  team: Team | null;
  createTeam: (name: string, difficulty: "beginner" | "advanced") => boolean;
  joinTeam: (code: string) => boolean;
  resetTeam: () => void; 
};

// Create the actual context
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Utility: generate a 6-character uppercase code
const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// The provider
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.teamCode) return;
    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const found = teams.find(t => t.code === user.teamCode);
    if (found) setTeam(found);
  }, [user]);

  const createTeam = (name: string, difficulty: "beginner" | "advanced"): boolean => {
    if (!user) return false;

    const code = generateCode();
    const newTeam: Team = { name, difficulty, code };

    const existing: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    if (existing.find(t => t.name.toLowerCase() === name.toLowerCase())) return false;
    localStorage.setItem("codex-teams", JSON.stringify([...existing, newTeam]));

    const updatedUser = { ...user, teamCode: code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);

    setTeam(newTeam);
    return true;
  };

  const joinTeam = (code: string): boolean => {
    if (!user) return false;

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const found = teams.find(t => t.code === code.toUpperCase());
    if (!found) return false;

    const updatedUser = { ...user, teamCode: found.code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);

    setTeam(found);
    return true;
  };

  const resetTeam = () => {
    setTeam(null);
  };

  return (
    <TeamContext.Provider value={{ team, createTeam, joinTeam, resetTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within a <TeamProvider>");
  return ctx;
};