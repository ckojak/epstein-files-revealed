import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, Shield, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing - replace with Stripe integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    // After successful payment, redirect to dashboard
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Link>
        
        {/* Checkout card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          {/* Header */}
          <div className="bg-secondary p-6 text-center border-b border-border">
            <div className="w-16 h-16 mx-auto bg-alert/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-alert" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Liberar Acesso Completo</h1>
            <p className="text-muted-foreground text-sm">
              Arquivos do Caso Epstein - Conexões Brasil
            </p>
          </div>
          
          {/* Price section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-muted-foreground">R$</span>
              <span className="text-5xl font-black text-foreground">1,99</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Taxa única de manutenção
            </p>
          </div>
          
          {/* What's included */}
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold mb-4">O que está incluído:</h3>
            <div className="space-y-3">
              {[
                "Acesso a todos os 5.000+ documentos",
                "E-mails traduzidos e organizados",
                "Galeria de fotos completa",
                "Áudios transcritos em português",
                "Menções ao Brasil destacadas",
                "Atualizações quando novos docs são liberados",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment button */}
          <div className="p-6">
            <Button
              variant="cta"
              size="xl"
              className="w-full"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar R$ 1,99
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              Este valor simbólico serve apenas para manter os servidores do site online
              e garantir que a verdade continue no ar.
            </p>
          </div>
          
          {/* Security badge */}
          <div className="bg-secondary p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Pagamento 100% seguro via Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}