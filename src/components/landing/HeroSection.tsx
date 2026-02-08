import { Button } from "@/components/ui/button";
import { Lock, FileText, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-alert/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
      
      {/* Floating documents decoration */}
      <div className="absolute top-20 left-10 opacity-10 animate-float">
        <FileText className="w-20 h-20" />
      </div>
      <div className="absolute bottom-32 right-16 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
        <Lock className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
        <AlertTriangle className="w-12 h-12" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Breaking badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alert/10 border border-alert/30 mb-8 animate-pulse-glow">
          <span className="w-2 h-2 bg-alert rounded-full animate-pulse" />
          <span className="text-sm font-medium text-alert uppercase tracking-widest">
            Documentos Recém-Liberados
          </span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 animate-slide-up">
          <span className="block text-foreground">O Que Ninguém</span>
          <span className="block text-foreground">Te Contou:</span>
          <span className="block mt-2 bg-gradient-to-r from-alert via-warning to-warning bg-clip-text text-transparent">
            Os Arquivos Completos
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          E-mails, logs de voo e documentos do Caso Epstein.
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Acesso direto, traduzido e organizado. Veja as menções sobre o Brasil
          <span className="text-foreground font-semibold"> (Lula, Dilma, Bolsonaro) </span>
          sem filtros da mídia.
        </p>
        
        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/checkout">
            <Button variant="cta" size="xl" className="group">
              <Lock className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Liberar Acesso Completo por R$ 1,99
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Taxa simbólica de manutenção • Acesso imediato
          </p>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-foreground">5.000+</div>
            <div className="text-sm text-muted-foreground mt-1">Páginas de Documentos</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-3xl md:text-4xl font-black text-alert">847</div>
            <div className="text-sm text-muted-foreground mt-1">E-mails Revelados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-foreground">23</div>
            <div className="text-sm text-muted-foreground mt-1">Menções ao Brasil</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}