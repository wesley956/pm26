import { useMemo, useState } from 'react';

type KneeStatus = 'normal' | 'strange' | 'unstable';
type EnergyStatus = 'low' | 'medium' | 'high';
type WorkoutMode = 'full' | 'short';

type ExerciseCategory = 'corda' | 'forca' | 'joelho' | 'core' | 'simulado' | 'mobilidade';
type DemoType =
  | 'jump-rope'
  | 'bent-row'
  | 'shoulder-press'
  | 'floor-press'
  | 'romanian-deadlift'
  | 'goblet-squat'
  | 'glute-bridge'
  | 'plank'
  | 'straight-leg'
  | 'calf-raise'
  | 'wall-sit'
  | 'dead-bug'
  | 'push-up'
  | 'step-up'
  | 'generic';

type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets?: string;
  reps?: string;
  duration?: string;
  equipment?: string;
  muscle: string;
  instructions: string[];
  mistakes: string[];
  kneeNote?: string;
  demo: DemoType;
};

type WorkoutItem = {
  exerciseId: string;
  prescription: string;
  optional?: boolean;
};

type TafDay = {
  day: number;
  title: string;
  focus: string;
  intensity: 'leve' | 'média' | 'pesada' | 'teste';
  estimatedMinutes: number;
  rope: WorkoutItem[];
  strength: WorkoutItem[];
  knee: WorkoutItem[];
  core: WorkoutItem[];
  emergency: WorkoutItem[];
};

type TafRecord = {
  date: string;
  day: number;
  title: string;
  knee: KneeStatus;
  energy: EnergyStatus;
  mode: WorkoutMode;
  completedIds: string[];
  breath: 'facil' | 'medio' | 'dificil';
  pain: number;
  notes: string;
};

const STORAGE_KEY = 'pm-sp-taf-sem-corrida-v1';

const kneeLabels: Record<KneeStatus, string> = {
  normal: 'Normal',
  strange: 'Estranho',
  unstable: 'Instável / dolorido',
};

const energyLabels: Record<EnergyStatus, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

const exercises: Exercise[] = [
  {
    id: 'rope-basic',
    name: 'Corda — salto básico',
    category: 'corda',
    equipment: 'Corda',
    muscle: 'Fôlego, panturrilha, coordenação e resistência mental',
    instructions: [
      'Salte baixo, só o suficiente para a corda passar.',
      'Mantenha cotovelos perto do corpo.',
      'Gire a corda mais com os punhos do que com os braços.',
      'Pouse leve, sem bater forte o calcanhar.',
    ],
    mistakes: ['Saltar alto demais', 'Cair pesado no chão', 'Travancar o ombro', 'Continuar se o joelho falsear'],
    kneeNote: 'Se o joelho ficar estranho, reduza o tempo ou troque por marcha rápida sem salto.',
    demo: 'jump-rope',
  },
  {
    id: 'rope-technique',
    name: 'Corda técnica leve',
    category: 'corda',
    equipment: 'Corda',
    muscle: 'Técnica, coordenação e fôlego leve',
    instructions: [
      'Use ritmo confortável.',
      'Faça saltos curtos.',
      'Pare antes de perder a técnica.',
      'Respire pelo nariz e solte pela boca quando possível.',
    ],
    mistakes: ['Querer acelerar no dia leve', 'Saltar alto', 'Ignorar sinal do joelho'],
    kneeNote: 'É a versão mais segura da corda para dias cansados.',
    demo: 'jump-rope',
  },
  {
    id: 'bent-row',
    name: 'Remada curvada com barra',
    category: 'forca',
    equipment: 'Barra / halteres',
    muscle: 'Costas, bíceps, antebraço e postura',
    instructions: [
      'Dobre levemente os joelhos.',
      'Jogue o quadril para trás, sem arredondar a lombar.',
      'Puxe a barra em direção à barriga.',
      'Desça controlando, sem tranco.',
    ],
    mistakes: ['Arredondar as costas', 'Puxar no impulso', 'Deixar a barra longe do corpo', 'Olhar muito para cima'],
    kneeNote: 'Mantenha joelhos destravados. Se o joelho incomodar, faça remada apoiada com halter.',
    demo: 'bent-row',
  },
  {
    id: 'shoulder-press',
    name: 'Desenvolvimento de ombro',
    category: 'forca',
    equipment: 'Barra / halteres',
    muscle: 'Ombros, tríceps e core',
    instructions: [
      'Comece com a barra ou halteres na altura do peito.',
      'Contraia abdômen e glúteos.',
      'Empurre para cima sem jogar a lombar para trás.',
      'Desça até a altura do peito com controle.',
    ],
    mistakes: ['Arquear a lombar', 'Usar peso demais', 'Subir no tranco', 'Prender a respiração por muito tempo'],
    demo: 'shoulder-press',
  },
  {
    id: 'floor-press',
    name: 'Supino no chão com halteres',
    category: 'forca',
    equipment: 'Halteres',
    muscle: 'Peito, tríceps e força para flexão',
    instructions: [
      'Deite no chão com joelhos dobrados.',
      'Segure os halteres ao lado do peito.',
      'Empurre para cima até estender os braços.',
      'Desça até o braço tocar levemente o chão.',
    ],
    mistakes: ['Bater o cotovelo no chão', 'Abrir demais os braços', 'Usar peso que tira o controle'],
    demo: 'floor-press',
  },
  {
    id: 'romanian-deadlift',
    name: 'Levantamento terra romeno',
    category: 'forca',
    equipment: 'Barra / halteres',
    muscle: 'Posterior de coxa, glúteos e lombar protegida',
    instructions: [
      'Fique em pé com a barra perto das coxas.',
      'Jogue o quadril para trás.',
      'Desça a barra perto das pernas até sentir posterior alongar.',
      'Suba contraindo glúteos, sem arredondar as costas.',
    ],
    mistakes: ['Dobrar demais os joelhos', 'Arredondar a lombar', 'Afastar a barra do corpo', 'Descer além do controle'],
    kneeNote: 'Excelente para fortalecer posterior e ajudar a proteger o joelho.',
    demo: 'romanian-deadlift',
  },
  {
    id: 'goblet-squat',
    name: 'Agachamento goblet curto',
    category: 'forca',
    equipment: 'Halter',
    muscle: 'Pernas, glúteos e core',
    instructions: [
      'Segure um halter perto do peito.',
      'Desça pouco e com controle.',
      'Mantenha joelhos apontando na mesma direção dos pés.',
      'Suba empurrando o chão, sem colapsar o joelho para dentro.',
    ],
    mistakes: ['Descer fundo com dor', 'Joelho entrar para dentro', 'Perder a coluna neutra', 'Usar peso demais'],
    kneeNote: 'Se o joelho estiver estranho, troque por ponte de glúteo e elevação de perna reta.',
    demo: 'goblet-squat',
  },
  {
    id: 'push-up',
    name: 'Flexão',
    category: 'forca',
    equipment: 'Peso corporal',
    muscle: 'Peito, tríceps, ombro e core',
    instructions: [
      'Mãos firmes no chão ou em apoio elevado.',
      'Corpo reto, abdômen firme.',
      'Desça controlando.',
      'Suba empurrando o chão.',
    ],
    mistakes: ['Quadril cair', 'Pescoço solto', 'Meia repetição sem controle', 'Abrir demais os cotovelos'],
    demo: 'push-up',
  },
  {
    id: 'triceps',
    name: 'Tríceps testa com halteres',
    category: 'forca',
    equipment: 'Halteres',
    muscle: 'Tríceps e força para flexão',
    instructions: [
      'Deite no chão ou fique em posição estável.',
      'Mantenha cotovelos apontando para cima.',
      'Desça o peso com controle.',
      'Estenda o cotovelo sem jogar o ombro.',
    ],
    mistakes: ['Abrir cotovelos demais', 'Peso excessivo', 'Movimento rápido demais'],
    demo: 'generic',
  },
  {
    id: 'curl',
    name: 'Rosca direta',
    category: 'forca',
    equipment: 'Barra / halteres',
    muscle: 'Bíceps e antebraço',
    instructions: [
      'Fique em pé com abdômen firme.',
      'Suba o peso dobrando os cotovelos.',
      'Desça devagar.',
      'Não balance o corpo.',
    ],
    mistakes: ['Roubar com a lombar', 'Subir rápido e cair o peso', 'Abrir demais os cotovelos'],
    demo: 'generic',
  },
  {
    id: 'straight-leg-raise',
    name: 'Elevação de perna reta',
    category: 'joelho',
    equipment: 'Peso corporal',
    muscle: 'Quadríceps e estabilidade do joelho',
    instructions: [
      'Deite de barriga para cima.',
      'Uma perna fica dobrada e a outra reta.',
      'Eleve a perna reta devagar.',
      'Desça controlando sem relaxar totalmente.',
    ],
    mistakes: ['Subir no tranco', 'Dobrar a perna que deveria ficar reta', 'Prender a respiração'],
    kneeNote: 'Bloco essencial de blindagem do joelho.',
    demo: 'straight-leg',
  },
  {
    id: 'glute-bridge',
    name: 'Ponte de glúteo',
    category: 'joelho',
    equipment: 'Peso corporal / halter opcional',
    muscle: 'Glúteos, posterior e estabilidade pélvica',
    instructions: [
      'Deite com joelhos dobrados.',
      'Pés apoiados no chão.',
      'Suba o quadril contraindo glúteos.',
      'Desça devagar.',
    ],
    mistakes: ['Arquear lombar demais', 'Empurrar só com a lombar', 'Joelhos abrirem ou fecharem demais'],
    kneeNote: 'Ajuda a estabilizar quadril e reduzir sobrecarga no joelho.',
    demo: 'glute-bridge',
  },
  {
    id: 'clamshell',
    name: 'Clamshell',
    category: 'joelho',
    equipment: 'Peso corporal',
    muscle: 'Glúteo médio e estabilidade lateral do joelho',
    instructions: [
      'Deite de lado com joelhos dobrados.',
      'Mantenha os pés juntos.',
      'Abra o joelho de cima sem girar o tronco.',
      'Feche devagar.',
    ],
    mistakes: ['Girar o corpo para trás', 'Fazer rápido demais', 'Perder controle do quadril'],
    kneeNote: 'Ótimo para ajudar o joelho a não cair para dentro.',
    demo: 'generic',
  },
  {
    id: 'calf-raise',
    name: 'Panturrilha em pé',
    category: 'joelho',
    equipment: 'Peso corporal / halter opcional',
    muscle: 'Panturrilha, tornozelo e suporte para corda',
    instructions: [
      'Fique em pé com apoio se precisar.',
      'Suba na ponta dos pés.',
      'Segure um instante.',
      'Desça controlando.',
    ],
    mistakes: ['Cair rápido', 'Virar tornozelo', 'Fazer sem controle'],
    kneeNote: 'Fortalece a base para saltos curtos da corda.',
    demo: 'calf-raise',
  },
  {
    id: 'wall-sit',
    name: 'Wall sit curto',
    category: 'joelho',
    equipment: 'Parede',
    muscle: 'Quadríceps e resistência de perna',
    instructions: [
      'Encoste as costas na parede.',
      'Desça pouco, sem passar do limite do joelho.',
      'Segure a posição.',
      'Suba devagar.',
    ],
    mistakes: ['Descer fundo demais', 'Segurar com dor', 'Joelho entrar para dentro'],
    kneeNote: 'Use curto e controlado. Se doer, pare.',
    demo: 'wall-sit',
  },
  {
    id: 'step-up',
    name: 'Step-up baixo',
    category: 'joelho',
    equipment: 'Degrau baixo',
    muscle: 'Pernas, equilíbrio e estabilidade',
    instructions: [
      'Use um degrau baixo e firme.',
      'Suba controlando o joelho.',
      'Desça devagar.',
      'Alterne as pernas.',
    ],
    mistakes: ['Degrau alto demais', 'Joelho cair para dentro', 'Descer despencando'],
    kneeNote: 'Só faça com joelho normal. Se estiver estranho, troque por ponte de glúteo.',
    demo: 'step-up',
  },
  {
    id: 'plank',
    name: 'Prancha',
    category: 'core',
    equipment: 'Peso corporal',
    muscle: 'Core, abdômen, ombro e lombar protegida',
    instructions: [
      'Apoie antebraços ou mãos.',
      'Mantenha corpo reto.',
      'Contraia abdômen e glúteos.',
      'Respire curto e controlado.',
    ],
    mistakes: ['Quadril cair', 'Bunda subir demais', 'Prender a respiração'],
    demo: 'plank',
  },
  {
    id: 'side-plank',
    name: 'Prancha lateral',
    category: 'core',
    equipment: 'Peso corporal',
    muscle: 'Core lateral, quadril e estabilidade',
    instructions: [
      'Apoie o antebraço no chão.',
      'Mantenha o corpo alinhado.',
      'Segure sem deixar o quadril cair.',
      'Troque de lado.',
    ],
    mistakes: ['Quadril cair', 'Ombro encolher', 'Girar o tronco'],
    demo: 'plank',
  },
  {
    id: 'dead-bug',
    name: 'Dead bug',
    category: 'core',
    equipment: 'Peso corporal',
    muscle: 'Core sem forçar lombar',
    instructions: [
      'Deite de barriga para cima.',
      'Eleve braços e pernas.',
      'Estenda braço e perna opostos.',
      'Volte controlando e alterne.',
    ],
    mistakes: ['Arquear lombar', 'Fazer rápido demais', 'Perder controle abdominal'],
    demo: 'dead-bug',
  },
  {
    id: 'abdominal',
    name: 'Abdominal',
    category: 'core',
    equipment: 'Peso corporal',
    muscle: 'Abdômen e resistência para teste',
    instructions: [
      'Suba controlando o tronco.',
      'Não puxe o pescoço.',
      'Desça com controle.',
      'Mantenha ritmo constante.',
    ],
    mistakes: ['Puxar a cabeça', 'Bater as costas', 'Fazer só no impulso'],
    demo: 'generic',
  },
  {
    id: 'mobility',
    name: 'Mobilidade de tornozelo e quadril',
    category: 'mobilidade',
    equipment: 'Peso corporal',
    muscle: 'Preparação articular',
    instructions: [
      'Faça movimentos lentos.',
      'Aqueça tornozelos, quadril e ombros.',
      'Não force dor.',
      'Use antes de corda e perna.',
    ],
    mistakes: ['Fazer rápido demais', 'Pular aquecimento', 'Forçar articulação dolorida'],
    demo: 'generic',
  },
];

const plan: TafDay[] = [
  {
    day: 1,
    title: 'Corda + Costas/Ombro',
    focus: 'Construir fôlego e força de puxada',
    intensity: 'média',
    estimatedMinutes: 32,
    rope: [{ exerciseId: 'rope-basic', prescription: '10 rodadas — 20s pulando / 40s descanso' }],
    strength: [
      { exerciseId: 'bent-row', prescription: '3x10' },
      { exerciseId: 'shoulder-press', prescription: '3x8' },
      { exerciseId: 'floor-press', prescription: '3x10' },
    ],
    knee: [
      { exerciseId: 'straight-leg-raise', prescription: '3x12 cada perna' },
      { exerciseId: 'calf-raise', prescription: '3x15' },
    ],
    core: [{ exerciseId: 'plank', prescription: '3x20s' }],
    emergency: [
      { exerciseId: 'rope-technique', prescription: '5 min leve' },
      { exerciseId: 'push-up', prescription: '2 séries controladas' },
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
    ],
  },
  {
    day: 2,
    title: 'Corda + Pernas Protegidas',
    focus: 'Fortalecer posterior, glúteo e joelho',
    intensity: 'média',
    estimatedMinutes: 34,
    rope: [{ exerciseId: 'rope-basic', prescription: '8 rodadas — 30s / 30s' }],
    strength: [
      { exerciseId: 'romanian-deadlift', prescription: '3x10' },
      { exerciseId: 'glute-bridge', prescription: '3x12' },
      { exerciseId: 'goblet-squat', prescription: '3x8 curto e controlado' },
    ],
    knee: [
      { exerciseId: 'calf-raise', prescription: '3x15' },
      { exerciseId: 'wall-sit', prescription: '3x20s' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '3x10 cada lado' }],
    emergency: [
      { exerciseId: 'glute-bridge', prescription: '3x12' },
      { exerciseId: 'straight-leg-raise', prescription: '3x12' },
      { exerciseId: 'calf-raise', prescription: '3x15' },
    ],
  },
  {
    day: 3,
    title: 'Corda + Flexão/Core',
    focus: 'Força específica para TAF',
    intensity: 'média',
    estimatedMinutes: 31,
    rope: [{ exerciseId: 'rope-basic', prescription: '12 rodadas — 20s / 40s' }],
    strength: [
      { exerciseId: 'push-up', prescription: '4 séries com técnica boa' },
      { exerciseId: 'floor-press', prescription: '3x10' },
      { exerciseId: 'triceps', prescription: '3x10' },
    ],
    knee: [{ exerciseId: 'glute-bridge', prescription: '2x15' }],
    core: [
      { exerciseId: 'abdominal', prescription: '3 séries' },
      { exerciseId: 'side-plank', prescription: '2x20s cada lado' },
    ],
    emergency: [
      { exerciseId: 'rope-technique', prescription: '5 min leve' },
      { exerciseId: 'push-up', prescription: '2 séries' },
      { exerciseId: 'plank', prescription: '2x20s' },
    ],
  },
  {
    day: 4,
    title: 'Corda Leve + Joelho Blindado',
    focus: 'Recuperar sem perder sequência',
    intensity: 'leve',
    estimatedMinutes: 26,
    rope: [{ exerciseId: 'rope-technique', prescription: '8 min em ritmo confortável' }],
    strength: [],
    knee: [
      { exerciseId: 'straight-leg-raise', prescription: '3x12 cada perna' },
      { exerciseId: 'clamshell', prescription: '3x12 cada lado' },
      { exerciseId: 'glute-bridge', prescription: '3x15' },
      { exerciseId: 'calf-raise', prescription: '3x15' },
      { exerciseId: 'wall-sit', prescription: '3x20s' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '2x10 cada lado' }],
    emergency: [
      { exerciseId: 'mobility', prescription: '5 min' },
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
      { exerciseId: 'glute-bridge', prescription: '2x12' },
    ],
  },
  {
    day: 5,
    title: 'Corda Forte + Corpo Inteiro',
    focus: 'Resistência geral',
    intensity: 'pesada',
    estimatedMinutes: 36,
    rope: [{ exerciseId: 'rope-basic', prescription: '10 rodadas — 30s / 30s' }],
    strength: [
      { exerciseId: 'bent-row', prescription: '3x10' },
      { exerciseId: 'goblet-squat', prescription: '3x8 curto' },
      { exerciseId: 'shoulder-press', prescription: '3x8' },
      { exerciseId: 'romanian-deadlift', prescription: '3x10' },
    ],
    knee: [{ exerciseId: 'calf-raise', prescription: '3x15' }],
    core: [{ exerciseId: 'abdominal', prescription: '3 séries' }],
    emergency: [
      { exerciseId: 'rope-technique', prescription: '6 min leve' },
      { exerciseId: 'bent-row', prescription: '2x10' },
      { exerciseId: 'plank', prescription: '2x20s' },
    ],
  },
  {
    day: 6,
    title: 'Simulado TAF em Casa',
    focus: 'Medir flexão, abdominal e fôlego',
    intensity: 'teste',
    estimatedMinutes: 35,
    rope: [{ exerciseId: 'rope-basic', prescription: 'Teste: máximo de tempo com técnica limpa' }],
    strength: [{ exerciseId: 'push-up', prescription: 'Teste: máximo com técnica boa' }],
    knee: [
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
      { exerciseId: 'glute-bridge', prescription: '2x15' },
    ],
    core: [{ exerciseId: 'abdominal', prescription: 'Teste: máximo com técnica boa' }],
    emergency: [
      { exerciseId: 'push-up', prescription: 'Teste curto' },
      { exerciseId: 'abdominal', prescription: 'Teste curto' },
      { exerciseId: 'rope-technique', prescription: '5 min' },
    ],
  },
  {
    day: 7,
    title: 'Recuperação Ativa',
    focus: 'Manter hábito e proteger articulações',
    intensity: 'leve',
    estimatedMinutes: 22,
    rope: [{ exerciseId: 'rope-technique', prescription: '5 a 8 min leve' }],
    strength: [],
    knee: [
      { exerciseId: 'mobility', prescription: '5 min' },
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
      { exerciseId: 'glute-bridge', prescription: '2x15' },
      { exerciseId: 'calf-raise', prescription: '2x15' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '2x10' }],
    emergency: [
      { exerciseId: 'mobility', prescription: '5 min' },
      { exerciseId: 'glute-bridge', prescription: '2x12' },
    ],
  },
  {
    day: 8,
    title: 'Corda + Costas/Ombro 2',
    focus: 'Aumentar volume de costas e ombro',
    intensity: 'média',
    estimatedMinutes: 35,
    rope: [{ exerciseId: 'rope-basic', prescription: '12 rodadas — 30s / 30s' }],
    strength: [
      { exerciseId: 'bent-row', prescription: '4x8' },
      { exerciseId: 'shoulder-press', prescription: '3x10' },
      { exerciseId: 'curl', prescription: '2x12' },
    ],
    knee: [{ exerciseId: 'calf-raise', prescription: '3x15' }],
    core: [{ exerciseId: 'plank', prescription: '3x30s' }],
    emergency: [
      { exerciseId: 'rope-technique', prescription: '6 min' },
      { exerciseId: 'bent-row', prescription: '2x10' },
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
    ],
  },
  {
    day: 9,
    title: 'Corda + Pernas Protegidas 2',
    focus: 'Cadeia posterior e estabilidade',
    intensity: 'média',
    estimatedMinutes: 34,
    rope: [{ exerciseId: 'rope-basic', prescription: '10 min total intervalado' }],
    strength: [
      { exerciseId: 'romanian-deadlift', prescription: '4x8' },
      { exerciseId: 'glute-bridge', prescription: '3x12 com peso se estiver fácil' },
      { exerciseId: 'step-up', prescription: '3x8 cada perna', optional: true },
    ],
    knee: [
      { exerciseId: 'calf-raise', prescription: '4x15' },
      { exerciseId: 'wall-sit', prescription: '3x25s' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '3x10 cada lado' }],
    emergency: [
      { exerciseId: 'glute-bridge', prescription: '3x15' },
      { exerciseId: 'clamshell', prescription: '3x12' },
      { exerciseId: 'calf-raise', prescription: '3x15' },
    ],
  },
  {
    day: 10,
    title: 'Corda + Flexão Pesada',
    focus: 'Subir resistência de flexão e abdômen',
    intensity: 'pesada',
    estimatedMinutes: 34,
    rope: [{ exerciseId: 'rope-basic', prescription: '15 rodadas — 20s / 40s' }],
    strength: [
      { exerciseId: 'push-up', prescription: '5 séries' },
      { exerciseId: 'floor-press', prescription: '3x10' },
      { exerciseId: 'triceps', prescription: '3x12' },
    ],
    knee: [{ exerciseId: 'straight-leg-raise', prescription: '2x12' }],
    core: [
      { exerciseId: 'abdominal', prescription: '4 séries' },
      { exerciseId: 'side-plank', prescription: '3x20s cada lado' },
    ],
    emergency: [
      { exerciseId: 'push-up', prescription: '3 séries' },
      { exerciseId: 'abdominal', prescription: '3 séries' },
      { exerciseId: 'rope-technique', prescription: '5 min' },
    ],
  },
  {
    day: 11,
    title: 'Joelho Protegido + Corda Técnica',
    focus: 'Controle, estabilidade e recuperação',
    intensity: 'leve',
    estimatedMinutes: 27,
    rope: [{ exerciseId: 'rope-technique', prescription: '8 a 10 min leve' }],
    strength: [],
    knee: [
      { exerciseId: 'straight-leg-raise', prescription: '3x15' },
      { exerciseId: 'clamshell', prescription: '3x15' },
      { exerciseId: 'wall-sit', prescription: '3x25s' },
      { exerciseId: 'calf-raise', prescription: '4x15' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '3x10' }],
    emergency: [
      { exerciseId: 'mobility', prescription: '5 min' },
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
      { exerciseId: 'glute-bridge', prescription: '2x15' },
    ],
  },
  {
    day: 12,
    title: 'Corda Forte + Full Body',
    focus: 'Resistência sob fadiga',
    intensity: 'pesada',
    estimatedMinutes: 38,
    rope: [{ exerciseId: 'rope-basic', prescription: '12 rodadas — 40s / 20s' }],
    strength: [
      { exerciseId: 'bent-row', prescription: '3x10' },
      { exerciseId: 'shoulder-press', prescription: '3x8' },
      { exerciseId: 'goblet-squat', prescription: '3x10 curto' },
      { exerciseId: 'romanian-deadlift', prescription: '3x10' },
    ],
    knee: [{ exerciseId: 'glute-bridge', prescription: '2x15' }],
    core: [{ exerciseId: 'abdominal', prescription: '4 séries' }],
    emergency: [
      { exerciseId: 'rope-technique', prescription: '6 min' },
      { exerciseId: 'bent-row', prescription: '2x10' },
      { exerciseId: 'plank', prescription: '2x30s' },
    ],
  },
  {
    day: 13,
    title: 'Simulado de Evolução',
    focus: 'Comparar com o Dia 6',
    intensity: 'teste',
    estimatedMinutes: 35,
    rope: [{ exerciseId: 'rope-basic', prescription: 'Teste: 10 min ou máximo limpo' }],
    strength: [{ exerciseId: 'push-up', prescription: 'Teste: máximo com técnica boa' }],
    knee: [
      { exerciseId: 'straight-leg-raise', prescription: '2x12' },
      { exerciseId: 'glute-bridge', prescription: '2x15' },
    ],
    core: [{ exerciseId: 'abdominal', prescription: 'Teste: máximo com técnica boa' }],
    emergency: [
      { exerciseId: 'push-up', prescription: 'Teste curto' },
      { exerciseId: 'abdominal', prescription: 'Teste curto' },
      { exerciseId: 'rope-technique', prescription: '5 min' },
    ],
  },
  {
    day: 14,
    title: 'Recuperação + Preparação',
    focus: 'Fechar ciclo e preparar evolução',
    intensity: 'leve',
    estimatedMinutes: 24,
    rope: [{ exerciseId: 'rope-technique', prescription: '5 min leve' }],
    strength: [],
    knee: [
      { exerciseId: 'mobility', prescription: '8 min' },
      { exerciseId: 'straight-leg-raise', prescription: '2x15' },
      { exerciseId: 'glute-bridge', prescription: '2x15' },
      { exerciseId: 'calf-raise', prescription: '2x15' },
    ],
    core: [{ exerciseId: 'dead-bug', prescription: '2x10' }],
    emergency: [
      { exerciseId: 'mobility', prescription: '5 min' },
      { exerciseId: 'glute-bridge', prescription: '2x12' },
    ],
  },
];

function getExercise(id: string) {
  const found = exercises.find(exercise => exercise.id === id);
  if (!found) throw new Error(`Exercício não encontrado: ${id}`);
  return found;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadRecords(): TafRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRecords(records: TafRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getCycleDay(records: TafRecord[]) {
  const completedDays = records.length;
  return (completedDays % 14) + 1;
}

function categoryTitle(category: ExerciseCategory) {
  const labels: Record<ExerciseCategory, string> = {
    corda: 'Corda',
    forca: 'Força',
    joelho: 'Joelho blindado',
    core: 'Core',
    simulado: 'Simulado',
    mobilidade: 'Mobilidade',
  };

  return labels[category];
}

function intensityClass(intensity: TafDay['intensity']) {
  if (intensity === 'leve') return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
  if (intensity === 'média') return 'border-gold-500/20 bg-gold-500/10 text-gold-300';
  if (intensity === 'pesada') return 'border-red-500/20 bg-red-500/10 text-red-300';
  return 'border-pm-400/20 bg-pm-400/10 text-pm-200';
}

function breathLabel(value: TafRecord['breath']) {
  if (value === 'facil') return 'Fácil';
  if (value === 'medio') return 'Médio';
  return 'Difícil';
}

function StickmanDemo({ type }: { type: DemoType }) {
  const animatedArms = type === 'jump-rope' || type === 'shoulder-press' || type === 'bent-row' || type === 'floor-press';
  const animatedLegs = type === 'jump-rope' || type === 'goblet-squat' || type === 'romanian-deadlift' || type === 'glute-bridge' || type === 'calf-raise' || type === 'straight-leg';

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
      <svg viewBox="0 0 260 190" className="h-48 w-full">
        <style>{`
          .taf-line { stroke: currentColor; stroke-width: 7; stroke-linecap: round; fill: none; }
          .taf-thin { stroke: currentColor; stroke-width: 4; stroke-linecap: round; fill: none; opacity: .55; }
          .taf-head { fill: none; stroke: currentColor; stroke-width: 7; }
          .taf-arm { transform-origin: 130px 72px; animation: ${animatedArms ? 'tafArm 1s ease-in-out infinite alternate' : 'none'}; }
          .taf-leg { transform-origin: 130px 116px; animation: ${animatedLegs ? 'tafLeg 1s ease-in-out infinite alternate' : 'none'}; }
          .taf-rope { opacity: ${type === 'jump-rope' ? '.75' : '0'}; animation: tafRope .75s linear infinite; transform-origin: 130px 94px; }
          .taf-bar { opacity: ${['bent-row','shoulder-press','floor-press','romanian-deadlift','goblet-squat'].includes(type) ? '.85' : '0'}; animation: ${['shoulder-press','bent-row','floor-press','romanian-deadlift','goblet-squat'].includes(type) ? 'tafBar 1s ease-in-out infinite alternate' : 'none'}; }
          @keyframes tafArm { from { transform: rotate(-6deg); } to { transform: rotate(10deg); } }
          @keyframes tafLeg { from { transform: rotate(-3deg); } to { transform: rotate(5deg); } }
          @keyframes tafRope { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes tafBar { from { transform: translateY(8px); } to { transform: translateY(-8px); } }
        `}</style>

        <g className="text-gold-300">
          <ellipse className="taf-thin taf-rope" cx="130" cy="98" rx="82" ry="72" />
          <circle className="taf-head" cx="130" cy="38" r="17" />

          <g transform={
            type === 'plank'
              ? 'translate(0 35) rotate(78 130 92)'
              : type === 'glute-bridge'
                ? 'translate(0 38) rotate(82 130 95)'
                : type === 'dead-bug'
                  ? 'translate(0 20) rotate(-90 130 95)'
                  : type === 'bent-row' || type === 'romanian-deadlift'
                    ? 'translate(0 24) rotate(28 130 85)'
                    : ''
          }>
            <line className="taf-line" x1="130" y1="58" x2="130" y2="108" />
            <g className="taf-arm">
              <line className="taf-line" x1="130" y1="72" x2="96" y2="98" />
              <line className="taf-line" x1="130" y1="72" x2="164" y2="98" />
            </g>
            <g className="taf-leg">
              <line className="taf-line" x1="130" y1="108" x2="104" y2="150" />
              <line className="taf-line" x1="130" y1="108" x2="156" y2="150" />
            </g>
          </g>

          <g className="taf-bar text-pm-200">
            <line className="taf-line" x1="78" y1={type === 'shoulder-press' ? '36' : '102'} x2="182" y2={type === 'shoulder-press' ? '36' : '102'} />
            <line className="taf-thin" x1="68" y1={type === 'shoulder-press' ? '36' : '102'} x2="68" y2={type === 'shoulder-press' ? '25' : '91'} />
            <line className="taf-thin" x1="192" y1={type === 'shoulder-press' ? '36' : '102'} x2="192" y2={type === 'shoulder-press' ? '25' : '91'} />
          </g>

          <line className="taf-thin" x1="45" y1="166" x2="215" y2="166" />
        </g>
      </svg>

      <p className="mt-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        Demonstração simples em stickman
      </p>
    </div>
  );
}

function ExerciseModal({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold-400">{categoryTitle(exercise.category)}</p>
            <h2 className="mt-1 font-[Rajdhani,sans-serif] text-3xl font-black text-white">{exercise.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{exercise.muscle}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-1 text-sm font-bold text-slate-300 transition hover:bg-white/10"
          >
            Fechar
          </button>
        </div>

        <StickmanDemo type={exercise.demo} />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-black text-white">Como fazer</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {exercise.instructions.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="font-black text-white">Erros comuns</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {exercise.mistakes.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {exercise.kneeNote && (
          <div className="mt-4 rounded-3xl border border-gold-500/20 bg-gold-500/10 p-4 text-sm text-gold-100">
            <strong className="text-gold-300">Joelho:</strong> {exercise.kneeNote}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-pm-300" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

function ExerciseRow({
  item,
  completed,
  onToggle,
  onDemo,
  disabled,
}: {
  item: WorkoutItem;
  completed: boolean;
  onToggle: () => void;
  onDemo: (exercise: Exercise) => void;
  disabled?: boolean;
}) {
  const exercise = getExercise(item.exerciseId);

  return (
    <div className={`rounded-3xl border p-4 ${completed ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/10 bg-white/[0.03]'}`}>
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={onToggle}
          disabled={disabled}
          className="flex flex-1 items-start gap-3 text-left disabled:opacity-60"
        >
          <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${completed ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-500 text-slate-400'}`}>
            {completed ? '✓' : ''}
          </span>
          <span>
            <span className="block font-black text-white">{exercise.name}</span>
            <span className="mt-1 block text-sm text-slate-400">{item.prescription}</span>
            <span className="mt-1 block text-xs text-slate-500">{exercise.muscle}</span>
            {item.optional && <span className="mt-2 inline-block rounded-full border border-slate-600 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-400">opcional</span>}
          </span>
        </button>

        <button
          onClick={() => onDemo(exercise)}
          className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-black text-gold-300 transition hover:bg-gold-500/20"
          title="Ver demonstração"
        >
          ver
        </button>
      </div>
    </div>
  );
}

function Block({
  title,
  items,
  completedIds,
  onToggle,
  onDemo,
  disabled,
}: {
  title: string;
  items: WorkoutItem[];
  completedIds: string[];
  onToggle: (id: string) => void;
  onDemo: (exercise: Exercise) => void;
  disabled?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <section className="study-card">
      <h3 className="text-xl font-black text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map(item => (
          <ExerciseRow
            key={`${title}-${item.exerciseId}-${item.prescription}`}
            item={item}
            completed={completedIds.includes(`${title}-${item.exerciseId}-${item.prescription}`)}
            onToggle={() => onToggle(`${title}-${item.exerciseId}-${item.prescription}`)}
            onDemo={onDemo}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}

export default function TAF({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) {
  const [records, setRecords] = useState<TafRecord[]>(() => loadRecords());
  const [knee, setKnee] = useState<KneeStatus>('normal');
  const [energy, setEnergy] = useState<EnergyStatus>('medium');
  const [mode, setMode] = useState<WorkoutMode>('full');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [breath, setBreath] = useState<TafRecord['breath']>('medio');
  const [pain, setPain] = useState(0);
  const [notes, setNotes] = useState('');
  const [view, setView] = useState<'today' | 'plan' | 'library' | 'history'>('today');

  const cycleDay = getCycleDay(records);
  const currentDay = plan.find(day => day.day === cycleDay) ?? plan[0];

  const todayRecord = records.find(record => record.date === todayIso());

  const activeItems = useMemo(() => {
    if (mode === 'short' || energy === 'low') {
      return {
        rope: knee === 'unstable' ? [] : currentDay.emergency.filter(item => getExercise(item.exerciseId).category === 'corda'),
        strength: currentDay.emergency.filter(item => getExercise(item.exerciseId).category === 'forca'),
        knee: currentDay.emergency.filter(item => getExercise(item.exerciseId).category === 'joelho' || getExercise(item.exerciseId).category === 'mobilidade'),
        core: currentDay.emergency.filter(item => getExercise(item.exerciseId).category === 'core'),
      };
    }

    if (knee === 'unstable') {
      return {
        rope: [],
        strength: currentDay.strength.filter(item => !['goblet-squat', 'step-up', 'romanian-deadlift'].includes(item.exerciseId)).slice(0, 2),
        knee: [
          { exerciseId: 'mobility', prescription: '5 min sem dor' },
          { exerciseId: 'straight-leg-raise', prescription: '3x12' },
          { exerciseId: 'glute-bridge', prescription: '3x12' },
          { exerciseId: 'calf-raise', prescription: '2x15' },
        ],
        core: [{ exerciseId: 'dead-bug', prescription: '3x10' }],
      };
    }

    if (knee === 'strange') {
      return {
        rope: [{ exerciseId: 'rope-technique', prescription: '5 a 8 min leve, salto baixo' }],
        strength: currentDay.strength.filter(item => !['goblet-squat', 'step-up'].includes(item.exerciseId)),
        knee: [...currentDay.knee, { exerciseId: 'clamshell', prescription: '2x12 cada lado' }],
        core: currentDay.core,
      };
    }

    return {
      rope: currentDay.rope,
      strength: currentDay.strength,
      knee: currentDay.knee,
      core: currentDay.core,
    };
  }, [currentDay, knee, energy, mode]);

  const allItems = [...activeItems.rope, ...activeItems.strength, ...activeItems.knee, ...activeItems.core];
  const totalItems = allItems.length;
  const completedCount = completedIds.length;
  const completionPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const lastSeven = records.slice(-7);
  const kneeSafeCount = lastSeven.filter(record => record.knee === 'normal').length;
  const ropeScore = Math.min(100, records.filter(record => record.completedIds.some(id => id.toLowerCase().includes('corda'))).length * 5);
  const strengthScore = Math.min(100, records.filter(record => record.completedIds.some(id => id.toLowerCase().includes('força'))).length * 6);
  const coreScore = Math.min(100, records.filter(record => record.completedIds.some(id => id.toLowerCase().includes('core'))).length * 7);
  const kneeScore = Math.min(100, records.filter(record => record.completedIds.some(id => id.toLowerCase().includes('joelho'))).length * 8);

  function toggleCompleted(id: string) {
    setCompletedIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  }

  function completeWorkout() {
    const record: TafRecord = {
      date: todayIso(),
      day: currentDay.day,
      title: currentDay.title,
      knee,
      energy,
      mode,
      completedIds,
      breath,
      pain,
      notes: notes.trim(),
    };

    const next = [...records.filter(item => item.date !== record.date), record];
    setRecords(next);
    saveRecords(next);
    setCompletedIds([]);
    setNotes('');
    setPain(0);
  }

  function resetToday() {
    setCompletedIds([]);
    setNotes('');
    setPain(0);
  }

  return (
    <div className="study-wide">
      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />}

      <button onClick={() => onNavigate('dashboard')} className="study-back">
        ← Voltar ao painel
      </button>

      <div className="mb-6">
        <p className="section-label mb-2">Preparação física pessoal</p>
        <h1 className="font-[Rajdhani,sans-serif] text-4xl font-black text-white">
          TAF — Sem Corrida
        </h1>
        <p className="study-subtitle mt-2">
          Corda diária, barra/halteres, core e blindagem do joelho para construir fôlego e força em casa.
        </p>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {[
          ['today', 'Treino de hoje'],
          ['plan', 'Plano 14 dias'],
          ['library', 'Biblioteca'],
          ['history', 'Histórico'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setView(id as typeof view)}
            className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
              view === id
                ? 'border-gold-500/40 bg-gold-500/15 text-gold-200'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === 'today' && (
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="study-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="study-kicker">Missão do ciclo — Dia {currentDay.day}/14</p>
                  <h2 className="mt-2 font-[Rajdhani,sans-serif] text-3xl font-black text-white">
                    {currentDay.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{currentDay.focus}</p>
                </div>

                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${intensityClass(currentDay.intensity)}`}>
                  {currentDay.intensity}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tempo</p>
                  <p className="mt-1 text-2xl font-black text-white">{mode === 'short' ? '10–15' : currentDay.estimatedMinutes} min</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Progresso</p>
                  <p className="mt-1 text-2xl font-black text-white">{completionPct}%</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Sequência</p>
                  <p className="mt-1 text-2xl font-black text-white">{records.length} treinos</p>
                </div>
              </div>

              {todayRecord && (
                <div className="mt-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                  Treino de hoje já registrado: <strong>{todayRecord.title}</strong>. Você pode treinar de novo ou manter o registro.
                </div>
              )}
            </section>

            <section className="study-card">
              <h3 className="text-xl font-black text-white">Atributos</h3>
              <div className="mt-4 space-y-4">
                <ProgressBar label="Fôlego" value={ropeScore} />
                <ProgressBar label="Força" value={strengthScore} />
                <ProgressBar label="Core" value={coreScore} />
                <ProgressBar label="Joelho" value={kneeScore} />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                Últimos 7 treinos com joelho normal: <strong className="text-white">{kneeSafeCount}/{lastSeven.length || 0}</strong>
              </div>
            </section>
          </div>

          <section className="study-card">
            <h3 className="text-xl font-black text-white">Check-in obrigatório</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Joelho hoje</p>
                <div className="space-y-2">
                  {(['normal', 'strange', 'unstable'] as KneeStatus[]).map(value => (
                    <button
                      key={value}
                      onClick={() => setKnee(value)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                        knee === value
                          ? 'border-gold-500/40 bg-gold-500/15 text-gold-100'
                          : 'border-white/10 bg-white/[0.03] text-slate-300'
                      }`}
                    >
                      {kneeLabels[value]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Energia</p>
                <div className="space-y-2">
                  {(['low', 'medium', 'high'] as EnergyStatus[]).map(value => (
                    <button
                      key={value}
                      onClick={() => setEnergy(value)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                        energy === value
                          ? 'border-pm-400/40 bg-pm-400/15 text-pm-100'
                          : 'border-white/10 bg-white/[0.03] text-slate-300'
                      }`}
                    >
                      {energyLabels[value]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Modo</p>
                <div className="space-y-2">
                  {([
                    ['full', 'Treino completo'],
                    ['short', 'Modo 10 minutos'],
                  ] as [WorkoutMode, string][]).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setMode(value)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                        mode === value
                          ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100'
                          : 'border-white/10 bg-white/[0.03] text-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {knee === 'unstable' && (
              <div className="mt-5 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                Joelho instável marcado: o app removeu corda, saltos e perna pesada hoje.
              </div>
            )}
          </section>

          <Block title="Corda" items={activeItems.rope} completedIds={completedIds} onToggle={toggleCompleted} onDemo={setSelectedExercise} />
          <Block title="Força" items={activeItems.strength} completedIds={completedIds} onToggle={toggleCompleted} onDemo={setSelectedExercise} />
          <Block title="Joelho" items={activeItems.knee} completedIds={completedIds} onToggle={toggleCompleted} onDemo={setSelectedExercise} />
          <Block title="Core" items={activeItems.core} completedIds={completedIds} onToggle={toggleCompleted} onDemo={setSelectedExercise} />

          <section className="study-card">
            <h3 className="text-xl font-black text-white">Registro do treino</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Fôlego</p>
                <div className="space-y-2">
                  {(['facil', 'medio', 'dificil'] as TafRecord['breath'][]).map(value => (
                    <button
                      key={value}
                      onClick={() => setBreath(value)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold ${
                        breath === value
                          ? 'border-gold-500/40 bg-gold-500/15 text-gold-100'
                          : 'border-white/10 bg-white/[0.03] text-slate-300'
                      }`}
                    >
                      {breathLabel(value)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Dor 0–10</p>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={pain}
                  onChange={event => setPain(Number(event.target.value))}
                  className="w-full"
                />
                <p className="mt-2 text-3xl font-black text-white">{pain}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Observação</p>
                <textarea
                  value={notes}
                  onChange={event => setNotes(event.target.value)}
                  placeholder="Ex.: corda boa, joelho normal, ombro cansou..."
                  className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-white outline-none focus:border-gold-500/40"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={completeWorkout}
                disabled={completedIds.length === 0}
                className="rounded-2xl bg-gold-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Salvar treino concluído
              </button>

              <button
                onClick={resetToday}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-slate-300 transition hover:bg-white/10"
              >
                Limpar checklist
              </button>
            </div>
          </section>
        </div>
      )}

      {view === 'plan' && (
        <div className="grid gap-4 md:grid-cols-2">
          {plan.map(day => (
            <section key={day.day} className={`study-card ${day.day === currentDay.day ? 'ring-2 ring-gold-500/30' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="study-kicker">Dia {day.day}/14</p>
                  <h3 className="mt-1 text-xl font-black text-white">{day.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{day.focus}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${intensityClass(day.intensity)}`}>
                  {day.intensity}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <span>Corda: {day.rope.length ? 'sim' : 'não'}</span>
                <span>Força: {day.strength.length} blocos</span>
                <span>Joelho: {day.knee.length} blocos</span>
                <span>Core: {day.core.length} blocos</span>
              </div>
            </section>
          ))}
        </div>
      )}

      {view === 'library' && (
        <div className="space-y-5">
          {(['corda', 'forca', 'joelho', 'core', 'mobilidade'] as ExerciseCategory[]).map(category => {
            const list = exercises.filter(exercise => exercise.category === category);
            if (!list.length) return null;

            return (
              <section key={category} className="study-card">
                <h3 className="text-xl font-black text-white">{categoryTitle(category)}</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {list.map(exercise => (
                    <button
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise)}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                    >
                      <h4 className="font-black text-white">{exercise.name}</h4>
                      <p className="mt-1 text-sm text-slate-400">{exercise.muscle}</p>
                      <span className="mt-3 inline-block rounded-full border border-gold-500/30 px-3 py-1 text-xs font-black text-gold-300">
                        ver demonstração
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {view === 'history' && (
        <section className="study-card">
          <h3 className="text-xl font-black text-white">Histórico TAF</h3>

          {records.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">Nenhum treino registrado ainda.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {[...records].reverse().map(record => (
                <div key={`${record.date}-${record.day}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{record.date}</p>
                      <h4 className="mt-1 font-black text-white">Dia {record.day} — {record.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        Joelho: {kneeLabels[record.knee]} • Energia: {energyLabels[record.energy]} • Fôlego: {breathLabel(record.breath)} • Dor: {record.pain}/10
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                      {record.completedIds.length} itens
                    </span>
                  </div>
                  {record.notes && <p className="mt-3 text-sm text-slate-300">{record.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
