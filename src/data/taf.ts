import { TAFExercise } from '../types';

export const tafExercises: TAFExercise[] = [
  { id: 'taf-corrida', name: 'Corrida de 2.400m', description: 'Corrida de longa distância para avaliar resistência cardiovascular.', maleStandard: 'Tempo máximo: 12 minutos', femaleStandard: 'Tempo máximo: 15 minutos', unit: 'minutos' },
  { id: 'taf-velocidade', name: 'Velocidade 50m', description: 'Sprint de 50 metros para avaliar velocidade.', maleStandard: 'Tempo máximo: 7,5 segundos', femaleStandard: 'Tempo máximo: 9,0 segundos', unit: 'segundos' },
  { id: 'taf-abdominal', name: 'Abdominal (Remador)', description: 'Exercício abdominal no banco romano, medindo resistência muscular.', maleStandard: 'Mínimo: 30 repetições', femaleStandard: 'Mínimo: 25 repetições', unit: 'repetições' },
  { id: 'taf-barra', name: 'Barra Fixa (Masculino) / Isometria (Feminino)', description: 'Força muscular dos membros superiores.', maleStandard: 'Mínimo: 3 repetições na barra fixa', femaleStandard: 'Mínimo: 30 segundos de isometria na barra', unit: 'repetições/segundos' },
];

export const tafPlanMale = [
  { week: 1, label: 'Semana 1 — Iniciação', activities: [
    'Corrida: 15min de trotes leves (alternando 2min correndo, 1min caminhando)',
    'Abdominais: 3 séries de 10 repetições',
    'Barra: 3 tentativas de suspensão estática (máximo tempo possível)',
    'Velocidade: 4 tiros de 30m (70% da velocidade máxima)',
  ]},
  { week: 2, label: 'Semana 2 — Adaptação', activities: [
    'Corrida: 20min de trote contínuo',
    'Abdominais: 3 séries de 15 repetições',
    'Barra: 3 tentativas (tentar pelo menos 1 repetição)',
    'Velocidade: 5 tiros de 30m (80% da velocidade máxima)',
  ]},
  { week: 3, label: 'Semana 3 — Progressão', activities: [
    'Corrida: 2.000m cronometrados',
    'Abdominais: 3 séries de 20 repetições',
    'Barra: 4 séries de negativas (descer lentamente)',
    'Velocidade: 6 tiros de 40m (85%)',
  ]},
  { week: 4, label: 'Semana 4 — Intensificação', activities: [
    'Corrida: 2.400m cronometrados (meta: abaixo de 14min)',
    'Abdominais: 4 séries de 20 repetições',
    'Barra: tentar 2 repetições por série (4 séries)',
    'Velocidade: 4 tiros de 50m cronometrados',
  ]},
  { week: 5, label: 'Semana 5 — Consolidação', activities: [
    'Corrida: 2.400m (meta: abaixo de 13min)',
    'Abdominais: 3 séries de 25 repetições',
    'Barra: meta de 3 repetições seguidas',
    'Velocidade: 5 tiros de 50m (acima de 90%)',
  ]},
  { week: 6, label: 'Semana 6 — Performance', activities: [
    'Corrida: 2.400m (meta: abaixo de 12min)',
    'Abdominais: 3 séries de 30 repetições',
    'Barra: meta de 4+ repetições',
    'Velocidade: 50m abaixo de 8 segundos',
  ]},
];

export const tafPlanFemale = [
  { week: 1, label: 'Semana 1 — Iniciação', activities: [
    'Corrida: 15min de trotes leves (alternando 2min correndo, 1min caminhando)',
    'Abdominais: 3 séries de 8 repetições',
    'Isometria: 3 tentativas de suspensão na barra (segurar o máximo)',
    'Velocidade: 4 tiros de 30m (70% da velocidade máxima)',
  ]},
  { week: 2, label: 'Semana 2 — Adaptação', activities: [
    'Corrida: 20min de trote contínuo',
    'Abdominais: 3 séries de 12 repetições',
    'Isometria: 3 tentativas (meta: 10 segundos)',
    'Velocidade: 5 tiros de 30m (80%)',
  ]},
  { week: 3, label: 'Semana 3 — Progressão', activities: [
    'Corrida: 2.000m cronometrados',
    'Abdominais: 3 séries de 15 repetições',
    'Isometria: meta de 15 segundos por tentativa',
    'Velocidade: 6 tiros de 40m (85%)',
  ]},
  { week: 4, label: 'Semana 4 — Intensificação', activities: [
    'Corrida: 2.400m cronometrados (meta: abaixo de 17min)',
    'Abdominais: 4 séries de 15 repetições',
    'Isometria: meta de 20 segundos',
    'Velocidade: 4 tiros de 50m cronometrados',
  ]},
  { week: 5, label: 'Semana 5 — Consolidação', activities: [
    'Corrida: 2.400m (meta: abaixo de 16min)',
    'Abdominais: 3 séries de 20 repetições',
    'Isometria: meta de 25 segundos',
    'Velocidade: 5 tiros de 50m (acima de 90%)',
  ]},
  { week: 6, label: 'Semana 6 — Performance', activities: [
    'Corrida: 2.400m (meta: abaixo de 15min)',
    'Abdominais: 3 séries de 25 repetições',
    'Isometria: meta de 30 segundos',
    'Velocidade: 50m abaixo de 9 segundos',
  ]},
];

export const tafSafetyWarnings = [
  '⚠️ Sempre faça aquecimento antes do treino (5-10min de caminhada + alongamento)',
  '⚠️ Hidrate-se antes, durante e após o exercício',
  '⚠️ Se sentir dor no peito, tontura ou falta de ar intensa, PARE imediatamente',
  '⚠️ Não treine em jejum; faça uma refeição leve 1-2h antes',
  '⚠️ Use calçados adequados para corrida',
  '⚠️ Aumente a intensidade gradualmente — não tente compensar dias perdidos',
  '⚠️ Faça alongamento após o treino para evitar lesões',
  '⚠️ Consulte um médico antes de iniciar qualquer programa de treino intenso',
  '⚠️ Durma pelo menos 7-8h por noite para recuperação muscular',
  '⚠️ Respeite pelo menos 1 dia de descanso entre treinos intensos',
];
