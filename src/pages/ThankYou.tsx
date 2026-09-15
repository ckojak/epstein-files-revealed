import { useEffect } from "react";
import {
  CheckCircle2, Mail, ArrowRight, Database, Search, FileText, Lock, Sparkles,
  Unlock, ExternalLink, Radio, Eye, Gavel, Scale, ShieldAlert, AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTopNews, formatViews, formatDateBR } from "@/hooks/useTopNews";

const ThankYou = () => {
  const { data: news } = useTopNews();
  const items = news?.items ?? [];

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
    jefftube: "https://www.jefftube.net/",
    stf: "https://portal.stf.jus.br/",
  };

  const bancoMasterTimeline = [
    {
      tag: "STF",
      title: "Mendonça libera sigilo de 53 processos do caso Banco Master",
      desc: "25,3GB de material liberado ao público nos dias 10 e 11 de setembro de 2026.",
    },
    {
      tag: "PET 16.662",
      title: "Julgamento sobre mensagens entre Vorcaro e Alexandre de Moraes",
      desc: "Petição que discute o vazamento e o conteúdo das mensagens vai a julgamento em 15/09/2026.",
    },
    {
      tag: "PET 15.612",
      title: "Inquérito sobre o vazamento das mensagens do celular de Vorcaro",
      desc: "Apura como o conteúdo do celular chegou à imprensa.",
    },
    {
      tag: "PET 15.556",
      title: "STF mantém a prisão de Daniel Vorcaro",
      desc: "Decisão que manteve o ex-controlador do Banco Master preso.",
    },
  ];

  const bancoMasterProcessos = ["PET 16.662", "PET 15.612", "PET 15.556"];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/3 rounded-full blur-[100px]" />
      </div>

      <header className="border-b border-white/5 py-4 px-4 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
            <Radio className="w-4 h-4 text-black" />
          </div>
          <div className="leading-tight">
            <div className="text-base md:text-lg font-black text-white tracking-tight">TV OCULTA</div>
            <div className="text-[9px] md:text-[10px] font-mono text-green-400/70 uppercase tracking-wider">
              Área de assinante
            </div>
          </div>
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
                Pagamento confirmado · Todo o material está disponível abaixo, organizado em 3 blocos
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

          {/* ============================================================ */}
          {/* BLOCO 1: DOSSIÊ EPSTEIN */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 pt-2">
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">
                Bloco 1 · Dossiê Epstein Brasil — Traduzido
              </span>
            </div>
          </div>

          <Card className="border-green-500/20 bg-[#0a0f0a] p-5 md:p-6 shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Dossiê Epstein — Conexões Brasil</h3>
                <p className="text-sm text-neutral-400">Versão traduzida e organizada para leitura.</p>
              </div>
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold h-12 text-base shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30 hover:scale-[1.01]"
              onClick={() => window.open(links.traduzido, '_blank')}
            >
              ACESSAR DOSSIÊ EPSTEIN TRADUZIDO <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>

          <div className="grid md:grid-cols-2 gap-3">
            <Card className="border-white/5 bg-[#0d0d0d] p-4 hover:border-green-500/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white text-sm">Google Drive Original</span>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Pasta com todos os PDFs brutos e imagens (caso Epstein).</p>
              <Button variant="outline" className="w-full text-xs border-white/10 hover:border-green-500/30 hover:text-green-400 transition-colors" onClick={() => window.open(links.drive, '_blank')}>
                Abrir Drive
              </Button>
            </Card>

            <Card className="border-white/5 bg-[#0d0d0d] p-4 hover:border-green-500/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-white text-sm">Buscador de E-mails</span>
              </div>
              <p className="text-xs text-neutral-500 mb-3">Pesquise nomes dentro dos e-mails (Jmail, caso Epstein).</p>
              <Button variant="outline" className="w-full text-xs border-white/10 hover:border-green-500/30 hover:text-green-400 transition-colors" onClick={() => window.open(links.jmail, '_blank')}>
                Acessar Jmail
              </Button>
            </Card>
          </div>

          <Card className="border-white/5 bg-[#0a0a0a] p-4">
            <h4 className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3" /> Fontes adicionais — caso Epstein
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

          {/* ============================================================ */}
          {/* BLOCO 2: DOSSIÊ BANCO MASTER (destaque) */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 pt-4">
            <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                Bloco 2 · Dossiê Banco Master — Assunto do momento
              </span>
            </div>
          </div>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent p-5 md:p-6 shadow-xl">
            <div className="flex items-start gap-4 mb-5">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Gavel className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Caso Banco Master — Linha do tempo</h3>
                <p className="text-sm text-neutral-400">Direto do STF, com fonte em cada item.</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {bancoMasterTimeline.map((f, i) => (
                <div key={i} className="flex flex-col gap-1 p-3 bg-[#0a0a0a] rounded-lg border border-red-500/10">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider w-fit px-2 py-0.5 rounded bg-red-500/10">
                    {f.tag}
                  </span>
                  <h4 className="font-bold text-white text-sm">{f.title}</h4>
                  <p className="text-xs text-neutral-400">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Números dos processos, escritos */}
            <div className="mb-5 p-3 bg-[#0a0a0a] rounded-lg border border-red-500/10">
              <p className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Números dos processos citados
              </p>
              <p className="text-sm font-mono text-neutral-300">
                {bancoMasterProcessos.join(" · ")}
              </p>
            </div>

            <Button
              className="w-full bg-red-500 hover:bg-red-400 text-black font-bold h-12 text-base shadow-lg shadow-red-500/20"
              onClick={() => window.open(links.stf, '_blank')}
            >
              VER PROCESSOS NO PORTAL DO STF <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
          </Card>

          {/* Em breve: fotos e vídeos */}
          <div className="text-center py-3 bg-red-500/5 rounded-xl border border-red-500/10">
            <p className="text-sm text-red-400 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Em breve: fotos e vídeos do processo
            </p>
          </div>

          {/* Nota de transparência — sigilo */}
          <div className="flex items-start gap-3 bg-yellow-500/8 border border-yellow-500/20 rounded-xl px-5 py-4">
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200/90">
              <strong className="text-yellow-200">Nem tudo está liberado:</strong> parte do material do caso (como o conteúdo integral do celular de Vorcaro) segue sob sigilo judicial. Este dossiê mostra só o que já é público — e é atualizado conforme novos processos forem liberados pelo STF.
            </p>
          </div>

          {/* ============================================================ */}
          {/* BLOCO 3: TOP 40 — NOTÍCIAS MUNDIAIS (feed geral) */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 pt-4">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                Bloco 3 · Top 40 — Notícias mundiais (feed geral, não é dossiê de caso)
              </span>
            </div>
          </div>

          <Card className="border-green-500/20 bg-[#0a0a0a] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <Unlock className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-white text-base">TOP 40 — NOTÍCIAS MUNDIAIS DESTRAVADAS</h3>
            </div>
            <p className="text-[10px] font-mono text-green-400/70 mb-5 uppercase tracking-wider">
              {items.length > 0 ? `${items.length} matérias · atualizado ${formatDateBR(news!.updatedAt)}` : "Carregando manchetes…"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-[#050505] rounded-lg border border-green-500/15 hover:border-green-500/40 transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-bold uppercase tracking-wider truncate max-w-[60%]">
                      {item.source}
                    </span>
                    <span className="text-neutral-500">{formatDateBR(item.publishedAt)}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{item.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed flex-1">{item.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(item.views)}</span>
                  </div>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-xs h-9 mt-1"
                    onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    LER MATÉRIA ORIGINAL
                  </Button>
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
        <p className="text-xs text-neutral-600">© 2026 TV Oculta — Notícias Exclusivas Mundiais.</p>
      </footer>
    </div>
  );
};

export default ThankYou;