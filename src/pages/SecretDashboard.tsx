import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle2, FileText, ExternalLink, Instagram, Database,
  AlertTriangle, Globe, Languages, Lock
} from "lucide-react";
import { usePaymentVerification } from "@/hooks/usePaymentVerification";

const documents = [
  {
    id: 1,
    title: "Court Filing - Maxwell Trial Exhibit A",
    originalUrl: "https://www.documentcloud.org/documents/21165424-jeffrey-epstein-documents",
  },
  {
    id: 2,
    title: "Flight Logs - Lolita Express (2001-2005)",
    originalUrl: "https://www.documentcloud.org/documents/21165424-jeffrey-epstein-documents",
  },
  {
    id: 3,
    title: "Email Correspondence - Private Server Dump",
    originalUrl: "https://www.documentcloud.org/documents/21165424-jeffrey-epstein-documents",
  },
];

const brazilHighlights = [
  {
    id: "lula-chomsky",
    title: "Menção Lula/Chomsky",
    content: `Em documentos datados de 2015, há referências a uma conversa entre acadêmicos sobre política sul-americana. O nome de Lula aparece em contexto de discussão sobre influência política na região. Chomsky é mencionado como intermediário intelectual em conversas sobre geopolítica.\n\n**Contexto:** Os e-mails fazem parte de uma troca entre consultores sobre investimentos na América do Sul.\n\n**Tradução do trecho principal:** "Precisamos considerar as mudanças políticas no Brasil. O presidente atual [Lula] está implementando políticas que podem afetar nossos interesses."`,
  },
  {
    id: "bolsonaro",
    title: "Menção Bolsonaro",
    content: `Em logs de comunicação de 2018, há menção ao então candidato Bolsonaro no contexto de análise política para investimentos.\n\n**Contexto:** Relatório interno de análise de risco político para América Latina.\n\n**Tradução do trecho:** "O candidato conservador Bolsonaro representa uma mudança na política externa brasileira. Recomendamos monitoramento."`,
  },
  {
    id: "brasil-visitas",
    title: "Visitas ao Brasil",
    content: `Registros de voo indicam múltiplas viagens ao Brasil entre 2003 e 2010. Os destinos incluem:\n\n- **Rio de Janeiro** - 4 visitas documentadas\n- **São Paulo** - 2 visitas documentadas\n- **Angra dos Reis** - 1 visita documentada (evento privado)\n\n**Nota:** Estes logs são públicos e foram obtidos através de pedidos FOIA (Freedom of Information Act).`,
  },
];

const SecretDashboard = () => {
  const verified = usePaymentVerification();
  const navigate = useNavigate();

  const getTranslateUrl = (originalUrl: string) => {
    return `https://translate.google.com/translate?sl=en&tl=pt&u=${encodeURIComponent(originalUrl)}`;
  };

  // Loading
  if (verified === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-terminal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm font-mono">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  // Blocked
  if (verified === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="border-alert/30 bg-alert/5 p-8 max-w-md text-center">
          <Lock className="w-12 h-12 text-alert mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Nenhum pagamento confirmado encontrado. Faça o pagamento de R$ 4,99 para liberar.
          </p>
          <Button
            className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold"
            onClick={() => navigate("/")}
          >
            Ir para a Página Inicial
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Access Confirmed Bar */}
      <div className="bg-terminal text-terminal-foreground py-3 px-4 animate-blink">
        <div className="container mx-auto max-w-4xl flex items-center justify-center gap-2 text-center">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm md:text-base font-bold">
            ACESSO AUTORIZADO: PAGAMENTO CONFIRMADO ✅
          </span>
        </div>
      </div>

      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-lg md:text-xl font-bold text-foreground text-center">
            📁 DOSSIÊ SECRETO BRASIL - LIBERADO
          </h1>
        </div>
      </header>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          {/* Block A: Brazil Highlights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-terminal" />
              <h2 className="text-lg font-bold text-foreground">Destaques Traduzidos (Brasil)</h2>
            </div>
            <Card className="border-border bg-card">
              <Accordion type="single" collapsible className="w-full">
                {brazilHighlights.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-border">
                    <AccordionTrigger className="px-4 hover:no-underline hover:bg-secondary/50">
                      <span className="text-left font-mono text-sm md:text-base">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="prose prose-invert prose-sm max-w-none">
                        {item.content.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {paragraph.split('**').map((part, j) => 
                              j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </section>

          {/* Block B: PDF Translator */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-5 h-5 text-terminal" />
              <h2 className="text-lg font-bold text-foreground">Documentos Originais (Ferramenta de Tradução)</h2>
            </div>
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="border-border bg-card p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-mono text-foreground">{doc.title}</span>
                    </div>
                    <div className="flex gap-2 ml-8 md:ml-0">
                      <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Ver Original
                        </Button>
                      </a>
                      <a href={getTranslateUrl(doc.originalUrl)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                          <Languages className="w-3 h-3 mr-1" />
                          Ler Traduzido
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Block C: Jmail Database */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-terminal" />
              <h2 className="text-lg font-bold text-foreground">Banco de Dados Bruto</h2>
            </div>
            <Card className="border-border bg-card p-6 text-center">
              <h3 className="font-bold text-foreground mb-2">Ferramenta de Busca Avançada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse todos os e-mails e fotos indexados no banco de dados completo.
              </p>
              <a href="https://jmail.world/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acessar JMAIL.WORLD (Database Completo)
                </Button>
              </a>
            </Card>
          </section>

          {/* Block D: Instagram Funnel */}
          <section>
            <Card className="border-warning bg-warning/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className="w-6 h-6 text-warning" />
                <h3 className="text-lg font-bold text-warning">NOVOS VAZAMENTOS EM TEMPO REAL</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Nossa equipe está traduzindo novos áudios agora. Acompanhe nos Stories.
              </p>
              <a href="https://instagram.com/epstein.arquivos.oficial" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold w-full md:w-auto px-8"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Seguir @epstein.arquivos.oficial
                </Button>
              </a>
            </Card>
          </section>
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-border mt-8">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            Documentos obtidos através de processos judiciais públicos (FOIA).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SecretDashboard;
