import { Shield, UserCheck, Trash2 } from "lucide-react";

export default function PrivacySection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Confidentialité & Sécurité</h2>
          <p className="text-xl text-muted-foreground">Protection de vos données et respect de votre vie privée</p>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="text-primary mr-3" />
            Chiffrement End-to-End
          </h3>
          <p className="text-muted-foreground">Toutes vos conversations et projets sont chiffrés de bout en bout. Vos données ne sont jamais stockées en clair sur nos serveurs.</p>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <UserCheck className="text-primary mr-3" />
            Anonymisation
          </h3>
          <p className="text-muted-foreground">Aucune donnée personnelle n'est conservée après traitement. Seules les métadonnées nécessaires au fonctionnement sont temporairement utilisées.</p>
        </div>

        <div className="glass-effect p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Trash2 className="text-primary mr-3" />
            Suppression Automatique
          </h3>
          <p className="text-muted-foreground">Les données de session sont automatiquement supprimées après 24h d'inactivité. Vous avez un contrôle total sur vos informations.</p>
        </div>
      </div>
    </section>
  );
}
