'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
};

// Create the actual context (initially undefined)
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Utility: generate a 6-character uppercase code
const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// This is the provider that wraps your app
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const { user } = useAuth(); // Get the current logged-in user

  // On mount, try to load team from localStorage if the user has one
  useEffect(() => {
    if (!user) setTeam(null);
    if (!user?.teamCode) return;

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const found = teams.find(t => t.code === user.teamCode);
    if (found) setTeam(found);
  }, [user]);

  // Create a new team and assign it to the current user
  const createTeam = (name: string, difficulty: "beginner" | "advanced"): boolean => {
    if (!user) return false;

    const code = generateCode();
    const newTeam: Team = { name, difficulty, code };

    // Save new team to localStorage
    const existing: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    if (existing.find(t => t.name.toLowerCase() === name.toLowerCase())) return false;
    localStorage.setItem("codex-teams", JSON.stringify([...existing, newTeam]));

    // Update the user's teamCode and persist it
    const updatedUser = { ...user, teamCode: code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);


    // Set the new team in memory
    setTeam(newTeam);

    return true;
  };

  // Join an existing team by code
  const joinTeam = (code: string): boolean => {
    if (!user) return false;

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const found = teams.find(t => t.code === code.toUpperCase());
    if (!found) return false;

    // Assign teamCode to the user and save
    const updatedUser = { ...user, teamCode: found.code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);


    setTeam(found);
    return true;
  };


  return (
    <TeamContext.Provider value={{ team, createTeam, joinTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// Hook to access team context easily in any component
export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within a <TeamProvider>");
  return ctx;
};