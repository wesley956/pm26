import { subjects } from '../data/subjects';
import { useApp } from '../store';
import { getSubjectProgress } from '../utils';
import { ChevronLeft, Calendar } from 'lucide-react';

export default function StudyPlan({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile } = useApp();

  // Priority subjects
  const priorities = [
    { id: 'portugues' as const, hours: 3, label: 'Português (20 questões)' },
    { id: 'matematica' as const, hours: 2, label: 'Matemática (15 questões)' },
    { id: 'gerais' as const, hours: 2, label: 'Conhecimentos Gerais (15 questões)' },
    { id: 'informatica' as const, hours: 1, label: 'Informática (5 questões)' },
    { id: 'administracao' as const, hours: 1, label: 'Administração Pública (5 questões)' },
  ];

  const totalMissions = subjects.flatMap(s => s.missions).length;
  const completedMissions = profile.completedMissions.length;

  return (
    <div className="space-y-4">
      <button onClick={() => onNavigate('dashboard')} className="text-sm text-pm-300 flex items-center gap-1">
        <ChevronLeft size={16} /> Voltar
      </button>
      <h1 className="text-xl font-bold font-[Rajdhani,sans-serif]">📋 Plano de Estudos</h1>
      <p className="text-sm text-gray-400">
        Progresso: <span className="text-gold-400 font-bold">{completedMissions}/{totalMissions}</span> missões completas
      </p>

      {/* Overall progress */}
      <div className="progress-bar h-3">
        <div className="progress-bar-fill bg-gradient-to-r from-pm-500 to-gold-500" style={{ width: `${(completedMissions / totalMissions) * 100}%` }} />
      </div>

      {/* Priority guide */}
      <div className="card border-l-4 border-gold-500">
        <h3 className="text-xs font-bold text-gold-400 mb-2">⚡ PRIORIDADES (baseado no peso na prova)</h3>
        <div className="space-y-2">
          {priorities.map(p => {
            const sub = subjects.find(s => s.id === p.id)!;
            const prog = getSubjectProgress(p.id, profile.completedMissions);
            return (
              <div key={p.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{sub.icon} {p.label}</span>
                <span className="text-xs text-gray-500">{prog}/10</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Plan */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2"><Calendar size={14} /> Plano Semanal Sugerido</h3>
        <div className="space-y-3">
          {[
            { day: 'Segunda', tasks: [
              { text: 'Português — 1 missão (25 min)', subjectId: 'portugues' },
              { text: 'Revisão de erros (10 min)', subjectId: null },
              { text: 'Redação — esboço (15 min)', subjectId: null },
            ]},
            { day: 'Terça', tasks: [
              { text: 'Matemática — 1 missão (25 min)', subjectId: 'matematica' },
              { text: 'Questões de Português (15 min)', subjectId: 'portugues' },
              { text: 'TAF — treino leve (20 min)', subjectId: null },
            ]},
            { day: 'Quarta', tasks: [
              { text: 'Conhecimentos Gerais — 1 missão (25 min)', subjectId: 'gerais' },
              { text: 'Revisão flashcards (10 min)', subjectId: null },
              { text: 'Questões de Matemática (15 min)', subjectId: 'matematica' },
            ]},
            { day: 'Quinta', tasks: [
              { text: 'Informática — 1 missão (20 min)', subjectId: 'informatica' },
              { text: 'Administração — 1 missão (20 min)', subjectId: 'administracao' },
              { text: 'Questões mistas (15 min)', subjectId: null },
            ]},
            { day: 'Sexta', tasks: [
              { text: 'Português — 1 missão (25 min)', subjectId: 'portugues' },
              { text: 'Redação completa (30 min)', subjectId: null },
              { text: 'Revisão da semana (15 min)', subjectId: null },
            ]},
            { day: 'Sábado', tasks: [
              { text: '🏆 Simulado Semanal (30 min)', subjectId: null },
              { text: 'TAF — treino intenso (30 min)', subjectId: null },
              { text: 'Revisão dos erros do simulado (15 min)', subjectId: null },
            ]},
            { day: 'Domingo', tasks: [
              { text: '🧘 Descanso ativo — revisão leve (10 min)', subjectId: null },
              { text: 'Flashcards rápidos (10 min)', subjectId: null },
            ]},
          ].map((dayPlan, i) => (
            <div key={i} className="card">
              <h4 className="text-sm font-bold text-gold-400 mb-2">{dayPlan.day}</h4>
              <div className="space-y-1">
                {dayPlan.tasks.map((task, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-pm-400 shrink-0" />
                    <span className="text-gray-400">{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Come back to plan */}
      <div className="card border-l-4 border-orange-400">
        <h3 className="text-xs font-bold text-orange-400 mb-2">🔄 PERDEU DIAS DE ESTUDO?</h3>
        <p className="text-sm text-gray-400 mb-3">
          Sem problemas! Clique no botão abaixo e o sistema vai escolher a próxima missão para você. Não tente compensar tudo de uma vez — retome o plano.
        </p>
        <button onClick={() => onNavigate('dashboard')} className="btn-gold w-full text-sm">
          Voltar ao Plano — Escolher Próxima Missão
        </button>
      </div>

      {/* Daily checklist */}
      <div className="card">
        <h3 className="text-xs font-bold text-pm-300 mb-3">✅ CHECKLIST DIÁRIO</h3>
        <div className="space-y-2">
          {[
            'Estudar pelo menos 1 missão',
            'Responder pelo menos 5 questões',
            'Revisar erros do dia anterior',
            'Treinar TAF (se dia de treino)',
            'Marcar missão como concluída',
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pomodoro info */}
      <div className="card">
        <h3 className="text-xs font-bold text-pm-300 mb-2">🍅 TÉCNICA POMODORO</h3>
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Estude 25 minutos com foco total</p>
          <p>• Descanse 5 minutos</p>
          <p>• A cada 4 pomodoros, descanse 15-30 min</p>
          <p>• Cada pomodoro = 1 missão concluída</p>
        </div>
      </div>
    </div>
  );
}
