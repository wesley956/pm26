import type { SubjectId } from '../types';

export const EXAM_CONFIG = {
  contestCode: 'PMES2601',
  shortTitle: 'PM-SP Soldado 2026',
  title: 'Aluno-Soldado PM do Quadro de Praças',
  institution: 'Polícia Militar/SP',
  board: 'Vunesp',
  vacancies: 2000,
  initialSalary: 'R$ 5.482,51',
  officialPage: 'https://www.vunesp.com.br/PMES2601',
  importantDates: {
    applicationStart: '2026-06-15',
    applicationEnd: '2026-08-21',
    knowledgeExam: '2026-09-20' as string | null,
  },
  objectiveExam: {
    totalQuestions: 60,
    subjects: {
      portugues: 20,
      matematica: 15,
      gerais: 15,
      informatica: 5,
      administracao: 5,
    } satisfies Record<SubjectId, number>,
  },
} as const;

export const EXAM_SUBJECTS: Array<{
  id: SubjectId;
  label: string;
  officialQuestions: number;
  recommendedWeeklyBlocks: number;
}> = [
  {
    id: 'portugues',
    label: 'Português',
    officialQuestions: EXAM_CONFIG.objectiveExam.subjects.portugues,
    recommendedWeeklyBlocks: 3,
  },
  {
    id: 'matematica',
    label: 'Matemática',
    officialQuestions: EXAM_CONFIG.objectiveExam.subjects.matematica,
    recommendedWeeklyBlocks: 2,
  },
  {
    id: 'gerais',
    label: 'Conhecimentos Gerais',
    officialQuestions: EXAM_CONFIG.objectiveExam.subjects.gerais,
    recommendedWeeklyBlocks: 2,
  },
  {
    id: 'informatica',
    label: 'Informática',
    officialQuestions: EXAM_CONFIG.objectiveExam.subjects.informatica,
    recommendedWeeklyBlocks: 1,
  },
  {
    id: 'administracao',
    label: 'Administração Pública',
    officialQuestions: EXAM_CONFIG.objectiveExam.subjects.administracao,
    recommendedWeeklyBlocks: 1,
  },
];

export function formatPtBrDate(dateIso: string): string {
  const [year, month, day] = dateIso.split('-');
  return `${day}/${month}/${year}`;
}
