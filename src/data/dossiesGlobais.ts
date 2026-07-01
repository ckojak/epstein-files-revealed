import {
  Landmark, Scale, Banknote, Building2, Gavel, Globe, Flame, Plane,
  Ship, TrendingUp, ShieldAlert, Newspaper, AlertTriangle, Swords,
  type LucideIcon
} from "lucide-react";

export interface DossieGlobal {
  tag: string;
  title: string;
  desc: string;
  url: string;
  source: string;
  publishedAt: string;
}

export const dossiesGlobais: DossieGlobal[] = [
  // BRASIL — STF / JUDICIÁRIO
  { tag: "[STF]", title: "STF libera pagamento de penduricalhos a juízes e MP", desc: "Cármen Lúcia proferiu o voto decisivo e o Supremo autorizou, de forma mais restrita, os pagamentos extra-teto a magistrados, procuradores e promotores. Decisão sela disputa fiscal de anos.", url: "https://g1.globo.com/politica/noticia/2026/06/30/carmen-lucia-vota-e-stf-decide-liberar-pagamento-de-penduricalhos-de-juizes-de-forma-mais-restrita-entenda.ghtml", source: "G1 / TV Globo", publishedAt: "30/06/2026" },
  { tag: "[STF]", title: "Gilmar Mendes rebate crítica de Mendonça no caso Banco Master", desc: "Após Mendonça atacar publicamente colegas, Gilmar afirmou que 'divergências não significam desunião' do STF diante da crise do Banco Master. Racha interno vem à tona.", url: "https://g1.globo.com/politica/noticia/2026/06/30/apos-criticas-a-mendonca-gilmar-diz-que-divergencias-nao-significam-desuniao-do-stf-diante-do-caso-master.ghtml", source: "G1 / TV Globo", publishedAt: "30/06/2026" },
  { tag: "[JUSTIÇA]", title: "STF extingue aposentadoria compulsória como punição a juízes", desc: "Primeira Turma, por unanimidade, rejeitou recurso da PGR e confirmou o fim da 'aposentadoria dourada' aplicada como sanção disciplinar contra magistrados.", url: "https://g1.globo.com/politica/noticia/2026/06/30/stf-confirma-decisao-que-extingue-aposentadoria-compulsoria-como-punicao-para-juizes.ghtml", source: "G1 / TV Globo", publishedAt: "30/06/2026" },
  // BRASIL — CONGRESSO / GOVERNO
  { tag: "[CONGRESSO]", title: "Alcolumbre evita compromisso com nova líder de Lula no Senado", desc: "Presidente do Senado recebeu Teresa Leitão (PT-PE), mas não firmou apoio à agenda do Planalto. Governo perde tração nas votações prioritárias.", url: "https://oglobo.globo.com/economia/noticia/2026/06/30/alcolumbre-se-reune-com-nova-lider-de-lula-mas-evita-se-comprometer-em-votar-medidas-pedidas-pelo-governo.ghtml", source: "O Globo", publishedAt: "30/06/2026" },
  { tag: "[GOVERNO]", title: "Lula quer que população escolha destino das emendas parlamentares", desc: "Proposta do Planalto redireciona verbas de emendas para orçamento participativo e escala o atrito institucional com o Congresso.", url: "https://www.estadao.com.br/politica/governo-lula-propoe-que-populacao-escolha-destino-de-emendas-e-contrata-mais-atrito-com-congresso/", source: "Estadão", publishedAt: "30/06/2026" },
  { tag: "[CÂMARA]", title: "Motta avisa que vai brecar 'pauta-bomba' e cobra plano do governo", desc: "Presidente da Câmara reúne líderes, sinaliza travar projetos com impacto fiscal e aguarda proposta da Fazenda sobre renegociação da dívida rural.", url: "https://oglobo.globo.com/economia/noticia/2026/06/30/motta-avisa-a-lideres-que-vai-brecar-pauta-bomba-na-camara-e-aguarda-proposta-do-governo-sobre-divida-rural.ghtml", source: "O Globo", publishedAt: "30/06/2026" },
  // BRASIL — ECONOMIA
  { tag: "[ECONOMIA]", title: "Banco Central admite inflação acima da meta e prevê nova carta aberta", desc: "Relatório do BC projeta descumprimento do objetivo de inflação até o fim de 2026, obrigando o presidente da autoridade monetária a justificar formalmente o estouro.", url: "https://g1.globo.com/economia/noticia/2026/06/25/banco-central-ve-inflacao-acima-da-meta-ate-o-fim-do-ano-e-preve-ter-de-escrever-nova-carta-aberta-por-descumprir-objetivo.ghtml", source: "G1 / TV Globo", publishedAt: "25/06/2026" },
  { tag: "[SELIC]", title: "Copom debateu trajetórias distintas para os juros, revela ata", desc: "Ata do Copom de junho mostra que a diretoria discutiu recalibrar a Selic diante da piora inflacionária e das tensões geopolíticas no Oriente Médio.", url: "https://www.estadao.com.br/economia/ata-copom-banco-central-junho-2026/", source: "Estadão", publishedAt: "30/06/2026" },
  { tag: "[MERCADO]", title: "BC endurece discurso e sinaliza ajuste na 'calibração' da Selic", desc: "Valor Econômico: autoridade monetária cita incerteza externa persistente, política dos EUA e volatilidade de commodities como fatores para nova postura mais dura.", url: "https://valor.globo.com/financas/noticia/2026/06/23/bc-incerteza-em-relao-ao-cenrio-externo-seguiu-em-nveis-elevados.ghtml", source: "Valor Econômico", publishedAt: "23/06/2026" },
  // GUERRAS — UCRÂNIA / RÚSSIA
  { tag: "[GUERRA]", title: "Produtores russos ameaçam decretar força maior no Báltico", desc: "Reuters: petroleiras russas avisam compradores que podem invocar força maior nos portos bálticos diante da escalada de ataques ucranianos contra a infraestrutura de exportação.", url: "https://www.reuters.com/world/ukraine-crisis/", source: "Reuters", publishedAt: "01/07/2026" },
  { tag: "[GUERRA]", title: "Ucrânia atinge fábrica de defesa em Volgogrado com míssil Flamingo", desc: "Zelensky confirmou que mísseis ucranianos de médio alcance destruíram planta que fabrica sistemas de artilharia e componentes de lançadores no sul da Rússia.", url: "https://wixx.com/2026/06/27/ukraine-hits-defence-plant-in-russias-volgograd-region-zelenskiy-says/", source: "Reuters", publishedAt: "27/06/2026" },
  // GUERRAS — ORIENTE MÉDIO
  { tag: "[ISRAEL]", title: "Netanyahu visita sul do Líbano e diz que IDF não sairá agora", desc: "Primeiro-ministro israelense faz visita inédita a território libanês ocupado após o acordo de segurança de 26 de junho e condiciona a retirada ao fim do 'eixo iraniano'.", url: "https://www.straitstimes.com/world/middle-east/netanyahu-visits-occupied-southern-lebanon-says-israel-wont-leave-yet", source: "The Straits Times / Reuters", publishedAt: "01/07/2026" },
  { tag: "[LÍBANO]", title: "Israel avisa Beirute: sair das 'zonas piloto' vai demorar", desc: "The National: Tel Aviv comunica que a retirada de duas áreas-piloto no sul do Líbano levará meses, contrariando o cronograma esperado pelo governo libanês.", url: "https://www.thenationalnews.com/news/mena/2026/06/30/israel-tells-lebanon-that-leaving-pilot-zones-will-take-time/", source: "The National", publishedAt: "30/06/2026" },
  { tag: "[HEZBOLLAH]", title: "Israel admite: 'não temos solução' para drones do Hezbollah", desc: "Foreign Policy: oficial militar israelense reconhece que ataques com drones FPV vindos do Líbano expõem lacuna de defesa que o IDF ainda não consegue neutralizar.", url: "https://foreignpolicy.com/2026/06/30/israel-hezbollah-drones-lebanon-fpv-iran-idf/", source: "Foreign Policy", publishedAt: "30/06/2026" },
  // GUERRAS — SUDÃO
  { tag: "[SUDÃO]", title: "Exército sudanês diz ter destruído 224 veículos da RSF em 15 dias", desc: "Anadolu: em ofensiva relâmpago, as forças armadas afirmam ter neutralizado centenas de veículos de combate do grupo paramilitar Rapid Support Forces.", url: "https://www.aa.com.tr/en/africa/sudan-s-army-says-it-destroyed-224-rsf-combat-vehicles-in-2-weeks/3982754", source: "Anadolu Agency", publishedAt: "30/06/2026" },
  { tag: "[SUDÃO]", title: "ONU alerta: RSF avança sobre cidade estratégica no centro do país", desc: "AP News: paramilitares cercam El-Obeid, com meio milhão de habitantes, e agências humanitárias temem repetição do massacre de El-Fasher.", url: "https://apnews.com/article/sudan-war-paramilitary-rsf-obeid-khartoum-un-ce80280c6431fa944c0ac07a75107715", source: "AP News", publishedAt: "30/06/2026" },
  { tag: "[SUDÃO]", title: "Exército retoma Kulbus, cidade estratégica perto do Chade", desc: "The Defense Post: maior ganho territorial das Forças Armadas sudanesas em Darfur desde a queda de El-Fasher em 2025.", url: "https://thedefensepost.com/2026/06/30/sudan-army-retakes-kulbus/", source: "The Defense Post", publishedAt: "30/06/2026" },
  // ÁSIA-PACÍFICO
  { tag: "[CHINA]", title: "Guarda costeira de Taiwan alerta para 'normalização' de incursões chinesas", desc: "Taipei Times: Pequim prepara plano para tornar rotineiras as invasões de águas territoriais taiwanesas, escalando pressão sobre a ilha.", url: "https://www.taipeitimes.com/News/taiwan/archives/2026/07/01/2003860041", source: "Taipei Times", publishedAt: "01/07/2026" },
  { tag: "[CHINA]", title: "Taiwan avisa: tempo de alerta para ataque chinês está encolhendo", desc: "Japan Times: cúpula de defesa taiwanesa reconhece que exercícios da PLA reduzem drasticamente a janela de reação diante de uma eventual investida.", url: "https://www.japantimes.co.jp/news/2026/06/24/world/politics/taiwan-warning-time/", source: "The Japan Times", publishedAt: "24/06/2026" },
  // AMÉRICAS
  { tag: "[VENEZUELA]", title: "Rubio: EUA não estão em guerra com a Venezuela; Maduro no tribunal em NY", desc: "BBC: secretário de Estado americano descarta guerra formal, mas Maduro e a esposa foram levados a corte federal em Nova York um dia após ataques dos EUA.", url: "https://www.bbc.com/news/live/c5yqygxe41pt", source: "BBC News", publishedAt: "30/06/2026" },
];

export const tagIconMap: Record<string, LucideIcon> = {
  "STF": Scale,
  "JUSTIÇA": Gavel,
  "CONGRESSO": Landmark,
  "GOVERNO": Landmark,
  "CÂMARA": Landmark,
  "ECONOMIA": Banknote,
  "SELIC": TrendingUp,
  "MERCADO": Building2,
  "GUERRA": Swords,
  "ISRAEL": ShieldAlert,
  "LÍBANO": ShieldAlert,
  "HEZBOLLAH": ShieldAlert,
  "SUDÃO": Flame,
  "CHINA": Globe,
  "VENEZUELA": Ship,
  "MÍDIA": Newspaper,
  "GEOPOLÍTICA": Globe,
  "PENTÁGONO": Plane,
};

export function getIconForTag(tag: string): LucideIcon {
  const key = tag.replace(/[\[\]]/g, "").trim();
  return tagIconMap[key] ?? AlertTriangle;
}