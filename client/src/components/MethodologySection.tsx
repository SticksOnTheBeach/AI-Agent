import CodeBlock from "@/components/CodeBlock";

export default function MethodologySection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Méthodologie de Développement</h2>
          <p className="text-xl text-muted-foreground">Comment l'Agent IA transforme vos idées en réalité</p>
        </div>

        <div className="space-y-12">
          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 group-hover:scale-110 transition-transform">1</div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Analyse et Compréhension</h3>
              <p className="text-muted-foreground mb-4">L'agent analyse votre demande en profondeur, identifie les besoins implicites et propose une architecture optimale.</p>
              <CodeBlock>
{`// Analyse automatique du projet
const projectAnalysis = await analyzeRequirements(userInput);
const architecture = suggestOptimalArchitecture(analysis);`}
              </CodeBlock>
            </div>
          </div>

          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 group-hover:scale-110 transition-transform">2</div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Génération de Code Intelligente</h3>
              <p className="text-muted-foreground mb-4">Création du code source complet avec les meilleures pratiques, tests unitaires et documentation intégrée.</p>
              <CodeBlock>
{`// Génération automatique avec tests
generateFullStackProject({
  frontend: 'React + TypeScript',
  backend: 'Node.js + Express',
  database: 'PostgreSQL',
  tests: true
});`}
              </CodeBlock>
            </div>
          </div>

          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 group-hover:scale-110 transition-transform">3</div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Déploiement et Optimisation</h3>
              <p className="text-muted-foreground">Configuration automatique du déploiement, optimisation des performances et mise en place du monitoring.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
