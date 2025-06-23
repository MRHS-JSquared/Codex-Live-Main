'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// Updates user database with new teamCode
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
  code: string;
  points: number[]; // [problemPoints, hackathonPoints]
  hackathon: string;
  solved: number[];  // <== new
  members: string[];
};

// What this context provides
type TeamContextType = {
  team: Team | null;
  createTeam: (name: string, difficulty: "beginner" | "advanced") => boolean;
  joinTeam: (code: string) => boolean;
  markProblemSolved: (problemId: number, points: number) => void; // <== new
};

// Create the actual context
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Utility: generate a 6-character uppercase code
const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const { user } = useAuth();

  // Sync team from localStorage on load or user change
  useEffect(() => {
    if (!user || !user.teamCode) {
      setTeam(null);
      return;
    }

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const found = teams.find(t => t.code === user.teamCode);
    if (found) setTeam(found);
    else setTeam(null);
  }, [user]);

  // Create a new team
  const createTeam = (name: string, difficulty: "beginner" | "advanced"): boolean => {
    if (!user) return false;

    const code = generateCode();
    const newTeam: Team = {
      name,
      difficulty,
      code,
      points: [0, 0],
      hackathon: "",
      solved: [],
      members: [user.email],
    };

    const existing: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    if (existing.find(t => t.name.toLowerCase() === name.toLowerCase())) return false;

    localStorage.setItem("codex-teams", JSON.stringify([...existing, newTeam]));

    const updatedUser = { ...user, teamCode: code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);

    setTeam(newTeam);
    return true;
  };

  // Join an existing team by code
  const joinTeam = (code: string): boolean => {
    if (!user) return false;

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const index = teams.findIndex(t => t.code === code.toUpperCase());
    if (index === -1) return false;

    const team = teams[index];
    if (team.members.length >= 3) return false;
    if (team.members.includes(user.email)) return true;

    const updatedTeam = {
      ...team,
      members: [...team.members, user.email],
    };
    teams[index] = updatedTeam;

    const updatedUser = { ...user, teamCode: updatedTeam.code };
    localStorage.setItem("codex-user", JSON.stringify(updatedUser));
    updateUserInList(updatedUser);

    localStorage.setItem("codex-teams", JSON.stringify(teams));
    setTeam(updatedTeam);
    return true;
  };

  // Mark a problem as solved and award points
  const markProblemSolved = (problemId: number, points: number) => {
    if (!team || team.solved.includes(problemId)) return;

    const teams: Team[] = JSON.parse(localStorage.getItem("codex-teams") || "[]");
    const index = teams.findIndex(t => t.code === team.code);
    if (index === -1) return;

    const updatedTeam: Team = {
      ...team,
      points: [team.points[0] + points, team.points[1]],
      solved: [...team.solved, problemId],
    };

    teams[index] = updatedTeam;
    localStorage.setItem("codex-teams", JSON.stringify(teams));
    setTeam(updatedTeam);
  };

  return (
    <TeamContext.Provider value={{ team, createTeam, joinTeam, markProblemSolved }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within a <TeamProvider>");
  return ctx;
};