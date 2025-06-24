'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

type Team = {
  name: string;
  difficulty: 'beginner' | 'advanced';
  code: string;
  points: number[]; // [problemPoints, hackathonPoints]
  hackathon: string;
  solved: number[];
  members: string[]; // emails
};

type TeamContextType = {
  team: Team | null;
  createTeam: (name: string, difficulty: 'beginner' | 'advanced') => Promise<boolean>;
  joinTeam: (code: string) => Promise<boolean>;
  markProblemSolved: (problemId: number, points: number) => Promise<void>;
  setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const { user } = useAuth();

  // Load team on user change
  useEffect(() => {
    const loadTeam = async () => {
      if (!user?.teamCode) {
        setTeam(null);
        return;
      }

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('code', user.teamCode)
        .single();

      if (error) {
        console.error('Error loading team:', error);
        setTeam(null);
      } else {
        setTeam(data as Team);
      }
    };

    loadTeam();
  }, [user]);

  // Create a new team
  const createTeam = async (
    name: string,
    difficulty: 'beginner' | 'advanced'
  ): Promise<boolean> => {
    if (!user) return false;

    // Check uniqueness
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('name')
      .eq('name', name)
      .single();

    if (existingTeam) return false;

    const code = generateCode();
    const newTeam: Team = {
      name,
      difficulty,
      code,
      points: [0, 0],
      hackathon: '',
      solved: [],
      members: [user.email],
    };

    const { error: teamError } = await supabase.from('teams').insert(newTeam);
    if (teamError) {
      console.error('Error creating team:', teamError);
      return false;
    }

    // Update user profile
    const { error: userError } = await supabase
      .from('users')
      .update({ team_code: code })
      .eq('email', user.email);

    if (userError) {
      console.error('Error updating user with teamCode:', userError);
      return false;
    }

    setTeam(newTeam);
    return true;
  };

  // Join an existing team
  const joinTeam = async (code: string): Promise<boolean> => {
    if (!user) return false;

    const { data: teamData, error } = await supabase
      .from('teams')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !teamData) return false;

    if (teamData.members.includes(user.email)) return true;
    if (teamData.members.length >= 3) return false;

    const updatedTeam = {
      ...teamData,
      members: [...teamData.members, user.email],
    };

    const { error: updateError } = await supabase
      .from('teams')
      .update({ members: updatedTeam.members })
      .eq('code', updatedTeam.code);

    if (updateError) {
      console.error('Error updating team members:', updateError);
      return false;
    }

    await supabase
      .from('users')
      .update({ team_code: updatedTeam.code })
      .eq('email', user.email);

    setTeam(updatedTeam);
    return true;
  };

  // Mark a problem as solved
  const markProblemSolved = async (problemId: number, points: number) => {
    if (!team || team.solved.includes(problemId)) return;

    const updatedTeam = {
      ...team,
      points: [team.points[0] + points, team.points[1]],
      solved: [...team.solved, problemId],
    };

    const { error } = await supabase
      .from('teams')
      .update({
        points: updatedTeam.points,
        solved: updatedTeam.solved,
      })
      .eq('code', team.code);

    if (!error) {
      setTeam(updatedTeam);
    } else {
      console.error('Error updating team score:', error);
    }
  };

  return (
    <TeamContext.Provider
      value={{ team, createTeam, joinTeam, markProblemSolved, setTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used within a <TeamProvider>');
  return ctx;
};