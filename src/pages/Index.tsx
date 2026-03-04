import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  LockOpen, Shield, Eye, AlertTriangle, FileText, Plane, Users, 
  MessageCircle, Clock, TrendingUp, CheckCircle2, Lock, Zap, Star, Loader2,
  Flame, Globe, Crosshair, Skull
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Animated counter hook
const useAnimatedNumber = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

// Live visitor counter with realistic simulation
const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Base count from time of day (more realistic)
    const hour = new Date().getHours();
    const baseVisitors = hour >= 8 && hour <= 23 ? 127 + Math.floor(Math.random() * 89) : 42 + Math.floor(Math.random() * 35);
    setVisitors(baseVisitors);

    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -(Math.floor(Math.random() * 2));
        return Math.max(30, prev + change);
      });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terminal/10 border border-terminal/30">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terminal" />
      </span>
      <span className="text-xs md:text-sm font-mono text-terminal font-bold">
        {visitors} pessoas lendo agora
      </span>
    </div>
  );
};

const TeaserCard = ({ 
  title, 
  tag, 
  tagColor,
  preview,
  date
}: { 
  title: string; 
  tag: string; 
  tagColor: "red" | "yellow" | "orange";
  preview: string;
  date: string;
}) => {
  const tagStyles = {
    red: "bg-alert/20 text-alert border-alert/30",
    yellow: "bg-warning/20 text-warning border-warning/30",
    orange: "bg-warning/30 text-warning border-warning/40",
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card p-4 md:p-6 hover:border-terminal/30 transition-all duration-300 group">
      <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider border ${tagStyles[tagColor]}`}>
        {tag}
      </div>
      <div className="text-[10px] text-muted-foreground font-mono mb-2">{date}</div>
      <h3 className="font-mono text-sm md:text-base font-bold text-foreground pr-20 mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        <div className="blur-content text-muted-foreground text-sm">
          {preview}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
      <div className="absolute bottom-3 left-4 flex items-center gap-1 text-terminal text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        <Lock className="w-3 h-3" />
        Desbloquear para ler
      </div>
    </Card>
  );
};

const TestimonialCard = ({ text, name }: { text: string; name: string }) => (
  <Card className="border-border bg-card p-4">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground italic mb-2">"{text}"</p>
    <p className="text-xs text-foreground font-mono">— {name}</p>
  </Card>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5521979934676?text=Oi! Tenho dúvidas sobre o acesso aos arquivos Epstein."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline text-sm font-medium">Dúvidas?</span>
  </a>
);

const Index = () => {
  const pages = useAnimatedNumber(5247);
  const emails = useAnimatedNumber(847);
  const mentions = useAnimatedNumber(23);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Digite um e-mail válido para receber o acesso.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-preference", {
        body: { email },
      });
      if (error) throw error;
      if (data?.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("Não foi possível gerar o link de pagamento.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer (resets every 24h)
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Breaking News Banner */}
      <div className="bg-alert/10 border-b border-alert/30 py-2 px-4 animate-pulse-slow">
        <div className="container mx-auto text-center">
          <span className="text-xs md:text-sm font-mono text-alert">
            🔴 URGENTE: Novos documentos liberados pela Suprema Corte dos EUA em Janeiro/2026
          </span>
        </div>
      </div>

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
          <LiveVisitorCounter />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alert/10 border border-alert/30 mt-4 mb-6">
            <span className="w-2 h-2 bg-alert rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-mono text-alert uppercase tracking-wider">
              Documentos Recém-Liberados — Jan/2026
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 text-foreground">
            O que a mídia{" "}
            <span className="text-alert">não mostrou</span>
            {" "}sobre as conexões de Epstein com o Brasil.
          </h2>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            São <span className="text-foreground font-semibold">5.247 páginas</span> de documentos judiciais em inglês técnico.
            Nós traduzimos, organizamos e destacamos cada menção ao Brasil.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Acesse <span className="text-foreground font-semibold">e-mails reais</span>, 
            {" "}<span className="text-foreground font-semibold">logs de voo do Lolita Express</span>,
            {" "}<span className="text-foreground font-semibold">fotos de eventos privados</span> e 
            {" "}<span className="text-foreground font-semibold">menções a políticos brasileiros</span>.
          </p>

          {/* Email + CTA */}
          <div className="max-w-md mx-auto mb-3 space-y-3">
            <Input
              type="email"
              placeholder="Seu melhor e-mail para receber o acesso"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-center h-12"
            />
            <Button 
              size="lg"
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg px-6 md:px-10 py-6 md:py-8 shadow-glow-green animate-glow-green transition-all hover:scale-105"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <LockOpen className="w-5 h-5 mr-2" />
              )}
              {loading ? "REDIRECIONANDO..." : "DESBLOQUEAR ACESSO IMEDIATO — R$ 4,99"}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-1 mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              <span className="text-terminal">✓</span> Acesso liberado automaticamente após o PIX
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="text-terminal">✓</span> Valor simbólico para manutenção do servidor
            </p>
          </div>

          {/* Countdown */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-alert/5 border border-alert/20">
            <Clock className="w-4 h-4 text-alert" />
            <span className="text-xs md:text-sm font-mono text-alert">
              Preço promocional expira em {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
            </span>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <FileText className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-terminal" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">{pages.toLocaleString()}+</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">Páginas</div>
            </div>
            <div className="text-center border-x border-border">
              <Plane className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-alert" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">{emails.toLocaleString()}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">E-mails</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-warning" />
              <div className="text-xl md:text-2xl font-black font-mono text-foreground">{mentions}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">Menções BR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary/20 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-lg md:text-2xl font-bold text-foreground mb-3">
              Por que você <span className="text-alert">precisa</span> ver isso?
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Os documentos foram liberados em inglês jurídico. A mídia brasileira mostrou menos de 1% do conteúdo.
              Ninguém traduziu as partes que mencionam o Brasil.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border bg-card p-5 text-center">
              <Zap className="w-8 h-8 mx-auto mb-3 text-warning" />
              <h4 className="font-bold text-foreground text-sm mb-2">+5.000 Páginas em Inglês</h4>
              <p className="text-xs text-muted-foreground">Documentos jurídicos complexos que ninguém tem tempo de ler.</p>
            </Card>
            <Card className="border-border bg-card p-5 text-center">
              <Eye className="w-8 h-8 mx-auto mb-3 text-alert" />
              <h4 className="font-bold text-foreground text-sm mb-2">Mídia Censurou</h4>
              <p className="text-xs text-muted-foreground">TV e jornais mostraram recortes selecionados. O conteúdo completo é muito mais revelador.</p>
            </Card>
            <Card className="border-border bg-card p-5 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-terminal" />
              <h4 className="font-bold text-foreground text-sm mb-2">Nomes Brasileiros</h4>
              <p className="text-xs text-muted-foreground">Lula, Bolsonaro, cidades do Rio e SP aparecem em e-mails e logs de voo.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-alert" />
            <h3 className="text-lg md:text-xl font-bold text-foreground">Prévia dos Documentos</h3>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-xs text-muted-foreground mb-6">Conteúdo borrado. Pague R$ 4,99 para desbloquear a versão completa.</p>

          <div className="grid gap-4 md:gap-6">
            <TeaserCard
              title="E-mail #2901: A ligação telefônica com Lula na prisão."
              tag="CONFIDENCIAL"
              tagColor="red"
              preview="O documento revela que em março de 2015, uma chamada telefônica foi registrada entre os escritórios de..."
              date="DOC-2015-03-12 | FOIA Release"
            />
            <TeaserCard
              title="Log de Voo #84: A viagem para o Caribe e a menção a Bolsonaro."
              tag="RESTRITO"
              tagColor="yellow"
              preview="Registro de voo N908JE com destino a Saint Thomas, lista de passageiros inclui referência a contatos em..."
              date="DOC-2018-07-22 | Flight Records"
            />
            <TeaserCard
              title="Lista de Convidados: O jantar secreto no Rio de Janeiro."
              tag="VAZAMENTO"
              tagColor="orange"
              preview="Convite para evento privado na Zona Sul do Rio de Janeiro, datado de novembro de 2008. A lista menciona..."
              date="DOC-2008-11-15 | Social Records"
            />
            <TeaserCard
              title="Foto #47: Reunião em Angra dos Reis com empresário brasileiro."
              tag="CENSURADO"
              tagColor="red"
              preview="Imagem obtida de arquivos pessoais mostra encontro em iate ancorado na baía de Angra dos Reis em dezembro..."
              date="DOC-2010-12-03 | Photo Archive"
            />
            <TeaserCard
              title="Depoimento #12: Funcionária brasileira relata rotina na mansão."
              tag="TESTEMUNHO"
              tagColor="yellow"
              preview="Transcrição parcial do depoimento de Maria S., cidadã brasileira que trabalhou como empregada doméstica..."
              date="DOC-2019-08-09 | Court Testimony"
            />
          </div>

          {/* Second CTA */}
          <div className="mt-10 text-center">
            <Button 
              size="lg"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold px-8 py-6 shadow-glow-green animate-glow-green"
            >
              <LockOpen className="w-5 h-5 mr-2" />
              DESBLOQUEAR TODOS OS DOCUMENTOS — R$ 4,99
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Mais de <span className="text-foreground font-semibold">2.300 pessoas</span> já acessaram este dossiê
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary/20 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-lg md:text-2xl font-bold text-foreground text-center mb-8">
            O que você recebe por <span className="text-terminal">R$ 4,99</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: FileText, text: "Acesso aos 5.247 páginas de documentos organizados" },
              { icon: Plane, text: "Logs de voo completos do 'Lolita Express' com passageiros" },
              { icon: Users, text: "Lista traduzida de todas as menções a brasileiros" },
              { icon: Eye, text: "Fotos e imagens dos arquivos pessoais" },
              { icon: CheckCircle2, text: "Ferramenta de tradução automática dos PDFs" },
              { icon: TrendingUp, text: "Atualizações em tempo real com novos vazamentos" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                <Icon className="w-5 h-5 text-terminal flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-lg md:text-xl font-bold text-foreground text-center mb-6">
            O que dizem quem já acessou
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <TestimonialCard
              text="Finalmente consegui entender o caso sem depender da Globo. Conteúdo absurdo."
              name="Rafael M."
            />
            <TestimonialCard
              text="A tradução dos e-mails é muito boa. Dá pra ver claramente as conexões com o Brasil."
              name="Camila S."
            />
            <TestimonialCard
              text="R$ 4,99 por tudo isso? Achei que era golpe, mas o conteúdo é real e muito bem organizado."
              name="Diego L."
            />
          </div>
        </div>
      </section>

      {/* Global Wars Section */}
      <section className="py-12 md:py-16 px-4 bg-alert/5 border-y border-alert/20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-alert" />
            <h3 className="text-lg md:text-2xl font-bold text-foreground">
              Guerras & Conflitos Globais em <span className="text-alert">2026</span>
            </h3>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Epstein financiava e conectava líderes envolvidos nesses conflitos. Os documentos revelam tudo.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              {
                icon: Flame,
                country: "🇺🇸🇮🇱 EUA & Israel vs Irã",
                status: "GUERRA ATIVA",
                statusColor: "text-alert",
                casualties: "Ataques aéreos massivos desde 28/Fev",
                desc: "EUA e Israel lançaram bombardeios contra o Irã em fevereiro de 2026. Irã retaliou com mísseis contra bases americanas no Golfo. Conflito em escalada.",
              },
              {
                icon: Skull,
                country: "🇮🇷 Irã — Retaliação Regional",
                status: "ESCALADA CRÍTICA",
                statusColor: "text-alert",
                casualties: "Mísseis contra Qatar, UAE, Kuwait",
                desc: "Irã respondeu com ataques de mísseis e drones contra instalações americanas no Golfo Pérsico. Explosões em vários países.",
              },
              {
                icon: Crosshair,
                country: "🇰🇼 Kuwait — Estado de Alerta",
                status: "ALERTA MÁXIMO",
                statusColor: "text-warning",
                casualties: "178 mísseis e 384 drones interceptados",
                desc: "Forças kuwaitianas interceptaram centenas de projéteis iranianos. Incidente de fogo amigo derrubou jatos americanos. País em alerta máximo.",
              },
              {
                icon: Globe,
                country: "🇫🇷 França — Expansão Nuclear",
                status: "CORRIDA NUCLEAR",
                statusColor: "text-warning",
                casualties: "Aumento do arsenal atômico anunciado",
                desc: "Macron declarou: 'Quem quer ser livre tem que ser temido.' França anuncia maior expansão nuclear europeia desde a Guerra Fria.",
              },
              {
                icon: Crosshair,
                country: "🇺🇦 Ucrânia vs Rússia",
                status: "GUERRA ATIVA",
                statusColor: "text-alert",
                casualties: "~77.900 baixas (12 meses)",
                desc: "Conflito de larga escala desde 2022. Documentos Epstein revelam conexões com oligarcas russos e ucranianos que financiavam a rede.",
              },
              {
                icon: Flame,
                country: "🇸🇩 Sudão — Guerra Civil",
                status: "CRISE HUMANITÁRIA",
                statusColor: "text-warning",
                casualties: "~19.600 baixas (12 meses)",
                desc: "RSF vs Exército Sudanês. Milhões de deslocados. Nomes ligados ao tráfico de armas aparecem em e-mails do dossiê.",
              },
              {
                icon: Skull,
                country: "🇵🇸 Palestina — Gaza",
                status: "CESSAR-FOGO FRÁGIL",
                statusColor: "text-warning",
                casualties: "~18.300 baixas (12 meses)",
                desc: "Ofensiva israelense iniciada em 2023. Documentos revelam reuniões de Epstein com líderes de ambos os lados.",
              },
              {
                icon: Crosshair,
                country: "🇲🇲 Myanmar — Guerra Civil",
                status: "GUERRA ATIVA",
                statusColor: "text-alert",
                casualties: "~15.100 baixas (12 meses)",
                desc: "Resistência popular contra junta militar desde 2021. Rede de Epstein ligada a tráfico humano na região.",
              },
              {
                icon: Flame,
                country: "🇳🇬 Nigéria — Insurgência",
                status: "TERRORISMO ATIVO",
                statusColor: "text-alert",
                casualties: "~11.900 baixas (12 meses)",
                desc: "Boko Haram e ISWAP continuam ataques. Fluxos financeiros ilícitos conectados à rede de influência documentada.",
              },
              {
                icon: Crosshair,
                country: "🇨🇩 RD Congo — Conflito Armado",
                status: "GUERRA ATIVA",
                statusColor: "text-alert",
                casualties: "Milhares de vítimas",
                desc: "M23 e grupos armados disputam minerais raros. Empresários do dossiê tinham interesses em cobalto e coltan.",
              },
              {
                icon: Flame,
                country: "🇻🇪 Venezuela — Operação EUA",
                status: "INSTABILIDADE",
                statusColor: "text-warning",
                casualties: "Maduro capturado por forças americanas",
                desc: "Operação militar dos EUA em 2026 capturou Nicolás Maduro. País em caos político. Conexões com rede de lavagem de dinheiro documentadas.",
              },
            ].map(({ icon: Icon, country, status, statusColor, casualties, desc }, i) => (
              <Card key={i} className="border-border bg-card p-4 md:p-5 hover:border-alert/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-alert/10 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 text-alert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-foreground text-sm">{country}</h4>
                      <span className={`text-[10px] font-mono font-bold ${statusColor} shrink-0`}>{status}</span>
                    </div>
                    <p className="text-[11px] text-terminal font-mono mb-1">{casualties}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Os documentos de Epstein revelam <span className="text-foreground font-semibold">conexões ocultas</span> entre sua rede e 
              financiadores de conflitos armados em todo o mundo. <span className="text-alert font-semibold">Nomes, datas e valores</span> estão nos arquivos.
            </p>
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-alert hover:bg-alert/90 text-white font-bold px-8 py-6"
            >
              <Eye className="w-5 h-5 mr-2" />
              VER CONEXÕES COM GUERRAS — R$ 4,99
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 px-4 bg-alert/10 border-y border-alert/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-alert">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">
                Documentos podem ser removidos a qualquer momento por ordem judicial
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Garanta seu acesso agora. Uma vez desbloqueado, o conteúdo fica disponível para sempre.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Não fique por fora.
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            A verdade está a um clique de distância. Faça como mais de 2.300 brasileiros e acesse o dossiê completo.
          </p>
          <Button 
            size="lg"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg px-8 py-7 shadow-glow-green animate-glow-green transition-all hover:scale-105 w-full md:w-auto"
          >
            <LockOpen className="w-5 h-5 mr-2" />
            LIBERAR ACESSO COMPLETO — R$ 4,99
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Arquivos Epstein Brasil. Todos os documentos são de domínio público obtidos via FOIA.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
