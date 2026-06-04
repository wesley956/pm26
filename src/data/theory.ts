import type { SubjectId } from '../types';

export interface TheoryLesson {
  missionId: string;
  subjectId: SubjectId;
  title: string;
  missionBrief: string;
  dumbMode: string;
  analogy: string;
  vunespMode: string;
  traps: string[];
  memoryHook: string;
  finalReminder: string;
  miniMission: string;
  notUnderstood: string;
}

export const theoryLessons: TheoryLesson[] = [
  {
    missionId: 'pt-01',
    subjectId: 'portugues',
    title: 'Interpretação de Texto — Investigação da Ideia Principal',
    missionBrief: 'Aprender a encontrar a ideia central sem cair na alternativa bonita.',
    dumbMode: 'Interpretar texto não é adivinhar o que o autor quis dizer na sua cabeça. É provar, pelo texto, qual alternativa está mais fiel ao que foi escrito. Pense como um investigador: sem prova, não acusa ninguém.',
    analogy: 'Imagine uma cena em uma mansão de fantasia. Todo mundo acha que o vampiro é culpado porque ele parece suspeito. Mas o investigador só pode acusar quem deixou pista. Na Vunesp é igual: a resposta certa precisa ter pista no texto.',
    vunespMode: 'A Vunesp costuma colocar uma alternativa bonita, inteligente e até verdadeira no mundo real, mas que não está no texto. Essa alternativa é armadilha. A correta é a que conversa diretamente com a ideia do texto.',
    traps: [
      'Alternativas com sempre, nunca, todos, apenas e somente costumam exagerar.',
      'Alternativa bonita, mas sem prova no texto, deve ser eliminada.',
      'Não responda pelo que você acha do assunto; responda pelo que o texto permite concluir.'
    ],
    memoryHook: 'Texto é cena de crime: resposta certa precisa de evidência.',
    finalReminder: 'Se cair na prova, pergunte: qual alternativa eu consigo provar com uma frase do texto?',
    miniMission: 'Leia uma questão de interpretação e risque mentalmente as alternativas que exageram ou inventam informação.',
    notUnderstood: 'Pensa assim: o texto é o chefe da ocorrência. Você não manda na resposta; você obedece ao que ele mostrou.'
  },
  {
    missionId: 'pt-03',
    subjectId: 'portugues',
    title: 'Coesão e Coerência — O Fio Mágico do Texto',
    missionBrief: 'Entender como as frases se conectam e como o texto mantém sentido.',
    dumbMode: 'Coesão é a cola do texto. São palavras que ligam uma parte na outra: pronomes, conectivos e repetições controladas. Coerência é o sentido geral. Um texto coerente não se contradiz.',
    analogy: 'Pense em uma party de RPG. Cada personagem tem uma função, mas todos precisam seguir a mesma missão. Se o mago vai para o norte, o guerreiro para o sul e ninguém sabe o objetivo, a missão fica sem coerência. Os conectivos são as ordens que mantêm o grupo unido.',
    vunespMode: 'A banca cobra muito o sentido dos conectivos. Ela pergunta se uma palavra indica oposição, conclusão, causa, explicação, concessão ou adição.',
    traps: [
      'Mas, porém, contudo e entretanto indicam oposição.',
      'Portanto, logo, assim e por isso indicam conclusão.',
      'Porque, pois e uma vez que podem indicar causa ou explicação.',
      'Embora e ainda que indicam concessão: algo contrário, mas que não impede a ideia principal.'
    ],
    memoryHook: 'Conectivo é placa de trânsito do texto: ele mostra para onde a ideia vai.',
    finalReminder: 'Se cair na prova, olhe para a palavra de ligação e pergunte: ela vira, conclui, explica ou soma?',
    miniMission: 'Pegue 5 conectivos das questões e classifique como oposição, conclusão, causa, concessão ou adição.',
    notUnderstood: 'Modo simples: coesão é quando uma frase segura na mão da outra. Coerência é quando todas caminham para o mesmo lugar.'
  },
  {
    missionId: 'pt-05',
    subjectId: 'portugues',
    title: 'Concordância — A Hierarquia da Frase',
    missionBrief: 'Aprender quem manda no verbo e nos nomes dentro da frase.',
    dumbMode: 'Concordância é fazer as palavras combinarem. Na concordância verbal, o sujeito manda no verbo. Na concordância nominal, o substantivo manda no adjetivo, artigo e pronome.',
    analogy: 'Pense em uma equipe policial. O comandante dá a ordem e a equipe acompanha. Na frase, o sujeito é o comandante do verbo. Se o sujeito está no plural, normalmente o verbo vai para o plural.',
    vunespMode: 'A Vunesp gosta de frases com sujeito longe do verbo, verbo haver, verbo fazer indicando tempo e expressões como mais de um, a maioria de e grande parte de.',
    traps: [
      'Haver no sentido de existir fica no singular: houve problemas.',
      'Fazer indicando tempo fica no singular: faz dois anos.',
      'Existir não é impessoal: existem problemas.',
      'Mais de um normalmente pede singular: mais de um candidato chegou.'
    ],
    memoryHook: 'Ache o comandante da frase antes de mexer no verbo.',
    finalReminder: 'Se cair na prova, encontre o sujeito e veja se o verbo obedeceu.',
    miniMission: 'Em 3 frases, sublinhe o sujeito e circule o verbo antes de responder.',
    notUnderstood: 'Não tente decorar tudo de uma vez. Primeiro descubra quem é o sujeito. Depois veja se o verbo está singular ou plural junto com ele.'
  },
  {
    missionId: 'pt-07',
    subjectId: 'portugues',
    title: 'Crase — O Portal Duplo do A',
    missionBrief: 'Entender quando dois As se juntam e viram crase.',
    dumbMode: 'Crase é a fusão de dois As: a preposição A mais o artigo A. Se não existem dois As, não existe crase.',
    analogy: 'Pense em um portal mágico que só abre com duas chaves. Uma chave é a preposição exigida pelo verbo ou nome. A outra chave é o artigo feminino antes da palavra. Se tiver as duas, o portal abre: à.',
    vunespMode: 'A banca cobra muito proibições: antes de verbo, palavra masculina, pronome pessoal e muitas cidades sem artigo.',
    traps: [
      'Antes de verbo não tem crase: começou a chover.',
      'Antes de palavra masculina não tem crase: fui a pé.',
      'Antes de pronome pessoal não tem crase: entreguei a ela.',
      'Com nomes de cidade, use o teste: volto de Curitiba, vou a Curitiba; volto da Bahia, vou à Bahia.'
    ],
    memoryHook: 'Crase só existe quando duas chaves A abrem o mesmo portal.',
    finalReminder: 'Se cair na prova, teste: quem exige A? A palavra seguinte aceita artigo A?',
    miniMission: 'Pegue 5 frases com A e pergunte: existe preposição? existe artigo feminino?',
    notUnderstood: 'Modo burro total: se depois do A vem verbo, homem, ele, ela, você ou palavra masculina, desconfie muito da crase.'
  },
  {
    missionId: 'pt-08',
    subjectId: 'portugues',
    title: 'Pontuação — O Ritmo da Operação',
    missionBrief: 'Usar vírgula para organizar sentido, não para respirar aleatoriamente.',
    dumbMode: 'Vírgula não é pausa para respirar. Vírgula serve para separar funções dentro da frase. Ela isola vocativo, aposto, explicações e termos deslocados.',
    analogy: 'Imagine uma equipe entrando em uma ocorrência. Se cada policial recebe a ordem errada, vira caos. A pontuação organiza quem faz o quê dentro da frase.',
    vunespMode: 'A Vunesp cobra principalmente vocativo, aposto, oração explicativa e diferença entre restrição e explicação.',
    traps: [
      'Não se separa sujeito e verbo com vírgula.',
      'Vocativo é chamamento: Candidato, mantenha a calma.',
      'Aposto explica um termo: João, o supervisor, chegou.',
      'Oração explicativa vem com vírgula; restritiva normalmente não.'
    ],
    memoryHook: 'Vírgula organiza função, não respiração.',
    finalReminder: 'Se cair na prova, veja se a vírgula separou sujeito do verbo. Se separou, provavelmente está errada.',
    miniMission: 'Procure uma frase com vírgula e diga qual função ela está cumprindo.',
    notUnderstood: 'Comece só com uma regra: nunca coloque vírgula entre sujeito e verbo. Isso já salva muita questão.'
  },
  {
    missionId: 'ap-01',
    subjectId: 'administracao',
    title: 'Administração Pública — O Reino que Só Age pela Lei',
    missionBrief: 'Entender o que é Administração Pública e por que ela é diferente de uma pessoa comum.',
    dumbMode: 'Administração Pública é o conjunto de órgãos, entidades e agentes que executam as atividades do Estado para atender o interesse público. Uma pessoa comum pode fazer tudo que a lei não proíbe. A Administração só pode fazer o que a lei permite.',
    analogy: 'Imagine um reino de fantasia. O rei, os guardas, os escribas e os conselhos não podem agir por vontade própria. Eles seguem o código do reino. Na Administração Pública, esse código é a lei.',
    vunespMode: 'A banca gosta de perguntar a diferença entre interesse público e interesse particular, além da diferença entre Administração direta e indireta.',
    traps: [
      'Administração Pública não age por gosto pessoal.',
      'Servidor não é dono do cargo; ele exerce função pública.',
      'Interesse público vem antes do interesse privado do agente.',
      'Órgão não tem personalidade jurídica própria; entidade tem.'
    ],
    memoryHook: 'Particular faz o que a lei não proíbe; Administração só faz o que a lei autoriza.',
    finalReminder: 'Se cair na prova, procure a ideia de interesse público e submissão à lei.',
    miniMission: 'Explique em voz baixa: por que um servidor não pode agir como se o cargo fosse dele?',
    notUnderstood: 'Pensa assim: a Administração é um personagem preso por regras. Ela não improvisa livremente; ela obedece à lei.'
  },
  {
    missionId: 'ap-02',
    subjectId: 'administracao',
    title: 'Princípios LIMPE — O Código dos Guardiões',
    missionBrief: 'Memorizar e entender Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.',
    dumbMode: 'LIMPE é o conjunto básico de princípios do art. 37 da Constituição: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. Eles são regras de comportamento da Administração.',
    analogy: 'Pense em uma guilda de guardiões. Para proteger o reino, todo guardião precisa seguir o código LIMPE: agir pela lei, sem favoritismo, com ética, com transparência e com resultado.',
    vunespMode: 'A Vunesp costuma dar uma situação prática e perguntar qual princípio foi respeitado ou violado.',
    traps: [
      'Legalidade: agir conforme a lei.',
      'Impessoalidade: não favorecer nem perseguir.',
      'Moralidade: ética e honestidade.',
      'Publicidade: transparência dos atos.',
      'Eficiência: bom resultado com qualidade.'
    ],
    memoryHook: 'LIMPE é o código mínimo para o agente público não virar vilão da história.',
    finalReminder: 'Se cair situação de favoritismo, pense em impessoalidade. Se cair transparência, pense em publicidade.',
    miniMission: 'Decore LIMPE e crie uma frase curta para cada letra.',
    notUnderstood: 'Modo simples: LIMPE é o comportamento obrigatório de quem trabalha para o Estado.'
  },
  {
    missionId: 'ap-03',
    subjectId: 'administracao',
    title: 'Legalidade e Atos Administrativos — A Magia com Regras',
    missionBrief: 'Entender que ato administrativo só é válido quando segue requisitos.',
    dumbMode: 'Ato administrativo é uma manifestação da Administração que produz efeitos jurídicos. Para ser válido, precisa de competência, finalidade, forma, motivo e objeto.',
    analogy: 'Em um RPG, uma magia só funciona se o mago certo usar o ritual certo, pelo motivo certo, no alvo certo. No ato administrativo é igual: autoridade certa, finalidade pública, forma prevista, motivo real e objeto lícito.',
    vunespMode: 'A banca cobra os cinco requisitos do ato administrativo e os atributos: presunção de legitimidade, imperatividade e autoexecutoriedade.',
    traps: [
      'Competência: quem pratica o ato precisa ter poder legal.',
      'Finalidade: deve buscar interesse público.',
      'Forma: deve seguir o jeito previsto em lei.',
      'Motivo: fato e fundamento que justificam o ato.',
      'Objeto: o efeito prático do ato.'
    ],
    memoryHook: 'CO-FI-FO-MO-OB: Competência, Finalidade, Forma, Motivo e Objeto.',
    finalReminder: 'Se cair validade do ato, procure qual requisito foi quebrado.',
    miniMission: 'Repita os cinco requisitos olhando para os dedos da mão.',
    notUnderstood: 'Pensa em receita de poção: pessoa errada, ingrediente errado ou objetivo errado estraga tudo.'
  },
  {
    missionId: 'ap-07',
    subjectId: 'administracao',
    title: 'Administração Direta e Indireta — O Reino e suas Casas',
    missionBrief: 'Diferenciar órgãos da Administração direta e entidades da indireta.',
    dumbMode: 'Administração direta é o próprio Estado agindo por seus órgãos: União, Estados, DF, Municípios, ministérios e secretarias. Administração indireta são entidades criadas para executar atividades específicas: autarquias, fundações públicas, empresas públicas e sociedades de economia mista.',
    analogy: 'Imagine o reino central e suas casas especializadas. O castelo principal é a Administração direta. As guildas criadas para tarefas específicas são a Administração indireta.',
    vunespMode: 'A Vunesp gosta de perguntar quem tem personalidade jurídica própria. Órgãos da direta não têm; entidades da indireta têm.',
    traps: [
      'Ministério e secretaria são órgãos, não entidades.',
      'Autarquia tem personalidade jurídica própria.',
      'Empresa pública e sociedade de economia mista são da Administração indireta.',
      'Administração indireta não significa fora do Estado; significa entidade descentralizada.'
    ],
    memoryHook: 'Direta é órgão do corpo. Indireta é entidade com vida própria.',
    finalReminder: 'Se cair personalidade jurídica própria, pense em entidade da Administração indireta.',
    miniMission: 'Classifique: Secretaria de Segurança, INSS, Correios, Prefeitura.',
    notUnderstood: 'Modo simples: direta é o próprio governo por dentro; indireta são entidades criadas pelo governo para missões específicas.'
  },
  {
    missionId: 'ap-10',
    subjectId: 'administracao',
    title: 'Eficiência e Políticas Públicas — Resultado para o Povo',
    missionBrief: 'Entender que Administração Pública precisa entregar resultado real para a sociedade.',
    dumbMode: 'Eficiência significa fazer bem feito, com qualidade, rapidez, economia e resultado. Política pública é uma ação do Estado para resolver um problema coletivo.',
    analogy: 'Em uma missão de sobrevivência, não basta gastar todos os recursos do grupo. É preciso usar bem comida, tempo e energia para salvar todos. Na Administração, eficiência é usar bem o dinheiro e a estrutura pública para entregar resultado.',
    vunespMode: 'A banca cobra eficiência ligada a produtividade, qualidade do serviço, economicidade e bom atendimento ao cidadão.',
    traps: [
      'Eficiência não é fazer de qualquer jeito.',
      'Gastar menos e entregar pior não é eficiência.',
      'Política pública precisa ter problema, ação, público-alvo e resultado esperado.',
      'Cidadania envolve participação e controle social.'
    ],
    memoryHook: 'Eficiência é resultado público com recurso bem usado.',
    finalReminder: 'Se cair qualidade, rapidez, economia e resultado, pense em eficiência.',
    miniMission: 'Pense em um serviço público ruim e diga qual parte da eficiência foi quebrada.',
    notUnderstood: 'Modo simples: eficiência é o Estado parar de enrolar e entregar serviço bom para o povo.'
  }
];

export function getTheoryLesson(missionId: string): TheoryLesson | undefined {
  return theoryLessons.find(lesson => lesson.missionId === missionId);
}
