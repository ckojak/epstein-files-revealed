import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Image, 
  FileText, 
  Headphones, 
  ExternalLink,
  AlertTriangle,
  Flag,
  Clock,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const contentCards = [
  {
    icon: Mail,
    title: "E-mails (Jmail Clone)",
    description: "Navegue pelos e-mails como se fossem seus",
    count: "847 mensagens",
    color: "alert",
  },
  {
    icon: Image,
    title: "Galeria de Fotos",
    description: "Imagens organizadas por evento e pessoas",
    count: "324 fotos",
    color: "warning",
  },
  {
    icon: FileText,
    title: "Resumos Traduzidos",
    description: "Principais trechos em português",
    count: "156 resumos",
    color: "success",
  },
  {
    icon: Headphones,
    title: "Áudios Transcritos",
    description: "Gravações com transcrição completa",
    count: "12 áudios",
    color: "primary",
  },
];

const brazilHighlights = [
  {
    name: "Lula",
    mentions: 8,
    lastUpdate: "Há 2 dias",
    summary: "Menções em logs de voo e correspondências com assessores.",
  },
  {
    name: "Dilma Rousseff",
    mentions: 3,
    lastUpdate: "Há 5 dias",
    summary: "Referências indiretas em contexto de eventos diplomáticos.",
  },
  {
    name: "Jair Bolsonaro",
    mentions: 5,
    lastUpdate: "Há 1 dia",
    summary: "Citações em e-mails sobre articulações políticas.",
  },
  {
    name: "Outros Brasileiros",
    mentions: 7,
    lastUpdate: "Há 3 dias",
    summary: "Empresários e políticos menores mencionados em contextos diversos.",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Alert Bar */}
      <div className="sticky top-0 z-50 bg-warning text-warning-foreground">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-semibold text-sm md:text-base">
                🚨 ATUALIZAÇÕES DIÁRIAS: O caso muda a toda hora. Receba novos vazamentos em tempo real!
              </span>
            </div>
            <a
              href="https://instagram.com/kojakoficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="dark" size="sm" className="whitespace-nowrap">
                <ExternalLink className="w-4 h-4 mr-2" />
                Seguir @kojakoficial
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Dashboard content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Área de Membros</h1>
          <p className="text-muted-foreground">
            Bem-vindo aos arquivos completos. Explore os documentos abaixo.
          </p>
        </div>
        
        {/* Content Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-alert" />
            Acessar Conteúdo
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentCards.map((card) => (
              <button
                key={card.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-alert/50 transition-all duration-300 text-left hover:shadow-glow"
              >
                <div className={`w-12 h-12 rounded-lg bg-${card.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-6 h-6 text-${card.color}`} />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-alert transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {card.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-alert font-medium">
                    {card.count}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-alert group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Brazil Highlights */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Flag className="w-5 h-5 text-success" />
            Destaques do Brasil
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {brazilHighlights.map((highlight) => (
              <div
                key={highlight.name}
                className="p-6 rounded-xl bg-card border border-border hover:border-success/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-success transition-colors">
                    {highlight.name}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded">
                    {highlight.mentions} menções
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {highlight.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Atualizado {highlight.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Documentos de domínio público • Acesso liberado
          </p>
          <Link to="/" className="text-sm text-alert hover:underline mt-2 inline-block">
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}