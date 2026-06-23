import {
  Landmark, CloudFog, Gem, Plane, Banknote, FileWarning, ServerCrash,
  Syringe, EyeOff, Building2, Snowflake, Wheat, Cable, Globe, Atom,
  Dna, ScrollText, Briefcase, BrainCircuit, Newspaper, AlertTriangle,
  type LucideIcon
} from "lucide-react";

export interface DossieGlobal {
  tag: string;
  title: string;
  desc: string;
  url: string;
}

export const dossiesGlobais: DossieGlobal[] = [
  { tag: "[CRISE NACIONAL]", title: "Escândalo Banco Master & STF", desc: "Delações e arquivos revelam conexões profundas entre o sistema financeiro e o alto escalão do judiciário. O vazamento que o sistema tenta abafar a todo custo.", url: "https://www.google.com/search?q=banco+master+stf+delacao+escandalo+financeiro" },
  { tag: "[CLIMA]", title: "A Farsa do El Niño e a Geoengenharia", desc: "Relatórios independentes apontam que as anomalias climáticas recentes coincidem com testes de dispersão de aerossóis na estratosfera. O clima como arma de guerra silenciosa.", url: "https://www.google.com/search?q=geoengenharia+climatica+documentos+oficiais+pulverizacao" },
  { tag: "[ELITE]", title: "Êxodo para as Maldivas e Bunkers Submersos", desc: "Bilionários da tecnologia estão liquidando ações e financiando complexos subterrâneos isolados este mês. O que o Vale do Silício sabe sobre os próximos 6 meses?", url: "https://www.google.com/search?q=tech+billionaires+building+underground+bunkers+hawaii+maldives" },
  { tag: "[PENTÁGONO]", title: "UAPs e os Trilhões Desaparecidos", desc: "Auditorias falhas do departamento de defesa americano escondem orçamentos negros (Black Budgets) destinados a engenharia reversa de veículos não tripulados de origem desconhecida.", url: "https://www.google.com/search?q=pentagon+failed+audit+missing+trillions+UAP+programs" },
  { tag: "[ECONOMIA]", title: "A Armadilha das CBDCs (Dinheiro Programável)", desc: "Bancos centrais testam moedas com prazo de validade e bloqueio geográfico. O rastreio absoluto de cada centavo gasto, ligado a um sistema de pontuação social.", url: "https://www.google.com/search?q=cbdc+programmable+money+social+credit+control" },
  { tag: "[VAZAMENTO]", title: "Arquivos Jeffrey Epstein: A Conexão BR", desc: "Documentos não selados revelam a passagem da rede de tráfico internacional pela América do Sul e o envolvimento de figuras intocáveis do poder local.", url: "https://www.google.com/search?q=jeffrey+epstein+unsealed+documents+brazil+connections" },
  { tag: "[TECNOLOGIA]", title: "O Apagão Planejado (Cyber Polygon)", desc: "Simulações de colapso da internet global financiadas pelo Fórum Econômico Mundial. Especialistas alertam para uma 'pandemia cibernética' iminente.", url: "https://www.google.com/search?q=cyber+polygon+wef+global+internet+outage+simulation" },
  { tag: "[SAÚDE]", title: "Doença X: A Próxima Quarentena", desc: "Laboratórios de nível 4 (BSL-4) aceleram o desenvolvimento de vacinas para um patógeno que ainda não existe, prevendo lockdowns mais severos que os de 2020.", url: "https://www.google.com/search?q=disease+x+pandemic+preparedness+bsl4+labs" },
  { tag: "[CENSURA]", title: "O Complexo Industrial da Censura", desc: "Vazamentos mostram a comunicação direta entre agências governamentais e big techs (Meta, X, Google) para criar algoritmos de shadowban contra opiniões divergentes.", url: "https://www.google.com/search?q=twitter+files+censorship+industrial+complex+government" },
  { tag: "[SOCIOLOGIA]", title: "Cidades de 15 Minutos ou Prisões Abertas?", desc: "Projetos de planejamento urbano introduzem bloqueios de trânsito e multas baseadas em emissão de carbono para restringir o direito de ir e vir da população.", url: "https://www.google.com/search?q=15+minute+cities+climate+lockdowns+freedom+of+movement" },
  { tag: "[ANTÁRTIDA]", title: "As Zonas de Exclusão no Gelo", desc: "O Tratado da Antártida proíbe a exploração independente. Imagens de satélite de alta resolução revelam anomalias estruturais e atividade militar intensa longe das bases de pesquisa.", url: "https://www.google.com/search?q=antarctica+no+fly+zones+satellite+anomalies+military" },
  { tag: "[ALIMENTAÇÃO]", title: "A Guerra Contra a Agricultura Independente", desc: "Leis ambientais são usadas para desapropriar fazendeiros enquanto megacorporações compram terras férteis para impor o monopólio de sementes e carnes sintéticas.", url: "https://www.google.com/search?q=farmers+protests+europe+synthetic+meat+land+grab" },
  { tag: "[INFRAESTRUTURA]", title: "Vulnerabilidade dos Cabos Submarinos", desc: "95% da internet mundial passa pelo fundo do oceano. Submarinos nucleares não identificados foram detectados mapeando os nós principais da rede global de dados.", url: "https://www.google.com/search?q=undersea+cables+internet+vulnerability+submarine+espionage" },
  { tag: "[GEOPOLÍTICA]", title: "A Desdolarização Acelerada", desc: "O bloco BRICS acumula toneladas de ouro físico e prepara uma rede de pagamentos alternativa ao SWIFT. O fim da hegemonia do dólar e o colapso do poder de compra ocidental.", url: "https://www.google.com/search?q=brics+gold+backed+currency+de-dollarization+swift" },
  { tag: "[ENERGIA]", title: "CERN e as Anomalias Magnéticas", desc: "Picos de energia não explicados no Grande Colisor de Hádrons coincidem com perturbações no campo magnético terrestre. O que a física de partículas está tentando abrir?", url: "https://www.google.com/search?q=cern+large+hadron+collider+magnetic+field+anomalies" },
  { tag: "[BIOMETRIA]", title: "O Roubo de DNA Legalizado", desc: "Empresas de ancestralidade genética compartilham bancos de dados com agências de inteligência. Seu código genético já não pertence a você.", url: "https://www.google.com/search?q=dna+testing+companies+sharing+data+law+enforcement" },
  { tag: "[HISTÓRIA]", title: "Os Arquivos Ocultos do Vaticano", desc: "Textos apócrifos e artefatos de civilizações antidiluvianas trancados nos cofres de Roma. A cronologia oficial da humanidade está quebrada.", url: "https://www.google.com/search?q=vatican+secret+archives+suppressed+history+apocrypha" },
  { tag: "[MERCADO]", title: "BlackRock: Os Donos do Mundo", desc: "Como três fundos de investimento controlam as fatias majoritárias de toda a mídia, indústria farmacêutica e produção de armas global.", url: "https://www.google.com/search?q=blackrock+vanguard+state+street+owning+everything" },
  { tag: "[IA]", title: "Sistemas Militares Autônomos", desc: "Inteligências artificiais integradas a enxames de drones já operam com autorização de 'fogo letal' sem supervisão humana no leste europeu.", url: "https://www.google.com/search?q=lethal+autonomous+weapons+ai+drone+swarms" },
  { tag: "[SAÚDE]", title: "O Veneno Invisível: Microplásticos", desc: "A descoberta de nanopartículas sintéticas na corrente sanguínea e cérebros humanos, ligada à queda global drástica nas taxas de fertilidade.", url: "https://www.google.com/search?q=microplastics+human+blood+brain+fertility+crisis" },
  { tag: "[MÍDIA]", title: "Operação Mockingbird 2.0", desc: "A infiltração moderna de agentes de inteligência nas redações dos maiores jornais do mundo para ditar a pauta e moldar a percepção pública.", url: "https://www.google.com/search?q=operation+mockingbird+modern+media+intelligence+infiltration" },
];

export const tagIconMap: Record<string, LucideIcon> = {
  "CRISE NACIONAL": Landmark,
  "CLIMA": CloudFog,
  "ELITE": Gem,
  "PENTÁGONO": Plane,
  "ECONOMIA": Banknote,
  "VAZAMENTO": FileWarning,
  "TECNOLOGIA": ServerCrash,
  "SAÚDE": Syringe,
  "CENSURA": EyeOff,
  "SOCIOLOGIA": Building2,
  "ANTÁRTIDA": Snowflake,
  "ALIMENTAÇÃO": Wheat,
  "INFRAESTRUTURA": Cable,
  "GEOPOLÍTICA": Globe,
  "ENERGIA": Atom,
  "BIOMETRIA": Dna,
  "HISTÓRIA": ScrollText,
  "MERCADO": Briefcase,
  "IA": BrainCircuit,
  "MÍDIA": Newspaper,
};

export function getIconForTag(tag: string): LucideIcon {
  const key = tag.replace(/[\[\]]/g, "").trim();
  return tagIconMap[key] ?? AlertTriangle;
}