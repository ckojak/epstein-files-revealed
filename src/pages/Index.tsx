import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LockOpen, Shield, Eye, AlertTriangle, FileText, Plane, Users, MessageCircle } from "lucide-react";

const TeaserCard = ({ 
  title, 
  tag, 
  tagColor 
}: { 
  title: string; 
  tag: string; 
  tagColor: "red" | "yellow" | "orange";
}) => {
  const tagStyles = {
    red: "bg-alert/20 text-alert border-alert/30",
    yellow: "bg-warning/20 text-warning border-warning/30",
    orange: "bg-warning/30 text-warning border-warning/40",
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card p-4 md:p-6">
      <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider border ${tagStyles[tagColor]}`}>
        {tag}
      </div>
      <h3 className="font-mono text-sm md:text-base font-bold text-foreground pr-20 mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        <div className="blur-content text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </div>
        <div className="blur-content text-muted-foreground text-sm">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
    </Card>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5511999999999?text=Oi! Tenho dúvidas sobre o acesso aos arquivos Epstein."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline text-sm font-medium">Dúvidas?</span>
  </a>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-terminal" />
            <span>ARQUIVOS JEFFREY EPSTEIN BRASIL</span>
            <span className="text-2xl">🇧🇷</span>
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alert/10 border border-alert/30 mb-6 animate-pulse">
            <span className="w-2 h-2 bg-alert rounded-full" />
            <span className="text-xs md:text-sm font-mono text-alert uppercase tracking-wider">
              Documentos Recém-Liberados
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 text-foreground">
            O que a mídia{" "}
            <span className="text-alert">não mostrou</span>
            {" "}sobre as conexões com o Brasil.
          </h2>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Acesso direto aos <span className="text-foreground font-semibold">e-mails</span>, 
            {" "}<span className="text-foreground font-semibold">logs de voo</span> e 
            {" "}<span className="text-foreground font-semibold">fotos</span> sem filtros da imprensa.
          </p>

          {/* CTA Button */}
          <div className="mb-4">
            <a 
              href="https://mpago.la/2br5Vav" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg px-6 md:px-8 py-6 md:py-7 shadow-glow-green animate-glow-green transition-all hover:scale-105"
              >
                <LockOpen className="w-5 h-5 mr-2" />
                DESBLOQUEAR ACESSO IMEDIATO (R$ 1,99)
              </Button>
            </a>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            <span className="text-terminal">✓</span> Acesso liberado automaticamente após o PIX
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <FileText className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-terminal" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">5.000+</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">Páginas</div>
            </div>
            <div className="text-center border-x border-border">
              <Plane className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-alert" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">847</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">E-mails</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-warning" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">23</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">Menções BR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="w-5 h-5 text-alert" />
            <h3 className="text-lg md:text-xl font-bold text-foreground">O Que Encontramos</h3>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid gap-4 md:gap-6">
            <TeaserCard
              title="E-mail #2901: A ligação telefônica com Lula na prisão."
              tag="CONFIDENCIAL"
              tagColor="red"
            />
            <TeaserCard
              title="Log de Voo #84: A viagem para o Caribe e a menção a Bolsonaro."
              tag="RESTRITO"
              tagColor="yellow"
            />
            <TeaserCard
              title="Lista de Convidados: O jantar secreto no Rio de Janeiro."
              tag="VAZAMENTO"
              tagColor="orange"
            />
          </div>

          {/* Second CTA */}
          <div className="mt-10 text-center">
            <a 
              href="https://mpago.la/2br5Vav" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold px-6 py-5"
              >
                <LockOpen className="w-5 h-5 mr-2" />
                LIBERAR ACESSO COMPLETO
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 px-4 bg-alert/10 border-y border-alert/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 text-alert">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm md:text-base font-semibold">
              Documentos podem ser removidos a qualquer momento
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Arquivos Epstein Brasil. Todos os documentos são de domínio público.
          </p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
