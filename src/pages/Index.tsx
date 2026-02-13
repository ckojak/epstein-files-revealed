import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  LockOpen, Shield, Eye, AlertTriangle, FileText, Plane, Users, 
  MessageCircle, Clock, TrendingUp, CheckCircle2, Lock, Zap, Star, Loader2, Copy
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Initialize MercadoPago with public key
initMercadoPago("APP_USR-4b97a6cb-419b-4ddd-8b6d-1471bfffa8f2", {
  locale: "pt-BR",
});

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

const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
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

const TeaserCard = ({ title, tag, tagColor, preview, date }: any) => {
  const tagStyles: any = {
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
      <h3 className="font-mono text-sm md:text-base font-bold text-foreground pr-20 mb-3">{title}</h3>
      <div className="space-y-2">
        <div className="blur-content text-muted-foreground text-sm">{preview}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
      <div className="absolute bottom-3 left-4 flex items-center gap-1 text-terminal text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        <Lock className="w-3 h-3" /> Desbloquear para ler
      </div>
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
  const navigate = useNavigate();
  const pages = useAnimatedNumber(5247);
  const emails = useAnimatedNumber(847);
  const mentions = useAnimatedNumber(23);
  const [email, setEmail] = useState("");
  const [showPaymentBrick, setShowPaymentBrick] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // ESTADO NOVO: Guarda o PIX gerado para mostrar na tela
  const [pixData, setPixData] = useState<{ qrCodeBase64: string; qrCode: string } | null>(null);

  const handleStartCheckout = () => {
    if (!email || !email.includes("@")) {
      toast.error("Digite um e-mail válido para receber o acesso.");
      return;
    }
    setShowPaymentBrick(true);
    setTimeout(() => {
      document.getElementById("payment-brick-container")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handlePaymentSubmit = useCallback(
    async ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: string; formData: any }) => {
      setProcessingPayment(true);
      try {
        const { data, error } = await supabase.functions.invoke("process-payment", {
          body: { formData, email },
        });

        if (error) throw error;

        if (data.status === "approved") {
          toast.success("Pagamento aprovado! Redirecionando...");
          navigate("/obrigado");
        } else if (data.status === "pending" || data.status === "in_process") {
          // SE FOR PIX, PEGA OS DADOS E MOSTRA A NOSSA TELA CUSTOMIZADA
          if (data.point_of_interaction?.transaction_data) {
            setPixData({
              qrCodeBase64: data.point_of_interaction.transaction_data.qr_code_base64,
              qrCode: data.point_of_interaction.transaction_data.qr_code,
            });
            toast.success("PIX gerado com sucesso!");
          } else {
            toast.info("Pagamento pendente. Aguardando confirmação.");
          }
        } else {
          toast.error(`Pagamento não aprovado. Tente novamente.`);
        }
      } catch (err: any) {
        console.error("Payment error:", err);
        toast.error("Erro ao processar pagamento. Tente novamente.");
      } finally {
        setProcessingPayment(false);
      }
    },
    [email, navigate]
  );

  const handlePaymentError = useCallback((error: any) => {
    console.error("Payment Brick error:", error);
  }, []);

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

  const initialization = useMemo(() => ({ amount: 1.99, payer: { email: email } }), [email]);
  const customization = useMemo(() => ({
    paymentMethods: { bankTransfer: "all", creditCard: "all", debitCard: "all", mercadoPago: "all" },
    visual: { style: { theme: "dark" as const } },
  }), []);

  const copyPixCode = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast.success("Código PIX copiado!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-alert/10 border-b border-alert/30 py-2 px-4 animate-pulse-slow">
        <div className="container mx-auto text-center">
          <span className="text-xs md:text-sm font-mono text-alert">
            🔴 URGENTE: Novos documentos liberados pela Suprema Corte dos EUA em Janeiro/2026
          </span>
        </div>
      </div>

      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-terminal" />
            <span>ARQUIVOS JEFFREY EPSTEIN BRASIL</span>
            <span className="text-2xl">🇧🇷</span>
          </h1>
        </div>
      </header>

      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <LiveVisitorCounter />

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 text-foreground mt-6">
            O que a mídia <span className="text-alert">não mostrou</span> sobre as conexões de Epstein com o Brasil.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            São <span className="text-foreground font-semibold">5.247 páginas</span> de documentos judiciais traduzidos.
            Acesse e-mails reais, logs de voo e menções a políticos brasileiros.
          </p>

          <div id="payment-brick-container" className="max-w-lg mx-auto mb-3">
            {!showPaymentBrick && !pixData ? (
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail para receber o acesso"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground text-center h-12"
                />
                <Button 
                  size="lg"
                  onClick={handleStartCheckout}
                  className="w-full bg-terminal hover:bg-terminal/90 text-terminal-foreground font-bold text-base md:text-lg px-6 md:px-10 py-6 md:py-8 shadow-glow-green animate-glow-green transition-all hover:scale-105"
                >
                  <LockOpen className="w-5 h-5 mr-2" />
                  DESBLOQUEAR ACESSO IMEDIATO — R$ 1,99
                </Button>
              </div>
            ) : pixData ? (
              // 🔥 NOSSA TELA EXCLUSIVA DE PIX 🔥
              <Card className="border-terminal/50 bg-card p-6 md:p-8 text-center animate-in zoom-in duration-300 shadow-2xl shadow-terminal/10">
                <div className="inline-flex items-center justify-center p-3 bg-terminal/10 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-terminal" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Pague com PIX</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Escaneie o QR Code abaixo ou copie o código para liberar seu acesso imediatamente.
                </p>
                
                <div className="bg-white p-2 rounded-xl inline-block mb-6">
                  <img 
                    src={`data:image/png;base64,${pixData.qrCodeBase64}`} 
                    alt="QR Code PIX" 
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                </div>

                <div className="bg-background border border-border rounded-lg p-2 flex items-center gap-2 mb-6 text-left">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-mono text-muted-foreground truncate px-2">{pixData.qrCode}</p>
                  </div>
                  <Button onClick={copyPixCode} className="bg-terminal text-black hover:bg-terminal/80 shrink-0">
                    <Copy className="w-4 h-4 mr-2" /> Copiar Copia e Cola
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg">
                  <Loader2 className="w-5 h-5 text-terminal animate-spin mb-1" />
                  <p>Aguardando o seu pagamento...</p>
                  <p className="text-xs">Assim que você pagar, o acesso será enviado <strong className="text-foreground">imediatamente</strong> para <strong className="text-terminal">{email}</strong>.</p>
                </div>
              </Card>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="text-left mb-4 p-3 rounded-lg bg-terminal/10 border border-terminal/30">
                  <p className="text-sm text-terminal font-mono">
                    ✓ E-mail: <span className="text-foreground">{email}</span>
                  </p>
                  <button onClick={() => setShowPaymentBrick(false)} className="text-xs text-muted-foreground underline mt-1 hover:text-foreground">
                    Alterar e-mail
                  </button>
                </div>
                {processingPayment && (
                  <div className="flex items-center justify-center gap-2 py-4 text-terminal">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-mono">Gerando código seguro...</span>
                  </div>
                )}
                <div className={processingPayment ? "opacity-50 pointer-events-none" : ""}>
                  <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={handlePaymentSubmit}
                    onError={handlePaymentError}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-alert/5 border border-alert/20 mt-4">
            <Clock className="w-4 h-4 text-alert" />
            <span className="text-xs md:text-sm font-mono text-alert">
              Preço promocional expira em {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
            </span>
          </div>

        </div>
      </section>

      {/* Footer minimalista para economizar espaço */}
      <footer className="py-8 px-4 border-t border-border mt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Arquivos Epstein Brasil. Documentos públicos FOIA.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
