import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft, Lock, LockOpen, FileText, Plane, Users, Eye, Loader2, Shield,
} from "lucide-react";

const PREVIEW = [
  {
    tag: "AMOSTRA GRÁTIS",
    title: "E-mail #2901 — Comunicação entre escritório de Epstein e contatos no Brasil (2015)",
    excerpt:
      "O e-mail, obtido via FOIA, faz referência a uma agenda de reuniões em São Paulo e menciona intermediários brasileiros. Um dos anexos cita a expressão 'contatos SP–NY'.",
    date: "12/03/2015",
  },
  {
    tag: "AMOSTRA GRÁTIS",
    title: "Log de voo — N908JE saindo de Teterboro em julho de 2018",
    excerpt:
      "O manifesto do jato conhecido como Lolita Express registra passageiros a bordo em rota para Saint Thomas. Um dos nomes aparece em documentos de imigração brasileira.",
    date: "22/07/2018",
  },
  {
    tag: "AMOSTRA GRÁTIS",
    title: "Depoimento #12 — Ex-funcionária brasileira descreve rotina na mansão",
    excerpt:
      "Trecho parcial e público: 'Éramos orientadas a nunca falar sobre as visitas noturnas. Alguns dos convidados falavam português entre si.'",
    date: "09/08/2019",
  },
];

const LOCKED = [
  { title: "Lista completa de passageiros do 'Lolita Express' com passagens pelo Brasil", pages: 47 },
  { title: "Correspondência integral entre Epstein e o intermediário brasileiro identificado como 'A.C.'", pages: 112 },
  { title: "Registros bancários — transferências entre offshores nas Bahamas e contas no Rio de Janeiro", pages: 88 },
  { title: "Fotos digitalizadas do evento privado em Angra dos Reis (dez/2010)", pages: 23 },
  { title: "Depoimentos completos das testemunhas brasileiras (transcrições traduzidas)", pages: 156 },
  { title: "Cronologia oficial das visitas de Epstein ao Brasil (1998–2018)", pages: 34 },
];

export default function Epstein() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Digite um e-mail válido para receber o acesso.");
      return;
    }
    if (isDev) {
      sessionStorage.setItem("epstein_paid_email", email);
      navigate(`/obrigado?external_reference=${encodeURIComponent(email)}&collection_status=approved`);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-preference", { body: { email } });
      if (error) throw error;
      if (data?.init_point) window.location.href = data.init_point;
      else throw new Error("Não foi possível gerar o link de pagamento.");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!email || !email.includes("@")) return;
    const channel = supabase
      .channel(`payments-eps-${email}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "payments", filter: `email=eq.${email}`,
      }, (payload) => {
        const status = (payload.new as { status?: string } | null)?.status;
        if (status === "approved") {
          sessionStorage.setItem("epstein_paid_email", email);
          navigate(`/obrigado?external_reference=${encodeURIComponent(email)}&collection_status=approved`);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-between max-w-5xl">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para TV Oculta
          </Link>
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-foreground">
            <Shield className="w-4 h-4 text-terminal" />
            CASO ESPECIAL
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert/10 border border-alert/30 mb-5">
            <span className="w-2 h-2 bg-alert rounded-full animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono text-alert uppercase tracking-wider">
              Dossiê Epstein Brasil — arquivo público FOIA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
            As conexões de <span className="text-alert">Epstein</span> com o Brasil.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-foreground font-semibold">5.247 páginas</span> de documentos judiciais traduzidos e organizados.
            Amostra abaixo aberta. Conteúdo completo destravado com o acesso TV Oculta.
          </p>
        </div>
      </section>

      {/* Preview aberto */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-5 h-5 text-terminal" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">Amostra grátis · 3 documentos abertos</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid gap-4 md:gap-5">
            {PREVIEW.map((d, i) => (
              <Card key={i} className="border-border bg-card p-5 hover:border-terminal/40 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-terminal/15 text-terminal font-bold uppercase tracking-wider">
                    {d.tag}
                  </span>
                  <span className="text-muted-foreground">{d.date}</span>
                </div>
                <h3 className="font-bold text-foreground text-base md:text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.excerpt}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo bloqueado */}
      <section className="py-10 md:py-14 px-4 bg-secondary/20 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-alert" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">Conteúdo completo (trancado)</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Desbloqueio único de R$ 2,49 libera todo o dossiê e a Top 40 de notícias mundiais.
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {LOCKED.map((d, i) => (
              <div key={i} className="relative flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <div className="p-2 rounded-lg bg-alert/10 shrink-0">
                  <FileText className="w-4 h-4 text-alert" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground blur-sm select-none">{d.title}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">{d.pages} páginas · PDF traduzido</p>
                </div>
                <Lock className="w-4 h-4 text-terminal shrink-0" />
              </div>
            ))}
          </div>

          <Card className="border-terminal/30 bg-card p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-black text-foreground text-center mb-2">
              Desbloquear dossiê Epstein Brasil
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Pagamento único de <span className="text-terminal font-bold">R$ 2,49</span> · Acesso liberado no ato via PIX
            </p>
            <div className="max-w-md mx-auto space-y-3">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border text-foreground text-center h-12"
              />
              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base py-6 shadow-glow-green"
              >
                {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <LockOpen className="w-5 h-5 mr-2" />}
                {loading ? "REDIRECIONANDO..." : "DESBLOQUEAR AGORA — R$ 2,49"}
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div>
                <FileText className="w-5 h-5 mx-auto mb-1 text-terminal" />
                <p className="text-[10px] text-muted-foreground">5.247 páginas</p>
              </div>
              <div className="border-x border-border">
                <Plane className="w-5 h-5 mx-auto mb-1 text-alert" />
                <p className="text-[10px] text-muted-foreground">847 e-mails</p>
              </div>
              <div>
                <Users className="w-5 h-5 mx-auto mb-1 text-warning" />
                <p className="text-[10px] text-muted-foreground">23 menções BR</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 TV Oculta — Documentos de domínio público obtidos via FOIA.
          </p>
        </div>
      </footer>
    </div>
  );
}