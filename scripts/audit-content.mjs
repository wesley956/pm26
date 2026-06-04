import { readFileSync } from 'node:fs';

const questionsText = readFileSync('src/data/questions.ts', 'utf8');
const subjectsText = readFileSync('src/data/subjects.ts', 'utf8');
const theoryText = readFileSync('src/data/theory.ts', 'utf8');

const failures = [];

const questionIds = [...questionsText.matchAll(/id: '([^']+)'/g)].map(match => match[1]);
const duplicateQuestionIds = questionIds.filter((id, index) => questionIds.indexOf(id) !== index);

if (duplicateQuestionIds.length > 0) {
  failures.push(`IDs duplicados em questions.ts: ${[...new Set(duplicateQuestionIds)].join(', ')}`);
}

const subjectIds = [...subjectsText.matchAll(/id: '([^']+)',\s+name:/g)].map(match => match[1]);
const missionIds = [...subjectsText.matchAll(/id: '([^']+)',\s+subjectId:/g)].map(match => match[1]);
const theoryMissionIds = [...theoryText.matchAll(/missionId: '([^']+)'/g)].map(match => match[1]);
const duplicateTheoryIds = theoryMissionIds.filter((id, index) => theoryMissionIds.indexOf(id) !== index);

if (duplicateTheoryIds.length > 0) {
  failures.push(`IDs duplicados em theory.ts: ${[...new Set(duplicateTheoryIds)].join(', ')}`);
}

for (const missionId of missionIds) {
  if (!theoryMissionIds.includes(missionId)) {
    failures.push(`Missão sem teoria personalizada: ${missionId}`);
  }
}

for (const lessonId of theoryMissionIds) {
  if (!missionIds.includes(lessonId)) {
    failures.push(`Teoria sem missão correspondente: ${lessonId}`);
  }
}

for (const subjectId of subjectIds) {
  const hasQuestion = questionsText.includes(`subjectId: '${subjectId}'`);
  if (!hasQuestion) {
    failures.push(`Sem questões para a matéria: ${subjectId}`);
  }
}

const questionBlocks = questionsText
  .split('\n')
  .filter(line => line.trim().startsWith('{ id:'));

for (const line of questionBlocks) {
  const id = line.match(/id: '([^']+)'/)?.[1] ?? 'questão sem id';
  const correct = Number(line.match(/correct: (\d+)/)?.[1]);

  if (!Number.isInteger(correct) || correct < 0 || correct > 4) {
    failures.push(`${id}: índice "correct" inválido`);
  }

  const optionsMatch = line.match(/options: \[(.*?)\], correct:/);
  if (!optionsMatch) {
    failures.push(`${id}: opções não encontradas`);
    continue;
  }

  const optionCount = [...optionsMatch[1].matchAll(/'/g)].length / 2;
  if (optionCount !== 5) {
    failures.push(`${id}: deve ter exatamente 5 alternativas, encontrou ${optionCount}`);
  }
}


const requiredTheoryFields = [
  'missionBrief',
  'dumbMode',
  'analogy',
  'vunespMode',
  'memoryHook',
  'finalReminder',
  'miniMission',
  'notUnderstood',
];

for (const field of requiredTheoryFields) {
  const count = (theoryText.match(new RegExp(`${field}: '`, 'g')) ?? []).length;
  if (count !== missionIds.length) {
    failures.push(`Campo obrigatório de teoria com quantidade inválida: ${field} (${count}/${missionIds.length})`);
  }
}

const trapsCount = (theoryText.match(/traps: \[/g) ?? []).length;
if (trapsCount !== missionIds.length) {
  failures.push(`Cada aula teórica deve ter lista de pegadinhas (${trapsCount}/${missionIds.length})`);
}


const forbiddenPhrases = [
  'mais próxima',
  'ambas podem ser aceitas',
  'A Vunesp aceita',
  'Na verdade',
  'Estimate:',
  'around mid',
  '2026-08-15'
];

for (const phrase of forbiddenPhrases) {
  if (questionsText.includes(phrase) || subjectsText.includes(phrase)) {
    failures.push(`Conteúdo contém frase proibida/ambígua: "${phrase}"`);
  }
}

if (failures.length > 0) {
  console.error('❌ Auditoria de conteúdo falhou:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('✅ Auditoria de conteúdo aprovada.');
