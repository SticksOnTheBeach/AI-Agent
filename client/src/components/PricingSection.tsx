import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";

interface PricingSectionProps {
  onNavigate?: (section: string) => void;
}

export default function PricingSection({ onNavigate }: PricingSectionProps = {}) {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour découvrir l'Agent IA",
      model: "Powered by Gemini 2.5 Pro",
      modelIcon: "🤖",
      features: [
        "Conversations illimitées",
        "Génération de code basique",
        "Support communautaire",
        "Projets simples",
        "Export des conversations"
      ],
      limitations: [
        "Projets limités en complexité",
        "Pas de support prioritaire"
      ],
      buttonText: "Commencer gratuitement",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "19€",
      period: "/mois",
      description: "Pour les développeurs professionnels",
      model: "Powered by GPT-5",
      modelIcon: "⚡",
      features: [
        "Tout du plan Gratuit",
        "Projets complexes illimités",
        "Architecture avancée",
        "Support prioritaire 24/7",
        "Intégrations API",
        "Templates premium",
        "Collaboration en équipe",
        "Historique étendu"
      ],
      limitations: [],
      buttonText: "Commencer Pro",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "99€",
      period: "/mois",
      description: "Pour les grandes équipes et entreprises",
      model: "Powered by GPT-5 + Custom Models",
      modelIcon: "👑",
      features: [
        "Tout du plan Pro",
        "Modèles IA personnalisés",
        "Déploiement privé",
        "SLA garantie 99.9%",
        "Formation personnalisée",
        "Gestionnaire de compte dédié",
        "Sécurité renforcée",
        "Audit et conformité"
      ],
      limitations: [],
      buttonText: "Contacter l'équipe",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choisissez votre plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la version gratuite aux solutions entreprise, trouvez l'offre qui correspond à vos besoins de développement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-2xl scale-105"
                  : "border-border glass-effect"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Le plus populaire</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                {/* Model Badge */}
                <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-3 py-1 text-sm">
                  <span className="text-lg">{plan.modelIcon}</span>
                  <span className="font-medium">{plan.model}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-center space-x-3 opacity-60">
                    <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                      <span className="w-3 h-3 text-muted-foreground text-xs">×</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.buttonVariant}
                className={`w-full py-3 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : ""
                }`}
                onClick={() => {
                  if (plan.name === "Gratuit") {
                    // Naviguer vers le chat pour le plan gratuit
                    if (onNavigate) {
                      onNavigate('chat');
                    } else {
                      window.location.href = '/chat';
                    }
                  } else if (plan.name === "Pro") {
                    // Ouvrir la page de support pour le plan Pro
                    window.open('/support', '_blank');
                  } else {
                    // Pour Enterprise, ouvrir un contact
                    window.open('mailto:contact@agent-ia.dev?subject=Demande Enterprise', '_blank');
                  }
                }}
                data-testid={`button-plan-${plan.name.toLowerCase()}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Pourquoi choisir notre Agent IA ?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white text-xl" />
                </div>
                <h4 className="font-semibold mb-2">Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Gemini 2.5 Pro gratuit, GPT-5 premium pour une qualité exceptionnelle
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="text-white text-xl" />
                </div>
                <h4 className="font-semibold mb-2">Expertise</h4>
                <p className="text-sm text-muted-foreground">
                  Maîtrise complète de tous les langages et frameworks modernes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white text-xl" />
                </div>
                <h4 className="font-semibold mb-2">Support</h4>
                <p className="text-sm text-muted-foreground">
                  Du support communautaire au support enterprise 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Tous les plans incluent une garantie de remboursement de 30 jours • Résiliable à tout moment
          </p>
        </div>
      </div>
    </section>
  );
}