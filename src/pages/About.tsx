import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Globe, BarChart3, CheckCircle, FileText } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Inscription', description: 'L\'entreprise s\'inscrit en ligne et remplit son dossier complet.' },
  { icon: CheckCircle, title: 'Vérification', description: 'L\'équipe du Ministère examine et valide les informations.' },
  { icon: Shield, title: 'Qualification', description: 'L\'entreprise est qualifiée et intégrée à l\'annuaire sectoriel.' },
  { icon: Globe, title: 'Connexion', description: 'L\'entreprise accède aux opportunités et peut soumettre ses candidatures.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-4">À propos de la plateforme</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Comprendre la mission, les objectifs et le fonctionnement de la Plateforme Nationale du Contenu Local Pétrolier.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-heading font-bold mb-6">Notre mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            La Plateforme Nationale du Contenu Local Pétrolier est un outil stratégique mis en place par le Ministère du Pétrole de la République du Niger. Elle vise à structurer, développer et piloter la participation des acteurs économiques nationaux dans le secteur pétrolier. En centralisant les données des entreprises locales et les opportunités du secteur, la plateforme permet une meilleure adéquation entre l'offre locale et la demande des opérateurs pétroliers.
          </p>

          <h2 className="text-2xl font-heading font-bold mb-6">Pourquoi le contenu local ?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Users, title: 'Emploi local', text: 'Favoriser la création d\'emplois pour les Nigériens dans le secteur pétrolier.' },
              { icon: BarChart3, title: 'Croissance économique', text: 'Maximiser les retombées économiques de l\'exploitation pétrolière pour le Niger.' },
              { icon: Shield, title: 'Souveraineté', text: 'Renforcer les capacités nationales et réduire la dépendance aux acteurs étrangers.' },
              { icon: Globe, title: 'Développement régional', text: 'Répartir équitablement les opportunités sur l\'ensemble du territoire.' },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold mb-6">Qui peut s'inscrire ?</h2>
          <ul className="space-y-3 text-muted-foreground mb-12">
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Entreprises de droit nigérien (SA, SARL, SAS, etc.)</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Prestataires de services intervenant dans le secteur pétrolier</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Sous-traitants et fournisseurs du secteur extractif</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Bureaux d'études et cabinets de consultance</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Organismes de formation professionnelle</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold mb-6">Comment ça fonctionne ?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="text-xs text-gold font-heading font-semibold mb-1">Étape {i + 1}</div>
                <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
