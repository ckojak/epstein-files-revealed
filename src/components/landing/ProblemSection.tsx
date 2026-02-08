import { Clock, FileWarning, Languages, Brain } from "lucide-react";

const problems = [
  {
    icon: FileWarning,
    title: "5.000+ Páginas",
    description: "Documentos jurídicos em inglês técnico espalhados por dezenas de fontes diferentes.",
  },
  {
    icon: Languages,
    title: "Inglês Jurídico",
    description: "Termos técnicos e jargões legais que tradutores automáticos não conseguem interpretar corretamente.",
  },
  {
    icon: Clock,
    title: "Horas de Leitura",
    description: "Encontrar as informações relevantes sobre o Brasil exigiria semanas de análise dedicada.",
  },
  {
    icon: Brain,
    title: "Contexto Perdido",
    description: "Sem organização, as conexões entre nomes, datas e eventos passam despercebidas.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-muted-foreground text-sm font-medium mb-4">
            O Problema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Você Não Tem Tempo
            <br />
            <span className="text-muted-foreground">Para Ler Tudo Isso</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Os documentos do caso Epstein são públicos, mas acessá-los de forma organizada
            é praticamente impossível para quem não é advogado ou jornalista investigativo.
          </p>
        </div>
        
        {/* Problem cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-alert/30 transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-alert/10 flex items-center justify-center mb-4 group-hover:bg-alert/20 transition-colors">
                <problem.icon className="w-6 h-6 text-alert" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}