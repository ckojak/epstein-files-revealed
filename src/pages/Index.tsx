import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  LockOpen, Eye, MessageCircle, Clock, Lock, Star, Loader2, QrCode, CheckCheck,
  Radio, ExternalLink, Instagram, ArrowRight, Newspaper, Globe, ShieldAlert, Users, Gavel,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTopNews, formatViews, formatDateBR, type TopNewsItem } from "@/hooks/useTopNews";

// --- Small UI helpers -------------------------------------------------------

const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);
  useEffect(() => {
    const h = new Date().getHours();
    setVisitors(h >= 8 && h <= 23 ? 127 + Math.floor(Math.random() * 89) : 42 + Math.floor(Math.random() * 35));
    const i = setInterval(() => {
      setVisitors((p) => Math.max(30, p + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -(Math.floor(Math.random() * 2)))));
    }, 4000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terminal/10 border border-terminal/30">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal" />
      </span>
      <span className="text-[11px] md:text-xs font-mono text-terminal font-bold">
        {visitors} lendo agora
      </span>
    </div>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5521979934676?text=Oi TV Oculta! Tenho dúvidas sobre o acesso."
    target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline text-sm font-medium">Dúvidas?</span>
  </a>
);

// --- Free hero card (open, clickable) --------------------------------------

const OpenNewsCard = ({ item }: { item: TopNewsItem }) => (
  <a
    href={item.url}
    target="_blank" rel="noopener noreferrer"
    className="group block h-full"
  >
    <Card className="border-border bg-card p-4 md:p-5 h-full flex flex-col gap-3 hover:border-terminal/50 transition-all">
      <div className="flex items-center justify-between text-[10px] font-mono">
        <span className="px-2 py-0.5 rounded bg-terminal/15 text-terminal font-bold uppercase tracking-wider">
          {item.source}
        </span>
        <span className="text-muted-foreground">{formatDateBR(item.publishedAt)}</span>
      </div>
      <h3 className="font-bold text-foreground text-sm md:text-base leading-snug group-hover:text-terminal transition-colors">
        {item.title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{item.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <Eye className="w-3 h-3" /> {formatViews(item.views)}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-terminal group-hover:translate-x-0.5 transition-transform">
          matéria original <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </Card>
  </a>
);

// --- Locked teaser card (Top 40) -------------------------------------------

const LockedNewsCard = ({ item, onUnlock }: { item: TopNewsItem; onUnlock: () => void }) => (
  <Card
    onClick={onUnlock}
    className="border-border bg-card p-4 flex flex-col gap-2.5 cursor-pointer hover:border-alert/40 transition-all group"
  >
    <div className="flex items-center justify-between text-[10px] font-mono">
      <span className="px-2 py-0.5 rounded bg-alert/10 text-alert font-bold uppercase tracking-wider truncate max-w-[60%]">
        {item.source}
      </span>
      <span className="text-muted-foreground">{formatDateBR(item.publishedAt)}</span>
    </div>
    <h3 className="font-bold text-foreground text-sm leading-snug">{item.title}</h3>
    <div className="relative">
      <p className="text-xs text-muted-foreground leading-relaxed blur-sm select-none pointer-events-none line-clamp-3">
        {item.description}
      </p>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-terminal bg-background/90 border border-terminal/40 px-2 py-1 rounded">
          <Lock className="w-3 h-3" />
          R$ 2,49 para ler
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-border">
      <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
        <Eye className="w-3 h-3" /> {formatViews(item.views)}
      </span>
      <span className="text-[9px] font-mono text-alert/70 uppercase">Exclusivo assinante</span>
    </div>
  </Card>
);

// --- Testimonial -----------------------------------------------------------

const TestimonialCard = ({ text, name }: { text: string; name: string }) => (
  <Card className="border-border bg-card p-4">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-warning text-warning" />)}
    </div>
    <p className="text-sm text-muted-foreground italic mb-2">"{text}"</p>
    <p className="text-xs text-foreground font-mono">— {name}</p>
  </Card>
);

// --- Page ------------------------------------------------------------------

const Index = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPixQR, setShowPixQR] = useState(false);
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;
  const { data: news, isLoading: newsLoading } = useTopNews();

  const items = news?.items ?? [];
  const openPreview = items.slice(0, 3);
  const topGrid = items.slice(3, 43); // até 40 no grid

  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Digite um e-mail válido para receber o acesso.");
      return;
    }
    if (isDev) { setShowPixQR(true); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-preference", { body: { email } });
      if (error) throw error;
      if (data?.init_point) window.location.href = data.init_point;
      else throw new Error("Não foi possível gerar o link de pagamento.");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Erro ao processar. Tente novamente.");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!email || !email.includes("@")) return;
    const channel = supabase.channel(`payments-${email}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "payments", filter: `email=eq.${email}` },
      (payload) => {
        const status = (payload.new as { status?: string } | null)?.status;
        if (status === "approved") {
          sessionStorage.setItem("epstein_paid_email", email);
          toast.success("Pagamento aprovado! Redirecionando...");
          navigate(`/obrigado?external_reference=${encodeURIComponent(email)}&collection_status=approved`);
        }
      },
    ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [email, navigate]);

  const simulateApproval = () => {
    const fakeEmail = email && email.includes("@") ? email : "teste@dev.local";
    sessionStorage.setItem("epstein_paid_email", fakeEmail);
    toast.success("[DEV] Pagamento simulado aprovado.");
    navigate(`/obrigado?external_reference=${encodeURIComponent(fakeEmail)}&collection_status=approved`);
  };

  const updatedLabel = news?.updatedAt
    ? `Atualizado ${formatDateBR(news.updatedAt)}`
    : "Atualizando…";

  return (
    <div className="min-h-screen bg-background">
      {/* Header TV Oculta */}
      <header className="border-b border-border py-3 px-4 sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-terminal flex items-center justify-center">
              <Radio className="w-4 h-4 text-terminal-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-sm md:text-base font-black text-foreground tracking-tight">TV OCULTA</div>
              <div className="text-[9px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Notícias Exclusivas Mundiais
              </div>
            </div>
          </div>
          <a
            href="https://instagram.com/tvoculta.reserva"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-terminal transition-colors"
          >
            <Instagram className="w-4 h-4" /> @tvoculta.reserva
          </a>
        </div>
      </header>

      {/* Caso Especial: Banco Master (topo) */}
      <section className="py-8 md:py-10 px-4 bg-alert/10 border-b border-alert/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-alert" />
            <span className="text-[10px] md:text-xs font-mono font-bold text-alert uppercase tracking-widest">
              Assunto do momento · Dossiê completo
            </span>
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-foreground mb-2 tracking-tight">
                Caso Banco Master: o dossiê completo, direto do STF
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Os 53 processos que o STF liberou o sigilo, a prisão de Daniel Vorcaro e o julgamento desta semana — tudo organizado, com fonte, sem juridiquês.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1"><Gavel className="w-3.5 h-3.5 text-terminal" /> 53 processos liberados</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-terminal" /> Fontes: STF + imprensa</span>
              </div>
            </div>
            <Link to="/banco-master" className="block shrink-0">
              <Button size="lg" className="bg-alert hover:bg-alert/90 text-white font-bold px-6 py-6 w-full md:w-auto">
                Ver dossiê Banco Master <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AO VIVO bar */}
      <div className="bg-alert/5 border-b border-alert/20 py-2 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-alert" />
            </span>
            <span className="text-[10px] md:text-xs font-mono text-alert uppercase tracking-widest font-bold">
              AO VIVO
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-mono text-muted-foreground truncate">
            {updatedLabel} · {items.length} matérias das últimas horas
          </span>
        </div>
      </div>

      {/* Hero + preview aberto */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <LiveVisitorCounter />
            <h1 className="text-3xl md:text-5xl font-black leading-[1.05] mt-4 mb-4 text-foreground tracking-tight">
              As notícias que a mídia<br className="hidden md:block" />{" "}
              <span className="text-alert">não te mostra</span>.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Curadoria diária da <span className="text-foreground font-semibold">TV Oculta</span> com as manchetes mais importantes do Brasil e do mundo.
              Amostra abaixo aberta. As <span className="text-terminal font-bold">40 exclusivas do mês</span> ficam trancadas até o desbloqueio.
            </p>
          </div>

          {newsLoading ? (
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {[0,1,2].map((i) => (
                <Card key={i} className="border-border bg-card p-5 h-40 animate-pulse" />
              ))}
            </div>
          ) : openPreview.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {openPreview.map((it, i) => <OpenNewsCard key={i} item={it} />)}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Carregando manchetes…</p>
          )}
        </div>
      </section>

      {/* Prova social */}
      <section className="py-6 px-4 border-y border-border bg-secondary/20">
        <div className="container mx-auto max-w-5xl grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg md:text-2xl font-black font-mono text-foreground">106 mil</div>
            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Seguidores no Instagram</div>
          </div>
          <div className="border-x border-border">
            <div className="text-lg md:text-2xl font-black font-mono text-foreground">5,9 mi</div>
            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Views em 30 dias</div>
          </div>
          <div>
            <div className="text-lg md:text-2xl font-black font-mono text-terminal">Diário</div>
            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Atualização de manchetes</div>
          </div>
        </div>
      </section>

      {/* CTA principal */}
      <section id="checkout" className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terminal/10 border border-terminal/30 mb-4">
            <LockOpen className="w-3.5 h-3.5 text-terminal" />
            <span className="text-[10px] md:text-xs font-mono text-terminal uppercase tracking-widest font-bold">
              Acesso vitalício · R$ 2,49
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 tracking-tight">
            Desbloqueie as <span className="text-terminal">40 exclusivas</span> do mês.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            O mesmo material que abastece o canal <span className="text-foreground font-semibold">@tvoculta.reserva</span> no Instagram — organizado, pesquisável e com link direto para cada fonte.
          </p>

          <div className="max-w-md mx-auto space-y-3">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-center h-12"
            />
            <Button
              size="lg" onClick={handleCheckout} disabled={loading}
              className="w-full bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg py-6 shadow-glow-green animate-glow-green transition-all hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <LockOpen className="w-5 h-5 mr-2" />}
              {loading ? "REDIRECIONANDO..." : "DESBLOQUEAR TOP 40 — R$ 2,49"}
            </Button>
          </div>
          {isDev && (
            <button
              type="button" onClick={simulateApproval}
              className="mt-3 text-[10px] font-mono text-muted-foreground/60 hover:text-terminal underline underline-offset-2 transition-colors"
            >
              [DEV] Simular Aprovação de PIX
            </button>
          )}
          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-xs text-muted-foreground">
              <span className="text-terminal">✓</span> Liberação automática após o PIX
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="text-terminal">✓</span> Pagamento único, sem assinatura recorrente
            </p>
          </div>
        </div>
      </section>

      {/* Top 40 grid — bloqueado */}
      <section className="py-12 md:py-16 px-4 bg-secondary/20 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-5 h-5 text-alert" />
            <h2 className="text-lg md:text-2xl font-bold text-foreground">
              Top 40 · Notícias mundiais do mês
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Manchetes visíveis. Descrição, fontes e link direto liberados após o desbloqueio.
          </p>

          {newsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="border-border bg-card p-4 h-44 animate-pulse" />
              ))}
            </div>
          ) : topGrid.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topGrid.map((it, i) => (
                <LockedNewsCard key={i} item={it} onUnlock={scrollToCheckout} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Sem manchetes agora — voltamos em minutos.</p>
          )}

          <div className="mt-8 text-center">
            <Button
              size="lg" onClick={scrollToCheckout}
              className="bg-alert hover:bg-alert/90 text-white font-bold px-8 py-6"
            >
              <LockOpen className="w-5 h-5 mr-2" />
              DESBLOQUEAR TUDO — R$ 2,49
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-lg md:text-xl font-bold text-foreground text-center mb-6">
            O que dizem os assinantes
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <TestimonialCard
              text="Sigo a TV Oculta no Insta há meses. Ter tudo organizado no site com link pra cada fonte é outro nível."
              name="Rafael M."
            />
            <TestimonialCard
              text="Melhor R$ 2,49 que gastei. Notícias de fora que a TV brasileira nunca cobre."
              name="Camila S."
            />
            <TestimonialCard
              text="O dossiê Epstein sozinho já valeu o preço. E ainda ganhei as 40 do mês."
              name="Diego L."
            />
          </div>
        </div>
      </section>

      {/* Caso Especial: Epstein (bottom da home) */}
      <section className="py-12 md:py-16 px-4 bg-alert/5 border-y border-alert/20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-alert" />
            <span className="text-[10px] md:text-xs font-mono font-bold text-alert uppercase tracking-widest">
              Caso especial · Bônus incluso
            </span>
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-foreground mb-2 tracking-tight">
                Dossiê Epstein Brasil — 5.247 páginas traduzidas
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Documentos judiciais em inglês, organizados em português, com as menções ao Brasil destacadas.
                Vem junto com o acesso à Top 40.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-terminal" /> 23 menções BR</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-terminal" /> Logs de voo completos</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-terminal" /> Amostra grátis aberta</span>
              </div>
            </div>
            <Link to="/epstein" className="block shrink-0">
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background font-bold px-6 py-6 w-full md:w-auto"
              >
                Ver dossiê Epstein <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert/10 border border-alert/20 mb-4">
            <Clock className="w-3.5 h-3.5 text-alert" />
            <span className="text-[10px] font-mono text-alert uppercase tracking-widest">
              Preço promocional
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Um único PIX. Acesso vitalício.
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Junte-se a mais de <span className="text-foreground font-semibold">106 mil</span> pessoas que já acompanham a TV Oculta.
          </p>
          <Button
            size="lg" onClick={scrollToCheckout}
            className="bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg px-8 py-7 shadow-glow-green animate-glow-green w-full md:w-auto"
          >
            <LockOpen className="w-5 h-5 mr-2" />
            LIBERAR ACESSO — R$ 2,49
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
            <a href="https://instagram.com/tvoculta.reserva" target="_blank" rel="noopener noreferrer" className="hover:text-terminal transition-colors flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
            <span>·</span>
            <a href="https://www.threads.net/@tvoculta" target="_blank" rel="noopener noreferrer" className="hover:text-terminal transition-colors">Threads</a>
            <span>·</span>
            <Link to="/epstein" className="hover:text-terminal transition-colors">Dossiê Epstein</Link>
            <span>·</span>
            <Link to="/banco-master" className="hover:text-terminal transition-colors">Dossiê Banco Master</Link>
          </div>
          <p className="text-[10px] text-muted-foreground">
            © 2026 TV Oculta — Notícias Exclusivas Mundiais. Manchetes agregadas dos portais oficiais com link para a fonte original.
          </p>
        </div>
      </footer>

      <WhatsAppButton />

      {/* DEV: Simulated PIX QR modal */}
      <Dialog open={showPixQR} onOpenChange={setShowPixQR}>
        <DialogContent className="bg-card border-terminal/40">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-terminal font-mono">
              <QrCode className="w-5 h-5" />
              PIX — Modo Simulação
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Ambiente de desenvolvimento. Nenhuma cobrança real será efetuada.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-56 h-56 bg-foreground/95 rounded-md flex items-center justify-center p-3">
              <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-[2px]" aria-label="QR Code simulado">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className={(i * 37) % 7 < 3 ? "bg-background" : "bg-foreground"} />
                ))}
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-mono text-foreground">R$ 2,49</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
            <Button
              onClick={() => { setShowPixQR(false); simulateApproval(); }}
              className="w-full bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold"
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Simular Pagamento Aprovado
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;