import { CheckCircle2, Mail, Shield, AlertCircle, ArrowRight, Database, Search, FileText, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  // Links extraídos do seu PDF "Epostein arquivos.pdf"
  const links = {
    traduzido: "https://epstein-arquivos.vercel.app/dossie-secreto-brasil-liberado",
    drive: "https://drive.google.com/drive/folders/1eCcQ1Ov-H5NKgTkUGeu_CWeVwIC4B4Qt",
    jmail: "https://jmail.world/",
    epsteinfta: "https://epsteinfta.com/",
    jefftube: "https://www.jefftube.net/"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-border py-4 px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="tracking-tight">ARQUIVOS CONFIDENCIAIS</span>
            <span className="text-xl">🇧🇷</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <Card className="max-w-2xl w-full border-green-500/20 bg-card p-6 md:p-8 shadow-2xl shadow-green-900/10 animate-in fade-in zoom-in duration-500">
          
          {/* Status de Sucesso */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              Acesso Liberado!
            </h2>
            <p className="text-muted-foreground">
              Seu pagamento foi confirmado. Todo o material está listado abaixo.
            </p>
          </div>

          {/* ÁREA DE ACESSO AOS LINKS (Conteúdo do PDF) */}
          <div className="space-y-6">
            
            {/* 1. O Principal (Traduzido) */}
            <div className="bg-green-500/5 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">Dossiê Traduzido (PT-BR)</h3>
                  <p className="text-sm text-muted-foreground">Versão organizada e facilitada para leitura.</p>
                </div>
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-lg shadow-lg"
                onClick={() => window.open(links.traduzido, '_blank')}
              >
                ACESSAR DOSSIÊ TRADUZIDO <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* 2. Arquivos Originais (Drive) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/30 border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-foreground">Google Drive Original</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Pasta com todos os PDFs brutos e imagens.</p>
                <Button variant="outline" className="w-full text-xs" onClick={() => window.open(links.drive, '_blank')}>
                  Abrir Drive
                </Button>
              </div>

              {/* 3. Ferramenta de Busca (Jmail) */}
              <div className="bg-secondary/30 border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-foreground">Buscador de E-mails</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Pesquise nomes dentro dos e-mails (Jmail).</p>
                <Button variant="outline" className="w-full text-xs" onClick={() => window.open(links.jmail, '_blank')}>
                  Acessar Jmail
                </Button>
              </div>
            </div>

            {/* 4. Outras Fontes (EpsteinFTA & JeffTube) */}
            <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-3 h-3" /> Fontes Adicionais
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="w-full text-xs h-9" onClick={() => window.open(links.epsteinfta, '_blank')}>
                  Site EpsteinFTA.com
                </Button>
                <Button variant="secondary" className="w-full text-xs h-9" onClick={() => window.open(links.jefftube, '_blank')}>
                  Site JeffTube.net
                </Button>
              </div>
            </div>

            {/* Aviso Telegram */}
            <div className="text-center py-2 bg-blue-500/10 rounded border border-blue-500/20">
              <p className="text-sm text-blue-400 font-medium">
                📢 Em breve: Grupo Exclusivo no Telegram
              </p>
            </div>

          </div>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="w-4 h-4" />
              <span>Uma cópia destes links também foi enviada para seu e-mail.</span>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Fique tranquilo: Todos os links são seguros e verificados.
            </p>
          </div>

        </Card>
      </main>

      <footer className="py-6 text-center border-t border-border">
         <p className="text-xs text-muted-foreground">© 2026 Arquivos Brasil. Material Público (FOIA).</p>
      </footer>
    </div>
  );
};

export default ThankYou;
