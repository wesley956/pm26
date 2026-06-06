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
    missionBrief: 'Nesta aula você vai aprender a ler como investigador: primeiro identifica o assunto, depois encontra a tese ou ideia central, depois elimina alternativas que exageram, inventam ou distorcem. O objetivo não é “sentir” a resposta; é provar a resposta com pistas do próprio texto.',
    dumbMode: 'Interpretação é responder com base no texto, não com base na sua opinião. Faça assim: 1) leia a pergunta antes do texto para saber o que procurar; 2) leia o texto procurando a ideia principal; 3) sublinhe mentalmente palavras repetidas, conclusões e contrastes; 4) volte para as alternativas e elimine as que dizem mais do que o texto disse. Se a alternativa parece inteligente, mas não dá para provar com uma frase do texto, ela é suspeita.',
    analogy: 'Pense como um investigador em uma cena de crime. A alternativa errada é aquele suspeito que “parece culpado”, mas não deixou pista. A alternativa certa pode até parecer simples, mas tem prova: uma frase, uma ideia repetida, um conectivo ou uma conclusão do autor. Na prova, você não prende o suspeito mais bonito; você prende quem as evidências apontam.',
    vunespMode: 'A Vunesp gosta de cobrar compreensão global, inferência permitida e sentido de palavras no contexto. Ela costuma colocar uma alternativa verdadeira no mundo real, mas ausente no texto; uma alternativa exagerada com “sempre”, “nunca”, “todos”; e uma alternativa quase certa que troca uma palavra e muda o sentido. A estratégia é perguntar: “onde o texto autoriza isso?” Se você não consegue apontar a prova, elimine.',
    traps: [
      'Confundir assunto com ideia principal. Assunto é o tema; ideia principal é o que o autor afirma sobre o tema.',
      'Marcar alternativa baseada na sua opinião pessoal.',
      'Aceitar alternativa bonita, mas sem prova no texto.',
      'Cair em exageros como sempre, nunca, todos, somente, exclusivamente.',
      'Ignorar conectivos como porém, portanto, embora, pois; eles mudam a direção da ideia.',
      'Confundir inferência com invenção. Inferência precisa nascer do texto.'
    ],
    memoryHook: 'Texto é cena de crime: resposta certa precisa de evidência.',
    finalReminder: 'Na prova, faça a pergunta de ouro: “qual trecho prova essa alternativa?” Se não houver prova, não marque.',
    miniMission: 'Questão de verificação: pegue uma questão de interpretação e, antes de marcar, escreva mentalmente: assunto do texto, ideia principal e trecho que prova a resposta. Só depois responda.',
    notUnderstood: 'Modo mais simples: o texto manda. Você obedece. Não escolha a resposta que você acha bonita; escolha a que o texto deixou provar.'
  },
  {
    missionId: 'pt-03',
    subjectId: 'portugues',
    title: 'Coesão e Coerência — O Fio Mágico do Texto',
    missionBrief: 'Nesta aula você vai entender como um texto fica unido. Coesão é a ligação visível entre partes: pronomes, conectivos, substituições, repetições controladas. Coerência é o sentido global: as ideias não podem se contradizer e precisam caminhar para o mesmo objetivo.',
    dumbMode: 'Coesão é a cola. Coerência é o sentido. Um texto pode ter palavras bem conectadas e ainda ser incoerente se as ideias brigam entre si. Para resolver questão, observe quem os pronomes retomam, que sentido o conectivo cria e se a frase nova combina com a anterior. Palavras como “mas”, “portanto”, “porque”, “embora” e “além disso” são placas de trânsito: elas mostram se a ideia vira, conclui, explica, concede ou soma.',
    analogy: 'Imagine uma equipe em missão. Cada membro precisa saber quem está protegendo quem, para onde vai e qual é o objetivo. Os pronomes são como códigos de rádio: “ele”, “isso”, “essa medida” precisam apontar para algo certo. Os conectivos são ordens do comandante: “porém” muda a rota, “portanto” conclui, “porque” explica, “além disso” reforça.',
    vunespMode: 'A Vunesp cobra muito substituição de termos, valor semântico de conectivos e manutenção de sentido. Ela pode perguntar se trocar “porém” por “portanto” mantém o sentido. Quase sempre a resposta depende da relação lógica entre as ideias: oposição, causa, consequência, explicação, conclusão, condição, concessão ou adição.',
    traps: [
      'Trocar conectivo só porque fica bonito. É preciso manter o mesmo sentido lógico.',
      'Confundir causa com consequência. “Porque” explica causa; “portanto” indica conclusão/consequência.',
      'Confundir oposição com concessão. “Mas” opõe; “embora” admite algo que não impede a ideia principal.',
      'Errar o referente do pronome. Pergunte: esse “ele/isso/essa” retoma o quê?',
      'Achar que repetição sempre é erro. Às vezes repetir evita ambiguidade.',
      'Ignorar contradições internas do texto. Coerência exige compatibilidade entre ideias.'
    ],
    memoryHook: 'Conectivo é placa de trânsito: ele mostra para onde a ideia vai.',
    finalReminder: 'Na prova, não decore lista solta. Leia a frase anterior e a seguinte e pergunte qual relação nasceu entre elas.',
    miniMission: 'Questão de verificação: classifique estes conectivos: mas, portanto, porque, embora, além disso. Depois crie uma frase curta para cada um.',
    notUnderstood: 'Modo simples: coesão é uma frase segurando a mão da outra. Coerência é todo mundo caminhando para o mesmo lugar.'
  },
  {
    missionId: 'pt-05',
    subjectId: 'portugues',
    title: 'Concordância — A Hierarquia da Frase',
    missionBrief: 'Você vai aprender a descobrir quem manda no verbo e nos nomes. Concordância verbal é a relação entre sujeito e verbo. Concordância nominal é a relação entre substantivo e seus acompanhantes: artigo, adjetivo, numeral e pronome.',
    dumbMode: 'A regra principal é simples: ache o núcleo. Na concordância verbal, o núcleo do sujeito manda no verbo. Em “os candidatos estudam”, o núcleo é “candidatos”, plural; então o verbo vai para o plural. Na concordância nominal, o substantivo manda nos termos que dependem dele. Em “as provas difíceis”, artigo e adjetivo acompanham “provas”. Antes de decorar exceção, treine achar o núcleo.',
    analogy: 'Pense numa equipe policial. O comandante dá a ordem e o grupo acompanha. Na frase, o sujeito é o comandante do verbo. Se você confunde o comandante com alguém que só está perto, erra a ordem. Em “a lista de aprovados saiu”, o núcleo é “lista”, não “aprovados”; por isso o verbo fica no singular.',
    vunespMode: 'A Vunesp gosta de afastar sujeito e verbo, colocar expressão no meio e usar verbos impessoais. Cuidado com “haver” no sentido de existir, “fazer” indicando tempo, sujeito composto, expressões partitivas como “a maioria de”, e núcleos no singular acompanhados de termos no plural.',
    traps: [
      'Sujeito longe do verbo. Volte e ache o núcleo real.',
      'Termo no plural perto do verbo enganando você: “a lista de candidatos chegou”.',
      'Haver no sentido de existir fica no singular: houve problemas.',
      'Fazer indicando tempo fica no singular: faz dois anos.',
      'Existir não é impessoal: existem problemas.',
      'A maioria de pode admitir singular ou plural conforme o foco, mas a banca costuma explorar o núcleo da expressão.'
    ],
    memoryHook: 'Ache o comandante da frase antes de mexer no verbo.',
    finalReminder: 'Na prova, faça três passos: ache o sujeito, ache o núcleo, confira se o verbo obedeceu.',
    miniMission: 'Questão de verificação: explique por que “A maioria dos candidatos estudou” e “Existem dúvidas” estão corretas.',
    notUnderstood: 'Modo simples: primeiro descubra quem manda. Depois veja se o verbo e os acompanhantes obedeceram esse chefe.'
  },
  {
    missionId: 'pt-07',
    subjectId: 'portugues',
    title: 'Crase — O Portal Duplo do A',
    missionBrief: 'Você vai entender crase como encontro de dois elementos: a preposição a mais o artigo feminino a. Se não houver esses dois elementos, não há crase. Em vez de decorar mil regras, aprenda os testes rápidos.',
    dumbMode: 'Crase não é acento colocado por beleza. Ela marca a fusão de dois As. O primeiro A vem porque o verbo ou nome exige preposição. O segundo A vem porque a palavra seguinte aceita artigo feminino. Exemplo: vou a + a escola = vou à escola. Se a palavra seguinte é verbo, masculina ou pronome pessoal, normalmente não existe artigo feminino; então não tem crase.',
    analogy: 'Imagine um portal mágico que só abre com duas chaves. Uma chave é a preposição exigida pela palavra anterior. A outra chave é o artigo feminino da palavra seguinte. Se você tem as duas, o portal abre e aparece à. Se falta uma chave, o portal não abre.',
    vunespMode: 'A Vunesp cobra proibições, obrigatoriedades e testes. Ela gosta de frases com nomes de lugar, locuções femininas, palavras masculinas e pronomes. Também cobra diferença entre a, à e há. O melhor caminho é testar: quem exige a antes? A palavra seguinte aceita a?',
    traps: [
      'Antes de verbo não há crase: começou a estudar.',
      'Antes de palavra masculina não há crase: foi a pé.',
      'Antes de pronome pessoal não há crase: entreguei a ela.',
      'Com cidade, use o teste: volto de Curitiba, vou a Curitiba; volto da Bahia, vou à Bahia.',
      'Locuções femininas costumam receber crase: à noite, às vezes, à medida que.',
      'Há indica tempo passado ou existência; a pode indicar tempo futuro ou distância.'
    ],
    memoryHook: 'Crase só existe quando duas chaves A abrem o mesmo portal.',
    finalReminder: 'Na prova, faça dois testes: a palavra anterior pede preposição a? A próxima palavra aceita artigo feminino a?',
    miniMission: 'Questão de verificação: explique por que há crase em fui à escola e não há crase em comecei a estudar.',
    notUnderstood: 'Modo simples: se depois do A vem verbo, palavra masculina ou pronome pessoal, desconfie muito da crase.'
  },
  {
    missionId: 'pt-08',
    subjectId: 'portugues',
    title: 'Pontuação — O Ritmo da Operação',
    missionBrief: 'Você vai aprender que pontuação não é respiração; é organização sintática e de sentido. A vírgula separa funções, isola termos e evita ambiguidade. O objetivo é entender o papel da pausa dentro da frase.',
    dumbMode: 'A regra que mais salva questão é: não separe sujeito e verbo com vírgula. Depois, aprenda as funções principais: vírgula isola vocativo, aposto, termo deslocado, oração explicativa e itens de enumeração. Dois-pontos anunciam explicação, enumeração ou fala. Ponto e vírgula separa partes maiores quando a vírgula já está sendo usada.',
    analogy: 'Pense em uma equipe entrando em ocorrência. Se você separa comandante da ordem, a operação quebra. Na frase é igual: sujeito e verbo precisam ficar juntos. A pontuação organiza quem chama, quem explica, quem enumera e quem entra como informação extra.',
    vunespMode: 'A Vunesp cobra principalmente vírgula entre sujeito e verbo, vocativo, aposto, oração explicativa versus restritiva, adjunto adverbial deslocado e enumeração. Ela também pergunta se a retirada ou inclusão da vírgula muda o sentido.',
    traps: [
      'Nunca separe sujeito e verbo por vírgula sem motivo sintático forte.',
      'Vocativo é chamamento e vem isolado: Candidato, mantenha a calma.',
      'Aposto explicativo vem isolado: João, o supervisor, chegou.',
      'Oração explicativa vem com vírgula; restritiva normalmente não.',
      'Termo deslocado no início pode pedir vírgula: À noite, os candidatos estudaram.',
      'Vírgula pode mudar sentido: não, espere; não espere.'
    ],
    memoryHook: 'Vírgula organiza função, não respiração.',
    finalReminder: 'Na prova, pergunte: essa vírgula está isolando explicação, chamamento, deslocamento ou enumeração? Se separou sujeito e verbo, cuidado.',
    miniMission: 'Questão de verificação: crie uma frase com vocativo, uma com aposto e uma com termo deslocado no início.',
    notUnderstood: 'Comece com uma regra de sobrevivência: sujeito e verbo não se separam. Só isso já elimina muita alternativa errada.'
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
  },
  {
    missionId: 'pt-02',
    subjectId: 'portugues',
    title: 'Tipos Textuais — Identificando o Monstro pelo Rastro',
    missionBrief: 'Você vai aprender a reconhecer o tipo textual pela função dominante. Narração mostra acontecimentos; descrição mostra características; dissertação explica ou defende ideia; injunção orienta o leitor; exposição informa. A Vunesp não quer decoreba: ela quer que você perceba o que o texto está fazendo.',
    dumbMode: 'Tipo textual é o “modo de funcionamento” do texto. Se o texto conta uma sequência de fatos, com ação, tempo e personagens, é narração. Se ele para a câmera e mostra detalhes de uma pessoa, lugar ou objeto, é descrição. Se ele discute uma ideia, explica um problema ou tenta convencer, é dissertação. Se ele manda fazer algo, dá instrução ou comando, é injunção. Se ele só apresenta informação de forma neutra, é exposição.',
    analogy: 'Pense em um anime de investigação. Quando a cena mostra o herói correndo, lutando e descobrindo pistas, é narração. Quando descreve a mansão escura, o cheiro, a roupa do suspeito e o clima, é descrição. Quando o personagem explica por que o vilão representa perigo para a cidade, é dissertação. Quando o manual ensina como selar o portal, é injunção.',
    vunespMode: 'A banca costuma perguntar finalidade, predominância ou característica do texto. Um texto pode misturar tipos: pode ter descrição dentro de uma narração ou exemplo narrativo dentro de uma dissertação. O que importa é o tipo predominante. Pergunte: “o objetivo principal é contar, mostrar, explicar, convencer ou orientar?”',
    traps: [
      'Achar que todo texto com personagem é narração. Pode haver personagem em texto dissertativo como exemplo.',
      'Confundir descrição com narração. Descrição mostra estado; narração mostra acontecimento.',
      'Confundir dissertação expositiva com argumentativa. Expositiva explica; argumentativa defende tese.',
      'Ignorar comandos. Verbos no imperativo podem indicar injunção.',
      'Marcar tipo textual por uma frase isolada em vez da finalidade predominante.',
      'Achar que notícia é sempre narração. Muitas notícias misturam exposição, narração e descrição.'
    ],
    memoryHook: 'Narra ação. Descreve aparência. Disserta ideia. Instrui comando.',
    finalReminder: 'Se cair na prova, descubra o verbo invisível do texto: contar, mostrar, explicar, defender ou orientar.',
    miniMission: 'Questão de verificação: leia 5 linhas de qualquer texto e diga: há ação? há descrição? há tese? há comando? Depois escolha o tipo predominante.',
    notUnderstood: 'Modo simples: narração é filme acontecendo; descrição é foto detalhada; dissertação é debate; injunção é manual de instruções.'
  },
  {
    missionId: 'pt-04',
    subjectId: 'portugues',
    title: 'Classes de Palavras — A Guilda da Gramática',
    missionBrief: 'Você vai aprender a identificar a classe pela função na frase, não pela palavra isolada. A mesma palavra pode mudar de classe dependendo do uso. Por isso, primeiro olhe o papel que ela exerce: nomeia, caracteriza, indica ação, modifica, liga, substitui ou determina.',
    dumbMode: 'Classe de palavra é o cargo da palavra dentro da frase. Substantivo nomeia seres, coisas, ideias e sentimentos. Adjetivo caracteriza substantivo. Verbo indica ação, estado ou fenômeno. Advérbio modifica verbo, adjetivo ou outro advérbio. Pronome substitui ou acompanha nome. Artigo determina substantivo. Preposição liga termos. Conjunção liga ideias ou orações. Interjeição expressa emoção.',
    analogy: 'Pense numa guilda de RPG. O guerreiro ataca, o curandeiro cura, o arqueiro acerta de longe e o mago altera o campo. Na frase é igual: cada palavra tem função. Mas cuidado: um personagem pode trocar de papel. Em “o bonito venceu”, “bonito” virou substantivo. Em “homem bonito”, “bonito” é adjetivo.',
    vunespMode: 'A Vunesp gosta de perguntar a classe de uma palavra destacada no contexto. Ela pode usar substantivação, locuções, pronomes relativos, advérbios terminados em -mente e palavras que mudam de classe. O segredo é perguntar: “essa palavra está fazendo o quê aqui?”',
    traps: [
      'Analisar palavra isolada. Classe depende do uso na frase.',
      'Achar que toda palavra antes de substantivo é adjetivo. Pode ser artigo, pronome ou numeral.',
      'Confundir advérbio com adjetivo. Adjetivo caracteriza substantivo; advérbio modifica verbo/adjetivo/outro advérbio.',
      'Confundir preposição com conjunção. Preposição liga termos; conjunção liga orações ou ideias.',
      'Não perceber substantivação: “o estudar exige disciplina” transforma verbo em substantivo.',
      'Ignorar locuções: “com calma” pode funcionar como advérbio.'
    ],
    memoryHook: 'Classe é função. Pergunte o que a palavra faz na equipe da frase.',
    finalReminder: 'Na prova, não responda olhando só a palavra destacada. Leia a frase inteira e descubra a função dela.',
    miniMission: 'Questão de verificação: na frase “O candidato estudou muito para a prova difícil”, identifique artigo, substantivo, verbo, advérbio, preposição e adjetivo.',
    notUnderstood: 'Modo simples: palavra é personagem. Para saber a classe, veja o trabalho que ela faz naquele momento.'
  },
  {
    missionId: 'pt-06',
    subjectId: 'portugues',
    title: 'Regência — Quem Exige Preposição?',
    missionBrief: 'Você vai aprender a enxergar quando uma palavra exige complemento com preposição. Regência é a relação de dependência entre um termo principal e seu complemento. Em prova, o segredo é perguntar: esse verbo ou nome pede preposição? Se pede, qual?',
    dumbMode: 'Regência é quando uma palavra manda na outra. Alguns verbos aceitam complemento direto, sem preposição. Outros exigem preposição. Quem assiste no sentido de ver, assiste a algo. Quem obedece, obedece a alguém. Quem prefere, prefere uma coisa a outra. O erro comum é usar a preposição do jeito que falamos no dia a dia, mas a prova cobra a forma padrão.',
    analogy: 'Pense em uma magia de RPG. Cada magia precisa de um ingrediente certo. O verbo é a magia; a preposição é o ingrediente. Se você usa a preposição errada, a magia falha. Assistir no sentido de ver exige a. Obedecer exige a. Preferir exige estrutura com a, não com do que.',
    vunespMode: 'A Vunesp gosta de verbos clássicos: assistir, aspirar, visar, obedecer, preferir, lembrar, esquecer, chegar, ir, informar e implicar. Ela também cobra diferença de sentido: aspirar o ar é respirar; aspirar ao cargo é desejar. Assistir o paciente é ajudar; assistir ao filme é ver.',
    traps: [
      'Assistir no sentido de ver pede a: assisti ao filme.',
      'Aspirar no sentido de desejar pede a: aspiro ao cargo.',
      'Visar no sentido de desejar pede a: viso ao cargo.',
      'Obedecer e desobedecer pedem a: obedeceu ao edital.',
      'Preferir pede estrutura preferir X a Y, e não preferir X do que Y.',
      'Chegar e ir, na norma padrão, pedem a: cheguei ao local, fui à escola.'
    ],
    memoryHook: 'Regência é o verbo pedindo senha para completar sentido.',
    finalReminder: 'Na prova, pergunte: o verbo mudou de sentido? Ele exige preposição? Qual preposição mantém a norma padrão?',
    miniMission: 'Questão de verificação: escreva uma frase correta com assistir, obedecer, aspirar, visar e preferir.',
    notUnderstood: 'Modo simples: alguns verbos são exigentes. Eles não aceitam qualquer companhia; pedem uma preposição certa.'
  },
  {
    missionId: 'pt-09',
    subjectId: 'portugues',
    title: 'Figuras de Linguagem — Magias do Sentido',
    missionBrief: 'Você vai aprender a reconhecer quando a linguagem sai do sentido literal para criar efeito. Figuras de linguagem servem para comparar, exagerar, suavizar, ironizar, substituir ou dar expressividade.',
    dumbMode: 'Figura de linguagem é quando a frase não quer ser lida ao pé da letra. Metáfora compara sem usar como. Comparação usa como. Hipérbole exagera. Eufemismo suaviza algo pesado. Ironia diz o contrário para criticar. Metonímia troca uma palavra por outra relacionada. Personificação dá ação humana a algo não humano.',
    analogy: 'Em fantasia, dizer que o guerreiro é um dragão não significa que ele criou asas. Significa que ele é forte ou assustador em combate: isso é metáfora. Dizer que esperou mil anos é exagero: hipérbole. Dizer que alguém partiu desta para melhor suaviza a morte: eufemismo.',
    vunespMode: 'A Vunesp costuma apresentar uma frase curta e pedir a figura predominante. Ela também pode cobrar efeito de sentido. A armadilha é confundir metáfora com comparação, ironia com mentira e metonímia com metáfora. Foque no mecanismo usado pela frase.',
    traps: [
      'Metáfora é comparação implícita, sem como.',
      'Comparação explícita usa como, tal qual, feito.',
      'Hipérbole é exagero intencional.',
      'Ironia diz o contrário do que quer significar, geralmente com crítica.',
      'Eufemismo suaviza expressão dura.',
      'Metonímia troca um termo por outro relacionado: li Machado de Assis, isto é, li a obra dele.'
    ],
    memoryHook: 'Metáfora compara. Hipérbole exagera. Ironia inverte. Eufemismo suaviza.',
    finalReminder: 'Na prova, pergunte: a frase compara, exagera, suaviza, ironiza, humaniza ou troca um termo por outro relacionado?',
    miniMission: 'Questão de verificação: crie uma metáfora, uma hipérbole, uma ironia e um eufemismo.',
    notUnderstood: 'Modo simples: figura de linguagem é quando a frase ganha efeito especial e não deve ser lida só no sentido literal.'
  },
  {
    missionId: 'pt-10',
    subjectId: 'portugues',
    title: 'Ortografia e Acentuação — Inspeção Final da Escrita',
    missionBrief: 'Você vai revisar padrões de escrita correta e acentuação que mais aparecem em prova. Não é para decorar o dicionário inteiro; é para dominar regras de sílaba tônica, oxítonas, paroxítonas, proparoxítonas e grafias frequentes.',
    dumbMode: 'Acentuação começa descobrindo a sílaba mais forte. Se a sílaba forte é a última, a palavra é oxítona. Se é a penúltima, é paroxítona. Se é a antepenúltima, é proparoxítona. Todas as proparoxítonas são acentuadas. Oxítonas terminadas em a, e, o, em e ens são acentuadas. Paroxítonas têm regras mais variadas, mas muitas caem por contraste com as oxítonas.',
    analogy: 'Pense numa inspeção antes da missão. O uniforme pode estar quase certo, mas um detalhe errado entrega falta de atenção. Na escrita, acento e ortografia são esses detalhes. Para a prova, você precisa olhar a palavra como um perito: onde está a força? Qual regra se aplica? A grafia parece comum, mas está correta?',
    vunespMode: 'A Vunesp cobra palavras parecidas, acento diferencial, hiato, proparoxítonas, paroxítonas comuns e grafias que muita gente erra. Também explora palavras sem acento que parecem acentuadas, como item e itens, e palavras com grafia traiçoeira, como exceção, privilégio e disciplina.',
    traps: [
      'Todas as proparoxítonas são acentuadas: médico, lâmpada, público.',
      'Oxítonas terminadas em a, e, o, em e ens são acentuadas: café, avó, também, parabéns.',
      'Item e itens não têm acento.',
      'Hiatos podem receber acento: saúde, saída, juízes.',
      'Não confunda comprimento com cumprimento.',
      'Grafias comuns em prova: exceção, privilégio, disciplina, assessoria, excesso.'
    ],
    memoryHook: 'Primeiro ache a sílaba forte; depois aplique a regra.',
    finalReminder: 'Na prova, não chute acento por aparência. Classifique a palavra: oxítona, paroxítona ou proparoxítona.',
    miniMission: 'Questão de verificação: classifique e explique a acentuação de café, fácil, médico, saúde e itens.',
    notUnderstood: 'Modo simples: descubra qual pedaço da palavra fala mais forte. A regra de acento vem depois disso.'
  },
  {
    missionId: 'ap-04',
    subjectId: 'administracao',
    title: 'Licitações — A Compra Pública sem Favoritismo',
    missionBrief: 'Entender licitação como disputa organizada para contratar melhor.',
    dumbMode: 'Licitação é o processo que a Administração usa para comprar, contratar obra ou serviço de forma justa, buscando proposta vantajosa e evitando favorecimento.',
    analogy: 'Imagine uma guilda escolhendo quem vai fornecer armas para a guarda. Se o chefe escolhe o amigo sem disputa, há risco de corrupção. A licitação cria regras para todos competirem.',
    vunespMode: 'A banca cobra finalidade da licitação, princípios, modalidades e diferença entre dispensa e inexigibilidade.',
    traps: [
      'Licitação busca proposta vantajosa, não necessariamente o menor preço em todo caso.',
      'Pregão é usado para bens e serviços comuns.',
      'Dispensa ocorre quando a lei permite não licitar.',
      'Inexigibilidade ocorre quando a competição é inviável.',
      'Isonomia significa igualdade entre participantes.'
    ],
    memoryHook: 'Licitação é competição com regra para proteger o dinheiro público.',
    finalReminder: 'Se cair licitação, pense em isonomia, proposta vantajosa e interesse público.',
    miniMission: 'Explique a diferença entre dispensa e inexigibilidade em uma frase.',
    notUnderstood: 'Modo simples: licitação é o Estado comprando com regras para não virar escolha de amigo.'
  },
  {
    missionId: 'ap-05',
    subjectId: 'administracao',
    title: 'Servidores Públicos — Agentes em Missão do Estado',
    missionBrief: 'Entender ingresso, deveres, direitos e estabilidade de servidores.',
    dumbMode: 'Servidor público é uma pessoa que trabalha para o Estado. Em regra, entra por concurso. Ele tem deveres, direitos e deve agir em favor do interesse público.',
    analogy: 'Pense em uma ordem de guardiões. Para entrar, precisa passar por seleção. Depois, o guardião não age como dono da ordem; ele segue regras, hierarquia e deveres.',
    vunespMode: 'A banca cobra concurso público, estabilidade, acumulação de cargos, deveres funcionais e responsabilidade do servidor.',
    traps: [
      'Concurso público é a regra de ingresso.',
      'Estabilidade não é liberdade para trabalhar mal.',
      'Servidor responde por atos ilegais.',
      'Acumulação de cargos só é permitida em hipóteses constitucionais.',
      'Cargo público não é propriedade do servidor.'
    ],
    memoryHook: 'Servidor serve ao público, não a si mesmo.',
    finalReminder: 'Se cair servidor, procure concurso, dever funcional e interesse público.',
    miniMission: 'Diga por que estabilidade não significa impunidade.',
    notUnderstood: 'Modo simples: servidor é agente do Estado e precisa seguir regras mais rígidas que um trabalhador comum.'
  },
  {
    missionId: 'ap-06',
    subjectId: 'administracao',
    title: 'Controle da Administração — Quem Vigia o Vigia?',
    missionBrief: 'Entender controle interno, externo, judicial e popular.',
    dumbMode: 'Controle da Administração é fiscalização. Serve para impedir abuso, erro, desperdício e corrupção. Pode ser feito pelo próprio órgão, por outro Poder, pelo Judiciário ou pelo cidadão.',
    analogy: 'Em uma organização de investigação, ninguém pode agir sem supervisão. Até o líder precisa prestar contas. Controle é o sistema que impede que a missão vire bagunça.',
    vunespMode: 'A banca cobra controle interno, externo, legislativo, Tribunal de Contas, controle judicial e participação popular.',
    traps: [
      'Controle interno é feito dentro do próprio Poder ou órgão.',
      'Controle externo é feito pelo Legislativo com auxílio dos Tribunais de Contas.',
      'Controle judicial verifica legalidade, não substitui mérito administrativo em regra.',
      'Cidadão pode provocar controle por denúncias e ações próprias.'
    ],
    memoryHook: 'Controle é fiscalização para manter a Administração dentro da lei.',
    finalReminder: 'Se cair controle externo, lembre: Legislativo + Tribunal de Contas.',
    miniMission: 'Classifique: corregedoria, Tribunal de Contas, Judiciário e cidadão.',
    notUnderstood: 'Modo simples: controle é alguém conferindo se o poder público está agindo certo.'
  },
  {
    missionId: 'ap-08',
    subjectId: 'administracao',
    title: 'Responsabilidade Fiscal — O Tesouro não é Infinito',
    missionBrief: 'Entender a lógica da Lei de Responsabilidade Fiscal.',
    dumbMode: 'Responsabilidade fiscal é gastar dinheiro público com planejamento, controle e transparência. O governo não pode agir como se o dinheiro fosse infinito.',
    analogy: 'Imagine um grupo em sobrevivência com comida limitada. Se o líder gasta tudo no primeiro dia, todos sofrem depois. A LRF existe para evitar esse tipo de irresponsabilidade com recursos públicos.',
    vunespMode: 'A banca cobra planejamento, equilíbrio das contas, transparência, limites de despesa, metas fiscais e responsabilidade na gestão.',
    traps: [
      'LRF não é só cortar gastos; é controlar e planejar.',
      'Transparência é parte essencial da responsabilidade fiscal.',
      'Geração de despesa precisa respeitar regras.',
      'Renúncia de receita também exige cuidado.'
    ],
    memoryHook: 'Dinheiro público tem missão, limite e prestação de contas.',
    finalReminder: 'Se cair LRF, pense em planejamento, controle, transparência e equilíbrio.',
    miniMission: 'Explique por que gastar sem planejamento prejudica a população.',
    notUnderstood: 'Modo simples: LRF é o freio para o governo não gastar de qualquer jeito.'
  },
  {
    missionId: 'ap-09',
    subjectId: 'administracao',
    title: 'Improbidade Administrativa — Quando o Agente Vira Vilão',
    missionBrief: 'Entender atos de improbidade sem juridiquês.',
    dumbMode: 'Improbidade é conduta desonesta ou ilegal grave praticada por agente público ou por quem se beneficia dela. Pode envolver enriquecimento ilícito, prejuízo ao erário ou violação de princípios.',
    analogy: 'Em uma guilda, o guardião que usa o cargo para roubar tesouro, favorecer aliados ou prejudicar o povo deixa de ser guardião e vira vilão. Isso é a lógica da improbidade.',
    vunespMode: 'A banca cobra os tipos de atos de improbidade e exemplos práticos de enriquecimento ilícito, dano ao erário e violação de princípios.',
    traps: [
      'Enriquecimento ilícito envolve vantagem indevida.',
      'Prejuízo ao erário envolve dano ao dinheiro público.',
      'Violação de princípios atinge deveres como honestidade, legalidade e imparcialidade.',
      'Nem todo erro administrativo é improbidade; precisa gravidade e enquadramento legal.'
    ],
    memoryHook: 'Improbidade é traição ao interesse público.',
    finalReminder: 'Se cair improbidade, identifique: ganhou vantagem, causou prejuízo ou violou princípio?',
    miniMission: 'Crie um exemplo para cada tipo: enriquecimento, prejuízo e princípio.',
    notUnderstood: 'Modo simples: improbidade é quando alguém usa a função pública de forma desonesta ou gravemente errada.'
  },
  {
    missionId: 'mt-01',
    subjectId: 'matematica',
    title: 'Operações Fundamentais — A Forja dos Números',
    missionBrief: 'Dominar soma, subtração, multiplicação, divisão e sinais.',
    dumbMode: 'Operação fundamental é a base da Matemática: somar, subtrair, multiplicar e dividir. Antes de pensar em fórmula difícil, você precisa controlar essas quatro armas.',
    analogy: 'Pense como um ferreiro de RPG. Antes de criar uma espada lendária, ele precisa dominar martelo, fogo, metal e resfriamento. Na Matemática, as quatro operações são essas ferramentas básicas.',
    vunespMode: 'A Vunesp costuma colocar conta com sinais, parênteses, decimais e ordem das operações dentro de problemas simples.',
    traps: [
      'Resolva primeiro parênteses.',
      'Multiplicação e divisão vêm antes de soma e subtração.',
      'Número negativo multiplicado por negativo dá positivo.',
      'Cuidado com vírgula em números decimais.'
    ],
    memoryHook: 'Parênteses primeiro. Depois vezes/dividir. Depois soma/subtrai.',
    finalReminder: 'Se cair conta grande, quebre em partes pequenas e respeite a ordem.',
    miniMission: 'Resolva: -8 × 3 + 4 × 5 e explique cada passo.',
    notUnderstood: 'Modo simples: Matemática é igual combate por turnos. Você precisa agir na ordem certa.'
  },
  {
    missionId: 'mt-07',
    subjectId: 'matematica',
    title: 'Sistema de Equações — Dois Suspeitos na Mesma Ocorrência',
    missionBrief: 'Resolver problemas com duas incógnitas sem se perder.',
    dumbMode: 'Sistema de equações aparece quando existem duas informações e duas incógnitas. A missão é descobrir o valor de cada uma.',
    analogy: 'Imagine uma investigação com dois suspeitos: X e Y. Uma testemunha diz uma coisa, outra testemunha diz outra. Você junta as pistas até descobrir quem é quem.',
    vunespMode: 'A Vunesp pode cobrar sistema em problemas de idade, preço, quantidade de produtos ou soma e diferença entre números.',
    traps: [
      'No método da substituição, isole uma incógnita e substitua na outra equação.',
      'No método da adição, some ou subtraia equações para eliminar uma letra.',
      'Depois de achar uma incógnita, volte para achar a outra.',
      'Sempre confira se os dois valores servem nas duas equações.'
    ],
    memoryHook: 'Sistema é investigação dupla: descubra X e Y usando duas pistas.',
    finalReminder: 'Se cair sistema, escolha: substituição quando uma letra já está fácil; adição quando dá para eliminar.',
    miniMission: 'Resolva: x + y = 10 e x - y = 4.',
    notUnderstood: 'Modo simples: duas letras desconhecidas precisam de duas frases matemáticas para serem descobertas.'
  },
  {
    missionId: 'mt-08',
    subjectId: 'matematica',
    title: 'Geometria Plana — Medindo o Campo de Batalha',
    missionBrief: 'Entender área e perímetro como medidas do espaço.',
    dumbMode: 'Perímetro é a volta da figura. Área é o espaço dentro da figura. Se você vai cercar um terreno, pensa em perímetro. Se vai cobrir o chão, pensa em área.',
    analogy: 'Imagine montar uma base de sobrevivência. Para colocar cerca ao redor, você calcula perímetro. Para saber quantas placas usar no chão, calcula área.',
    vunespMode: 'A banca cobra área de retângulo, quadrado, triângulo e círculo, além de perímetro e interpretação de medidas.',
    traps: [
      'Área de retângulo: base × altura.',
      'Área de triângulo: base × altura ÷ 2.',
      'Perímetro é soma dos lados.',
      'Não misture unidade de área com unidade de comprimento.',
      'm² é área; m é comprimento.'
    ],
    memoryHook: 'Perímetro dá a volta. Área preenche por dentro.',
    finalReminder: 'Se cair figura, pergunte: quer cercar ou preencher?',
    miniMission: 'Calcule a área e o perímetro de um retângulo de 8 m por 3 m.',
    notUnderstood: 'Modo simples: perímetro é andar ao redor. Área é pintar o chão.'
  },
  {
    missionId: 'mt-09',
    subjectId: 'matematica',
    title: 'Análise Combinatória — Contando Possibilidades de Missão',
    missionBrief: 'Aprender a contar possibilidades sem listar uma por uma.',
    dumbMode: 'Análise combinatória serve para contar quantas possibilidades existem. Em vez de escrever todas, você usa multiplicação e fórmulas simples.',
    analogy: 'Imagine criar um personagem: 4 armaduras, 3 armas e 2 amuletos. Para saber quantas combinações existem, multiplica: 4 × 3 × 2 = 24.',
    vunespMode: 'A Vunesp costuma cobrar princípio fundamental da contagem, combinações simples e situações de escolha.',
    traps: [
      'Se são etapas sucessivas, multiplique as possibilidades.',
      'Se a ordem importa, o caso é diferente de quando a ordem não importa.',
      'Escolher A-B é o mesmo que B-A quando a ordem não importa.',
      'Em prova básica, muitas questões resolvem só com árvore ou multiplicação.'
    ],
    memoryHook: 'Escolhas em sequência? Multiplica.',
    finalReminder: 'Se cair combinatória, pergunte: a ordem importa?',
    miniMission: 'Você tem 3 camisetas e 4 calças. Quantos conjuntos pode montar?',
    notUnderstood: 'Modo simples: é contar jeitos diferentes de montar uma coisa.'
  },
  {
    missionId: 'mt-10',
    subjectId: 'matematica',
    title: 'Probabilidade — A Chance do Evento Acontecer',
    missionBrief: 'Calcular chance usando casos favoráveis e casos possíveis.',
    dumbMode: 'Probabilidade é chance. A fórmula básica é: casos favoráveis divididos pelos casos possíveis.',
    analogy: 'Pense em rolar um dado em um RPG. Se você quer tirar número par, os resultados bons são 2, 4 e 6. São 3 resultados bons em 6 possíveis. Probabilidade = 3/6 = 1/2.',
    vunespMode: 'A banca cobra dados, moedas, sorteios simples, eventos possíveis e eventos favoráveis.',
    traps: [
      'Casos favoráveis são os que servem para o que a questão pediu.',
      'Casos possíveis são todos os resultados que podem acontecer.',
      'Probabilidade nunca passa de 1 ou 100%.',
      'Evento impossível tem probabilidade 0.',
      'Evento certo tem probabilidade 1.'
    ],
    memoryHook: 'Probabilidade = quero / posso.',
    finalReminder: 'Se cair probabilidade, conte primeiro todos os casos possíveis.',
    miniMission: 'Qual a probabilidade de sair número maior que 4 em um dado comum?',
    notUnderstood: 'Modo simples: probabilidade é dividir o número de resultados bons pelo total de resultados.'
  },
  {
    missionId: 'cg-01',
    subjectId: 'gerais',
    title: 'Atualidades — Patrulha do Mundo Real',
    missionBrief: 'Aprender atualidades sem virar refém de notícia infinita.',
    dumbMode: 'Atualidades não é decorar todas as notícias. É entender temas importantes que afetam sociedade, política, economia, tecnologia, meio ambiente e segurança pública.',
    analogy: 'Pense como um investigador acompanhando pistas do mundo real. Você não precisa saber cada fofoca da cidade; precisa saber os eventos que mudam o cenário da missão.',
    vunespMode: 'A Vunesp costuma cobrar temas relevantes, não notícia aleatória: conflitos, eleições, meio ambiente, tecnologia, saúde pública, economia, cidadania e direitos humanos.',
    traps: [
      'Não estude atualidades por boato ou rede social sem fonte.',
      'Cuidado com alternativa sensacionalista.',
      'Atualidades geralmente exigem contexto, não só data.',
      'Tema recorrente vale mais do que notícia isolada.'
    ],
    memoryHook: 'Atualidades é entender o cenário da missão, não decorar manchete solta.',
    finalReminder: 'Se cair atualidade, procure a alternativa mais equilibrada e ligada a fatos verificáveis.',
    miniMission: 'Escolha uma notícia importante da semana e responda: quem, o quê, onde, quando, por quê e consequência.',
    notUnderstood: 'Modo simples: atualidades é saber o que está acontecendo no mundo e por que isso importa.'
  },
  {
    missionId: 'cg-05',
    subjectId: 'gerais',
    title: 'Geografia Humana e Econômica — O Movimento da População',
    missionBrief: 'Entender população, urbanização, economia e desigualdades regionais.',
    dumbMode: 'Geografia humana estuda pessoas, cidades, trabalho, economia, migração e desigualdade. Geografia econômica olha como produção, comércio, indústria, agropecuária e serviços se organizam no espaço.',
    analogy: 'Imagine um mapa de RPG com cidades, rotas comerciais, minas, fazendas e regiões pobres ou ricas. Geografia humana e econômica é entender como as pessoas vivem e produzem nesse mapa.',
    vunespMode: 'A banca cobra urbanização, concentração populacional, regiões econômicas, industrialização, agropecuária, serviços, migração e desigualdade regional.',
    traps: [
      'O Brasil é majoritariamente urbano.',
      'A Região Sudeste concentra população, indústria, serviços e riqueza.',
      'Agropecuária moderna não significa ausência de tecnologia.',
      'Desigualdade regional é tema recorrente.',
      'Urbanização rápida pode gerar problemas como moradia precária e transporte ruim.'
    ],
    memoryHook: 'Geografia humana olha pessoas; econômica olha produção e riqueza.',
    finalReminder: 'Se cair economia brasileira, lembre do peso do Sudeste, dos serviços e da agropecuária moderna.',
    miniMission: 'Explique por que grandes cidades atraem pessoas, mas também criam problemas urbanos.',
    notUnderstood: 'Modo simples: é estudar onde as pessoas vivem, trabalham, produzem e por que algumas regiões são mais ricas que outras.'
  },
  {
    missionId: 'cg-06',
    subjectId: 'gerais',
    title: 'Geografia de São Paulo — O Centro Forte do Mapa',
    missionBrief: 'Entender por que São Paulo é tão importante no Brasil.',
    dumbMode: 'São Paulo é um dos estados mais importantes do país por causa da população, indústria, serviços, tecnologia, agropecuária moderna, universidades, rodovias e mercado consumidor.',
    analogy: 'Pense em São Paulo como a capital comercial de um grande reino. Mesmo não sendo a capital política do país, concentra rotas, comércio, produção, conhecimento e muita gente.',
    vunespMode: 'A banca pode cobrar economia paulista, urbanização, Região Metropolitana de São Paulo, interior industrial e agrícola, rios, relevo e importância logística.',
    traps: [
      'São Paulo não é só indústria; também tem serviços fortes e agropecuária moderna.',
      'A capital concentra muitos serviços, mas o interior também é muito importante.',
      'O estado possui forte rede de rodovias.',
      'Problemas urbanos como trânsito, desigualdade e moradia também podem aparecer.'
    ],
    memoryHook: 'São Paulo é força econômica: indústria, serviços, tecnologia e agro moderno.',
    finalReminder: 'Se cair SP, pense em diversidade econômica e concentração populacional.',
    miniMission: 'Liste três motivos que tornam São Paulo importante para a economia brasileira.',
    notUnderstood: 'Modo simples: São Paulo é um dos motores do Brasil, porque produz, vende, transporta, pesquisa e concentra muita gente.'
  },
  {
    missionId: 'cg-08',
    subjectId: 'gerais',
    title: 'Organização do Estado — Quem Manda em Qual Missão',
    missionBrief: 'Entender União, Estados, DF, Municípios e os três Poderes.',
    dumbMode: 'O Brasil é uma Federação. Isso significa que União, Estados, Distrito Federal e Municípios têm autonomia dentro das regras da Constituição. Além disso, o poder se divide em Legislativo, Executivo e Judiciário.',
    analogy: 'Imagine uma aliança de reinos. Existe o comando central, mas cada território tem responsabilidades próprias. Para não virar tirania, as funções são divididas entre criar leis, administrar e julgar.',
    vunespMode: 'A banca cobra entes federativos, autonomia, três Poderes, funções típicas e organização básica do Estado brasileiro.',
    traps: [
      'União, Estados, DF e Municípios são entes federativos.',
      'Legislativo cria leis e fiscaliza.',
      'Executivo administra e executa políticas públicas.',
      'Judiciário julga conflitos.',
      'Autonomia não significa soberania absoluta.'
    ],
    memoryHook: 'Legislativo faz lei, Executivo executa, Judiciário julga.',
    finalReminder: 'Se cair organização do Estado, separe ente federativo de Poder da República.',
    miniMission: 'Classifique: Prefeitura, Governo do Estado, Congresso Nacional, Tribunal de Justiça.',
    notUnderstood: 'Modo simples: o Brasil divide tarefas entre lugares diferentes e poderes diferentes para ninguém concentrar tudo sozinho.'
  },
  {
    missionId: 'cg-09',
    subjectId: 'gerais',
    title: 'Meio Ambiente — Sobrevivência do Território',
    missionBrief: 'Entender sustentabilidade, impactos ambientais e proteção dos recursos naturais.',
    dumbMode: 'Meio ambiente envolve natureza, recursos naturais e qualidade de vida. Sustentabilidade é usar os recursos hoje sem destruir a possibilidade de uso pelas próximas gerações.',
    analogy: 'Imagine uma campanha de sobrevivência. Se o grupo cortar toda a floresta, sujar a água e gastar toda a comida, vence um dia e perde a guerra. Sustentabilidade é sobreviver hoje sem condenar amanhã.',
    vunespMode: 'A banca cobra desmatamento, queimadas, poluição, mudanças climáticas, sustentabilidade, recursos hídricos, biomas e cidadania ambiental.',
    traps: [
      'Sustentabilidade não é parar todo desenvolvimento; é equilibrar economia, sociedade e ambiente.',
      'Desmatamento afeta clima, biodiversidade e água.',
      'Poluição urbana envolve ar, rios, lixo e saneamento.',
      'Educação ambiental e responsabilidade coletiva são temas recorrentes.'
    ],
    memoryHook: 'Sustentabilidade é vencer a missão sem destruir o mapa.',
    finalReminder: 'Se cair meio ambiente, procure equilíbrio entre desenvolvimento, preservação e responsabilidade social.',
    miniMission: 'Dê um exemplo de atitude individual e uma política pública que ajudam o meio ambiente.',
    notUnderstood: 'Modo simples: meio ambiente é o cenário onde a vida acontece. Se destruir o cenário, a missão falha.'
  },
  {
    missionId: 'inf-03',
    subjectId: 'informatica',
    title: 'Word e Editores de Texto — O Escrivão Digital',
    missionBrief: 'Revisar edição de textos, formatação e recursos básicos.',
    dumbMode: 'Editor de texto serve para criar e formatar documentos. Você usa para escrever, alterar fonte, alinhar parágrafo, inserir imagem, tabela, cabeçalho, rodapé e revisar ortografia.',
    analogy: 'Pense no Word como o escriba de uma guilda. Ele organiza relatórios, registros de ocorrência, cartas e documentos oficiais.',
    vunespMode: 'A Vunesp cobra recursos de formatação, atalhos, alinhamento, salvar, imprimir, localizar, substituir, cabeçalho, rodapé e revisão ortográfica.',
    traps: [
      'Ctrl+B pode ser negrito em programas em inglês; em muitos ambientes PT-BR, Ctrl+N é negrito.',
      'Ctrl+S pode salvar em programas em inglês; no Word PT-BR, Ctrl+B costuma salvar.',
      'Cabeçalho fica no topo da página.',
      'Rodapé fica na parte inferior da página.',
      'Localizar e substituir são recursos diferentes.'
    ],
    memoryHook: 'Editor de texto cria, formata, revisa e imprime documentos.',
    finalReminder: 'Se cair Word/Writer, pense em formatação, página, revisão e atalhos.',
    miniMission: 'Explique a diferença entre cabeçalho e rodapé.',
    notUnderstood: 'Modo simples: Word é o programa para escrever documento bonito e organizado.'
  },
  {
    missionId: 'inf-07',
    subjectId: 'informatica',
    title: 'E-mail — Comunicação Oficial sem Vacilo',
    missionBrief: 'Entender campos, anexos, cópia, cópia oculta e segurança no e-mail.',
    dumbMode: 'E-mail é mensagem eletrônica. O campo Para recebe o destinatário principal. CC manda cópia visível. CCO manda cópia oculta. Anexo é arquivo enviado junto.',
    analogy: 'Imagine enviar um relatório de ocorrência. Para é quem precisa receber. CC são pessoas que precisam acompanhar. CCO é quem recebe sem os outros verem. Anexo é o documento preso ao relatório.',
    vunespMode: 'A banca cobra Para, CC, CCO, anexos, spam, phishing, resposta, responder a todos e cuidados com links suspeitos.',
    traps: [
      'CC é cópia visível.',
      'CCO é cópia oculta.',
      'Anexo não fica dentro do texto; vai junto com a mensagem.',
      'Responder a todos envia para todos os envolvidos.',
      'E-mail falso pode ser phishing.'
    ],
    memoryHook: 'Para recebe. CC aparece. CCO esconde. Anexo acompanha.',
    finalReminder: 'Se cair e-mail, procure diferença entre CC e CCO.',
    miniMission: 'Diga quando você usaria CC e quando usaria CCO.',
    notUnderstood: 'Modo simples: e-mail é carta digital com destinatário, cópia e arquivo anexado.'
  },
  {
    missionId: 'inf-08',
    subjectId: 'informatica',
    title: 'Sistemas Móveis — Android, iOS e Permissões',
    missionBrief: 'Revisar conceitos básicos de celular, aplicativos e segurança móvel.',
    dumbMode: 'Sistema operacional móvel é o sistema que faz o celular funcionar. Android e iOS são os principais. Aplicativos podem pedir permissões como câmera, localização, microfone e arquivos.',
    analogy: 'Pense no celular como uma base portátil. O sistema operacional é o comandante da base. Cada app é um visitante pedindo acesso a salas específicas.',
    vunespMode: 'A Vunesp pode cobrar Android, iOS, loja de aplicativos, permissões, atualizações, segurança, backup e armazenamento em nuvem.',
    traps: [
      'Android é associado ao Google.',
      'iOS é associado à Apple.',
      'Permissão de localização permite acessar posição do aparelho.',
      'Atualizações corrigem falhas e melhoram segurança.',
      'Instalar app fora de loja confiável aumenta risco.'
    ],
    memoryHook: 'App pede permissão; usuário decide se abre a porta.',
    finalReminder: 'Se cair sistema móvel, pense em app, permissão, atualização e segurança.',
    miniMission: 'Liste três permissões comuns que um aplicativo pode pedir.',
    notUnderstood: 'Modo simples: Android e iOS são o Windows do celular.'
  },
  {
    missionId: 'inf-09',
    subjectId: 'informatica',
    title: 'Redes de Computadores — As Rotas da Informação',
    missionBrief: 'Entender rede, internet, Wi-Fi, IP, DNS, modem e roteador.',
    dumbMode: 'Rede é a conexão entre dispositivos para trocar dados. Internet é uma rede mundial. IP é endereço do dispositivo. DNS traduz nomes de sites para endereços. Roteador distribui conexão.',
    analogy: 'Imagine uma cidade. O IP é o endereço da casa. O DNS é o guia que transforma o nome do lugar em endereço. O roteador é o centro que manda cada mensagem para o caminho certo.',
    vunespMode: 'A banca cobra LAN, WAN, Wi-Fi, IP, DNS, modem, roteador, navegador, internet e segurança em redes sem fio.',
    traps: [
      'LAN é rede local.',
      'WAN é rede de longa distância.',
      'Wi-Fi é rede sem fio.',
      'DNS traduz domínio em IP.',
      'Roteador distribui a conexão entre dispositivos.'
    ],
    memoryHook: 'IP é endereço. DNS é tradutor. Roteador distribui.',
    finalReminder: 'Se cair rede, identifique se a questão fala de endereço, tradução ou distribuição de conexão.',
    miniMission: 'Explique em uma frase o que faz o DNS.',
    notUnderstood: 'Modo simples: rede é um caminho para dispositivos conversarem.'
  },
  {
    missionId: 'inf-10',
    subjectId: 'informatica',
    title: 'Ferramentas Office e Nuvem — Kit de Produtividade',
    missionBrief: 'Revisar apresentações, armazenamento em nuvem e colaboração.',
    dumbMode: 'Ferramentas Office ajudam a criar documentos, planilhas e apresentações. Nuvem permite guardar arquivos na internet e acessar de outros dispositivos.',
    analogy: 'Pense em uma mochila mágica. Em vez de carregar todos os papéis fisicamente, você guarda na nuvem e acessa quando precisa, de outro computador ou celular.',
    vunespMode: 'A banca cobra PowerPoint/Impress, slides, apresentações, transições, animações, Google Drive, OneDrive, armazenamento em nuvem e colaboração online.',
    traps: [
      'PowerPoint e Impress criam apresentações.',
      'Slides são páginas da apresentação.',
      'Transição ocorre entre slides.',
      'Animação ocorre em elementos dentro do slide.',
      'Nuvem permite acesso remoto e sincronização.'
    ],
    memoryHook: 'Documento escreve, planilha calcula, apresentação mostra, nuvem guarda.',
    finalReminder: 'Se cair apresentação, diferencie transição de animação.',
    miniMission: 'Diga a diferença entre armazenamento local e armazenamento em nuvem.',
    notUnderstood: 'Modo simples: Office é kit de trabalho; nuvem é guardar arquivo na internet.'
  }
];

export function getTheoryLesson(missionId: string): TheoryLesson | undefined {
  return theoryLessons.find(lesson => lesson.missionId === missionId);
}
