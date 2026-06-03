import { subjects } from '../data/subjects';
import { questions } from '../data/questions';
import { EXAM_SUBJECTS } from '../config/examConfig';
import type { Mission, SubjectId, UserProfile } from '../types';

export type SmartStudyActionKind = 'mission' | 'review' | 'simulado';

export interface SmartStudyAction {
  kind: SmartStudyActionKind;
  title: string;
  summary: string;
  reason: string;
  buttonLabel: string;
  minutes: number;
  xpReward: number;
  subjectId?: SubjectId;
  subjectLabel?: string;
  subjectIcon?: string;
  missionId?: string;
}

const subjectPriority = [...EXAM_SUBJECTS].sort((a, b) => {
  if (b.officialQuestions !== a.officialQuestions) {
    return b.officialQuestions - a.officialQuestions;
  }

  return b.recommendedWeeklyBlocks - a.recommendedWeeklyBlocks;
});

function getSubjectMeta(subjectId: SubjectId) {
  return subjects.find(subject => subject.id === subjectId);
}

function getUnfinishedMission(profile: UserProfile, subjectId: SubjectId): Mission | null {
  const subject = getSubjectMeta(subjectId);

  if (!subject) return null;

  return subject.missions.find(mission => !profile.completedMissions.includes(mission.id)) ?? null;
}

function getBestWeightedMission(profile: UserProfile): Mission | null {
  for (const priority of subjectPriority) {
    const mission = getUnfinishedMission(profile, priority.id);

    if (mission) return mission;
  }

  return null;
}

function getShortestUnfinishedMission(profile: UserProfile): Mission | null {
  const unfinished = subjects
    .flatMap(subject => subject.missions)
    .filter(mission => !profile.completedMissions.includes(mission.id))
    .sort((a, b) => a.duration - b.duration || a.order - b.order);

  return unfinished[0] ?? null;
}

function getAccuracy(profile: UserProfile): number {
  const answers = Object.values(profile.completedQuestions);
  if (answers.length === 0) return 100;

  const correct = answers.filter(answer => answer.correct).length;
  return Math.round((correct / answers.length) * 100);
}

function getWorstSubjectByErrors(profile: UserProfile): SubjectId | null {
  const errorCount = new Map<SubjectId, number>();

  for (const questionId of profile.wrongQuestions) {
    const question = questions.find(item => item.id === questionId);
    if (!question) continue;

    errorCount.set(question.subjectId, (errorCount.get(question.subjectId) ?? 0) + 1);
  }

  let worst: SubjectId | null = null;
  let max = 0;

  for (const [subjectId, count] of errorCount.entries()) {
    if (count > max) {
      worst = subjectId;
      max = count;
    }
  }

  return worst;
}

function buildMissionAction(mission: Mission, reason: string, buttonLabel = 'COMEÇAR MISSÃO'): SmartStudyAction {
  const subject = getSubjectMeta(mission.subjectId);

  return {
    kind: 'mission',
    title: mission.title,
    summary: mission.summary,
    reason,
    buttonLabel,
    minutes: mission.duration,
    xpReward: mission.xpReward,
    subjectId: mission.subjectId,
    subjectLabel: subject?.name,
    subjectIcon: subject?.icon,
    missionId: mission.id,
  };
}

export function chooseSmartStudyAction(profile: UserProfile): SmartStudyAction {
  const accuracy = getAccuracy(profile);
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const wrongCount = profile.wrongQuestions.length;
  const completedCount = profile.completedMissions.length;

  if (profile.studyDayMode === 'bad_day') {
    if (wrongCount > 0) {
      const worstSubject = getWorstSubjectByErrors(profile);
      const subject = worstSubject ? getSubjectMeta(worstSubject) : null;

      return {
        kind: 'review',
        title: 'Modo dia ruim: revisão de 10 minutos',
        summary: 'Você só precisa revisar algumas questões erradas para manter a sequência viva.',
        reason: 'Hoje o objetivo é não abandonar. Pouco estudo ainda conta.',
        buttonLabel: 'FAZER REVISÃO LEVE',
        minutes: 10,
        xpReward: 10,
        subjectId: worstSubject ?? undefined,
        subjectLabel: subject?.name,
        subjectIcon: subject?.icon,
      };
    }

    const lightMission = getShortestUnfinishedMission(profile);

    if (lightMission) {
      return buildMissionAction(
        lightMission,
        'Missão mais curta disponível para um dia difícil.',
        'FAZER MISSÃO LEVE'
      );
    }
  }

  if (wrongCount >= 5) {
    const worstSubject = getWorstSubjectByErrors(profile);
    const subject = worstSubject ? getSubjectMeta(worstSubject) : null;

    return {
      kind: 'review',
      title: 'Revisar erros antes de avançar',
      summary: `Você tem ${wrongCount} questões erradas acumuladas. Corrigir isso agora aumenta sua nota mais rápido.`,
      reason: 'Prioridade TDAH: limpar pendências pequenas antes de abrir conteúdo novo.',
      buttonLabel: 'REVISAR MEUS ERROS',
      minutes: 15,
      xpReward: 20,
      subjectId: worstSubject ?? undefined,
      subjectLabel: subject?.name,
      subjectIcon: subject?.icon,
    };
  }

  if (totalAnswered >= 20 && accuracy < 55) {
    return {
      kind: 'review',
      title: 'Reforço rápido de questões',
      summary: `Sua taxa de acerto está em ${accuracy}%. Agora vale mais revisar do que correr para assunto novo.`,
      reason: 'A IA escolheu revisão porque seu aproveitamento precisa subir.',
      buttonLabel: 'CORRIGIR PONTOS FRACOS',
      minutes: 15,
      xpReward: 20,
    };
  }

  if (completedCount > 0 && completedCount % 8 === 0) {
    return {
      kind: 'simulado',
      title: 'Hora de testar sua evolução',
      summary: 'Você concluiu um bloco bom de missões. Faça um simulado curto para consolidar.',
      reason: 'Simulados frequentes ajudam a transformar estudo em nota.',
      buttonLabel: 'FAZER SIMULADO',
      minutes: 10,
      xpReward: 30,
    };
  }

  const mission = getBestWeightedMission(profile);

  if (mission) {
    const subject = subjectPriority.find(item => item.id === mission.subjectId);

    return buildMissionAction(
      mission,
      subject
        ? `${subject.label} tem peso alto na prova: ${subject.officialQuestions} questões.`
        : 'Próxima missão recomendada pelo plano.'
    );
  }

  return {
    kind: 'simulado',
    title: 'Todas as missões foram concluídas',
    summary: 'Agora o foco é simulado, revisão de erros, redação e TAF.',
    reason: 'Você zerou as missões principais.',
    buttonLabel: 'FAZER SIMULADO',
    minutes: 30,
    xpReward: 50,
  };
}
