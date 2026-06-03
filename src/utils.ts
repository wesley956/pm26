import { LEVELS, UserProfile } from './types';
import { EXAM_CONFIG, formatPtBrDate } from './config/examConfig';

export function getLevelInfo(profile: UserProfile) {
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
  return {
    level: current.level,
    title: current.title,
    icon: current.icon,
    xpInLevel,
    xpForNext: xpNeeded,
    progress: xpNeeded > 0 ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100,
  };
}

export function getMedalDefinitions() {
  return [
    { id: 'm1', name: 'Primeira Missão', desc: 'Complete sua primeira missão', icon: '🎯' },
    { id: 'm2', name: 'Estudante Dedicado', desc: 'Estude 7 dias seguidos', icon: '🔥' },
    { id: 'm3', name: 'Guerreiro do Saber', desc: 'Acerte 20 questões', icon: '⚔️' },
    { id: 'm4', name: 'Maratonista', desc: 'Complete um simulado inteiro', icon: '🏃' },
    { id: 'm5', name: 'Escritor', desc: 'Escreva sua primeira redação', icon: '✍️' },
    { id: 'm6', name: 'Atleta em Treino', desc: 'Registre um treino TAF', icon: '💪' },
    { id: 'm7', name: 'Mestre de Português', desc: 'Complete 5 missões de Português', icon: '📖' },
    { id: 'm8', name: 'Cérebro Matemático', desc: 'Complete 5 missões de Matemática', icon: '🧮' },
    { id: 'm9', name: 'Enciclopédia', desc: 'Complete 5 missões de Conhecimentos Gerais', icon: '🌍' },
    { id: 'm10', name: 'Hacker', desc: 'Complete todas as missões de Informática', icon: '💻' },
    { id: 'm11', name: 'Gestor Público', desc: 'Complete todas as missões de Administração', icon: '🏛️' },
    { id: 'm12', name: 'Lenda da Arena', desc: 'Alcance o nível 5', icon: '👑' },
    { id: 'm13', name: 'Sequência de Ouro', desc: '30 dias seguidos estudando', icon: '🌟' },
    { id: 'm14', name: 'Sem Erros', desc: 'Acerte 10 questões seguidas', icon: '💯' },
    { id: 'm15', name: 'Preparado para Batalha', desc: 'Complete todas as missões', icon: '🎖️' },
  ];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function getDaysUntil(dateIso: string): number {
  const target = new Date(`${dateIso}T23:59:59`);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getPrimaryDeadlineInfo() {
  const knowledgeExam = EXAM_CONFIG.importantDates.knowledgeExam;

  if (knowledgeExam) {
    return {
      daysLeft: getDaysUntil(knowledgeExam),
      title: 'até a prova objetiva',
      subtitle: `Prova prevista para ${formatPtBrDate(knowledgeExam)}`,
      helper: `${EXAM_CONFIG.shortTitle} • ${EXAM_CONFIG.board}`,
    };
  }

  return {
    daysLeft: getDaysUntil(EXAM_CONFIG.importantDates.applicationEnd),
    title: 'até o fim das inscrições',
    subtitle: `Inscrições: ${formatPtBrDate(EXAM_CONFIG.importantDates.applicationStart)} a ${formatPtBrDate(EXAM_CONFIG.importantDates.applicationEnd)}`,
    helper: `${EXAM_CONFIG.shortTitle} • ${EXAM_CONFIG.contestCode}`,
  };
}

export function getDaysUntilExam(): number {
  const date =
    EXAM_CONFIG.importantDates.knowledgeExam ??
    EXAM_CONFIG.importantDates.applicationEnd;

  return getDaysUntil(date);
}

export function getSubjectProgress(subjectId: string, completedMissions: string[]): number {
  const prefix = subjectId === 'portugues' ? 'pt-' : subjectId === 'matematica' ? 'mt-' : subjectId === 'gerais' ? 'cg-' : subjectId === 'informatica' ? 'inf-' : 'ap-';
  const relevant = completedMissions.filter(id => id.startsWith(prefix));
  return relevant.length; // out of 10 missions
}
