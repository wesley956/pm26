import { EssayTheme } from '../types';

export const essayThemes: EssayTheme[] = [
  { id: 'red-01', title: 'A violência urbana e o papel das forças de segurança pública', description: 'Discorra sobre os desafios da segurança pública no Brasil e o papel da Polícia Militar na proteção do cidadão.', tips: ['Use dados e exemplos reais', 'Proponha soluções viáveis', 'Cite o Art. 144 da CF/88', 'Evite generalizações'] },
  { id: 'red-02', title: 'A importância da educação para a formação do cidadão', description: 'Argumente sobre como a educação pode transformar a sociedade e reduzir problemas sociais.', tips: ['Conecte educação e cidadania', 'Mencione políticas públicas educacionais', 'Use exemplos de outros países', 'Mostre a relação educação-emprego'] },
  { id: 'red-03', title: 'O papel do Estado na proteção do meio ambiente', description: 'Discorra sobre a responsabilidade do poder público na preservação ambiental e no desenvolvimento sustentável.', tips: ['Cite a Constituição Federal', 'Mencione problemas ambientais atuais', 'Fale sobre políticas públicas ambientais', 'Relacione com o desenvolvimento econômico'] },
  { id: 'red-04', title: 'Desigualdade social no Brasil: desafios e perspectivas', description: 'Analise as causas da desigualdade social brasileira e proponha reflexões sobre como reduzi-la.', tips: ['Use dados do IBGE/PNAD', 'Aborde educação, saúde e renda', 'Mencione programas sociais', 'Evite reducionismos'] },
  { id: 'red-05', title: 'Tecnologia e segurança pública: oportunidades e riscos', description: 'Discorra sobre como a tecnologia pode auxiliar o trabalho policial e quais riscos ela pode trazer.', tips: ['Cite câmeras, IA, vigilância', 'Discuta privacidade vs segurança', 'Mencione LGPD', 'Equilibre prós e contras'] },
  { id: 'red-06', title: 'A importância do concurso público para a democracia', description: 'Argumente sobre a relevância dos concursos públicos para a construção de uma administração eficiente e justa.', tips: ['Cite o Art. 37 da CF/88', 'Fale sobre meritocracia', 'Discuta impessoalidade e eficiência', 'Compare com sistemas de indicação'] },
  { id: 'red-07', title: 'Saúde mental no Brasil: um desafio contemporâneo', description: 'Discorra sobre a importância da saúde mental e os desafios do Brasil nesse tema.', tips: ['Mencione dados da OMS', 'Fale sobre o SUS e a saúde mental', 'Aborde estigma e preconceito', 'Proponha soluções'] },
  { id: 'red-08', title: 'A ética no serviço público', description: 'Argumente sobre a importância da ética e da moralidade no exercício da função pública.', tips: ['Cite princípios constitucionais', 'Mencione improbidade administrativa', 'Use exemplos práticos', 'Relacione com confiança pública'] },
  { id: 'red-09', title: 'Mobilidade urbana e qualidade de vida nas grandes cidades', description: 'Analise os problemas de mobilidade urbana e proponha reflexões sobre soluções sustentáveis.', tips: ['Fale sobre transporte público', 'Mencione políticas de mobilidade', 'Cite exemplos de cidades brasileiras', 'Relacione com meio ambiente'] },
  { id: 'red-10', title: 'O papel da Polícia Militar na comunidade: além da repressão', description: 'Discorra sobre a importância de uma polícia comunitária e da aproximação entre PM e sociedade.', tips: ['Cite polícia comunitária', 'Fale sobre respeito aos direitos humanos', 'Mencione projetos sociais da PM', 'Equilibre repressão e prevenção'] },
];

export const essayStructure = {
  introduction: `A introdução deve conter:
• Contextualização do tema (2-3 frases)
• Apresentação da tese (sua opinião principal)
• Última frase: "À luz dessas considerações, torna-se imperativo analisar [tema] sob múltiplas perspectivas."

Modelo de introdução:
"No cenário contemporâneo brasileiro, [contextualize o tema]. Nesse sentido, [apresente seu posicionamento]. Diante do exposto, é fundamental examinar os desdobramentos de [aspecto central do tema], considerando suas implicações sociais e institucionais."`,

  development1: `1º Parágrafo de Desenvolvimento — Causa/Fundamentação:
• Apresente o primeiro argumento
• Fundamente com dados, citações ou exemplos
• Use conectivos: "Primeiramente", "Em primeiro lugar", "Cabe destacar"

Modelo: "Primeiramente, é imprescindível observar que [argumento 1]. Segundo [fonte/dado], [comprovação]. Isso demonstra que [análise do argumento]."`,

  development2: `2º Parágrafo de Desenvolvimento — Consequência/Exemplo:
• Apresente o segundo argumento
• Use exemplos concretos
• Conectivos: "Além disso", "Outro ponto relevante", "Ademais"

Modelo: "Além disso, [argumento 2]. Um exemplo paradigmático dessa situação é [exemplo]. Tal constatação evidencia que [análise]."`,

  development3: `3º Parágrafo de Desenvolvimento — Solução/Proposta (opcional mas recomendada):
• Apresente proposta de intervenção
• Conectivos: "Por conseguinte", "Nessa perspectiva", "Urge, portanto"

Modelo: "Nessa perspectiva, torna-se evidente a necessidade de [proposta]. É fundamental que [agente] promova [ação], com o intuito de [finalidade]."`,

  conclusion: `Conclusão:
• Retome a tese (sem repetir)
• Resuma os principais argumentos
• Apresente uma reflexão final ou proposta de intervenção
• NÃO introduza argumentos novos
• Conectivos: "Em suma", "Portanto", "Diante do exposto"

Modelo: "Em suma, [retome a tese com outras palavras]. Conclui-se, portanto, que [síntese dos argumentos]. Por fim, é essencial que [proposta/reflexão final], para que [objetivo/outlook positivo]."`,
};

export const essayChecklist = [
  'A introdução contextualiza o tema?',
  'A tese está clara na introdução?',
  'Há pelo menos 2 argumentos desenvolvidos?',
  'Os argumentos são fundamentados com dados ou exemplos?',
  'Os parágrafos estão conectados (coesão)?',
  'Há proposta de intervenção na conclusão?',
  'A conclusão retoma a tese?',
  'Não há argumentos novos na conclusão?',
  'A linguagem é formal e adequada?',
  'O texto tem entre 20 e 30 linhas?',
  'Não há erros de ortografia visíveis?',
  'A pontuação está correta?',
  'Não há clichês como "desde os primórdios"?',
  'Não há generalizações excessivas?',
  'O texto é legível e bem organizado?',
];
