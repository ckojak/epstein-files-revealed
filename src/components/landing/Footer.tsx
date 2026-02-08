import { Shield, Lock, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-alert" />
            <span className="text-lg font-bold">Arquivos Epstein Brasil</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Documentos Públicos</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              Todos os documentos apresentados são de domínio público, obtidos através de
              processos judiciais, solicitações FOIA e vazamentos confirmados.
            </p>
            <p>
              Este site não faz acusações. Apenas organiza e disponibiliza informações
              já publicadas oficialmente.
            </p>
            <p className="text-xs mt-4">
              © {new Date().getFullYear()} • Jornalismo Cidadão • Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}