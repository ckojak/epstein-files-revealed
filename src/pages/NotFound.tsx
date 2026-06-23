import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShieldAlert, Terminal, Eye, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Mantemos o log para auditoria, mas a UI é agressiva
    console.warn("🔐 REDIRECIONAMENTO DE SEGURANÇA. Tentativa de acesso a Rota não mapeada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] text-[#00ff00] font-mono p-4 relative overflow-hidden">
      {/* Visual Glitch Effect */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/noise.png')]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />

      <div className="max-w-2xl w-full text-center space-y-6 animate-in fade-in duration-500">
        
        {/* Hacker Alert Icon Container */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl scale-150 animate-pulse" />
          <div className="relative p-6 bg-[#0a0a0a] rounded-full border-2 border-red-500 animate-blink_fast">
            <Unplug className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter animate-blink">
          ERRO [404]
        </h1>
        
        <div className="space-y-3 bg-[#0a0a0a] border border-red-500/30 p-6 rounded-xl shadow-xl shadow-red-950/20">
          <p className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <ShieldAlert className="w-6 h-6 text-yellow-500" />
            CONEXÃO INTERROMPIDA. SINAL PERDIDO.
          </p>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg mx-auto">
            A rota <strong className="text-red-400">"{location.pathname}"</strong> não foi encontrada nos nossos nós de dados ou foi bloqueada por protocolos de segurança avançados. 
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 border-t border-white/5 pt-4 mt-4">
             <Eye className="w-3.5 h-3.5" /> IP & Metadados Registrados para Auditoria.
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <a href="/">
            <Button size="lg" className="bg-green-600 hover:bg-green-500 text-black font-bold h-14 px-10 text-lg shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30 hover:scale-[1.02]">
              <Terminal className="mr-2 w-5 h-5" /> REINICIAR CONEXÃO (HOME)
            </Button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default NotFound;