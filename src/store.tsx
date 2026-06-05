import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, QuestionAnswer, Medal, TAFRecord, EssayRecord, SimulationResult, getDefaultProfile } from './types';
import { getLevelInfo as calculateLevelInfo, getMedalDefinitions } from './utils';

interface RewardToast {
  id: string;
  kind: 'xp' | 'level' | 'medal';
  title: string;
  message: string;
  icon: string;
}

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
  markDailyMinimumDone: () => void;
  getLevelInfo: () => { level: number; title: string; icon: string; xpInLevel: number; xpForNext: number; progress: number };
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

const STORAGE_KEY = 'pm-sp-arena';

function normalizeProfile(profile: Partial<UserProfile>): UserProfile {
  const base = getDefaultProfile();

  return {
    ...base,
    ...profile,
    medals: profile.medals ?? base.medals,
    completedMissions: profile.completedMissions ?? base.completedMissions,
    completedMissionDates: profile.completedMissionDates ?? base.completedMissionDates,
    completedQuestions: profile.completedQuestions ?? base.completedQuestions,
    wrongQuestions: profile.wrongQuestions ?? base.wrongQuestions,
    tafRecords: profile.tafRecords ?? base.tafRecords,
    essays: profile.essays ?? base.essays,
    simulationResults: profile.simulationResults ?? base.simulationResults,
    spacedRepetition: profile.spacedRepetition ?? base.spacedRepetition,
    weeklyChallengeDone: profile.weeklyChallengeDone ?? base.weeklyChallengeDone,
    dailyMinimumDoneDates: profile.dailyMinimumDoneDates ?? base.dailyMinimumDoneDates,
    studyDayMode: profile.studyDayMode ?? base.studyDayMode,
    customPlan: profile.customPlan ?? base.customPlan,
  };
}

function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalizeProfile(JSON.parse(saved));
  } catch {}

  return getDefaultProfile();
}

function saveProfile(p: UserProfile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

function countCorrectAnswers(profile: UserProfile): number {
  return Object.values(profile.completedQuestions).filter(q => q.correct).length;
}

function countMissionPrefix(profile: UserProfile, prefix: string): number {
  return profile.completedMissions.filter(id => id.startsWith(prefix)).length;
}

function hasTenCorrectInARow(profile: UserProfile): boolean {
  const answers = Object.values(profile.completedQuestions)
    .sort((a, b) => new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime());

  if (answers.length < 10) return false;

  return answers.slice(-10).every(answer => answer.correct);
}

function getEarnedMedalDefinitions(profile: UserProfile) {
  const defs = getMedalDefinitions();
  const correctAnswers = countCorrectAnswers(profile);

  const rules: Record<string, boolean> = {
    m1: profile.completedMissions.length >= 1,
    m2: profile.streak >= 7,
    m3: correctAnswers >= 20,
    m4: profile.simulationResults.some(sim => sim.type === 'completo' || sim.totalQuestions >= 60),
    m5: profile.essays.length >= 1,
    m6: profile.tafRecords.length >= 1,
    m7: countMissionPrefix(profile, 'pt-') >= 5,
    m8: countMissionPrefix(profile, 'mt-') >= 5,
    m9: countMissionPrefix(profile, 'cg-') >= 5,
    m10: countMissionPrefix(profile, 'inf-') >= 10,
    m11: countMissionPrefix(profile, 'ap-') >= 10,
    m12: profile.level >= 5,
    m13: profile.streak >= 30,
    m14: hasTenCorrectInARow(profile),
    m15: profile.completedMissions.length >= 50,
  };

  return defs.filter(def => rules[def.id]);
}

function medalDefinitionToMedal(def: ReturnType<typeof getMedalDefinitions>[number], earnedAt: string): Medal {
  return {
    id: def.id,
    name: def.name,
    description: def.desc,
    icon: def.icon,
    earnedAt,
  };
}

function RewardToastList({ toasts }: { toasts: RewardToast[] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="reward-toast-stack" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`reward-toast reward-toast-${toast.kind}`}>
          <div className="reward-toast-icon">{toast.icon}</div>
          <div>
            <div className="reward-toast-title">{toast.title}</div>
            <div className="reward-toast-message">{toast.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [rewardToasts, setRewardToasts] = useState<RewardToast[]>([]);

  useEffect(() => { saveProfile(profile); }, [profile]);

  const pushRewardToast = useCallback((toast: Omit<RewardToast, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const fullToast: RewardToast = { ...toast, id };

    setRewardToasts(current => [...current, fullToast].slice(-4));

    window.setTimeout(() => {
      setRewardToasts(current => current.filter(item => item.id !== id));
    }, 2400);
  }, []);

  const getLevelInfo = useCallback(() => calculateLevelInfo(profile), [profile]);

  const addXP = useCallback((amount: number) => {
    if (amount <= 0) return;

    pushRewardToast({
      kind: 'xp',
      title: `+${amount} XP`,
      message: 'Progresso registrado.',
      icon: 'XP',
    });

    setProfile(p => {
      const before = calculateLevelInfo(p);
      const nextProfile = { ...p, xp: p.xp + amount };
      const after = calculateLevelInfo(nextProfile);

      if (after.level > before.level) {
        pushRewardToast({
          kind: 'level',
          title: 'Nova patente desbloqueada',
          message: `${after.icon} ${after.title}`,
          icon: after.icon,
        });
      }

      return {
        ...nextProfile,
        level: after.level,
        rank: after.title,
      };
    });
  }, [pushRewardToast]);

  const completeMission = useCallback((missionId: string) => {
    setProfile(p => {
      if (p.completedMissions.includes(missionId)) return p;
      const today = getTodayIso();

      return {
        ...p,
        completedMissions: [...p.completedMissions, missionId],
        completedMissionDates: {
          ...(p.completedMissionDates ?? {}),
          [missionId]: today,
        },
        lastStudyDate: today,
      };
    });
  }, []);

  const answerQuestion = useCallback((questionId: string, selected: number, correct: boolean) => {
    setProfile(p => {
      const qa: QuestionAnswer = { questionId, selected, correct, answeredAt: new Date().toISOString() };
      const newCompleted = { ...p.completedQuestions, [questionId]: qa };
      const newWrong = correct ? p.wrongQuestions.filter(id => id !== questionId) : [...new Set([...p.wrongQuestions, questionId])];
      const today = getTodayIso();

      return { ...p, completedQuestions: newCompleted, wrongQuestions: newWrong, lastStudyDate: today };
    });
  }, []);

  const addTAFRecord = useCallback((record: TAFRecord) => {
    setProfile(p => ({ ...p, tafRecords: [...p.tafRecords, record], lastStudyDate: getTodayIso() }));
  }, []);

  const addEssay = useCallback((essay: EssayRecord) => {
    setProfile(p => ({ ...p, essays: [...p.essays, essay], lastStudyDate: getTodayIso() }));
  }, []);

  const addSimulation = useCallback((result: SimulationResult) => {
    setProfile(p => ({ ...p, simulationResults: [...p.simulationResults, result], lastStudyDate: getTodayIso() }));
  }, []);

  const addMedal = useCallback((medal: Medal) => {
    setProfile(p => {
      if (p.medals.find(m => m.id === medal.id)) return p;
      return { ...p, medals: [...p.medals, medal] };
    });

    pushRewardToast({
      kind: 'medal',
      title: 'Medalha desbloqueada',
      message: medal.name,
      icon: medal.icon,
    });
  }, [pushRewardToast]);

  const updateStreak = useCallback(() => {
    setProfile(p => {
      const today = getTodayIso();
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

  const markDailyMinimumDone = useCallback(() => {
    setProfile(p => {
      const today = getTodayIso();
      const alreadyMarked = (p.dailyMinimumDoneDates ?? []).includes(today);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak =
        p.lastStudyDate === today
          ? p.streak
          : p.lastStudyDate === yesterday
            ? p.streak + 1
            : 1;

      return {
        ...p,
        dailyMinimumDoneDates: alreadyMarked
          ? p.dailyMinimumDoneDates
          : [...(p.dailyMinimumDoneDates ?? []), today],
        streak: newStreak,
        lastStudyDate: today,
      };
    });
  }, []);

  useEffect(() => {
    const earnedDefinitions = getEarnedMedalDefinitions(profile);
    const missingDefinitions = earnedDefinitions.filter(def => !profile.medals.some(medal => medal.id === def.id));

    if (missingDefinitions.length === 0) return;

    const earnedAt = new Date().toISOString();

    setProfile(current => {
      const currentEarnedDefinitions = getEarnedMedalDefinitions(current);
      const currentMissingDefinitions = currentEarnedDefinitions.filter(def => !current.medals.some(medal => medal.id === def.id));

      if (currentMissingDefinitions.length === 0) return current;

      for (const def of currentMissingDefinitions) {
        pushRewardToast({
          kind: 'medal',
          title: 'Medalha desbloqueada',
          message: def.name,
          icon: def.icon,
        });
      }

      return {
        ...current,
        medals: [
          ...current.medals,
          ...currentMissingDefinitions.map(def => medalDefinitionToMedal(def, earnedAt)),
        ],
      };
    });
  }, [profile, pushRewardToast]);

  return (
    <AppContext.Provider value={{ profile, addXP, completeMission, answerQuestion, addTAFRecord, addEssay, addSimulation, addMedal, updateStreak, resetDay, setBadDayMode, markDailyMinimumDone, getLevelInfo }}>
      {children}
      <RewardToastList toasts={rewardToasts} />
    </AppContext.Provider>
  );
}
