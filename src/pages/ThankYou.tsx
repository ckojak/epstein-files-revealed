import { CheckCircle2, Mail, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-lg w-full border-terminal/30 bg-card p-8 md:p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-terminal mx-auto mb-6" />
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Tudo certo! ✅
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Seu pagamento foi processado com sucesso.
          </p>

          <div className="bg-terminal/10 border border-terminal/30 rounded-lg p-6 mb-6">
            <Mail className="w-8 h-8 text-terminal mx-auto mb-3" />
            <p className="text-foreground font-semibold text-base md:text-lg mb-2">
              Verifique seu e-mail agora!
            </p>
            <p className="text-sm text-muted-foreground">
              O link de acesso ao Dossiê Secreto já foi enviado para o seu e-mail. 
              Confira também a pasta de spam.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Guarde o e-mail recebido — ele é seu acesso permanente ao dossiê.
          </p>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Arquivos Epstein Brasil. Todos os documentos são de domínio público obtidos via FOIA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
