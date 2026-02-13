import { CheckCircle2, Mail, Shield, ArrowRight, Database, Search, FileText, Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const links = {
    traduzido: "https://epstein-arquivos.vercel.app/dossie-secreto-brasil-liberado",
    drive: "https://drive.google.com/drive/folders/1eCcQ1Ov-H5NKgTkUGeu_CWeVwIC4B4Qt",
    jmail: "https://jmail.world/",
    epsteinfta: "https://epsteinfta.com/",
    jefftube: "https://www.jefftube.net/"
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/3 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 py-4 px-4 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="tracking-tight">ARQUIVOS CONFIDENCIAIS</span>
            <span className="text-xl">🇧🇷</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-2xl w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Success Banner */}
          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-6 md:p-8 shadow-2xl shadow-green-900/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl scale-150 animate-pulse" />
                <div className="relative p-4 bg-green-500/10 rounded-full border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Acesso Liberado!
              </h2>
              <p className="text-green-300/80 text-sm md:text-base">
                Pagamento confirmado · Todo o material está disponível abaixo
              </p>
            </div>
          </Card>

          {/* E-mail Notice */}
          <div className="flex items-center gap-3 bg-blue-500/8 border border-blue-500/20 rounded-xl px-5 py-4">
            <Mail className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-sm text-blue-300/90">
              Uma cópia com todos os links também foi enviada para o seu e-mail. <strong className="text-blue-200">Verifique sua caixa de entrada.</strong>
            </p>
          </div>

          {/* Main CTA */}
          <Card className="border-green-500/20 bg-[#0a0f0a] p-5 md:p-6 shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Dossiê Traduzido (PT-BR)</h3>
                <p className="text-sm text-neutral-400">Versão organizada e facilitada para leitura.</p>
              </div>
            </div>
            <Button 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold h-12 text-base shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30 hover:scale-[1.01]"
              onClick={() => window.open(links.traduzido, '_blank')}
            >
              ACESSAR DOSSIÊ TRADUZIDO <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>

          {/* Secondary Links */}
          <div className="grid md:grid-cols-2 gap-3">
            <Card className="border-white/5 bg-[#0d0d0d] p-4 hover:border-green-500/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white text-sm">Google Drive Original</span>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Pasta com todos os PDFs brutos e imagens.</p>
              <Button variant="outline" className="w-full text-xs border-white/10 hover:border-green-500/30 hover:text-green-400 transition-colors" onClick={() => window.open(links.drive, '_blank')}>
                Abrir Drive
              </Button>
            </Card>

            <Card className="border-white/5 bg-[#0d0d0d] p-4 hover:border-green-500/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-white text-sm">Buscador de E-mails</span>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Pesquise nomes dentro dos e-mails (Jmail).</p>
              <Button variant="outline" className="w-full text-xs border-white/10 hover:border-green-500/30 hover:text-green-400 transition-colors" onClick={() => window.open(links.jmail, '_blank')}>
                Acessar Jmail
              </Button>
            </Card>
          </div>

          {/* Extra Sources */}
          <Card className="border-white/5 bg-[#0a0a0a] p-4">
            <h4 className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3" /> Fontes Adicionais
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="w-full text-xs h-9 bg-white/5 hover:bg-white/10 border-0 text-neutral-300" onClick={() => window.open(links.epsteinfta, '_blank')}>
                EpsteinFTA.com
              </Button>
              <Button variant="secondary" className="w-full text-xs h-9 bg-white/5 hover:bg-white/10 border-0 text-neutral-300" onClick={() => window.open(links.jefftube, '_blank')}>
                JeffTube.net
              </Button>
            </div>
          </Card>

          {/* Telegram */}
          <div className="text-center py-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
            <p className="text-sm text-blue-400 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Em breve: Grupo Exclusivo no Telegram
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center border-t border-white/5 relative z-10">
        <p className="text-xs text-neutral-600">© 2026 Arquivos Brasil. Material Público (FOIA).</p>
      </footer>
    </div>
  );
};

export default ThankYou;
