import { Button } from "@/components/ui/button";
import { Heart, Coffee, Code, Users } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Projet en Développement
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Agent IA est un projet personnel et bénévole développé avec passion
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-semibold">Projet Personnel</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Agent IA est un projet de développement personnel que je réalise seul pendant mon temps libre. 
              Il s'agit d'une initiative bénévole visant à créer un agent d'intelligence artificielle 
              capable d'aider les développeurs dans leurs projets.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-semibold">Développement Solo</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Étant le seul développeur sur ce projet, je ne peux pas maintenir des mises à jour 
              continues et quotidiennes. Les nouvelles fonctionnalités et corrections arrivent 
              selon ma disponibilité et mes priorités personnelles.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="text-red-500 w-6 h-6" />
              <h2 className="text-2xl font-semibold">Limitations</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En tant que projet personnel, Agent IA fait face à certaines contraintes :
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                <span>Ressources financières limitées pour l'infrastructure</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                <span>Temps de développement restreint</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                <span>Pas de support 24/7 ou de garanties commerciales</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                <span>Mises à jour irrégulières selon la disponibilité</span>
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center space-x-3 mb-4">
              <Coffee className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-semibold">Soutenir le Projet</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Si vous appréciez Agent IA et souhaitez soutenir son développement, 
              toute aide de la communauté est la bienvenue ! Vos contributions m'aident 
              à couvrir les coûts d'infrastructure et à consacrer plus de temps au projet.
            </p>
            
            <div className="text-center">
              <Button
                onClick={() => window.open('https://buymeacoffee.com/sticksonthebeach', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium transition-all duration-300 transform hover:scale-105"
                data-testid="button-donate"
              >
                <Coffee className="mr-3 w-5 h-5" />
                Offrir un café ☕
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Chaque contribution, même petite, fait une grande différence
              </p>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Autres Façons d'Aider</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Feedback et Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Partagez vos idées d'amélioration et signalez les bugs
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Partage</h3>
                <p className="text-sm text-muted-foreground">
                  Faites connaître le projet à d'autres développeurs
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Contributions</h3>
                <p className="text-sm text-muted-foreground">
                  Proposez des améliorations ou nouvelles fonctionnalités
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Tests</h3>
                <p className="text-sm text-muted-foreground">
                  Testez les nouvelles fonctionnalités et donnez votre avis
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Merci de votre compréhension et de votre soutien ! 🙏
            </p>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="px-6 py-2"
              data-testid="button-back"
            >
              Retour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}