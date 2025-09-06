import { Button } from "@/components/ui/button";
import { Code, Brain, Rocket } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Agent IA
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Créateur d'intelligence artificielle avancée capable de développer des projets complets, 
            du frontend au backend, avec une expertise dans tous les langages de programmation.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Développé par{" "}
            <a 
              href="https://github.com/SticksOnTheBeach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium underline decoration-primary/30 hover:decoration-primary/60"
              data-testid="link-hero-creator"
            >
              @SticksOnTheBeach
            </a>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="gradient-border group">
              <Button
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="button-test-agent"
              >
                <i className="fas fa-comments mr-3"></i>
                <span className="font-medium">Tester l'Agent IA</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('methodology')}
              className="px-8 py-4 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-learn-more"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              En savoir plus
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform">
              <Code className="text-2xl text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Développement Full-Stack</h3>
            <p className="text-muted-foreground">Création complète de projets incluant frontend, backend, base de données et déploiement automatisé.</p>
          </div>
          
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform">
              <Brain className="text-2xl text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Intelligence Adaptative</h3>
            <p className="text-muted-foreground">Analyse et adaptation automatique aux besoins du projet, anticipation des requirements techniques.</p>
          </div>
          
          <div className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform">
              <Rocket className="text-2xl text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Expertise Universelle</h3>
            <p className="text-muted-foreground">Maîtrise de tous les langages de programmation et frameworks modernes pour une polyvalence maximale.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
