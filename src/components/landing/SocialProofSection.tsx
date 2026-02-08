import { useEffect, useState } from "react";
import { Users, Clock, FileText, TrendingUp } from "lucide-react";

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count.toLocaleString('pt-BR')}</span>;
}

const recentDocuments = [
  { title: "Log de Voo #847 - Palm Beach → São Paulo", time: "Há 2 min" },
  { title: "E-mail: Reunião com advogados brasileiros", time: "Há 15 min" },
  { title: "Foto: Evento beneficente Rio de Janeiro", time: "Há 32 min" },
  { title: "Transcrição: Chamada telefônica interceptada", time: "Há 1h" },
];

export function SocialProofSection() {
  const [readersNow, setReadersNow] = useState(127);
  
  // Simulate live readers count
  useEffect(() => {
    const interval = setInterval(() => {
      setReadersNow(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(100, Math.min(200, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Live stats bar */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{readersNow}</div>
              <div className="text-xs text-muted-foreground">Lendo agora</div>
            </div>
          </div>
          
          <div className="hidden md:block w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-alert/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-alert" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter end={4827} />
              </div>
              <div className="text-xs text-muted-foreground">Acessos este mês</div>
            </div>
          </div>
          
          <div className="hidden md:block w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">+47%</div>
              <div className="text-xs text-muted-foreground">Crescimento semanal</div>
            </div>
          </div>
        </div>
        
        {/* Recent documents */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-alert" />
            <h3 className="text-lg font-semibold">Documentos Liberados Recentemente</h3>
          </div>
          
          <div className="space-y-3">
            {recentDocuments.map((doc, index) => (
              <div
                key={doc.title}
                className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-alert/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-alert rounded-full animate-pulse" />
                  <span className="text-foreground group-hover:text-alert transition-colors">
                    {doc.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {doc.time}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Novos documentos são adicionados conforme são liberados publicamente
          </p>
        </div>
      </div>
    </section>
  );
}