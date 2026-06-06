import { subjects } from '../data/subjects';
import { questions } from '../data/questions';
import { EXAM_SUBJECTS } from '../config/examConfig';
import type { Mission, SubjectId, UserProfile } from '../types';

export type SmartStudyActionKind = 'mission' | 'review' | 'simulado' | 'questions';

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
  topic?: string;
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

function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDueFlashcardCount(profile: UserProfile): number {
  const today = getTodayIso();

  return Object.values(profile.spacedRepetition ?? {}).filter(item =>
    item.type === 'flashcard' && item.nextReview <= today
  ).length;
}

function getWeakTopic(profile: UserProfile): {
  subjectId: SubjectId;
  subjectLabel: string;
  subjectIcon: string;
  topic: string;
  total: number;
  correct: number;
  wrong: number;
  pct: number;
  score: number;
} | null {
  const byId = new Map(questions.map(question => [question.id, question]));
  const topicMap = new Map<string, {
    subjectId: SubjectId;
    subjectLabel: string;
    subjectIcon: string;
    topic: string;
    total: number;
    correct: number;
    wrong: number;
  }>();

  for (const answer of Object.values(profile.completedQuestions)) {
    const question = byId.get(answer.questionId);
    if (!question) continue;

    const subject = getSubjectMeta(question.subjectId);
    const key = `${question.subjectId}::${question.topic}`;

    const current = topicMap.get(key) ?? {
      subjectId: question.subjectId,
      subjectLabel: subject?.name ?? 'Matéria',
      subjectIcon: subject?.icon ?? '🧠',
      topic: question.topic,
      total: 0,
      correct: 0,
      wrong: 0,
    };

    current.total += 1;

    if (answer.correct) {
      current.correct += 1;
    } else {
      current.wrong += 1;
    }

    topicMap.set(key, current);
  }

  const candidates = Array.from(topicMap.values())
    .map(item => {
      const pct = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
      const score =
        item.wrong * 35 +
        Math.max(0, 80 - pct) +
        (item.total < 3 ? 12 : 0) +
        (item.subjectId === 'portugues' ? 12 : item.subjectId === 'matematica' ? 10 : item.subjectId === 'gerais' ? 8 : 4);

      return { ...item, pct, score };
    })
    .filter(item => item.total >= 2 && (item.wrong > 0 || item.pct < 70))
    .sort((a, b) => b.score - a.score);

  return candidates[0] ?? null;
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

function buildWeakTopicAction(weakTopic: NonNullable<ReturnType<typeof getWeakTopic>>): SmartStudyAction {
  return {
    kind: 'questions',
    title: `Atacar ponto fraco: ${weakTopic.topic}`,
    summary: `${weakTopic.subjectLabel}: ${weakTopic.pct}% de acerto em ${weakTopic.total} questão(ões). Treine esse tópico antes de abrir assunto novo.`,
    reason: 'A missão inteligente escolheu esse tópico porque ele está puxando sua nota para baixo.',
    buttonLabel: 'TREINAR TÓPICO FRACO',
    minutes: 15,
    xpReward: 15,
    subjectId: weakTopic.subjectId,
    subjectLabel: weakTopic.subjectLabel,
    subjectIcon: weakTopic.subjectIcon,
    topic: weakTopic.topic,
  };
}

export function chooseSmartStudyAction(profile: UserProfile): SmartStudyAction {
  const accuracy = getAccuracy(profile);
  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const wrongCount = profile.wrongQuestions.length;
  const completedCount = profile.completedMissions.length;
  const weakTopic = getWeakTopic(profile);
  const dueFlashcards = getDueFlashcardCount(profile);

  if (profile.studyDayMode === 'bad_day') {
    if (dueFlashcards > 0) {
      return {
        kind: 'review',
        title: 'Modo dia ruim: flashcards vencidos',
        summary: `Você tem ${dueFlashcards} flashcard(s) para revisar hoje. Faça só isso para manter a sequência viva.`,
        reason: 'Hoje o objetivo é sobreviver sem abandonar.',
        buttonLabel: 'REVISAR FLASHCARDS',
        minutes: 10,
        xpReward: 5,
      };
    }

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

  if (weakTopic) {
    return buildWeakTopicAction(weakTopic);
  }

  if (dueFlashcards >= 3) {
    return {
      kind: 'review',
      title: 'Revisar flashcards vencidos',
      summary: `Você tem ${dueFlashcards} flashcard(s) esperando revisão. Isso protege sua memória antes de estudar coisa nova.`,
      reason: 'Revisão espaçada vencida tem prioridade porque evita esquecer o que já foi aprendido.',
      buttonLabel: 'REVISAR AGORA',
      minutes: 12,
      xpReward: 5,
    };
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

  if (completedCount >= 8 && completedCount % 8 === 0 && totalAnswered >= 20) {
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
