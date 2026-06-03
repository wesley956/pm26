import type { UserProfile } from '../types';

export interface DailyChecklistItem {
  id: string;
  label: string;
  hint: string;
  done: boolean;
}

export interface DailyChecklist {
  mode: 'normal' | 'bad_day';
  today: string;
  title: string;
  subtitle: string;
  items: DailyChecklistItem[];
  completedCount: number;
  totalCount: number;
  isComplete: boolean;
}

export function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isSameDay(dateLike: string | undefined, today: string): boolean {
  if (!dateLike) return false;
  return dateLike.slice(0, 10) === today;
}

export function buildDailyChecklist(profile: UserProfile): DailyChecklist {
  const today = getTodayIso();

  const completedMissionToday = Object.values(profile.completedMissionDates ?? {}).some(date =>
    isSameDay(date, today)
  );

  const answeredToday = Object.values(profile.completedQuestions ?? {}).filter(answer =>
    isSameDay(answer.answeredAt, today)
  ).length;

  const simulationToday = (profile.simulationResults ?? []).some(result =>
    isSameDay(result.date, today)
  );

  const essayToday = (profile.essays ?? []).some(essay =>
    isSameDay(essay.date, today)
  );

  const tafToday = (profile.tafRecords ?? []).some(record =>
    isSameDay(record.date, today)
  );

  const manualMinimumDone = (profile.dailyMinimumDoneDates ?? []).includes(today);

  const anyRealActivityToday =
    completedMissionToday ||
    answeredToday > 0 ||
    simulationToday ||
    essayToday ||
    tafToday ||
    isSameDay(profile.lastStudyDate, today);

  if (profile.studyDayMode === 'bad_day') {
    const items: DailyChecklistItem[] = [
      {
        id: 'minimum',
        label: 'Mínimo de 10 minutos',
        hint: manualMinimumDone
          ? 'Você marcou o mínimo de hoje.'
          : anyRealActivityToday
            ? 'Você já fez uma ação de estudo hoje.'
            : 'Faça uma revisão, uma questão ou uma missão curta.',
        done: manualMinimumDone || anyRealActivityToday,
      },
    ];

    return {
      mode: 'bad_day',
      today,
      title: 'Checklist de sobrevivência',
      subtitle: 'Hoje a missão é só não abandonar. Dez minutos contam.',
      items,
      completedCount: items.filter(item => item.done).length,
      totalCount: items.length,
      isComplete: items.every(item => item.done),
    };
  }

  const items: DailyChecklistItem[] = [
    {
      id: 'mission',
      label: 'Concluir 1 missão',
      hint: completedMissionToday ? 'Missão concluída hoje.' : 'Use a missão inteligente do topo.',
      done: completedMissionToday,
    },
    {
      id: 'questions',
      label: 'Responder 5 questões',
      hint: `${Math.min(answeredToday, 5)}/5 questões respondidas hoje.`,
      done: answeredToday >= 5,
    },
    {
      id: 'support',
      label: 'TAF ou redação',
      hint: essayToday
        ? 'Redação registrada hoje.'
        : tafToday
          ? 'Treino TAF registrado hoje.'
          : 'Faça um treino físico ou escreva uma redação.',
      done: essayToday || tafToday,
    },
  ];

  return {
    mode: 'normal',
    today,
    title: 'Checklist diário TDAH',
    subtitle: 'Poucas tarefas, uma por vez. Complete o mínimo e feche o dia.',
    items,
    completedCount: items.filter(item => item.done).length,
    totalCount: items.length,
    isComplete: items.every(item => item.done),
  };
}
