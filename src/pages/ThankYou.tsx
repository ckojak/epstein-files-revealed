import { useEffect } from "react";
import { CheckCircle2, Mail, Shield, ArrowRight, Database, Search, FileText, Lock, Sparkles, Globe, Flame, AlertTriangle, Skull, Crosshair, Zap, Radio } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const ThankYou = () => {
  // Store email from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("external_reference");
    if (email) {
      sessionStorage.setItem("epstein_paid_email", email);
    }
  }, []);

  const links = {
    traduzido: "https://epstein-arquivos.vercel.app/dossie-secreto-brasil-liberado",
    drive: "https://drive.google.com/drive/folders/1eCcQ1Ov-H5NKgTkUGeu_CWeVwIC4B4Qt",
    jmail: "https://jmail.world/",
    epsteinfta: "https://epsteinfta.com/",
    jefftube: "https://www.jefftube.net/"
  };


  const crisisData = [
    {
      flag: "🏦", name: "Escândalo Banco Master & STF", tag: "DELAÇÃO", tagColor: "text-red-400",
      detail: "Daniel Vorcaro preso. Celular revela ligações com ministros do STF (Dias Toffoli afastado da relatoria) e Congresso. Sistema financeiro e judiciário na mesma rede."
    },
    {
      flag: "💻", name: "Ataque Hacker ao BTG Pactual", tag: "CIBERATAQUE", tagColor: "text-red-400",
      detail: "R$ 100+ milhões drenados. PIX desligado temporariamente. A narrativa de segurança do dinheiro digital desmoronou."
    },
    {
      flag: "🇺🇸🇮🇱", name: "EUA/Israel vs Irã — Ultimato", tag: "GUERRA ATIVA", tagColor: "text-red-400",
      detail: "Trump deu ultimato de 48h ao Irã: reabrir o Estreito de Ormuz ou ter rede elétrica destruída. 20% do petróleo mundial em risco. Irã promete destruir infraestrutura americana no Golfo."
    },
    {
      flag: "🇨🇺", name: "Cuba — Colapso Total", tag: "APAGÃO", tagColor: "text-red-400",
      detail: "2º apagão nacional em uma semana. 11 milhões de pessoas no escuro. Bloqueio dos EUA + falência da infraestrutura estatal."
    },
    {
      flag: "🇮🇷", name: "Irã — Retaliação Regional", tag: "ESCALADA", tagColor: "text-red-400",
      detail: "Mísseis contra bases americanas no Golfo. Blecautes em Teerão por ataques israelenses. Um passo em falso e a economia global paralisa."
    },
    {
      flag: "🇰🇼", name: "Kuwait — Alerta Máximo", tag: "ALERTA", tagColor: "text-yellow-400",
      detail: "178 mísseis e 384 drones interceptados. Incidente de fogo amigo com jatos dos EUA."
    },
    {
      flag: "🇫🇷", name: "França — Expansão Nuclear", tag: "NUCLEAR", tagColor: "text-yellow-400",
      detail: "Macron: 'Quem quer ser livre tem que ser temido.' Maior expansão nuclear europeia desde a Guerra Fria."
    },
    {
      flag: "🇺🇦", name: "Ucrânia vs Rússia", tag: "GUERRA ATIVA", tagColor: "text-red-400",
      detail: "Oligarcas russos e ucranianos conectados à rede Epstein documentados nos arquivos."
    },
    {
      flag: "🇸🇩", name: "Sudão — Guerra Civil", tag: "CRISE", tagColor: "text-yellow-400",
      detail: "RSF vs Exército. Milhões deslocados. Tráfico de armas ligado a e-mails do dossiê."
    },
    {
      flag: "🇵🇸", name: "Gaza — Conflito", tag: "MONITORANDO", tagColor: "text-yellow-400",
      detail: "Reuniões com líderes de ambos os lados documentadas nos arquivos Epstein."
    },
    {
      flag: "🇲🇲", name: "Myanmar — Guerra Civil", tag: "GUERRA ATIVA", tagColor: "text-red-400",
      detail: "Tráfico humano na região conectado à rede."
    },
    {
      flag: "🇳🇬", name: "Nigéria — Insurgência", tag: "TERRORISMO", tagColor: "text-red-400",
      detail: "Boko Haram e ISWAP. Fluxos financeiros ilícitos documentados."
    },
    {
      flag: "🇨🇩", name: "RD Congo — Conflito", tag: "GUERRA ATIVA", tagColor: "text-red-400",
      detail: "Disputa por cobalto e coltan. Empresários do dossiê tinham interesses nesses minerais."
    },
    {
      flag: "🇻🇪", name: "Venezuela — Operação EUA", tag: "INSTABILIDADE", tagColor: "text-yellow-400",
      detail: "Maduro capturado. Conexões com lavagem de dinheiro nos documentos."
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/3 rounded-full blur-[100px]" />
      </div>

      <header className="border-b border-white/5 py-4 px-4 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="tracking-tight">ARQUIVOS CONFIDENCIAIS</span>
            <span className="text-xl">🇧🇷</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8 md:py-12 relative z-10">
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

          {/* DOSSIÊS DESTRANCADOS — ACESSO TOTAL */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Unlock className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-white text-base">DOSSIÊS DESTRANCADOS — ACESSO TOTAL</h3>
            </div>
            <p className="text-[10px] font-mono text-green-400/70 mb-4 uppercase tracking-wider">Sem censura · Sem blur · Sem botões de bloqueio</p>

            {dossieData.map((dossie, i) => (
              <Card key={i} className={`border-${dossie.borderColor}-500/20 bg-[#0a0a0a] p-5 md:p-6`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-green-500/10 rounded-lg shrink-0">
                    <dossie.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">{dossie.tag}</span>
                    <h4 className="font-bold text-white text-base mt-1.5">{dossie.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {dossie.content}
                </p>
              </Card>
            ))}
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

          {/* VAZAMENTO PRINCIPAL */}
          <Card className="border-green-500/30 bg-gradient-to-r from-green-500/5 to-transparent p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-green-400" />
              <span className="text-[10px] font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">📂 VAZAMENTO PRINCIPAL — STATUS: ATIVO</span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">O Dossiê Epstein BR</h3>
            <p className="text-sm text-neutral-400 mb-4">
              A tradução bruta de mais de 5.000 páginas do processo original. Nomes da elite política e financeira com ligações à rede. O que a TV disse que não existia, nós publicamos.
            </p>
            <Button 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold"
              onClick={() => window.open(links.traduzido, '_blank')}
            >
              Acessar Dossiê Completo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>

          {/* RADAR DE COLAPSO GLOBAL */}
          <Card className="border-red-500/20 bg-[#0a0a0a] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="w-5 h-5 text-red-400 animate-pulse" />
              <h3 className="font-bold text-white text-base">🚨 RADAR DE COLAPSO GLOBAL</h3>
            </div>
            <p className="text-[10px] font-mono text-red-400/70 mb-4 uppercase tracking-wider">Atualização em tempo real — Março/2026</p>

            <div className="grid gap-3">
              {crisisData.map(({ flag, name, tag, tagColor, detail }, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:border-red-500/20 transition-colors">
                  <span className="text-lg shrink-0">{flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-white">{name}</span>
                      <span className={`text-[10px] font-mono font-bold ${tagColor} shrink-0`}>{tag}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
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
