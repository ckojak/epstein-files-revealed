import { Button } from "@/components/ui/button";
import { Mail, Image, FileSearch, Headphones, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Mail,
    title: "E-mails Estilo Jmail",
    description: "Interface intuitiva para navegar pelos e-mails como se fossem seus.",
    highlight: "847 mensagens",
  },
  {
    icon: Image,
    title: "Galeria de Fotos",
    description: "Imagens organizadas por evento, local e pessoas identificadas.",
    highlight: "324 fotos",
  },
  {
    icon: FileSearch,
    title: "Busca Inteligente",
    description: "Pesquise por nomes, datas ou palavras-chave em segundos.",
    highlight: "Busca em PT-BR",
  },
  {
    icon: Headphones,
    title: "Áudios Transcritos",
    description: "Gravações com transcrição e tradução para português.",
    highlight: "12 áudios",
  },
];

const benefits = [
  "Trechos cruciais traduzidos para português",
  "Organização cronológica dos eventos",
  "Menções ao Brasil destacadas",
  "Atualizações conforme novos documentos são liberados",
];

export function SolutionSection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-alert/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-alert/10 text-alert text-sm font-medium mb-4">
            A Solução
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tudo Organizado,
            <br />
            <span className="text-alert">Traduzido e Navegável</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nós fizemos o trabalho pesado. Você só precisa acessar e descobrir a verdade.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-xl bg-background border border-border hover:border-alert/50 transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium text-alert bg-alert/10 px-2 py-1 rounded">
                  {feature.highlight}
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-alert/10 transition-colors">
                <feature.icon className="w-7 h-7 text-foreground group-hover:text-alert transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Benefits list */}
        <div className="max-w-3xl mx-auto bg-background rounded-2xl border border-border p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            O Que Você Vai Encontrar
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/checkout">
              <Button variant="cta" size="xl" className="group">
                Quero Acesso Agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}