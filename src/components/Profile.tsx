import type { ChangeEvent } from 'react';
import { useApp } from '../store';
import { subjects } from '../data/subjects';
import { questions } from '../data/questions';
import { getLevelInfo, getMedalDefinitions, getSubjectProgress } from '../utils';
import { Trophy, Target, TrendingUp, AlertTriangle, Download, Upload } from 'lucide-react';

export default function Profile({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const { profile, setBadDayMode } = useApp();
  const info = getLevelInfo(profile);
  const allMedals = getMedalDefinitions();

  const totalAnswered = Object.keys(profile.completedQuestions).length;
  const correctCount = Object.values(profile.completedQuestions).filter(q => q.correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const subjectStats = subjects.map(sub => {
    const subQs = Object.values(profile.completedQuestions).filter(q => {
      const prefix = sub.id === 'portugues' ? 'pt' : sub.id === 'matematica' ? 'mt' : sub.id === 'gerais' ? 'cg' : sub.id === 'informatica' ? 'inf' : 'ap';
      return q.questionId.startsWith(prefix);
    });
    const total = subQs.length;
    const correct = subQs.filter(q => q.correct).length;
    return { ...sub, total, correct, pct: total > 0 ? Math.round((correct / total) * 100) : 0, missionProgress: getSubjectProgress(sub.id, profile.completedMissions) };
  });

  const strengths = subjectStats.filter(s => s.total > 0).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const weaknesses = subjectStats.filter(s => s.total > 0).sort((a, b) => a.pct - b.pct).slice(0, 3);
  const behind = subjectStats.filter(s => s.missionProgress < 5);

  const top100Priorities = subjectStats
    .map(s => {
      const lowPracticePenalty = s.total < 5 ? 30 : 0;
      const lowAccuracyPenalty = s.total > 0 ? Math.max(0, 75 - s.pct) : 25;
      const missionPenalty = Math.max(0, s.missions.length - s.missionProgress) * 3;
      const strategicWeight =
        s.id === 'portugues' ? 20 :
        s.id === 'matematica' ? 16 :
        s.id === 'gerais' ? 16 :
        s.id === 'administracao' ? 12 :
        6;

      const priorityScore = lowPracticePenalty + lowAccuracyPenalty + missionPenalty + strategicWeight;

      const reason =
        s.total < 5 ? 'poucos dados de questões' :
        s.pct < 60 ? 'acerto baixo para brigar por classificação alta' :
        s.missionProgress < s.missions.length ? 'teoria ainda incompleta' :
        'manter revisão para não perder desempenho';

      const action =
        s.missionProgress < s.missions.length ? 'Abrir teoria premium' :
        s.pct < 70 ? 'Treinar questões e revisar erros' :
        'Fazer revisão rápida';

      return { ...s, priorityScore, reason, action };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);


  const questionById = new Map(questions.map(question => [question.id, question]));

  const topicStats = Array.from(
    Object.values(profile.completedQuestions).reduce((map, answer) => {
      const question = questionById.get(answer.questionId);
      if (!question) return map;

      const subject = subjects.find(item => item.id === question.subjectId);
      const key = `${question.subjectId}::${question.topic}`;

      const current = map.get(key) ?? {
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

      map.set(key, current);
      return map;
    }, new Map<string, {
      key: string;
      subjectId: string;
      subjectName: string;
      subjectIcon: string;
      topic: string;
      total: number;
      correct: number;
      wrong: number;
    }>())
    .values()
  ).map(item => ({
    ...item,
    pct: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
    priorityScore: item.wrong * 25 + Math.max(0, 80 - (item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0)) + (item.total < 3 ? 12 : 0),
  }));

  const weakTopics = topicStats
    .filter(item => item.total > 0 && (item.wrong > 0 || item.pct < 70))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 6);

  const startTopicTraining = (subjectId: string, topic: string) => {
    sessionStorage.setItem('pm-sp-topic-filter', JSON.stringify({ subjectId, topic }));
    onNavigate('questions', { subjectId, topic });
  };

  const diagnosticTitle =
    totalAnswered < 20 ? 'Ainda temos poucos dados' :
    accuracy >= 80 ? 'Ritmo competitivo' :
    accuracy >= 65 ? 'Base em construção' :
    'Zona de recuperação';

  const diagnosticMessage =
    totalAnswered < 20
      ? 'Responda mais questões para o diagnóstico ficar preciso. Por enquanto, siga a prioridade automática por peso e dificuldade.'
      : accuracy >= 80
        ? 'Você está em ritmo bom. Agora o foco é manter constância, revisar erros e aumentar volume.'
        : accuracy >= 65
          ? 'Você está construindo base. Para top 100, precisa subir acerto e reduzir os buracos nas matérias prioritárias.'
          : 'Para top 100, o foco agora é recuperar base: teoria curta, revisão guiada e questões comentadas todos os dias.';

  const handleExportProgress = () => {
    const payload = {
      app: 'pm-sp-arena',
      version: 1,
      exportedAt: new Date().toISOString(),
      profile,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `pm-sp-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const handleImportProgress = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    try {
      const content = await file.text();
      const parsed = JSON.parse(content);
      const importedProfile = parsed.profile ?? parsed;

      if (!importedProfile || typeof importedProfile !== 'object' || !('xp' in importedProfile)) {
        throw new Error('Arquivo inválido.');
      }

      if (!confirm('Importar este backup vai substituir o progresso atual neste navegador. Continuar?')) {
        return;
      }

      localStorage.setItem('pm-sp-arena', JSON.stringify(importedProfile));
      alert('Backup importado com sucesso. O app será recarregado.');
      window.location.reload();
    } catch {
      alert('Não consegui importar esse arquivo. Verifique se é um backup válido do PM-SP Arena.');
    }
  };

  return (
    <div className="study-wide">
      <div className="mb-6">
        <p className="section-label mb-2">Diagnóstico</p>
        <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">Perfil do aluno</h1>
        <p className="study-subtitle mt-2">
          Veja seu progresso, prioridades e pontos de atenção sem poluição visual.
        </p>
      </div>

      <section className="study-card mb-5 text-center">
        <div className="text-5xl">{info.icon}</div>
        <h2 className="mt-2 font-[Rajdhani,sans-serif] text-4xl font-black text-gold-400">{info.title}</h2>
        <p className="text-slate-400">Nível {info.level}</p>

        <div className="mx-auto mt-5 max-w-xl">
          <div className="xp-bar-wrap">
            <div className="xp-bar-fill" style={{ width: `${info.progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-slate-500">{info.xpInLevel}/{info.xpForNext} XP para próximo nível</p>
        </div>

        <p className="mt-3 text-xl font-black text-white">{profile.xp.toLocaleString()} XP total</p>
      </section>

      <section className="metric-grid mb-5">
        <div className="metric-card">
          <p className="metric-value text-orange-300">{profile.streak}</p>
          <p className="metric-label">Dias seguidos</p>
        </div>
        <div className="metric-card">
          <p className="metric-value">{profile.completedMissions.length}</p>
          <p className="metric-label">Missões completas</p>
        </div>
        <div className="metric-card">
          <p className="metric-value">{totalAnswered}</p>
          <p className="metric-label">Questões respondidas</p>
        </div>
        <div className="metric-card">
          <p className="metric-value text-gold-400">{accuracy}%</p>
          <p className="metric-label">Taxa de acerto</p>
        </div>
      </section>

      <section className="study-card mb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-black text-white">
              <Target size={18} className="text-danger" /> Diagnóstico Top 100
            </h3>
            <p className="mt-1 text-sm text-slate-400">{diagnosticTitle}</p>
          </div>

          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-black ${
            accuracy >= 80 ? 'bg-success/15 text-success' :
            accuracy >= 65 ? 'bg-gold-500/15 text-gold-400' :
            'bg-danger/15 text-danger'
          }`}>
            {accuracy}% geral
          </span>
        </div>

        <p className="study-body mt-4">{diagnosticMessage}</p>

        <div className="mt-5 grid gap-3">
          {top100Priorities.map((s, index) => (
            <button
              key={s.id}
              onClick={() => onNavigate('subject', { subjectId: s.id })}
              className="profile-priority-card"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-white">
                  {index + 1}. {s.icon} {s.name}
                </p>
                <span className={`text-sm font-black ${
                  s.total === 0 ? 'text-slate-500' :
                  s.pct >= 75 ? 'text-success' :
                  s.pct >= 60 ? 'text-gold-400' :
                  'text-danger'
                }`}>
                  {s.total > 0 ? `${s.pct}%` : 'sem dados'}
                </span>
              </div>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {s.reason} • {s.missionProgress}/{s.missions.length} missões • {s.total} questões
              </p>
              <p className="mt-1 text-sm font-bold text-pm-300">
                Próxima ação: {s.action}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="study-card mb-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-black text-white">
              <AlertTriangle size={18} className="text-gold-400" /> Tópicos fracos
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Aqui o sistema deixa de falar só a matéria e mostra o assunto exato que está puxando sua nota para baixo.
            </p>
          </div>

          <span className="topic-pill">
            {weakTopics.length} prioridade(s)
          </span>
        </div>

        {weakTopics.length > 0 ? (
          <div className="topic-diagnostic-grid">
            {weakTopics.map(topic => (
              <button
                key={topic.key}
                onClick={() => startTopicTraining(topic.subjectId, topic.topic)}
                className="topic-card"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-black text-white">
                    {topic.subjectIcon} {topic.topic}
                  </p>

                  <span className={`text-sm font-black ${
                    topic.pct >= 70 ? 'text-success' :
                    topic.pct >= 50 ? 'text-gold-400' :
                    'text-danger'
                  }`}>
                    {topic.pct}% de acerto
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">
                  {topic.subjectName} • {topic.total} respondida(s) • {topic.wrong} erro(s)
                </p>

                <p className="mt-2 text-sm font-bold text-pm-300">
                  Treinar este tópico agora
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="reading-callout">
            <p className="font-bold text-white">Ainda não há tópico fraco detectado.</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Responda mais questões. Assim que aparecer padrão de erro, o sistema vai mostrar exatamente o que atacar.
            </p>
          </div>
        )}
      </section>

      <section className="study-card mb-5">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-white">
          <Target size={18} /> Progresso por matéria
        </h3>

        <div className="grid gap-4">
          {subjectStats.map(s => {
            const pct = Math.round((s.missionProgress / s.missions.length) * 100);

            return (
              <button
                key={s.id}
                onClick={() => onNavigate('subject', { subjectId: s.id })}
                className="w-full text-left"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-white">{s.icon} {s.name}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500">{s.missionProgress}/{s.missions.length} missões</span>
                    {s.total > 0 && (
                      <span className={s.pct >= 70 ? 'text-success' : s.pct >= 50 ? 'text-gold-400' : 'text-danger'}>
                        {s.pct}% acerto
                      </span>
                    )}
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: s.color }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        {strengths.length > 0 && (
          <section className="study-card">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-black text-white">
              <TrendingUp size={18} className="text-success" /> Pontos fortes
            </h3>
            <div className="grid gap-2">
              {strengths.map(s => (
                <div key={s.id} className="list-card flex justify-between">
                  <span>{s.icon} {s.name}</span>
                  <span className="font-black text-success">{s.pct}%</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {weaknesses.length > 0 && (
          <section className="study-card">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-black text-white">
              <AlertTriangle size={18} className="text-danger" /> Pontos fracos
            </h3>
            <div className="grid gap-2">
              {weaknesses.map(s => (
                <button
                  key={s.id}
                  onClick={() => onNavigate('subject', { subjectId: s.id })}
                  className="list-card flex justify-between text-left"
                >
                  <span>{s.icon} {s.name}</span>
                  <span className="font-black text-danger">{s.pct}%</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {behind.length > 0 && (
        <section className="study-card mb-5">
          <h3 className="study-kicker orange">Matérias atrasadas</h3>
          <div className="grid gap-2">
            {behind.map(s => (
              <button
                key={s.id}
                onClick={() => onNavigate('subject', { subjectId: s.id })}
                className="list-card w-full text-left text-sm text-slate-300"
              >
                {s.icon} {s.name} — {s.missionProgress}/{s.missions.length} missões
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="study-card mb-5">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-white">
          <Trophy size={18} className="text-gold-400" /> Medalhas ({profile.medals.length}/{allMedals.length})
        </h3>

        <div className="medal-grid">
          {allMedals.map(medal => {
            const earned = profile.medals.find(m => m.id === medal.id);
            return (
              <div key={medal.id} className={`list-card text-center ${earned ? 'border-gold-500/30' : 'opacity-45'}`}>
                <div className="text-3xl">{medal.icon}</div>
                <p className="mt-2 text-sm font-black text-white">{medal.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{medal.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="study-card mb-5">
        <h3 className="mb-2 text-xl font-black text-white">Backup do progresso</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Salve seu progresso em um arquivo para não perder tudo se trocar de celular, limpar o navegador ou reinstalar o app.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={handleExportProgress} className="btn-primary flex items-center justify-center gap-2 text-sm">
            <Download size={15} /> Exportar
          </button>

          <label className="btn-primary flex cursor-pointer items-center justify-center gap-2 text-sm">
            <Upload size={15} /> Importar
            <input type="file" accept="application/json,.json" onChange={handleImportProgress} className="hidden" />
          </label>
        </div>
      </section>

      <div className="grid gap-3 text-center">
        <button onClick={() => setBadDayMode(true)} className="btn-ghost w-full">
          Ativar modo Dia Ruim — só 10 min de estudo
        </button>

        <button
          onClick={() => {
            if (confirm('Tem certeza? Todo o progresso será perdido!')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="text-sm text-danger/60 hover:text-danger"
        >
          Resetar todo o progresso
        </button>
      </div>
    </div>
  );
}
