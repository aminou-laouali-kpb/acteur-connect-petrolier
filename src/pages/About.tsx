import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Globe, BarChart3, CheckCircle, FileText, ClipboardList, ShieldCheck, Target, Award } from 'lucide-react';

const steps = [
  { icon: ClipboardList, title: 'Inscription', description: 'L\'entreprise s\'inscrit en ligne via le portail du Registre National.' },
  { icon: FileText, title: 'Recensement', description: 'L\'entreprise est recensée et son dossier est constitué dans le registre officiel.' },
  { icon: CheckCircle, title: 'Vérification du dossier', description: 'L\'équipe du Ministère examine et vérifie l\'ensemble des pièces et informations.' },
  { icon: Award, title: 'Qualification', description: 'L\'entreprise est qualifiée selon les critères du contenu local pétrolier.' },
  { icon: ShieldCheck, title: 'Visibilité renforcée', description: 'L\'entreprise qualifiée bénéficie d\'une visibilité accrue auprès des donneurs d\'ordre.' },
  { icon: Target, title: 'Accès aux marchés', description: 'L\'entreprise accède aux opportunités et peut répondre aux appels des compagnies pétrolières et sous-traitants.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-4">À propos du Registre National</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Comprendre la mission, les objectifs et le fonctionnement du Registre National du Contenu Local Pétrolier.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-heading font-bold mb-6">Notre mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Le Registre National du Contenu Local Pétrolier est un outil stratégique officiel mis en place par le Ministère du Pétrole de la République du Niger. Il vise à recenser, qualifier et connecter les acteurs économiques nationaux avec les compagnies pétrolières, sous-traitants principaux et donneurs d'ordre du secteur. En centralisant les dossiers de qualification des entreprises locales et les opportunités des opérateurs, le registre assure une meilleure participation nationale aux marchés du secteur pétrolier.
          </p>

          <h2 className="text-2xl font-heading font-bold mb-6">Pourquoi le contenu local ?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Users, title: 'Emploi local', text: 'Favoriser la création d\'emplois pour les Nigériens dans le secteur pétrolier.' },
              { icon: BarChart3, title: 'Participation locale', text: 'Maximiser la participation des entreprises nationales dans les marchés du secteur pétrolier.' },
              { icon: Shield, title: 'Souveraineté économique', text: 'Renforcer les capacités nationales et structurer l\'écosystème des acteurs locaux.' },
              { icon: Globe, title: 'Connexion opérateurs', text: 'Faciliter la mise en relation avec les compagnies pétrolières, sous-traitants principaux et structures sectorielles.' },
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
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Sous-traitants et fournisseurs des compagnies pétrolières</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Bureaux d'études, cabinets de consultance et cabinets juridiques</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Organismes de formation professionnelle</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /> Prestataires de services financiers, hôtellerie, restauration, logistique et transport</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold mb-6">Parcours de qualification</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
