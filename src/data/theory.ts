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
  },

  {
    missionId: 'mt-02',
    subjectId: 'matematica',
    title: 'Frações — Dividindo o Tesouro da Guilda',
    missionBrief: 'Entender frações sem medo, como partes de um todo.',
    dumbMode: 'Fração é pedaço. O número de baixo mostra em quantas partes o todo foi dividido. O número de cima mostra quantas partes você pegou. Em 3/5, o todo foi dividido em 5 partes e você pegou 3.',
    analogy: 'Imagine que sua guilda encontrou um tesouro e dividiu em 5 baús iguais. Se você ficou com 3 baús, você ficou com 3/5 do tesouro.',
    vunespMode: 'A Vunesp costuma cobrar soma, subtração, multiplicação, divisão e interpretação de fração dentro de problema de texto.',
    traps: [
      'Para somar ou subtrair frações, os denominadores precisam ser iguais.',
      'Para multiplicar, multiplica numerador com numerador e denominador com denominador.',
      'Para dividir, repete a primeira fração e multiplica pelo inverso da segunda.',
      'Em problema de texto, primeiro descubra qual é o todo.'
    ],
    memoryHook: 'Fração é parte de um todo: baixo divide, cima pega.',
    finalReminder: 'Se cair na prova, pergunte: qual é o todo e qual pedaço foi pedido?',
    miniMission: 'Resolva mentalmente: 1/2 de 100, 1/4 de 80 e 3/5 de 50.',
    notUnderstood: 'Modo simples: pense em pizza. O denominador é em quantas fatias cortou. O numerador é quantas fatias você comeu.'
  },
  {
    missionId: 'mt-03',
    subjectId: 'matematica',
    title: 'Razão e Proporção — Comparando Forças',
    missionBrief: 'Aprender a comparar grandezas e montar proporções.',
    dumbMode: 'Razão é comparação por divisão. Se há 10 candidatos e 2 vagas, a razão é 10 para 2, ou 10/2. Proporção é quando duas razões são equivalentes.',
    analogy: 'Em um RPG, se 2 poções curam 40 pontos de vida, 4 poções curam 80. A relação entre poções e cura se mantém. Isso é proporção.',
    vunespMode: 'A banca coloca problemas com quantidade, preço, distância, tempo e produção. A chave é descobrir se as grandezas crescem juntas ou se uma cresce quando a outra diminui.',
    traps: [
      'Razão não é sempre porcentagem; é comparação.',
      'Na proporção, faça produto cruzado.',
      'Cuidado para manter as grandezas na mesma ordem.',
      'Se trocar a ordem em uma fração e não trocar na outra, erra.'
    ],
    memoryHook: 'Proporção é equilíbrio: se mexe de um lado, precisa mexer do outro.',
    finalReminder: 'Se cair na prova, monte as frações na mesma ordem e use produto cruzado.',
    miniMission: 'Monte a proporção: 3 cadernos custam 18 reais. Quanto custam 5?',
    notUnderstood: 'Pensa em balança mágica: os dois lados precisam manter a mesma relação.'
  },
  {
    missionId: 'mt-04',
    subjectId: 'matematica',
    title: 'Regra de Três — A Missão das Grandezas',
    missionBrief: 'Resolver problemas de proporção sem se perder no enunciado.',
    dumbMode: 'Regra de três serve quando o problema dá três informações e pede a quarta. Você monta uma tabela, compara as grandezas e calcula o valor que falta.',
    analogy: 'Imagine uma missão de sobrevivência: se 4 soldados carregam suprimentos em 6 horas, quantas horas 8 soldados levariam? Mais soldados, menos tempo. Isso é grandeza inversa.',
    vunespMode: 'A Vunesp gosta de misturar produção, tempo, quantidade de pessoas, distância e consumo. Muitas questões são simples, mas o texto tenta te confundir.',
    traps: [
      'Mais pessoas fazendo o mesmo trabalho normalmente diminuem o tempo.',
      'Mais distância normalmente aumenta combustível ou tempo.',
      'Mais máquinas normalmente aumentam produção.',
      'Antes de calcular, diga se é direta ou inversa.'
    ],
    memoryHook: 'Direta sobe junto. Inversa: uma sobe, a outra desce.',
    finalReminder: 'Se cair na prova, escreva primeiro: direta ou inversa?',
    miniMission: 'Resolva: 5 operários fazem um serviço em 10 dias. 10 operários fariam em quantos dias?',
    notUnderstood: 'Modo burro: se aumentar uma coisa faz a outra aumentar também, é direta. Se aumentar uma faz a outra diminuir, é inversa.'
  },
  {
    missionId: 'mt-05',
    subjectId: 'matematica',
    title: 'Porcentagem — O Feitiço do 100',
    missionBrief: 'Transformar porcentagem em conta simples.',
    dumbMode: 'Porcentagem é uma fração com denominador 100. 25% significa 25 de cada 100. Para calcular porcentagem de um número, multiplique pelo percentual dividido por 100.',
    analogy: 'Imagine que uma guilda cobra taxa de 10% sobre todo tesouro. Se o tesouro é 200 moedas, 10% são 20 moedas.',
    vunespMode: 'A banca cobra desconto, aumento, lucro, prejuízo, juros simples e porcentagem dentro de texto.',
    traps: [
      'Desconto de 20% significa pagar 80% do valor.',
      'Aumento de 15% significa pagar 115% do valor.',
      'Cuidado com aumentos sucessivos: 10% + 10% não é igual a 20% direto em todos os casos.',
      'Em juros simples, use J = C × i × t.'
    ],
    memoryHook: 'Porcentagem é sempre em cima de 100.',
    finalReminder: 'Se cair na prova, transforme % em decimal: 20% vira 0,20; 5% vira 0,05.',
    miniMission: 'Calcule: 10% de 300, 25% de 80 e 12% de 200.',
    notUnderstood: 'Pensa em 100 moedas. Se alguém fala 30%, está falando de 30 moedas a cada 100.'
  },
  {
    missionId: 'mt-06',
    subjectId: 'matematica',
    title: 'Equação do 1º Grau — Isolando o Suspeito X',
    missionBrief: 'Aprender a resolver equações isolando o x.',
    dumbMode: 'Equação é uma igualdade com uma incógnita. Resolver é descobrir o valor do x. Para isso, você precisa deixar o x sozinho de um lado.',
    analogy: 'Pense em uma investigação. O x é o suspeito escondido. Cada número ao redor dele é uma testemunha atrapalhando. Você vai tirando uma por uma até o x ficar isolado.',
    vunespMode: 'A Vunesp cobra equações diretas e problemas de texto que precisam ser transformados em equação.',
    traps: [
      'Quando um número muda de lado, a operação inversa aparece.',
      'Se está somando, passa subtraindo.',
      'Se está multiplicando, passa dividindo.',
      'Cuidado com parênteses: resolva ou distribua antes.'
    ],
    memoryHook: 'Resolver equação é deixar o x sozinho.',
    finalReminder: 'Se cair na prova, isole o x com calma e confira substituindo o valor na equação.',
    miniMission: 'Resolva: 2x + 6 = 20 e depois confira se o valor encontrado funciona.',
    notUnderstood: 'Modo simples: o x quer ficar sozinho. Tudo que está grudado nele precisa sair usando a operação contrária.'
  },
  {
    missionId: 'cg-02',
    subjectId: 'gerais',
    title: 'História do Brasil — Linha do Tempo da Missão Nacional',
    missionBrief: 'Entender Colônia e Império como fases de uma campanha histórica.',
    dumbMode: 'História do Brasil não é decorar um monte de data solta. É entender a sequência dos acontecimentos: primeiro o Brasil foi colônia de Portugal, depois virou independente, depois Império, e só depois República.',
    analogy: 'Pense como uma saga de fantasia. A Colônia é quando o reino distante manda em tudo. A Independência é a ruptura com o reino antigo. O Império é quando surge uma nova coroa local. A República é quando o sistema muda de novo.',
    vunespMode: 'A Vunesp costuma cobrar acontecimentos marcantes: chegada dos portugueses, ciclos econômicos, Independência, Abolição, Proclamação da República e Era Vargas.',
    traps: [
      'Independência do Brasil: 1822.',
      'Abolição da escravidão: 1888.',
      'Proclamação da República: 1889.',
      'Não confunda Brasil Império com República Velha.'
    ],
    memoryHook: '1500 Colônia, 1822 Independência, 1888 Abolição, 1889 República.',
    finalReminder: 'Se cair História, organize primeiro a fase: Colônia, Império ou República.',
    miniMission: 'Repita a linha: 1500, 1822, 1888, 1889 e diga o que aconteceu em cada ano.',
    notUnderstood: 'Modo simples: pense em fases de jogo. O Brasil não nasceu República. Ele passou por fases até chegar no modelo atual.'
  },
  {
    missionId: 'cg-03',
    subjectId: 'gerais',
    title: 'República Brasileira — Troca de Sistema e Disputa de Poder',
    missionBrief: 'Entender a República como mudança de regime e disputa política.',
    dumbMode: 'República é um sistema em que o chefe de Estado não é rei nem imperador hereditário. No Brasil, a República começou em 1889, quando o Império acabou.',
    analogy: 'Imagine uma guilda que deixa de obedecer a uma família real e passa a escolher líderes por outro sistema. Isso não significa que tudo ficou justo de imediato. Mudou a regra do poder, mas continuaram disputas.',
    vunespMode: 'A banca gosta de República Velha, Era Vargas, Ditadura Militar, Redemocratização e Constituição de 1988.',
    traps: [
      'República não começou em 1822; isso foi Independência.',
      'Era Vargas começa em 1930.',
      'Ditadura Militar começa em 1964.',
      'Constituição Cidadã é de 1988.'
    ],
    memoryHook: '1889 abre a República; 1988 consolida a Constituição Cidadã.',
    finalReminder: 'Se cair República, procure qual período o enunciado está cobrando.',
    miniMission: 'Associe: 1930 = Vargas, 1964 = regime militar, 1988 = Constituição.',
    notUnderstood: 'Modo simples: República é outra fase do jogo político brasileiro, depois do Império.'
  },
  {
    missionId: 'cg-04',
    subjectId: 'gerais',
    title: 'Geografia Física — O Mapa do Território',
    missionBrief: 'Entender clima, relevo, rios e biomas como o terreno da missão.',
    dumbMode: 'Geografia física estuda a parte natural do território: relevo, clima, vegetação, rios e biomas. É o mapa do jogo antes dos personagens entrarem.',
    analogy: 'Em um RPG de sobrevivência, você precisa saber se está em floresta, deserto, montanha ou pântano. No Brasil, os biomas funcionam como esses cenários: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa e Pantanal.',
    vunespMode: 'A Vunesp cobra biomas, clima predominante, rios importantes, problemas ambientais e características gerais do território brasileiro.',
    traps: [
      'Maior bioma brasileiro: Amazônia.',
      'Mata Atlântica é muito devastada e aparece bastante em questões ambientais.',
      'Pantanal é planície alagável.',
      'Cerrado é importante para nascentes e agropecuária.'
    ],
    memoryHook: 'Bioma é o cenário natural da missão.',
    finalReminder: 'Se cair bioma, pense no clima, vegetação e localização.',
    miniMission: 'Liste os 6 biomas brasileiros sem olhar.',
    notUnderstood: 'Modo simples: geografia física é estudar o mapa natural: rios, clima, vegetação e relevo.'
  },
  {
    missionId: 'cg-07',
    subjectId: 'gerais',
    title: 'Constituição Federal — O Código Supremo do Reino',
    missionBrief: 'Entender direitos e garantias fundamentais sem linguagem jurídica pesada.',
    dumbMode: 'A Constituição é a lei mais importante do país. Ela organiza o Estado e protege direitos básicos, como vida, liberdade, igualdade, segurança e propriedade.',
    analogy: 'Pense na Constituição como o grimório principal de um reino. Nenhuma regra menor pode contrariar esse livro. Se uma ordem menor vai contra o grimório, ela perde força.',
    vunespMode: 'A banca cobra muito o art. 5º, direitos fundamentais, igualdade, liberdade, habeas corpus, mandado de segurança e art. 144 sobre segurança pública.',
    traps: [
      'Habeas corpus protege liberdade de locomoção.',
      'Mandado de segurança protege direito líquido e certo.',
      'Todos são iguais perante a lei.',
      'Segurança pública é dever do Estado e responsabilidade de todos.'
    ],
    memoryHook: 'Constituição é a regra máxima: todo o resto obedece.',
    finalReminder: 'Se cair direito fundamental, pense em proteção contra abuso e garantia do cidadão.',
    miniMission: 'Explique em uma frase para que serve o habeas corpus.',
    notUnderstood: 'Modo simples: a Constituição é o manual principal do Brasil. Ela diz como o Estado funciona e quais direitos não podem ser ignorados.'
  },
  {
    missionId: 'cg-10',
    subjectId: 'gerais',
    title: 'Segurança Pública — A Missão Constitucional da PM',
    missionBrief: 'Entender o papel da segurança pública e da Polícia Militar.',
    dumbMode: 'Segurança pública é dever do Estado, direito e responsabilidade de todos. A Polícia Militar atua na polícia ostensiva e na preservação da ordem pública.',
    analogy: 'Imagine uma cidade em um mundo de fantasia. A guarda da cidade patrulha as ruas, evita conflitos, responde ocorrências e mantém a ordem. Essa é a ideia da atuação ostensiva: presença visível para prevenir e agir rápido.',
    vunespMode: 'A Vunesp cobra o art. 144 da Constituição, a função da PM, diferença entre polícia ostensiva e polícia judiciária, e a ideia de preservação da ordem pública.',
    traps: [
      'Polícia Militar não é polícia judiciária; essa função é da Polícia Civil nos Estados.',
      'PM faz polícia ostensiva e preservação da ordem pública.',
      'Segurança pública não é só dever da polícia; também é responsabilidade de todos.',
      'Ordem pública envolve tranquilidade, segurança e funcionamento normal da vida social.'
    ],
    memoryHook: 'PM aparece, previne e preserva a ordem.',
    finalReminder: 'Se cair função da PM, marque polícia ostensiva e preservação da ordem pública.',
    miniMission: 'Repita: PM = ostensiva + ordem pública.',
    notUnderstood: 'Modo simples: a PM é a força visível na rua para prevenir problemas e agir quando a ordem pública é ameaçada.'
  },
  {
    missionId: 'inf-01',
    subjectId: 'informatica',
    title: 'Hardware e Software — Corpo e Alma da Máquina',
    missionBrief: 'Separar parte física, programas e funções básicas do computador.',
    dumbMode: 'Hardware é tudo que você consegue tocar: teclado, mouse, monitor, memória, placa-mãe, processador. Software é o programa: Windows, navegador, Word, Excel, antivírus.',
    analogy: 'Pense em um personagem de RPG. O hardware é o corpo, armadura e armas. O software é a habilidade, magia e comando que fazem o personagem agir.',
    vunespMode: 'A Vunesp cobra diferença entre hardware, software, memória RAM, armazenamento, periféricos e sistema operacional.',
    traps: [
      'RAM é memória temporária e volátil.',
      'HD e SSD são armazenamento permanente.',
      'Sistema operacional é software.',
      'Teclado, mouse e monitor são hardware.'
    ],
    memoryHook: 'Hardware toca. Software executa.',
    finalReminder: 'Se cair na prova, pergunte: eu consigo tocar? Se sim, é hardware.',
    miniMission: 'Classifique: Windows, teclado, RAM, Chrome, SSD.',
    notUnderstood: 'Modo simples: peça física é hardware. Programa é software.'
  },
  {
    missionId: 'inf-02',
    subjectId: 'informatica',
    title: 'Windows — O Quartel-General do Computador',
    missionBrief: 'Revisar funções básicas do Windows e atalhos que mais caem.',
    dumbMode: 'Windows é um sistema operacional. Ele gerencia arquivos, programas, janelas, pastas, dispositivos e configurações do computador.',
    analogy: 'Pense no Windows como o quartel-general. Ele organiza onde ficam os documentos, quem está aberto, quais recursos estão funcionando e como o usuário comanda a máquina.',
    vunespMode: 'A banca costuma cobrar Explorador de Arquivos, área de trabalho, lixeira, painel de controle/configurações, barra de tarefas e atalhos.',
    traps: [
      'Ctrl+C copia.',
      'Ctrl+V cola.',
      'Ctrl+X recorta.',
      'Ctrl+Z desfaz.',
      'Alt+Tab alterna entre janelas.'
    ],
    memoryHook: 'Windows organiza arquivos, programas e comandos.',
    finalReminder: 'Se cair atalho, pense primeiro nos comandos básicos: copiar, colar, recortar, desfazer e alternar janela.',
    miniMission: 'Repita: Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Alt+Tab.',
    notUnderstood: 'Modo simples: Windows é o sistema que deixa você usar o computador de forma visual.'
  },
  {
    missionId: 'inf-04',
    subjectId: 'informatica',
    title: 'Excel e Planilhas — O Grimório das Fórmulas',
    missionBrief: 'Entender células, fórmulas e funções básicas de planilha.',
    dumbMode: 'Planilha é uma tabela. As colunas são letras, as linhas são números, e cada quadradinho é uma célula. B3 significa coluna B, linha 3. Fórmulas normalmente começam com =.',
    analogy: 'Pense no Excel como um grimório de cálculo. Você escreve uma fórmula e ele executa a magia matemática automaticamente.',
    vunespMode: 'A Vunesp cobra células, intervalos, fórmulas e funções básicas como SOMA, MÉDIA, MÁXIMO, MÍNIMO e SE.',
    traps: [
      'Toda fórmula começa com =.',
      'A1:A5 indica intervalo de A1 até A5.',
      '=SOMA(A1:A5) soma os valores do intervalo.',
      '=MÉDIA(A1:A5) calcula a média.',
      '=SE(teste;valor se verdadeiro;valor se falso) faz decisão lógica.'
    ],
    memoryHook: 'Coluna é letra, linha é número, fórmula começa com igual.',
    finalReminder: 'Se cair planilha, identifique célula, intervalo e função.',
    miniMission: 'Explique o que significa B3 e o que faz =SOMA(A1:A5).',
    notUnderstood: 'Modo simples: Excel é uma tabela inteligente que faz conta sozinha quando você dá a fórmula.'
  },
  {
    missionId: 'inf-05',
    subjectId: 'informatica',
    title: 'Internet e Navegadores — Patrulha na Web',
    missionBrief: 'Entender navegador, site, URL, HTTP/HTTPS, cookies e cache.',
    dumbMode: 'Navegador é o programa usado para acessar sites. Chrome, Edge e Firefox são navegadores. HTTPS indica conexão mais segura que HTTP porque usa criptografia.',
    analogy: 'Imagine a internet como uma cidade enorme. O navegador é sua viatura. A URL é o endereço. O HTTPS é uma rota mais protegida.',
    vunespMode: 'A banca cobra navegador, favoritos, histórico, cache, cookies, URL, HTTP, HTTPS e segurança online.',
    traps: [
      'HTTPS é mais seguro porque usa criptografia.',
      'Cookie guarda informações da navegação.',
      'Cache armazena dados temporários para carregar mais rápido.',
      'Favoritos salvam sites para acesso posterior.'
    ],
    memoryHook: 'Navegador é a viatura; URL é o endereço; HTTPS é rota protegida.',
    finalReminder: 'Se cair segurança na web, HTTPS e phishing são candidatos fortes.',
    miniMission: 'Abra mentalmente um site e identifique: navegador, endereço, HTTPS e favoritos.',
    notUnderstood: 'Modo simples: navegador é o aplicativo para entrar em sites.'
  },
  {
    missionId: 'inf-06',
    subjectId: 'informatica',
    title: 'Segurança da Informação — Defesa Contra Armadilhas Digitais',
    missionBrief: 'Revisar golpes, malware, senha forte, backup e proteção de dados.',
    dumbMode: 'Segurança da informação é proteger dados contra perda, roubo, alteração ou acesso indevido. Isso envolve senha forte, backup, antivírus, cuidado com links falsos e proteção de dados pessoais.',
    analogy: 'Pense como uma base militar. Senha forte é portão reforçado. Backup é rota de fuga. Antivírus é sentinela. Phishing é inimigo disfarçado tentando entrar.',
    vunespMode: 'A banca cobra muito phishing, malware, vírus, backup, senha forte, autenticação em dois fatores e LGPD.',
    traps: [
      'Phishing tenta enganar o usuário para roubar dados.',
      'Malware é software malicioso.',
      'Backup é cópia de segurança.',
      'Senha forte mistura letras, números e símbolos.',
      'LGPD protege dados pessoais.'
    ],
    memoryHook: 'Phishing engana. Malware infecta. Backup salva.',
    finalReminder: 'Se cair golpe digital, procure engenharia social, link falso ou roubo de dados.',
    miniMission: 'Diga a diferença entre phishing, malware e backup.',
    notUnderstood: 'Modo simples: segurança digital é não deixar seus dados caírem na mão errada.'
  }
];

export function getTheoryLesson(missionId: string): TheoryLesson | undefined {
  return theoryLessons.find(lesson => lesson.missionId === missionId);
}
