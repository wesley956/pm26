import { questions } from '../data/questions';
import { subjects } from '../data/subjects';
import type { SubjectId, UserProfile } from '../types';

export type WeeklyPlanTaskType = 'mission' | 'questions' | 'review' | 'simulado' | 'essay' | 'taf';

export interface WeeklyPlanTask {
  id: string;
  type: WeeklyPlanTaskType;
  title: string;
  description: string;
  minutes: number;
  priority: 'alta' | 'media' | 'leve';
  subjectId?: SubjectId;
  missionId?: string;
  topic?: string;
}

export interface WeeklyPlanDay {
  date: string;
  label: string;
  subtitle: string;
  tasks: WeeklyPlanTask[];
}

function addDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDayLabel(dateIso: string, offset: number): string {
  if (offset === 0) return 'Hoje';
  if (offset === 1) return 'Amanhã';

  const date = new Date(`${dateIso}T12:00:00`);
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
}

function getSubjectMeta(subjectId?: SubjectId) {
  return subjects.find(subject => subject.id === subjectId);
}

function getFirstUnfinishedMission(profile: UserProfile, subjectId?: SubjectId) {
  const subjectOrder: SubjectId[] = subjectId
    ? [subjectId]
    : ['portugues', 'matematica', 'gerais', 'administracao', 'informatica'];

  for (const id of subjectOrder) {
    const subject = getSubjectMeta(id);
    const mission = subject?.missions.find(item => !profile.completedMissions.includes(item.id));

    if (mission) return mission;
  }

  return subjects
    .flatMap(subject => subject.missions)
    .find(mission => !profile.completedMissions.includes(mission.id));
}

function getDueFlashcardCount(profile: UserProfile): number {
  const today = new Date().toISOString().slice(0, 10);

  return Object.values(profile.spacedRepetition ?? {}).filter(item =>
    item.type === 'flashcard' && item.nextReview <= today
  ).length;
}

function getWeakTopics(profile: UserProfile) {
  const questionById = new Map(questions.map(question => [question.id, question]));

  const topicMap = new Map<string, {
    key: string;
    subjectId: SubjectId;
    subjectName: string;
    subjectIcon: string;
    topic: string;
    total: number;
    correct: number;
    wrong: number;
  }>();

  for (const answer of Object.values(profile.completedQuestions)) {
    const question = questionById.get(answer.questionId);
    if (!question) continue;

    const subject = getSubjectMeta(question.subjectId);
    const key = `${question.subjectId}::${question.topic}`;

    const current = topicMap.get(key) ?? {
      key,
      subjectId: question.subjectId,
      subjectName: subject?.name ?? 'Matéria',
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

  return Array.from(topicMap.values())
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
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildTheoryTask(profile: UserProfile, subjectId?: SubjectId, id = 'theory'): WeeklyPlanTask {
  const mission = getFirstUnfinishedMission(profile, subjectId);
  const subject = getSubjectMeta(mission?.subjectId ?? subjectId);

  if (!mission) {
    return {
      id,
      type: 'review',
      title: 'Revisão geral',
      description: 'Todas as missões principais foram concluídas. Use este bloco para revisar erros e flashcards.',
      minutes: 20,
      priority: 'media',
    };
  }

  return {
    id,
    type: 'mission',
    title: `Teoria: ${mission.title}`,
    description: `${subject?.icon ?? '📚'} ${subject?.name ?? 'Matéria'} • leia a aula e marque como concluída.`,
    minutes: mission.duration,
    priority: 'media',
    subjectId: mission.subjectId,
    missionId: mission.id,
  };
}

function buildTopicTask(topic: ReturnType<typeof getWeakTopics>[number] | undefined, id = 'topic'): WeeklyPlanTask {
  if (!topic) {
    return {
      id,
      type: 'questions',
      title: 'Treino de questões',
      description: 'Responda questões para gerar diagnóstico por tópico.',
      minutes: 15,
      priority: 'media',
    };
  }

  return {
    id,
    type: 'questions',
    title: `Atacar tópico: ${topic.topic}`,
    description: `${topic.subjectIcon} ${topic.subjectName} • ${topic.pct}% de acerto • ${topic.wrong} erro(s).`,
    minutes: 15,
    priority: 'alta',
    subjectId: topic.subjectId,
    topic: topic.topic,
  };
}

export function buildWeeklyPlan(profile: UserProfile): WeeklyPlanDay[] {
  const weakTopics = getWeakTopics(profile);
  const dueFlashcards = getDueFlashcardCount(profile);
  const wrongCount = profile.wrongQuestions.length;

  const primaryWeakTopic = weakTopics[0];
  const secondaryWeakTopic = weakTopics[1] ?? weakTopics[0];
  const thirdWeakTopic = weakTopics[2] ?? weakTopics[0];

  const hasEnoughQuestions = Object.keys(profile.completedQuestions).length >= 20;

  const templates: Array<Omit<WeeklyPlanDay, 'date' | 'label'> & { build: () => WeeklyPlanTask[] }> = [
    {
      subtitle: 'Foco no que mais aumenta sua nota agora.',
      build: () => [
        buildTopicTask(primaryWeakTopic, 'd1-topic'),
        dueFlashcards > 0
          ? {
              id: 'd1-review',
              type: 'review',
              title: 'Revisar flashcards vencidos',
              description: `${dueFlashcards} flashcard(s) esperando revisão hoje.`,
              minutes: 10,
              priority: 'alta',
            }
          : buildTheoryTask(profile, primaryWeakTopic?.subjectId, 'd1-theory'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Teoria + prática curta para consolidar.',
      build: () => [
        buildTheoryTask(profile, primaryWeakTopic?.subjectId, 'd2-theory'),
        buildTopicTask(primaryWeakTopic, 'd2-topic'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Dia de corrigir vazamento de pontos.',
      build: () => [
        wrongCount > 0
          ? {
              id: 'd3-wrong',
              type: 'review',
              title: 'Revisar questões erradas',
              description: `${wrongCount} questão(ões) erradas acumuladas.`,
              minutes: 15,
              priority: 'alta',
            }
          : buildTopicTask(secondaryWeakTopic, 'd3-topic'),
        buildTheoryTask(profile, 'portugues', 'd3-portugues'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Treino de prova para medir evolução.',
      build: () => [
        {
          id: 'd4-simulado',
          type: 'simulado',
          title: hasEnoughQuestions ? 'Simulado semanal' : 'Mini simulado',
          description: hasEnoughQuestions
            ? 'Faça um simulado para testar consistência.'
            : 'Faça um mini simulado para ganhar dados.',
          minutes: hasEnoughQuestions ? 30 : 10,
          priority: 'media',
        },
        buildTopicTask(secondaryWeakTopic, 'd4-topic'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Dia de escrita e raciocínio.',
      build: () => [
        {
          id: 'd5-essay',
          type: 'essay',
          title: 'Treinar redação',
          description: 'Escreva uma redação com calma e use o checklist de correção.',
          minutes: 35,
          priority: 'media',
        },
        buildTheoryTask(profile, 'gerais', 'd5-gerais'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Treino físico + manutenção de conteúdo.',
      build: () => [
        {
          id: 'd6-taf',
          type: 'taf',
          title: 'Registrar treino TAF',
          description: 'Faça um treino seguro e registre o desempenho.',
          minutes: 25,
          priority: 'media',
        },
        buildTopicTask(thirdWeakTopic, 'd6-topic'),
      ],
      tasks: [],
    },
    {
      subtitle: 'Fechamento da semana e ajuste de rota.',
      build: () => [
        {
          id: 'd7-review',
          type: 'review',
          title: 'Revisão geral da semana',
          description: 'Revise flashcards, questões erradas e pontos fracos.',
          minutes: 20,
          priority: 'alta',
        },
        {
          id: 'd7-profile',
          type: 'questions',
          title: 'Gerar mais diagnóstico',
          description: 'Responda questões para alimentar o treinador inteligente.',
          minutes: 15,
          priority: 'leve',
        },
      ],
      tasks: [],
    },
  ];

  return templates.map((template, index) => {
    const date = addDays(index);

    return {
      date,
      label: formatDayLabel(date, index),
      subtitle: template.subtitle,
      tasks: template.build(),
    };
  });
}
