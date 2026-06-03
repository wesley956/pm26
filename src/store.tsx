import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, QuestionAnswer, Medal, LEVELS, TAFRecord, EssayRecord, SimulationResult } from './types';

interface AppState {
  profile: UserProfile;
  addXP: (amount: number) => void;
  completeMission: (missionId: string) => void;
  answerQuestion: (questionId: string, selected: number, correct: boolean) => void;
  addTAFRecord: (record: TAFRecord) => void;
  addEssay: (essay: EssayRecord) => void;
  addSimulation: (result: SimulationResult) => void;
  addMedal: (medal: Medal) => void;
  updateStreak: () => void;
  resetDay: () => void;
  setBadDayMode: (on: boolean) => void;
  getLevelInfo: () => { level: number; title: string; icon: string; xpInLevel: number; xpForNext: number; progress: number };
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

const STORAGE_KEY = 'pm-sp-arena';

function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  const def = { name: 'Recruta', xp: 0, level: 1, rank: 'Recruta', streak: 0, lastStudyDate: '', medals: [], completedMissions: [], completedQuestions: {}, wrongQuestions: [], tafRecords: [], essays: [], simulationResults: [], spacedRepetition: {}, weeklyChallengeDone: [], studyDayMode: 'normal' as const, customPlan: false };
  return def;
}

function saveProfile(p: UserProfile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);

  useEffect(() => { saveProfile(profile); }, [profile]);

  const getLevelInfo = useCallback(() => {
    let current = LEVELS[0];
    let next = LEVELS[1];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (profile.xp >= LEVELS[i].xpRequired) {
        current = LEVELS[i];
        next = LEVELS[i + 1] || LEVELS[i];
        break;
      }
    }
    const xpInLevel = profile.xp - current.xpRequired;
    const xpNeeded = next.xpRequired - current.xpRequired;
    return { level: current.level, title: current.title, icon: current.icon, xpInLevel, xpForNext: xpNeeded, progress: Math.min(100, (xpInLevel / xpNeeded) * 100) };
  }, [profile.xp]);

  const addXP = useCallback((amount: number) => {
    setProfile(p => {
      const newXp = p.xp + amount;
      let newLevel = p.level;
      for (const l of LEVELS) {
        if (newXp >= l.xpRequired) newLevel = l.level;
      }
      const li = LEVELS.find(l => l.level === newLevel);
      return { ...p, xp: newXp, level: newLevel, rank: li?.title || p.rank };
    });
  }, []);

  const completeMission = useCallback((missionId: string) => {
    setProfile(p => {
      if (p.completedMissions.includes(missionId)) return p;
      const today = new Date().toISOString().slice(0, 10);
      return { ...p, completedMissions: [...p.completedMissions, missionId], lastStudyDate: today };
    });
  }, []);

  const answerQuestion = useCallback((questionId: string, selected: number, correct: boolean) => {
    setProfile(p => {
      const qa: QuestionAnswer = { questionId, selected, correct, answeredAt: new Date().toISOString() };
      const newCompleted = { ...p.completedQuestions, [questionId]: qa };
      const newWrong = correct ? p.wrongQuestions.filter(id => id !== questionId) : [...new Set([...p.wrongQuestions, questionId])];
      const today = new Date().toISOString().slice(0, 10);
      return { ...p, completedQuestions: newCompleted, wrongQuestions: newWrong, lastStudyDate: today };
    });
  }, []);

  const addTAFRecord = useCallback((record: TAFRecord) => {
    setProfile(p => ({ ...p, tafRecords: [...p.tafRecords, record] }));
  }, []);

  const addEssay = useCallback((essay: EssayRecord) => {
    setProfile(p => ({ ...p, essays: [...p.essays, essay] }));
  }, []);

  const addSimulation = useCallback((result: SimulationResult) => {
    setProfile(p => ({ ...p, simulationResults: [...p.simulationResults, result] }));
  }, []);

  const addMedal = useCallback((medal: Medal) => {
    setProfile(p => {
      if (p.medals.find(m => m.id === medal.id)) return p;
      return { ...p, medals: [...p.medals, medal] };
    });
  }, []);

  const updateStreak = useCallback(() => {
    setProfile(p => {
      const today = new Date().toISOString().slice(0, 10);
      if (p.lastStudyDate === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = p.lastStudyDate === yesterday ? p.streak + 1 : 1;
      return { ...p, streak: newStreak, lastStudyDate: today };
    });
  }, []);

  const resetDay = useCallback(() => {
    setProfile(p => ({ ...p, studyDayMode: 'normal' }));
  }, []);

  const setBadDayMode = useCallback((on: boolean) => {
    setProfile(p => ({ ...p, studyDayMode: on ? 'bad_day' : 'normal' }));
  }, []);

  return (
    <AppContext.Provider value={{ profile, addXP, completeMission, answerQuestion, addTAFRecord, addEssay, addSimulation, addMedal, updateStreak, resetDay, setBadDayMode, getLevelInfo }}>
      {children}
    </AppContext.Provider>
  );
}
