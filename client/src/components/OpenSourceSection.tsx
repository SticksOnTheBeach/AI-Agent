import { Button } from "@/components/ui/button";
import { Check, Github } from "lucide-react";

export default function OpenSourceSection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Open Source & Accessibilité</h2>
          <p className="text-xl text-muted-foreground">Notre engagement envers la communauté de développeurs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-green-500">Version Libre</h3>
            <p className="text-muted-foreground mb-4">Une version open source sera disponible avec les fonctionnalités de base pour permettre à chacun d'expérimenter et de contribuer.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center"><Check className="text-green-500 mr-2 w-4 h-4" />Code source complet</li>
              <li className="flex items-center"><Check className="text-green-500 mr-2 w-4 h-4" />Documentation détaillée</li>
              <li className="flex items-center"><Check className="text-green-500 mr-2 w-4 h-4" />Communauté active</li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Version Pro</h3>
            <p className="text-muted-foreground mb-4">Version complète avec toutes les fonctionnalités avancées, support premium et intégrations entreprise.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center"><Check className="text-primary mr-2 w-4 h-4" />IA avancée</li>
              <li className="flex items-center"><Check className="text-primary mr-2 w-4 h-4" />Support 24/7</li>
              <li className="flex items-center"><Check className="text-primary mr-2 w-4 h-4" />Intégrations API</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="mb-6">
            <p className="text-muted-foreground mb-2">
              Projet créé et maintenu par
            </p>
            <a 
              href="https://github.com/SticksOnTheBeach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-semibold text-lg"
              data-testid="link-creator-profile"
            >
              @SticksOnTheBeach
            </a>
          </div>
          
          <div className="gradient-border group inline-block">
            <Button
              onClick={() => window.open('https://github.com/SticksOnTheBeach', '_blank')}
              className="px-8 py-4 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="button-github"
            >
              <Github className="mr-3" />
              <span className="font-medium">Voir le profil GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
