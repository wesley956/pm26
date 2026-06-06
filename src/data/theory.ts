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
    title: 'Princípios da Administração Pública — O Código LIMPE',
    missionBrief: 'Você vai entender os princípios que comandam toda a Administração Pública. Eles funcionam como regras superiores de comportamento: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. Em prova, quase tudo começa perguntando se o agente público agiu conforme esses limites.',
    dumbMode: 'A Administração Pública não faz o que quer. Ela só pode agir dentro da lei e para atender o interesse público. O particular pode fazer tudo que a lei não proíbe; a Administração só pode fazer o que a lei autoriza. LIMPE é o mapa: Legalidade é obedecer à lei; Impessoalidade é não favorecer ninguém; Moralidade é agir com ética; Publicidade é dar transparência; Eficiência é buscar bom resultado.',
    analogy: 'Imagine uma guarda real em um reino. O guarda não pode escolher proteger só os amigos, esconder ordens, agir por vingança ou desperdiçar recursos. Ele precisa seguir o código do reino. Na Administração Pública, esse código é a lei e os princípios administrativos.',
    vunespMode: 'A Vunesp gosta de cobrar diferença entre legalidade do particular e legalidade administrativa, além de exemplos práticos de cada princípio. Ela pode perguntar se nomear parente fere impessoalidade e moralidade, se esconder atos fere publicidade, ou se gastar mal o dinheiro público fere eficiência.',
    traps: [
      'Legalidade administrativa não é liberdade ampla; é agir conforme autorização legal.',
      'Impessoalidade combate favorecimento, perseguição e promoção pessoal.',
      'Moralidade não é moral privada; é ética administrativa.',
      'Publicidade é regra, mas pode haver sigilo quando a lei justificar.',
      'Eficiência exige resultado, qualidade e bom uso dos recursos públicos.',
      'LIMPE está no art. 37 da Constituição Federal.'
    ],
    memoryHook: 'LIMPE é o código de conduta da Administração.',
    finalReminder: 'Na prova, leia o caso e pergunte: feriu lei, favoreceu alguém, foi antiético, escondeu informação ou desperdiçou recurso?',
    miniMission: 'Questão de verificação: dê um exemplo prático para cada princípio do LIMPE.',
    notUnderstood: 'Modo simples: servidor não joga no modo livre. Ele joga no modo lei, ética, transparência e resultado.'
  },
  {
    missionId: 'ap-02',
    subjectId: 'administracao',
    title: 'Poderes Administrativos — As Ferramentas do Estado',
    missionBrief: 'Você vai aprender que os poderes administrativos são instrumentos que a Administração usa para cumprir o interesse público. Eles não são privilégios pessoais do agente; são ferramentas vinculadas à finalidade pública.',
    dumbMode: 'Poder administrativo é uma ferramenta de trabalho. Poder vinculado é quando a lei não deixa escolha. Poder discricionário é quando existe margem de conveniência e oportunidade dentro da lei. Poder hierárquico organiza chefias. Poder disciplinar permite punir infrações funcionais. Poder regulamentar detalha a lei. Poder de polícia limita direitos individuais para proteger o interesse coletivo.',
    analogy: 'Pense em uma tropa em operação. Há ordem de comando, regras de conduta, punição para indisciplina, regulamento da missão e possibilidade de limitar acesso a uma área perigosa. Cada ferramenta tem função. O comandante não usa o poder por gosto pessoal; usa para cumprir a missão.',
    vunespMode: 'A Vunesp cobra muito diferença entre vinculado e discricionário, poder de polícia, hierarquia e disciplina. Ela também gosta de perguntar abuso de poder: excesso de poder ocorre quando o agente passa dos limites da competência; desvio de finalidade ocorre quando usa a competência para objetivo errado.',
    traps: [
      'Discricionariedade não é liberdade total; deve obedecer à lei e aos princípios.',
      'Poder vinculado não permite escolha de conveniência.',
      'Poder hierárquico permite delegar, avocar, ordenar e fiscalizar.',
      'Poder disciplinar pune servidor ou particular com vínculo especial.',
      'Poder de polícia limita direitos em favor do interesse coletivo.',
      'Abuso de poder pode ocorrer por excesso de poder ou desvio de finalidade.'
    ],
    memoryHook: 'Poder administrativo é ferramenta, não vontade pessoal.',
    finalReminder: 'Na prova, identifique a ferramenta usada: escolher, mandar, punir, regulamentar ou limitar direito.',
    miniMission: 'Questão de verificação: explique a diferença entre poder de polícia e poder disciplinar.',
    notUnderstood: 'Modo simples: cada poder é uma ferramenta da Administração. A questão quer saber qual ferramenta foi usada.'
  },
  {
    missionId: 'ap-03',
    subjectId: 'administracao',
    title: 'Atos Administrativos — A Ordem Oficial do Estado',
    missionBrief: 'Você vai entender o ato administrativo como manifestação de vontade da Administração que produz efeitos jurídicos. O foco é saber seus elementos, atributos e diferenças entre ato vinculado e discricionário.',
    dumbMode: 'Ato administrativo é uma decisão oficial da Administração. Para ser válido, precisa de elementos: competência, finalidade, forma, motivo e objeto. Competência é quem pode praticar. Finalidade é sempre interesse público. Forma é o jeito previsto em lei. Motivo é o fato e fundamento. Objeto é o efeito do ato. Se um desses elementos estiver errado, o ato pode ser inválido.',
    analogy: 'Imagine uma ordem de missão. Ela precisa ser dada por autoridade certa, com objetivo legítimo, no formato correto, com motivo real e com conteúdo possível. Se um recruta sem autoridade assina a ordem, há vício de competência. Se a ordem é para perseguir inimigo pessoal, há desvio de finalidade.',
    vunespMode: 'A Vunesp cobra elementos do ato, atributos e anulação versus revogação. Ato ilegal é anulado. Ato legal, mas inconveniente ou inoportuno, pode ser revogado pela Administração. Também aparecem atributos: presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade.',
    traps: [
      'Competência é, em regra, irrenunciável, mas pode haver delegação e avocação nos limites legais.',
      'Finalidade sempre deve atender ao interesse público.',
      'Motivo é o fato e fundamento; objeto é o conteúdo do ato.',
      'Ato ilegal deve ser anulado.',
      'Ato legal inconveniente pode ser revogado.',
      'Presunção de legitimidade não torna o ato imune a controle.'
    ],
    memoryHook: 'CO-FI-FO-MO-OB: competência, finalidade, forma, motivo e objeto.',
    finalReminder: 'Na prova, pergunte primeiro se o problema é ilegalidade ou conveniência. Ilegalidade leva à anulação; conveniência leva à revogação.',
    miniMission: 'Questão de verificação: diferencie anulação e revogação em uma frase.',
    notUnderstood: 'Modo simples: ato administrativo é uma ordem oficial. Para valer, precisa de autoridade, motivo, forma e objetivo correto.'
  },
  {
    missionId: 'ap-07',
    subjectId: 'administracao',
    title: 'Organização Administrativa — O Mapa do Estado',
    missionBrief: 'Você vai aprender como a Administração Pública se organiza para executar suas funções. A diferença principal é entre Administração direta, composta por órgãos dos entes federativos, e Administração indireta, composta por entidades com personalidade jurídica própria.',
    dumbMode: 'Administração direta é o próprio ente político agindo por seus órgãos: União, Estados, Distrito Federal e Municípios, com ministérios, secretarias e departamentos. Órgão não tem personalidade jurídica própria; ele é uma parte do ente. Administração indireta é formada por entidades criadas para executar atividades específicas: autarquias, fundações públicas, empresas públicas e sociedades de economia mista.',
    analogy: 'Imagine um reino grande. O castelo central tem salas e departamentos: esses são os órgãos da Administração direta. Mas o reino também cria instituições próprias para cuidar de tarefas específicas, como banco, escola, correio ou instituto técnico: essas são entidades da Administração indireta.',
    vunespMode: 'A banca gosta de cobrar órgão versus entidade, personalidade jurídica, descentralização e desconcentração. Desconcentração cria órgãos dentro da mesma pessoa jurídica. Descentralização cria ou transfere atividade para outra pessoa jurídica. Autarquias geralmente executam atividade típica de Estado. Empresas públicas e sociedades de economia mista têm personalidade de direito privado.',
    traps: [
      'Órgão não tem personalidade jurídica própria.',
      'Entidade da Administração indireta tem personalidade jurídica própria.',
      'Desconcentração distribui competências dentro da mesma pessoa jurídica.',
      'Descentralização envolve outra pessoa jurídica.',
      'Autarquia é pessoa jurídica de direito público.',
      'Empresa pública e sociedade de economia mista são pessoas jurídicas de direito privado.'
    ],
    memoryHook: 'Órgão é peça do corpo; entidade é pessoa própria.',
    finalReminder: 'Na prova, pergunte: isso é parte de um ente ou tem personalidade própria? Isso separa órgão de entidade.',
    miniMission: 'Questão de verificação: explique a diferença entre desconcentração e descentralização.',
    notUnderstood: 'Modo simples: direta é o Estado agindo por seus departamentos. Indireta são entidades criadas para missões específicas.'
  },
  {
    missionId: 'ap-10',
    subjectId: 'administracao',
    title: 'Políticas Públicas e Cidadania — Do Problema à Ação do Estado',
    missionBrief: 'Você vai entender políticas públicas como ações organizadas do Estado para enfrentar problemas coletivos. A ideia é reconhecer etapas: problema entra na agenda, governo formula solução, executa, monitora e avalia resultados.',
    dumbMode: 'Política pública é o Estado tentando resolver um problema da sociedade. Pode ser segurança, saúde, educação, moradia, trânsito, meio ambiente ou assistência social. Ela não nasce do nada: primeiro o problema é reconhecido; depois vira prioridade; então o governo planeja, executa e avalia. Cidadania é a participação da população nesse processo, cobrando, fiscalizando e colaborando.',
    analogy: 'Pense em uma cidade atacada por monstros. Primeiro alguém percebe o problema. Depois o conselho decide que isso é prioridade. Em seguida cria um plano, treina guardas, distribui recursos e mede se os ataques diminuíram. Isso é política pública: transformar problema coletivo em ação organizada.',
    vunespMode: 'A Vunesp gosta de cobrar conceito de política pública, participação social, cidadania, controle social, conselhos, audiências públicas e avaliação de resultados. Também pode explorar a ideia de que política pública não é promessa solta; precisa de planejamento, execução e monitoramento.',
    traps: [
      'Política pública não é só discurso; precisa virar ação planejada.',
      'Cidadania envolve direitos e deveres.',
      'Participação social fortalece controle e legitimidade.',
      'Conselhos e audiências são formas de participação.',
      'Avaliação verifica se a política funcionou.',
      'Segurança pública também pode ser analisada como política pública.'
    ],
    memoryHook: 'Política pública é problema coletivo virando plano de ação.',
    finalReminder: 'Na prova, procure o ciclo: agenda, formulação, implementação, monitoramento e avaliação.',
    miniMission: 'Questão de verificação: escolha um problema da sua cidade e diga qual política pública poderia enfrentá-lo.',
    notUnderstood: 'Modo simples: política pública é o Estado saindo do discurso e criando ação para resolver problema real da população.'
  },

  {
    missionId: 'mt-02',
    subjectId: 'matematica',
    title: 'Frações — Dividindo o Tesouro sem Confusão',
    missionBrief: 'Você vai entender fração como parte de um todo e aprender comparação, simplificação e operações básicas. Fração aparece em porcentagem, razão, proporção, regra de três e problemas do cotidiano.',
    dumbMode: 'Fração mostra uma parte de algo. Em 3/4, o 3 é o numerador, que mostra quantas partes foram usadas. O 4 é o denominador, que mostra em quantas partes o todo foi dividido. Para somar ou subtrair frações com denominadores diferentes, você precisa igualar os denominadores. Para multiplicar fração, multiplica numerador com numerador e denominador com denominador. Para dividir, multiplica pela fração invertida.',
    analogy: 'Imagine uma pizza dividida entre a equipe. Se a pizza foi cortada em 4 pedaços e você pegou 3, isso é 3/4. Se outra pizza foi cortada em 8 pedaços, comparar as duas exige falar a mesma língua de pedaços. É por isso que usamos denominador comum.',
    vunespMode: 'A Vunesp cobra frações em problemas de parte do total, simplificação, equivalência e transformação para porcentagem. Ela gosta de enunciado com turma, dinheiro, tempo, combustível, estoque ou quantidade restante.',
    traps: [
      'Denominador mostra em quantas partes o todo foi dividido.',
      'Frações equivalentes têm o mesmo valor, mesmo com números diferentes.',
      'Para somar frações com denominadores diferentes, iguale denominadores.',
      'Multiplicar frações é direto: numerador com numerador e denominador com denominador.',
      'Dividir fração exige inverter a segunda fração.',
      'Cuidado com a palavra restante: geralmente pede subtrair do total.'
    ],
    memoryHook: 'Fração é parte sobre todo.',
    finalReminder: 'Na prova, pergunte: qual é o todo? qual é a parte? o que sobrou?',
    miniMission: 'Questão de verificação: explique por que 1/2 é igual a 2/4 e a 50%.',
    notUnderstood: 'Modo simples: fração é um pedaço do total. Primeiro ache o total, depois veja quantos pedaços estão sendo usados.'
  },
  {
    missionId: 'mt-03',
    subjectId: 'matematica',
    title: 'Razão e Proporção — Comparando Forças',
    missionBrief: 'Você vai entender razão como comparação entre duas grandezas e proporção como igualdade entre razões. Esse conteúdo é base para escala, velocidade média, densidade, mistura, mapas e regra de três.',
    dumbMode: 'Razão é comparação. Se há 2 policiais para 10 viaturas, a razão é 2/10, que pode simplificar para 1/5. Proporção é quando duas razões são equivalentes, como 1/2 = 2/4. Em proporção, o produto dos meios é igual ao produto dos extremos. Isso ajuda a descobrir valores desconhecidos.',
    analogy: 'Imagine distribuir patrulhas em regiões. Se uma região precisa de 1 equipe para cada 5 pontos, outra região com 20 pontos precisará manter a mesma proporção. Razão é a comparação; proporção é manter o mesmo equilíbrio.',
    vunespMode: 'A Vunesp cobra razão entre quantidades, escalas, misturas, mapas e problemas de comparação. Ela pode esconder a razão em frase comum, como número de candidatos por vaga ou quantidade de homens e mulheres em um grupo.',
    traps: [
      'Razão compara duas grandezas.',
      'Proporção é igualdade entre razões.',
      'A ordem importa: razão de A para B não é sempre igual à razão de B para A.',
      'Simplifique a razão quando possível.',
      'Em proporção, produto dos meios é igual ao produto dos extremos.',
      'Cuidado para comparar grandezas compatíveis.'
    ],
    memoryHook: 'Razão compara; proporção mantém o equilíbrio.',
    finalReminder: 'Na prova, escreva a razão na ordem em que o enunciado pediu.',
    miniMission: 'Questão de verificação: se há 3 aprovados para cada 12 candidatos, simplifique a razão e explique o significado.',
    notUnderstood: 'Modo simples: razão é comparar uma quantidade com outra. Proporção é dizer que duas comparações são iguais.'
  },
  {
    missionId: 'mt-04',
    subjectId: 'matematica',
    title: 'Regra de Três — A Ponte entre Grandezas',
    missionBrief: 'Você vai aprender a resolver problemas em que duas grandezas se relacionam. A regra de três serve para encontrar um valor desconhecido quando há proporcionalidade direta ou inversa.',
    dumbMode: 'Regra de três aparece quando uma coisa muda e outra muda junto. Se mais trabalhadores produzem mais em mesmo tempo, é relação direta. Se mais trabalhadores fazem o serviço em menos tempo, é relação inversa. Primeiro organize os dados em duas colunas. Depois descubra se é direta ou inversa. Só então monte a conta.',
    analogy: 'Pense em uma equipe em missão. Se 2 viaturas patrulham 40 km, 4 viaturas podem cobrir mais área no mesmo tempo: relação direta. Mas se 2 policiais fazem uma tarefa em 6 horas, 4 policiais podem terminar em menos tempo: relação inversa.',
    vunespMode: 'A Vunesp cobra regra de três em trabalho, tempo, distância, consumo, velocidade, produção e quantidade de pessoas. A principal pegadinha é tratar como direta uma relação que é inversa.',
    traps: [
      'Mais quantidade gerando mais resultado costuma ser direta.',
      'Mais pessoas reduzindo tempo costuma ser inversa.',
      'Organize grandezas iguais na mesma coluna.',
      'Antes de calcular, decida se a relação é direta ou inversa.',
      'Não monte cruzado no automático sem entender a relação.',
      'Unidades precisam estar compatíveis.'
    ],
    memoryHook: 'Direta cresce junto; inversa uma cresce e a outra cai.',
    finalReminder: 'Na prova, pare antes da conta e pergunte: se uma grandeza aumenta, a outra aumenta ou diminui?',
    miniMission: 'Questão de verificação: 3 policiais fazem uma tarefa em 6 horas. Se forem 6 policiais no mesmo ritmo, o tempo aumenta ou diminui? Por quê?',
    notUnderstood: 'Modo simples: regra de três é descobrir o número que falta comparando duas grandezas.'
  },
  {
    missionId: 'mt-05',
    subjectId: 'matematica',
    title: 'Porcentagem — O Radar dos 100',
    missionBrief: 'Você vai aprender porcentagem como fração de 100. Esse assunto cai muito porque aparece em desconto, aumento, estatística, acertos, erros, salário, população, consumo e comparação de valores.',
    dumbMode: 'Porcentagem significa por cento, ou seja, em cada 100. 20% é 20 de cada 100, que também é 20/100 ou 0,20. Para calcular 20% de 300, faça 0,20 x 300 = 60. Aumento percentual soma ao valor inicial. Desconto percentual tira do valor inicial. Se uma questão fala que algo aumentou 10%, o novo valor é 110% do valor antigo.',
    analogy: 'Pense em uma barra de energia com 100 pontos. Se você tem 75%, está com 75 de 100. Se perdeu 20%, tirou 20 de cada 100. Se ganhou 15%, adicionou 15 de cada 100. A porcentagem transforma qualquer quantidade em uma régua de 100.',
    vunespMode: 'A Vunesp cobra muito desconto, aumento, comparação percentual, porcentagem de porcentagem e interpretação de gráficos. A pegadinha clássica é confundir valor absoluto com percentual ou aplicar o percentual no valor errado.',
    traps: [
      '10% é 10/100, ou 0,10.',
      'Aumento de 20% transforma o valor em 120% do original.',
      'Desconto de 20% transforma o valor em 80% do original.',
      'Porcentagem sempre depende da base usada.',
      'Dois descontos sucessivos de 10% não equivalem a 20% direto.',
      'Cuidado com perguntas sobre percentual de aumento versus valor aumentado.'
    ],
    memoryHook: 'Porcentagem é transformar tudo em régua de 100.',
    finalReminder: 'Na prova, identifique a base: porcentagem de quê?',
    miniMission: 'Questão de verificação: calcule 15% de 200, depois calcule um aumento de 15% sobre 200.',
    notUnderstood: 'Modo simples: tire o símbolo de porcentagem e divida por 100. Depois multiplique pelo valor.'
  },
  {
    missionId: 'mt-06',
    subjectId: 'matematica',
    title: 'Equações — Encontrando o X da Ocorrência',
    missionBrief: 'Você vai aprender equações do 1º grau como investigação matemática. A missão é descobrir o valor desconhecido, geralmente representado por x, mantendo o equilíbrio dos dois lados da igualdade.',
    dumbMode: 'Equação é uma igualdade com número desconhecido. Exemplo: x + 5 = 12. O objetivo é descobrir x. Para isso, você desfaz o que está prendendo o x. Se está somando 5, você subtrai 5 dos dois lados. Se está multiplicando por 3, você divide por 3 dos dois lados. O segredo é manter o equilíbrio: tudo que fizer de um lado, faça do outro.',
    analogy: 'Pense em uma balança de investigação. O lado esquerdo e o lado direito precisam ficar equilibrados. O x é o suspeito escondido. Para revelar quem ele é, você remove os disfarces sem desequilibrar a balança.',
    vunespMode: 'A Vunesp cobra equações simples dentro de problemas de idade, dinheiro, quantidade, diferença e soma. A banca costuma transformar texto em equação. Palavras como dobro, triplo, metade, soma, diferença e total são pistas para montar a sentença.',
    traps: [
      'Tudo que fizer de um lado da equação, faça do outro.',
      'Dobro de x é 2x; triplo de x é 3x.',
      'Metade de x é x/2.',
      'Diferença geralmente indica subtração.',
      'Cuidado ao passar termo trocando sinal sem entender a operação inversa.',
      'Depois de encontrar x, substitua na equação para conferir.'
    ],
    memoryHook: 'Equação é balança: mexeu de um lado, mexe do outro.',
    finalReminder: 'Na prova, transforme o texto em conta antes de tentar resolver de cabeça.',
    miniMission: 'Questão de verificação: resolva x + 7 = 20 e 3x = 24. Depois confira substituindo o valor encontrado.',
    notUnderstood: 'Modo simples: x é o número escondido. Você desfaz as operações até ele ficar sozinho.'
  },
  {
    missionId: 'cg-02',
    subjectId: 'gerais',
    title: 'História do Brasil — Colônia e Império',
    missionBrief: 'Você vai revisar a formação histórica do Brasil desde a colonização portuguesa até o Império. O foco é entender economia colonial, escravidão, sociedade, independência, Primeiro Reinado, Período Regencial e Segundo Reinado.',
    dumbMode: 'No Brasil Colônia, Portugal explorava a terra para gerar riqueza. Primeiro veio o pau-brasil, depois a cana-de-açúcar, mineração e outras atividades. A escravidão sustentou grande parte da economia colonial, primeiro com indígenas e depois principalmente com africanos escravizados. A Independência em 1822 não criou uma democracia popular imediata; manteve muita estrutura social antiga. No Império, o Brasil teve monarquia, conflitos internos, centralização política e debates sobre escravidão.',
    analogy: 'Imagine um reino distante controlando uma colônia como se fosse uma fonte de recursos. A colônia produz, envia riqueza e obedece ordens. Com o tempo, surgem conflitos, elites locais ganham força e a colônia busca autonomia. Mas trocar o comando não significa mudar toda a estrutura social de uma vez.',
    vunespMode: 'A Vunesp costuma cobrar economia colonial, pacto colonial, escravidão, mineração, movimentos nativistas e emancipacionistas, Independência, Constituição de 1824, Poder Moderador, Regências, Segundo Reinado, abolição e crise do Império.',
    traps: [
      'Independência não significou igualdade social imediata.',
      'A escravidão foi estrutura central da formação econômica e social.',
      'Pacto colonial envolvia exploração econômica em favor da metrópole.',
      'Movimentos nativistas não são sempre separatistas.',
      'Constituição de 1824 criou o Poder Moderador.',
      'Abolição foi processo gradual e tardio, concluído formalmente em 1888.'
    ],
    memoryHook: 'Colônia explora; Império mantém ordem centralizada e conflitos sociais.',
    finalReminder: 'Na prova, relacione economia, escravidão e poder político. Esses três fios explicam muita coisa.',
    miniMission: 'Questão de verificação: explique em poucas linhas por que a Independência não resolveu automaticamente as desigualdades do Brasil.',
    notUnderstood: 'Modo simples: o Brasil nasceu explorado, escravista e desigual. A História cobra como isso foi mudando aos poucos.'
  },
  {
    missionId: 'cg-03',
    subjectId: 'gerais',
    title: 'História do Brasil — República e Disputa de Poder',
    missionBrief: 'Você vai entender a República brasileira como uma sequência de mudanças políticas, crises, regimes, disputas sociais e tentativas de modernização. O foco é enxergar períodos e características principais.',
    dumbMode: 'A República começa em 1889, quando a monarquia acaba. A Primeira República teve forte poder das oligarquias estaduais, coronelismo, voto controlado e política do café com leite. Depois veio a Era Vargas, com centralização do poder, leis trabalhistas e autoritarismo no Estado Novo. Mais tarde, o Brasil passou por período democrático, regime militar e redemocratização, até a Constituição de 1988.',
    analogy: 'Pense na República como uma troca de sistema no jogo. O nome do modo mudou, mas muitos jogadores antigos continuaram poderosos. Ao longo do tempo, novas forças entram: trabalhadores, militares, elites regionais, movimentos sociais, partidos e instituições democráticas.',
    vunespMode: 'A Vunesp costuma cobrar Proclamação da República, República Velha, coronelismo, voto de cabresto, Era Vargas, Estado Novo, populismo, regime militar, redemocratização e Constituição de 1988. Ela gosta de perguntar características de cada período.',
    traps: [
      'República não significou democracia plena logo no começo.',
      'Coronelismo está ligado a poder local e controle político.',
      'Voto de cabresto representa controle do eleitor.',
      'Era Vargas mistura direitos trabalhistas, centralização e autoritarismo.',
      'Regime militar não foi período democrático.',
      'Constituição de 1988 marca redemocratização e ampliação de direitos.'
    ],
    memoryHook: 'República brasileira é disputa entre poder local, Estado forte, democracia e autoritarismo.',
    finalReminder: 'Na prova, identifique o período histórico antes de responder. Cada fase tem marcas próprias.',
    miniMission: 'Questão de verificação: cite uma característica da República Velha, uma da Era Vargas e uma da redemocratização.',
    notUnderstood: 'Modo simples: a República mudou o governo, mas a democracia foi construída aos poucos e com muitos conflitos.'
  },
  {
    missionId: 'cg-04',
    subjectId: 'gerais',
    title: 'Geografia do Brasil — Território, Relevo, Clima e Hidrografia',
    missionBrief: 'Você vai revisar a geografia física do Brasil: território, relevo, clima, vegetação, bacias hidrográficas e domínios naturais. A ideia é entender o mapa como um sistema vivo, não como decoreba de nomes.',
    dumbMode: 'Geografia física estuda as características naturais do território. O Brasil é um país muito grande, com diferentes climas, vegetações, rios e formas de relevo. Relevo envolve planaltos, planícies e depressões. Clima envolve temperatura, chuva e massas de ar. Hidrografia envolve rios e bacias. Vegetação envolve formações como Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampas.',
    analogy: 'Imagine um mapa de RPG com biomas diferentes. Cada região tem terreno, clima, recursos e riscos. Uma floresta úmida não funciona como uma área semiárida. Um planalto não é igual a uma planície. Entender o território ajuda a entender economia, população, transporte e meio ambiente.',
    vunespMode: 'A Vunesp costuma cobrar características gerais dos domínios naturais, clima, relevo, bacias hidrográficas, impactos ambientais e relação entre natureza e ocupação humana. A pegadinha é confundir biomas, climas e regiões.',
    traps: [
      'Amazônia não é igual a Pantanal; são domínios diferentes.',
      'Caatinga está ligada ao semiárido.',
      'Cerrado é importante para nascentes e expansão agropecuária.',
      'Mata Atlântica foi muito devastada pela ocupação histórica.',
      'Planície não é toda área baixa; envolve processos de sedimentação.',
      'Clima e vegetação se relacionam, mas não são a mesma coisa.'
    ],
    memoryHook: 'Geografia física é o cenário natural da missão.',
    finalReminder: 'Na prova, ligue relevo, clima, água e vegetação. Um elemento ajuda a explicar o outro.',
    miniMission: 'Questão de verificação: escolha Amazônia, Cerrado ou Caatinga e diga clima, vegetação e um problema ambiental associado.',
    notUnderstood: 'Modo simples: geografia física é estudar o terreno, o clima, os rios e a vegetação do Brasil.'
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
    missionBrief: 'Você vai entender a diferença entre hardware, software, periféricos, memória, armazenamento e processamento. Essa é a base de Informática: se você entende o corpo da máquina e os programas que rodam nela, o resto fica menos assustador.',
    dumbMode: 'Hardware é tudo que você pode tocar: monitor, teclado, mouse, placa-mãe, processador, memória RAM, SSD, HD, impressora e cabos. Software é o programa: Windows, navegador, Word, Excel, antivírus e aplicativos. O processador executa comandos. A memória RAM guarda dados temporários enquanto o computador está ligado. O HD ou SSD guarda arquivos de forma permanente. Periféricos são equipamentos conectados ao computador, como impressora, mouse e scanner.',
    analogy: 'Pense no computador como um quartel. O processador é o comandante que executa ordens. A memória RAM é a mesa de trabalho, onde ficam os documentos que estão sendo usados agora. O SSD ou HD é o arquivo permanente. Os periféricos são os equipamentos da operação. O software é o plano da missão dizendo o que cada parte deve fazer.',
    vunespMode: 'A Vunesp costuma cobrar conceitos básicos e diferenças: hardware versus software, memória RAM versus armazenamento, dispositivo de entrada versus saída, sistema operacional versus aplicativo e software livre versus proprietário. A banca gosta de alternativas simples, mas com termos trocados.',
    traps: [
      'RAM é memória temporária; quando desliga, o conteúdo se perde.',
      'HD e SSD são armazenamento permanente.',
      'Processador não é memória; ele executa instruções.',
      'Teclado e mouse são dispositivos de entrada.',
      'Monitor e impressora são dispositivos de saída.',
      'Sistema operacional gerencia recursos do computador; aplicativo executa tarefas específicas.'
    ],
    memoryHook: 'Hardware é o corpo; software é o comando que faz o corpo agir.',
    finalReminder: 'Na prova, se perguntar se dá para tocar, pense em hardware. Se for programa ou sistema, pense em software.',
    miniMission: 'Questão de verificação: classifique como hardware ou software: Windows, mouse, Excel, SSD, teclado, antivírus.',
    notUnderstood: 'Modo simples: peça física é hardware. Programa é software. RAM é mesa de trabalho. SSD/HD é armário permanente.'
  },
  {
    missionId: 'inf-02',
    subjectId: 'informatica',
    title: 'Windows — O Centro de Comando do PC',
    missionBrief: 'Você vai aprender o básico do Windows: área de trabalho, barra de tarefas, janelas, Explorador de Arquivos, atalhos, painel de configurações e gerenciamento de tarefas. O Windows é o sistema operacional que organiza o uso do computador.',
    dumbMode: 'Windows é um sistema operacional. Ele liga o usuário ao hardware e aos programas. A área de trabalho é a tela principal. A barra de tarefas mostra programas abertos e atalhos. O Explorador de Arquivos serve para navegar por pastas e arquivos. A Lixeira guarda arquivos excluídos temporariamente. O Gerenciador de Tarefas mostra processos em execução. Configurações e Painel de Controle permitem ajustar o sistema.',
    analogy: 'Imagine uma base policial. A área de trabalho é o pátio principal. As pastas são arquivos organizados. A barra de tarefas é o painel de viaturas em operação. O Gerenciador de Tarefas é a central que mostra quem está trabalhando e quem travou. A Lixeira é uma área de descarte temporário antes de eliminar de vez.',
    vunespMode: 'A Vunesp cobra atalhos, funções do Explorador de Arquivos, diferença entre arquivo e pasta, operações copiar, recortar, colar, renomear e excluir. Também pode cobrar extensões de arquivo e ferramentas como Gerenciador de Tarefas.',
    traps: [
      'Ctrl+C copia; Ctrl+X recorta; Ctrl+V cola.',
      'Ctrl+Z desfaz a última ação.',
      'Win+E abre o Explorador de Arquivos.',
      'Ctrl+Shift+Esc abre o Gerenciador de Tarefas.',
      'Excluir pode mandar para a Lixeira; Shift+Delete exclui sem passar pela Lixeira.',
      'Arquivo tem nome e extensão; pasta organiza arquivos.'
    ],
    memoryHook: 'Windows é a base que organiza arquivos, programas e recursos.',
    finalReminder: 'Na prova, cuidado com copiar e recortar: copiar duplica; recortar move.',
    miniMission: 'Questão de verificação: explique a diferença entre copiar, recortar, colar e excluir.',
    notUnderstood: 'Modo simples: Windows é o chefe da máquina. Ele organiza arquivos, abre programas e controla recursos.'
  },
  {
    missionId: 'inf-04',
    subjectId: 'informatica',
    title: 'Microsoft Excel — Células, Fórmulas e Funções',
    missionBrief: 'Você vai aprender o básico do Excel: planilhas, células, linhas, colunas, fórmulas, funções e referências. Excel costuma assustar, mas a lógica inicial é simples: cada célula guarda dado ou cálculo.',
    dumbMode: 'Excel é uma planilha. As colunas são letras: A, B, C. As linhas são números: 1, 2, 3. Uma célula é o encontro de coluna e linha, como A1 ou B2. Fórmulas começam com sinal de igual. Exemplo: =A1+B1. Funções são fórmulas prontas, como SOMA, MÉDIA, MÁXIMO, MÍNIMO e SE. Intervalo é um conjunto de células, como A1:A10.',
    analogy: 'Imagine uma sala de investigação cheia de gavetas. Cada gaveta tem endereço: A1, B2, C3. Você pode colocar números nas gavetas e pedir que o Excel some, tire média ou compare dados. A fórmula é a ordem de cálculo; a função é uma ordem pronta.',
    vunespMode: 'A Vunesp cobra fórmulas iniciadas por igual, intervalos, operadores, funções básicas e interpretação de célula. Também aparece referência relativa e absoluta, como A1 e $A$1. Função SE é muito cobrada porque envolve condição lógica.',
    traps: [
      'Toda fórmula começa com =.',
      'A1 identifica coluna A e linha 1.',
      'A1:A10 representa intervalo de A1 até A10.',
      'SOMA soma valores; MÉDIA calcula média.',
      'MÁXIMO retorna maior valor; MÍNIMO retorna menor.',
      'Referência absoluta usa cifrão: $A$1.'
    ],
    memoryHook: 'Excel é mapa de células: endereço, dado e cálculo.',
    finalReminder: 'Na prova, olhe primeiro o sinal de igual, depois as células e por fim a função usada.',
    miniMission: 'Questão de verificação: explique o que fazem =SOMA(A1:A5), =MÉDIA(B1:B4) e =SE(C1>=7;"Aprovado";"Reprovado").',
    notUnderstood: 'Modo simples: Excel é uma tabela inteligente. Você coloca valores e manda calcular.'
  },
  {
    missionId: 'inf-05',
    subjectId: 'informatica',
    title: 'Internet e Navegadores — Estradas da Informação',
    missionBrief: 'Você vai entender internet, web, navegador, site, URL, domínio, HTTP, HTTPS, cookies, cache, favoritos e histórico. Essa aula também prepara para segurança digital, porque muita questão mistura navegação com golpes.',
    dumbMode: 'Internet é a rede mundial de computadores. Web é um serviço dentro da internet, acessado por sites e navegadores. Navegador é o programa usado para acessar páginas, como Chrome, Edge e Firefox. URL é o endereço do site. Domínio é o nome principal, como exemplo.com. HTTPS indica conexão protegida por criptografia. Cookies guardam informações de navegação. Cache guarda cópias temporárias para carregar páginas mais rápido.',
    analogy: 'Pense na internet como uma cidade gigante cheia de ruas. O navegador é sua viatura. A URL é o endereço da ocorrência. O domínio é o nome do prédio. O HTTPS é uma rota protegida. Cookies são anotações que o local guarda sobre sua visita. Cache é um arquivo temporário para não buscar tudo de novo.',
    vunespMode: 'A Vunesp cobra diferença entre internet e web, navegador e mecanismo de busca, HTTP e HTTPS, cache, cookies, histórico, favoritos e navegação anônima. Também gosta de phishing: páginas falsas tentando roubar dados.',
    traps: [
      'Internet não é a mesma coisa que web; web é um serviço que usa a internet.',
      'Navegador não é mecanismo de busca. Chrome é navegador; Google é buscador.',
      'HTTPS indica conexão criptografada, mas não garante que o site seja honesto.',
      'Cache acelera carregamento, mas pode guardar dados antigos.',
      'Cookies armazenam preferências e dados de sessão.',
      'Navegação anônima não torna você invisível na internet.'
    ],
    memoryHook: 'Navegador é a viatura; URL é o endereço; HTTPS é rota protegida.',
    finalReminder: 'Na prova, se aparecer golpe ou roubo de dados, pense em phishing, link falso e cuidado com HTTPS interpretado de forma exagerada.',
    miniMission: 'Questão de verificação: explique a diferença entre navegador, buscador, URL, domínio e HTTPS.',
    notUnderstood: 'Modo simples: navegador abre sites. Buscador procura sites. HTTPS protege conexão, mas não garante que tudo é confiável.'
  },
  {
    missionId: 'inf-06',
    subjectId: 'informatica',
    title: 'Segurança da Informação — Blindagem dos Dados',
    missionBrief: 'Você vai entender os pilares da segurança da informação: confidencialidade, integridade, disponibilidade, autenticação, backup, antivírus, firewall, criptografia e golpes digitais. Essa aula é essencial porque a banca mistura conceito técnico com situações do dia a dia.',
    dumbMode: 'Segurança da informação é proteger dados contra acesso indevido, alteração, perda ou roubo. Confidencialidade significa que só pessoas autorizadas acessam. Integridade significa que o dado não foi alterado indevidamente. Disponibilidade significa que o dado ou sistema está acessível quando necessário. Backup é cópia de segurança. Antivírus detecta ameaças. Firewall filtra conexões. Criptografia embaralha dados para proteger a leitura.',
    analogy: 'Pense em uma delegacia com arquivo sigiloso. Confidencialidade é só o policial autorizado abrir o arquivo. Integridade é garantir que ninguém adulterou o boletim. Disponibilidade é o arquivo estar acessível quando a equipe precisa. Backup é uma cópia guardada em outro cofre. Firewall é o guarda da porta. Criptografia é escrever a mensagem em código.',
    vunespMode: 'A Vunesp cobra muito phishing, malware, vírus, ransomware, backup, senha forte, autenticação em dois fatores, firewall e criptografia. Ela também gosta de confundir antivírus com firewall, backup com sincronização e HTTPS com garantia absoluta de segurança.',
    traps: [
      'Phishing é golpe para roubar dados usando página, e-mail ou mensagem falsa.',
      'Malware é software malicioso; vírus é um tipo de malware.',
      'Ransomware sequestra dados e exige resgate.',
      'Backup não é a mesma coisa que sincronização automática.',
      'Senha forte deve combinar tamanho, variedade e imprevisibilidade.',
      'Autenticação em dois fatores adiciona uma camada além da senha.'
    ],
    memoryHook: 'Segurança é CID: confidencialidade, integridade e disponibilidade.',
    finalReminder: 'Na prova, se aparecer roubo de senha ou link falso, pense em phishing. Se aparecer sequestro de arquivo, pense em ransomware.',
    miniMission: 'Questão de verificação: explique a diferença entre phishing, malware, ransomware, backup e firewall.',
    notUnderstood: 'Modo simples: segurança digital é proteger seus dados para ninguém roubar, alterar, apagar ou bloquear.'
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
    missionBrief: 'Você vai entender licitação como o procedimento usado para contratar obras, serviços, compras e alienações com igualdade entre interessados e busca da proposta vantajosa. A ideia central é evitar favoritismo e proteger o dinheiro público.',
    dumbMode: 'Licitação é uma competição organizada. A Administração precisa contratar algo, mas não pode simplesmente escolher um amigo. Ela cria regras, publica o procedimento, permite disputa e escolhe conforme critérios legais. A licitação protege isonomia, transparência e seleção da proposta vantajosa.',
    analogy: 'Imagine uma guilda escolhendo quem fornecerá armaduras para a guarda. Se o chefe escolhe o primo sem disputa, o reino pode pagar caro e receber coisa ruim. A licitação é o torneio com regras claras para escolher a melhor proposta dentro da lei.',
    vunespMode: 'A Vunesp costuma cobrar finalidade, princípios, modalidades e diferença entre dispensa e inexigibilidade. Pregão aparece para bens e serviços comuns. Concorrência aparece para contratações mais amplas. Dispensa ocorre quando a lei permite contratar sem licitação. Inexigibilidade ocorre quando a competição é inviável.',
    traps: [
      'Licitação busca proposta vantajosa, não apenas menor preço em qualquer situação.',
      'Isonomia significa igualdade de condições entre participantes.',
      'Pregão é usado para bens e serviços comuns.',
      'Dispensa é competição possível, mas a lei autoriza não licitar.',
      'Inexigibilidade é competição inviável.',
      'Contratação direta não significa liberdade sem processo; precisa justificativa.'
    ],
    memoryHook: 'Licitação é competição com regra para proteger dinheiro público.',
    finalReminder: 'Na prova, se a competição é possível mas a lei libera, pense em dispensa. Se a competição é impossível, pense em inexigibilidade.',
    miniMission: 'Questão de verificação: explique a diferença entre dispensa e inexigibilidade usando um exemplo simples.',
    notUnderstood: 'Modo simples: licitação é o campeonato justo para a Administração contratar sem favorecer ninguém.'
  },
  {
    missionId: 'ap-05',
    subjectId: 'administracao',
    title: 'Servidores Públicos — Dever, Cargo e Responsabilidade',
    missionBrief: 'Você vai entender o básico sobre servidores públicos: ingresso, cargo, deveres, direitos, estabilidade, responsabilidade e limites. Para concurso policial, é essencial entender que função pública não é propriedade pessoal.',
    dumbMode: 'Servidor público é a pessoa que exerce função pública dentro da estrutura do Estado. Em regra, o ingresso em cargo efetivo depende de concurso público. O servidor tem direitos, mas também deveres: assiduidade, disciplina, lealdade, urbanidade, obediência às normas e zelo pelo patrimônio público. Estabilidade não é impunidade; é garantia para proteger o serviço público, mas o servidor pode perder o cargo nas hipóteses legais.',
    analogy: 'Pense em uma ordem de cavaleiros. Entrar exige prova. Depois de entrar, o cavaleiro recebe honra e proteção, mas também regras rígidas. Ele não pode usar a armadura para interesse próprio. O cargo público é parecido: dá autoridade, mas exige dever e responsabilidade.',
    vunespMode: 'A Vunesp cobra concurso público, estabilidade, acumulação de cargos, deveres, proibições e responsabilidade do servidor. Também pode explorar diferença entre cargo, emprego e função pública, além da ideia de que estabilidade não impede punição.',
    traps: [
      'Concurso público é regra para cargo efetivo.',
      'Estabilidade não significa que o servidor nunca perde o cargo.',
      'Acumulação de cargos é proibida como regra, salvo exceções constitucionais.',
      'Servidor responde nas esferas administrativa, civil e penal.',
      'Cargo público não pertence ao servidor.',
      'Dever funcional violado pode gerar processo administrativo disciplinar.'
    ],
    memoryHook: 'Cargo público é missão, não propriedade.',
    finalReminder: 'Na prova, cuidado com palavras absolutas: estabilidade não é blindagem total e acumulação não é livre.',
    miniMission: 'Questão de verificação: explique por que estabilidade não é sinônimo de impunidade.',
    notUnderstood: 'Modo simples: servidor tem proteção para trabalhar direito, mas continua preso a deveres e pode ser punido se errar.'
  },
  {
    missionId: 'ap-06',
    subjectId: 'administracao',
    title: 'Controle da Administração Pública — Quem Vigia o Vigia?',
    missionBrief: 'Você vai entender que a Administração Pública não age sem fiscalização. Controle é o conjunto de mecanismos usados para verificar legalidade, legitimidade, eficiência e uso correto do dinheiro público. A pergunta central é: quem controla, o que controla e por qual meio?',
    dumbMode: 'Controle da Administração é fiscalização. Controle interno acontece dentro do próprio órgão ou Poder. Controle externo é feito por outro Poder, normalmente com auxílio dos Tribunais de Contas. Controle judicial é feito pelo Poder Judiciário quando há lesão ou ameaça a direito. Controle popular acontece quando o cidadão fiscaliza, denuncia, acompanha gastos e usa instrumentos como ação popular.',
    analogy: 'Pense em uma fortaleza. Não basta ter guardas no portão; também precisa de inspetor interno, conselho externo, juiz do reino e cidadãos atentos. Se cada um vigia uma parte, fica mais difícil alguém usar o poder público de forma errada.',
    vunespMode: 'A Vunesp costuma cobrar a diferença entre controle interno, externo, judicial e popular. Também explora a ideia de que o Judiciário controla legalidade, mas não substitui o mérito administrativo legítimo. Tribunal de Contas auxilia o Legislativo no controle externo, mas não é subordinado comum como uma secretaria.',
    traps: [
      'Controle interno é feito dentro da própria estrutura administrativa.',
      'Controle externo envolve fiscalização por outro Poder, com apoio dos Tribunais de Contas.',
      'Controle judicial analisa legalidade, não conveniência administrativa legítima.',
      'Controle popular permite participação e fiscalização pelo cidadão.',
      'Anulação corrige ilegalidade; revogação trata conveniência e oportunidade.',
      'Fiscalizar não é perseguir agente público; é proteger interesse público.'
    ],
    memoryHook: 'Controle é o sistema de vigilância do interesse público.',
    finalReminder: 'Na prova, identifique quem está fiscalizando: o próprio órgão, outro Poder, o Judiciário ou o cidadão.',
    miniMission: 'Questão de verificação: dê um exemplo de controle interno, externo, judicial e popular.',
    notUnderstood: 'Modo simples: controle é conferir se o poder público está obedecendo à lei, usando bem o dinheiro e servindo ao povo.'
  },
  {
    missionId: 'ap-08',
    subjectId: 'administracao',
    title: 'Responsabilidade Fiscal — O Freio do Gasto Público',
    missionBrief: 'Você vai entender a responsabilidade fiscal como conjunto de regras para evitar que o governo gaste de forma irresponsável. A lógica é planejar, controlar despesas, dar transparência e manter equilíbrio das contas públicas.',
    dumbMode: 'Responsabilidade fiscal é administrar dinheiro público com limite. O governante não pode prometer, gastar e empurrar a conta sem planejamento. Ele precisa respeitar metas fiscais, controlar despesa com pessoal, observar limites de endividamento, justificar renúncia de receita e dar transparência às contas. A ideia é impedir aventura financeira com dinheiro público.',
    analogy: 'Pense em uma base militar com suprimentos limitados. Se o comandante gasta toda a munição, combustível e comida em uma semana sem planejamento, a tropa fica vulnerável. A responsabilidade fiscal é o plano de abastecimento: gastar com controle para a missão continuar.',
    vunespMode: 'A Vunesp costuma cobrar finalidade da Lei de Responsabilidade Fiscal, planejamento, transparência, limites, metas fiscais, renúncia de receita e controle de gastos com pessoal. A banca gosta de situações em que o administrador cria despesa sem estimar impacto ou tenta esconder informação fiscal.',
    traps: [
      'Responsabilidade fiscal não é simplesmente cortar gastos; é gastar com planejamento e limite.',
      'Transparência fiscal permite controle social.',
      'Renúncia de receita exige cuidado e justificativa legal.',
      'Despesa continuada precisa ser planejada.',
      'Gasto com pessoal tem limites e mecanismos de controle.',
      'Equilíbrio fiscal protege a continuidade dos serviços públicos.'
    ],
    memoryHook: 'Dinheiro público tem freio, painel e prestação de contas.',
    finalReminder: 'Na prova, procure palavras como planejamento, transparência, equilíbrio, limite, meta e controle.',
    miniMission: 'Questão de verificação: explique por que criar despesa permanente sem planejamento ameaça o interesse público.',
    notUnderstood: 'Modo simples: responsabilidade fiscal é não gastar dinheiro público como se fosse infinito.'
  },
  {
    missionId: 'ap-09',
    subjectId: 'administracao',
    title: 'Improbidade Administrativa — Corrupção, Dano e Desonestidade',
    missionBrief: 'Você vai entender improbidade administrativa como conduta desonesta grave contra a Administração Pública. O foco é reconhecer atos de enriquecimento ilícito, prejuízo ao erário e violação de princípios, além das consequências possíveis.',
    dumbMode: 'Improbidade é quando alguém usa a função pública de forma desonesta ou gravemente errada. Pode acontecer quando o agente enriquece ilicitamente, causa prejuízo ao dinheiro público ou viola princípios da Administração. Não é qualquer erro simples; a ideia central é conduta grave ligada à desonestidade, má-fé ou violação relevante do dever público.',
    analogy: 'Imagine um guarda que recebeu a chave do cofre do reino. Se ele pega moedas para si, favorece um aliado, destrói recursos ou usa a autoridade para interesse próprio, ele traiu a missão. Improbidade é essa traição da confiança pública.',
    vunespMode: 'A banca costuma cobrar categorias de improbidade, sanções e diferença entre irregularidade simples e ato ímprobo. Também explora enriquecimento ilícito, dano ao erário, violação de princípios e participação de terceiros que induzem, concorrem ou se beneficiam do ato.',
    traps: [
      'Improbidade não é todo erro administrativo; exige gravidade e elemento subjetivo adequado.',
      'Enriquecimento ilícito envolve vantagem patrimonial indevida.',
      'Prejuízo ao erário envolve dano aos cofres públicos.',
      'Violação de princípios atinge deveres como honestidade, imparcialidade e legalidade.',
      'Particular também pode responder se participa ou se beneficia do ato.',
      'Sanções podem incluir ressarcimento, multa, perda da função e suspensão de direitos políticos, conforme o caso.'
    ],
    memoryHook: 'Improbidade é traição grave da confiança pública.',
    finalReminder: 'Na prova, identifique se houve enriquecimento, dano ao erário ou violação grave de princípio.',
    miniMission: 'Questão de verificação: crie um exemplo de enriquecimento ilícito, um de prejuízo ao erário e um de violação de princípio.',
    notUnderstood: 'Modo simples: improbidade é quando alguém usa o poder público de forma desonesta e causa dano, vantagem indevida ou quebra grave de dever.'
  },
  {
    missionId: 'mt-01',
    subjectId: 'matematica',
    title: 'Operações Fundamentais — A Ordem da Batalha Numérica',
    missionBrief: 'Você vai dominar as quatro operações básicas e a ordem correta dos cálculos. Esse é o chão da Matemática: se errar soma, subtração, multiplicação, divisão ou prioridade de operação, o resto da questão desmorona.',
    dumbMode: 'Operações fundamentais são soma, subtração, multiplicação e divisão. Em uma conta com várias operações, você não resolve da esquerda para a direita de qualquer jeito. Primeiro vêm parênteses, depois multiplicação e divisão, depois soma e subtração. Exemplo: 2 + 3 x 4 não é 20; é 14, porque 3 x 4 vem antes.',
    analogy: 'Pense em uma missão tática. Você não invade antes de reconhecer o terreno. Existe ordem: primeiro entrar no local certo, depois neutralizar ameaça, depois resgatar. Na conta é igual: parênteses são prioridade máxima, depois multiplicar/dividir, depois somar/subtrair.',
    vunespMode: 'A Vunesp gosta de contas com pegadinha de ordem, números negativos, parênteses e problemas escritos. Ela também cobra atenção com palavras como diferença, soma, produto, quociente, dobro, triplo, metade e restante.',
    traps: [
      'Multiplicação e divisão vêm antes de soma e subtração.',
      'Parênteses mudam a prioridade da conta.',
      'Produto significa multiplicação.',
      'Quociente significa divisão.',
      'Diferença geralmente indica subtração.',
      'Número negativo exige cuidado com sinais.'
    ],
    memoryHook: 'Parênteses primeiro; depois vezes/dividir; depois mais/menos.',
    finalReminder: 'Na prova, antes de calcular, marque mentalmente a ordem da operação.',
    miniMission: 'Questão de verificação: resolva 8 + 2 x 5 e depois resolva (8 + 2) x 5. Explique por que os resultados mudam.',
    notUnderstood: 'Modo simples: não faça a conta correndo. Primeiro descubra quem manda na ordem.'
  },
  {
    missionId: 'mt-07',
    subjectId: 'matematica',
    title: 'Sistema de Equações — Dois Suspeitos na Mesma Ocorrência',
    missionBrief: 'Você vai aprender sistema de equações como uma investigação com duas incógnitas. Quando o problema tem duas informações diferentes e dois valores desconhecidos, cada equação vira uma pista para descobrir os dois números.',
    dumbMode: 'Sistema de equações aparece quando existem duas incógnitas, geralmente x e y, e duas equações ligando essas incógnitas. Para resolver, você pode usar substituição ou adição. Na substituição, isola uma letra em uma equação e coloca na outra. Na adição, soma ou subtrai as equações para eliminar uma letra.',
    analogy: 'Imagine uma ocorrência com dois suspeitos: X e Y. Uma testemunha diz que juntos eles somam 10. Outra diz que a diferença entre eles é 4. Sozinha, cada pista é incompleta. Juntas, elas revelam quem é quem.',
    vunespMode: 'A Vunesp pode cobrar sistema em problemas de idade, preço, quantidade de produtos, soma e diferença entre números. O ponto mais importante é transformar o texto em duas equações antes de tentar resolver.',
    traps: [
      'Duas incógnitas normalmente precisam de duas equações.',
      'No método da substituição, isole uma incógnita e substitua na outra equação.',
      'No método da adição, some ou subtraia equações para eliminar uma letra.',
      'Depois de achar uma incógnita, volte para achar a outra.',
      'Sempre confira se os dois valores servem nas duas equações.',
      'Cuidado com problemas de soma e diferença: eles costumam gerar sistemas simples.'
    ],
    memoryHook: 'Sistema é investigação dupla: duas letras precisam de duas pistas.',
    finalReminder: 'Na prova, monte as duas equações com calma antes de calcular.',
    miniMission: 'Questão de verificação: resolva mentalmente o sistema x + y = 10 e x - y = 4.',
    notUnderstood: 'Modo simples: uma equação descobre uma letra. Duas letras precisam de duas equações.'
  },
  {
    missionId: 'mt-08',
    subjectId: 'matematica',
    title: 'Geometria — Medindo o Terreno da Missão',
    missionBrief: 'Você vai revisar perímetro, área, figuras planas e noções de geometria básica. Geometria aparece em terrenos, salas, pistas, mapas, cercas, pisos e deslocamentos.',
    dumbMode: 'Perímetro é o contorno da figura. Área é o espaço interno. Em um retângulo, área = base x altura. Em um quadrado, área = lado x lado. Em um triângulo, área = base x altura / 2. Circunferência e círculo envolvem raio, diâmetro e pi. Antes de calcular, veja se a questão pede contorno ou espaço.',
    analogy: 'Pense em uma operação em um terreno. Se você precisa cercar o local, calcula perímetro. Se precisa cobrir o chão com piso, calcula área. Se precisa atravessar de um canto ao outro, pode aparecer diagonal e Teorema de Pitágoras.',
    vunespMode: 'A Vunesp cobra fórmulas básicas, interpretação de desenho, unidade de medida e diferença entre área e perímetro. Também pode aparecer escala, retângulo, quadrado, triângulo e círculo em problemas cotidianos.',
    traps: [
      'Perímetro é soma dos lados.',
      'Área de retângulo é base vezes altura.',
      'Área de triângulo é base vezes altura dividido por 2.',
      'Diâmetro é o dobro do raio.',
      'Não misture cm com m sem converter.',
      'Aumentar lado de uma figura pode alterar área de forma não linear.'
    ],
    memoryHook: 'Perímetro cerca; área cobre.',
    finalReminder: 'Na prova, pergunte primeiro: querem contorno ou superfície?',
    miniMission: 'Questão de verificação: calcule o perímetro e a área de um retângulo de 6 m por 4 m.',
    notUnderstood: 'Modo simples: perímetro é volta por fora. Área é espaço por dentro.'
  },
  {
    missionId: 'mt-09',
    subjectId: 'matematica',
    title: 'Análise Combinatória — Contando Possibilidades de Missão',
    missionBrief: 'Você vai aprender a contar possibilidades sem listar uma por uma. A análise combinatória ajuda quando a questão pergunta quantos jeitos existem de escolher, organizar, montar ou combinar elementos.',
    dumbMode: 'Análise combinatória é contagem inteligente. Se você tem 3 camisetas e 4 calças, pode montar 3 x 4 = 12 combinações. Isso é princípio fundamental da contagem: quando há etapas sucessivas, multiplica as possibilidades. A maior pergunta é: a ordem importa ou não importa?',
    analogy: 'Imagine criar um personagem de RPG: 4 armaduras, 3 armas e 2 amuletos. Para saber quantas combinações existem, você não precisa listar todas. Multiplica: 4 x 3 x 2 = 24 possibilidades.',
    vunespMode: 'A Vunesp costuma cobrar princípio fundamental da contagem, escolhas simples, combinações de roupas, senhas, caminhos, equipes e organização de elementos. Em prova básica, muitas questões resolvem só com árvore de possibilidades ou multiplicação.',
    traps: [
      'Se são etapas sucessivas, multiplique as possibilidades.',
      'Se a ordem importa, o caso muda.',
      'Escolher A-B é o mesmo que B-A quando a ordem não importa.',
      'Senha geralmente depende da ordem.',
      'Equipe geralmente não depende da ordem.',
      'Em questão simples, desenhar uma árvore pode evitar erro.'
    ],
    memoryHook: 'Escolhas em sequência? Multiplica.',
    finalReminder: 'Na prova, pergunte primeiro: a ordem importa?',
    miniMission: 'Questão de verificação: você tem 3 camisetas e 4 calças. Quantos conjuntos pode montar?',
    notUnderstood: 'Modo simples: combinatória é contar jeitos diferentes de montar uma coisa.'
  },
  {
    missionId: 'mt-10',
    subjectId: 'matematica',
    title: 'Probabilidade e Estatística Básica — Medindo Chances e Dados',
    missionBrief: 'Você vai revisar chance, eventos, tabelas, gráficos, média, moda, mediana e leitura de dados. Esse conteúdo ajuda muito em questões de interpretação matemática.',
    dumbMode: 'Probabilidade é chance de algo acontecer. Em casos simples, probabilidade = casos favoráveis / casos possíveis. Se uma urna tem 10 bolas e 2 são vermelhas, a chance de tirar vermelha é 2/10. Estatística organiza e interpreta dados. Média é soma dividida pela quantidade. Moda é o valor que mais aparece. Mediana é o valor central quando os dados estão em ordem.',
    analogy: 'Imagine um comandante avaliando relatórios. Probabilidade diz a chance de uma ocorrência acontecer. Estatística organiza o histórico de ocorrências para entender padrão, frequência e tendência. Sem organizar os dados, a decisão vira chute.',
    vunespMode: 'A Vunesp cobra probabilidade simples, leitura de gráficos, tabelas, média, moda, mediana e interpretação de percentuais. A banca gosta de fazer o candidato errar por não contar corretamente o total de casos.',
    traps: [
      'Probabilidade simples é favoráveis dividido por possíveis.',
      'O total de casos possíveis precisa ser contado com cuidado.',
      'Moda é o valor que mais se repete.',
      'Mediana exige colocar os dados em ordem.',
      'Média pode ser puxada por valores extremos.',
      'Gráfico deve ser lido com atenção aos eixos e unidades.'
    ],
    memoryHook: 'Probabilidade mede chance; estatística organiza dados.',
    finalReminder: 'Na prova, conte o total antes de calcular a chance.',
    miniMission: 'Questão de verificação: em uma caixa com 3 bolas azuis e 7 verdes, qual a probabilidade de tirar uma azul?',
    notUnderstood: 'Modo simples: chance é casos que você quer dividido por todos os casos possíveis.'
  },
  {
    missionId: 'cg-01',
    subjectId: 'gerais',
    title: 'Atualidades — Patrulha do Mundo Real',
    missionBrief: 'Você vai aprender a estudar atualidades do jeito certo: entendendo temas, causas, consequências e relações com cidadania, política, economia, tecnologia, meio ambiente e segurança pública. Atualidades não é decorar manchete solta; é entender o contexto.',
    dumbMode: 'Atualidades são fatos importantes do Brasil e do mundo que podem cair na prova. Mas a banca não costuma perguntar fofoca ou notícia isolada. Ela quer saber se você entende o tema: crise climática, tecnologia, conflitos, economia, saúde pública, segurança, democracia, direitos humanos, energia, educação e sociedade. O segredo é perguntar: o que aconteceu, por que aconteceu, quem foi afetado e qual consequência isso gera.',
    analogy: 'Pense como um investigador vendo várias pistas em um mural. Uma notícia isolada é só uma pista. A prova quer que você conecte os fios: causa, consequência, impacto social e relação com o Estado. Quem só decora manchete vira recruta perdido; quem entende contexto vira analista.',
    vunespMode: 'A Vunesp costuma cobrar atualidades de forma contextualizada, ligando fatos recentes a temas sociais, econômicos, ambientais, científicos, políticos e culturais. A pegadinha é marcar uma alternativa emocional, exagerada ou baseada em opinião, em vez de uma leitura objetiva do tema.',
    traps: [
      'Não estude atualidades só por manchete; entenda contexto.',
      'Cuidado com alternativa opinativa ou sensacionalista.',
      'Fatos recentes podem ser cobrados por causas e consequências.',
      'Meio ambiente, tecnologia e conflitos internacionais costumam aparecer.',
      'Atualidades pode dialogar com Constituição, cidadania e direitos humanos.',
      'Fonte ruim gera estudo ruim; priorize fonte confiável e resumo objetivo.'
    ],
    memoryHook: 'Atualidade é fato + contexto + consequência.',
    finalReminder: 'Na prova, pergunte: qual é o tema maior por trás dessa notícia?',
    miniMission: 'Questão de verificação: escolha uma notícia da semana e responda: fato, causa, consequência e tema de prova.',
    notUnderstood: 'Modo simples: não decore notícia. Entenda o que aconteceu e por que isso importa para a sociedade.'
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
    title: 'Microsoft Word — Documento, Formatação e Revisão',
    missionBrief: 'Você vai entender o Word como editor de texto usado para criar, formatar, revisar e exportar documentos. A prova costuma cobrar recursos básicos de formatação, parágrafo, página, tabelas, revisão e atalhos.',
    dumbMode: 'Word é usado para escrever documentos. Negrito destaca texto. Itálico inclina. Sublinhado cria linha embaixo. Alinhamento pode ser à esquerda, centralizado, à direita ou justificado. Espaçamento mexe na distância entre linhas e parágrafos. Cabeçalho aparece no topo das páginas; rodapé aparece embaixo. Tabelas organizam informações em linhas e colunas. Revisão ortográfica ajuda a encontrar erros.',
    analogy: 'Pense no Word como uma prancheta de relatório policial. Você escreve a ocorrência, coloca título, organiza parágrafos, adiciona tabela, revisa erros e exporta para PDF quando quer enviar o documento fechado. A formatação é o uniforme do texto: deixa tudo organizado e legível.',
    vunespMode: 'A Vunesp gosta de cobrar atalhos e recursos de guia Página Inicial, Inserir, Layout, Referências e Revisão. Também cobra diferença entre salvar e salvar como, exportar para PDF, localizar/substituir e recursos como cabeçalho, rodapé e numeração de páginas.',
    traps: [
      'Ctrl+B ou Ctrl+N pode aparecer para negrito dependendo do idioma/ambiente; em português do Office é comum Ctrl+N.',
      'Ctrl+I aplica itálico.',
      'Ctrl+S no ambiente inglês pode salvar; em português pode aparecer Ctrl+B para salvar. A prova pode variar conforme referência.',
      'Cabeçalho fica no topo; rodapé fica na parte inferior da página.',
      'Justificar alinha o texto às duas margens.',
      'Salvar como cria uma cópia ou muda nome, local ou formato.'
    ],
    memoryHook: 'Word é o relatório: escrever, formatar, revisar e exportar.',
    finalReminder: 'Na prova, identifique se o recurso mexe no texto, no parágrafo, na página ou na revisão.',
    miniMission: 'Questão de verificação: diga para que servem negrito, justificar, cabeçalho, rodapé e salvar como.',
    notUnderstood: 'Modo simples: Word é onde você escreve e arruma o documento para ele ficar apresentável.'
  },
  {
    missionId: 'inf-07',
    subjectId: 'informatica',
    title: 'E-mail e Comunicação Digital — Mensagem sem Cair em Armadilha',
    missionBrief: 'Você vai aprender os campos do e-mail, anexos, spam, phishing, resposta, encaminhamento, assinatura e boas práticas de comunicação digital. E-mail parece simples, mas cai bastante em prova por causa de golpes e campos CC/CCO.',
    dumbMode: 'E-mail é correio eletrônico. O campo Para recebe o destinatário principal. CC envia cópia visível para outras pessoas. CCO envia cópia oculta: os outros destinatários não veem quem está em CCO. Anexo é arquivo enviado junto. Responder responde ao remetente. Responder a todos manda para todos os envolvidos. Encaminhar envia a mensagem para outra pessoa. Spam é mensagem indesejada. Phishing é golpe tentando roubar dados.',
    analogy: 'Pense no e-mail como uma ordem de serviço. Para é quem precisa agir. CC são pessoas que precisam saber. CCO é alguém observando sem aparecer para os demais. Anexo é o documento preso à ocorrência. Responder a todos é falar no rádio para todo mundo ouvir; se usar sem cuidado, vira bagunça.',
    vunespMode: 'A Vunesp gosta de cobrar diferença entre CC e CCO, anexos, spam, phishing, resposta versus responder a todos e cuidados com links. Também pode aparecer assinatura digital, que ajuda a verificar autenticidade e integridade de documentos ou mensagens.',
    traps: [
      'CC é cópia visível; CCO é cópia oculta.',
      'Responder a todos pode expor informação a quem não precisa recebê-la.',
      'Anexo pode carregar malware.',
      'Spam é mensagem indesejada; phishing é tentativa de golpe.',
      'Remetente parecido com empresa real pode ser falso.',
      'Assinatura digital não é só assinatura desenhada; envolve autenticidade e integridade.'
    ],
    memoryHook: 'Para age, CC vê, CCO vê escondido.',
    finalReminder: 'Na prova, se o destinatário precisa ficar oculto, a resposta é CCO.',
    miniMission: 'Questão de verificação: explique a diferença entre Para, CC, CCO, responder, responder a todos e encaminhar.',
    notUnderstood: 'Modo simples: e-mail é carta digital. CCO é mandar cópia sem os outros verem.'
  },
  {
    missionId: 'inf-08',
    subjectId: 'informatica',
    title: 'Sistemas Operacionais Móveis — Android, iOS e Permissões',
    missionBrief: 'Você vai entender o básico de sistemas móveis: Android, iOS, lojas de aplicativos, permissões, atualizações, segurança, armazenamento e sincronização. A banca costuma cobrar conceitos simples com pegadinhas de privacidade.',
    dumbMode: 'Sistema operacional móvel é o sistema que controla celular ou tablet. Android é usado por várias marcas e tem integração forte com serviços Google. iOS é o sistema dos iPhones e iPads da Apple. Aplicativos são instalados por lojas como Play Store e App Store. Permissões controlam acesso a câmera, microfone, localização, contatos e arquivos. Atualizações corrigem falhas e melhoram segurança.',
    analogy: 'Pense no celular como uma pequena base de operações no bolso. O sistema operacional é o comandante. Os aplicativos são equipes especializadas. As permissões são autorizações de acesso: uma equipe não deve entrar no arquivo, câmera ou localização sem necessidade.',
    vunespMode: 'A Vunesp pode cobrar diferença entre Android e iOS, permissões de aplicativos, atualizações, backup em nuvem, sincronização, loja oficial e riscos de instalar apps de fonte desconhecida. A banca gosta de situações envolvendo privacidade e segurança.',
    traps: [
      'Permissão de localização permite rastrear posição do aparelho.',
      'Permissão de câmera e microfone deve ser concedida com cuidado.',
      'Atualizações ajudam a corrigir falhas de segurança.',
      'Instalar aplicativo fora da loja oficial pode aumentar risco.',
      'Sincronização não é a mesma coisa que backup completo.',
      'Bloqueio de tela ajuda a proteger dados em caso de perda ou roubo.'
    ],
    memoryHook: 'Permissão é chave de acesso: só entregue para quem precisa.',
    finalReminder: 'Na prova, se um app pede câmera, microfone ou localização sem necessidade, pense em risco de privacidade.',
    miniMission: 'Questão de verificação: cite três permissões sensíveis em celular e explique por que exigem cuidado.',
    notUnderstood: 'Modo simples: celular também tem sistema operacional. App precisa pedir permissão para acessar partes importantes do aparelho.'
  },
  {
    missionId: 'inf-09',
    subjectId: 'informatica',
    title: 'Redes de Computadores — Conexões, IP, DNS e Wi-Fi',
    missionBrief: 'Você vai entender os conceitos básicos de rede: LAN, WAN, WLAN, internet, IP, DNS, DHCP, roteador, modem, switch, Wi-Fi e protocolos. Redes parecem difíceis, mas a lógica começa com comunicação entre dispositivos.',
    dumbMode: 'Rede é a conexão entre dispositivos para trocar dados. LAN é rede local, como a rede de uma casa ou empresa. WAN é rede ampla, como redes entre cidades ou países. WLAN é rede local sem fio, como Wi-Fi. IP é o endereço do dispositivo na rede. DNS traduz nomes de sites em endereços IP. DHCP distribui IP automaticamente. Roteador encaminha dados entre redes. Modem faz conexão com o provedor. Switch conecta dispositivos em uma rede local.',
    analogy: 'Imagine uma cidade. O IP é o endereço da casa. O DNS é a lista telefônica que transforma nome em endereço. O roteador é o cruzamento que decide para onde os dados vão. O switch é a central de um prédio conectando salas. O modem é a ponte com a estrada externa do provedor.',
    vunespMode: 'A Vunesp cobra conceitos de LAN, WAN, Wi-Fi, IP, DNS, DHCP, roteador, modem, protocolos e segurança sem fio. Também gosta de WPA2, WPA3, senha de rede e diferença entre internet e rede local.',
    traps: [
      'IP é endereço lógico do dispositivo na rede.',
      'DNS traduz nomes como site.com para endereços IP.',
      'DHCP distribui endereços IP automaticamente.',
      'Roteador encaminha dados entre redes.',
      'Switch conecta dispositivos dentro da rede local.',
      'WPA2 e WPA3 são padrões de segurança para Wi-Fi.'
    ],
    memoryHook: 'IP é endereço; DNS é lista telefônica; roteador escolhe caminho.',
    finalReminder: 'Na prova, se aparecer tradução de nome de site para IP, é DNS. Se aparecer distribuição automática de IP, é DHCP.',
    miniMission: 'Questão de verificação: explique a função de IP, DNS, DHCP, roteador, modem e switch.',
    notUnderstood: 'Modo simples: rede é um grupo de aparelhos conversando. Cada um precisa de endereço e caminho para enviar dados.'
  },
  {
    missionId: 'inf-10',
    subjectId: 'informatica',
    title: 'PowerPoint, Office e Nuvem — Produtividade em Missão',
    missionBrief: 'Você vai revisar ferramentas de produtividade além do Word e Excel: PowerPoint, apresentações, armazenamento em nuvem, colaboração, compartilhamento e exportação. A banca costuma cobrar recursos práticos e diferenças entre ferramentas.',
    dumbMode: 'PowerPoint serve para criar apresentações em slides. Um slide pode ter texto, imagem, tabela, gráfico, áudio e vídeo. Transições são efeitos entre slides. Animações são efeitos em objetos dentro do slide. Modo de apresentação exibe os slides para o público. Nuvem é armazenamento em servidores acessados pela internet, como OneDrive, Google Drive e iCloud. Compartilhamento permite outras pessoas visualizar ou editar arquivos.',
    analogy: 'Pense no PowerPoint como um briefing de operação. Cada slide é uma tela da missão. Transição é a passagem de uma tela para outra. Animação é o movimento de um elemento dentro da tela. A nuvem é o armário remoto da equipe, acessível de outros lugares, desde que haja login e internet.',
    vunespMode: 'A Vunesp cobra PowerPoint, slides, transições, animações, modo apresentação, exportação para PDF, armazenamento em nuvem, sincronização e colaboração. Também pode perguntar diferença entre compartilhar para visualizar e compartilhar para editar.',
    traps: [
      'Transição ocorre entre slides; animação ocorre em objetos do slide.',
      'F5 inicia apresentação do começo em muitos ambientes.',
      'Exportar para PDF preserva visual, mas reduz edição.',
      'Nuvem depende de conta, acesso e conexão.',
      'Compartilhar para visualização não é o mesmo que permitir edição.',
      'Sincronização replica alterações entre dispositivos, mas não substitui estratégia completa de backup.'
    ],
    memoryHook: 'Transição muda slide; animação mexe objeto.',
    finalReminder: 'Na prova, se o efeito é entre slides, pense em transição. Se é dentro do slide, pense em animação.',
    miniMission: 'Questão de verificação: diferencie slide, transição, animação, apresentação, nuvem e compartilhamento.',
    notUnderstood: 'Modo simples: PowerPoint monta apresentação. Nuvem guarda arquivo online. Compartilhar decide quem vê ou edita.'
  }
];

export function getTheoryLesson(missionId: string): TheoryLesson | undefined {
  return theoryLessons.find(lesson => lesson.missionId === missionId);
}
