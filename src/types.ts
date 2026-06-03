export type SubjectId = 'portugues' | 'matematica' | 'gerais' | 'informatica' | 'administracao';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  questionCount: number;
  missions: Mission[];
}

export interface Mission {
  id: string;
  subjectId: SubjectId;
  title: string;
  summary: string;
  content: string;
  examples: string[];
  xpReward: number;
  duration: number; // minutes
  order: number;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topic: string;
  text: string;
  options: string[];
  correct: number; // 0-4 = A-E
  explanation: string;
}

export interface EssayTheme {
  id: string;
  title: string;
  description: string;
  tips: string[];
}

export interface TAFExercise {
  id: string;
  name: string;
  description: string;
  maleStandard: string;
  femaleStandard: string;
  unit: string;
}

export interface TAFRecord {
  date: string;
  exerciseId: string;
  value: number;
  unit: string;
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  front: string;
  back: string;
}

export interface UserProfile {
  name: string;
  xp: number;
  level: number;
  rank: string;
  streak: number;
  lastStudyDate: string;
  medals: Medal[];
  completedMissions: string[];
  completedMissionDates: Record<string, string>;
  completedQuestions: Record<string, QuestionAnswer>;
  wrongQuestions: string[];
  tafRecords: TAFRecord[];
  essays: EssayRecord[];
  simulationResults: SimulationResult[];
  spacedRepetition: Record<string, SpacedRepItem>;
  weeklyChallengeDone: string[];
  dailyMinimumDoneDates: string[];
  studyDayMode: 'normal' | 'bad_day';
  customPlan: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  selected: number;
  correct: boolean;
  answeredAt: string;
}

export interface EssayRecord {
  id: string;
  themeId: string;
  content: string;
  date: string;
  selfGrade: number;
}

export interface SimulationResult {
  id: string;
  date: string;
  type: 'mini' | 'semanal' | 'completo';
  totalQuestions: number;
  correctAnswers: number;
  subjectResults: Record<SubjectId, { total: number; correct: number }>;
  xpEarned: number;
}

export interface SpacedRepItem {
  itemId: string;
  type: 'mission' | 'question' | 'flashcard';
  nextReview: string; // ISO date
  interval: number; // days
  easeFactor: number;
}

export interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface StudyWeek {
  week: number;
  days: StudyDay[];
}

export interface StudyDay {
  day: string;
  label: string;
  tasks: StudyTask[];
}

export interface StudyTask {
  type: 'mission' | 'review' | 'simulation' | 'essay' | 'taf';
  title: string;
  subjectId?: SubjectId;
  missionId?: string;
  duration: number;
  xpReward: number;
}

export const LEVELS = [
  { level: 1, title: 'Recruta', xpRequired: 0, icon: '🔰' },
  { level: 2, title: 'Soldado', xpRequired: 100, icon: '⭐' },
  { level: 3, title: 'Cabo', xpRequired: 300, icon: '🎖️' },
  { level: 4, title: '3º Sargento', xpRequired: 600, icon: '🏅' },
  { level: 5, title: '2º Sargento', xpRequired: 1000, icon: '🥇' },
  { level: 6, title: '1º Sargento', xpRequired: 1500, icon: '⚜️' },
  { level: 7, title: 'Subtenente', xpRequired: 2200, icon: '🏆' },
  { level: 8, title: 'Aspirante', xpRequired: 3000, icon: '👑' },
  { level: 9, title: '2º Tenente', xpRequired: 4000, icon: '🗡️' },
  { level: 10, title: '1º Tenente', xpRequired: 5500, icon: '🛡️' },
  { level: 11, title: 'Capitão', xpRequired: 7500, icon: '🎖️' },
  { level: 12, title: 'Major', xpRequired: 10000, icon: '🏅' },
];

export const ALL_MEDALS: Medal[] = [];

export const getDefaultProfile = (): UserProfile => ({
  name: 'Recruta',
  xp: 0,
  level: 1,
  rank: 'Recruta',
  streak: 0,
  lastStudyDate: '',
  medals: [],
  completedMissions: [],
  completedMissionDates: {},
  completedQuestions: {},
  wrongQuestions: [],
  tafRecords: [],
  essays: [],
  simulationResults: [],
  spacedRepetition: {},
  weeklyChallengeDone: [],
  dailyMinimumDoneDates: [],
  studyDayMode: 'normal',
  customPlan: false,
});
