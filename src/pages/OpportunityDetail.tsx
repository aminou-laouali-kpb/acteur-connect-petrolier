import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { mockOpportunities } from '@/data/mock-data';
import { OPPORTUNITY_TYPES } from '@/types';
import { ArrowLeft, Calendar, MapPin, Building, FileText, Send } from 'lucide-react';

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const opp = mockOpportunities.find(o => o.id === id);

  if (!opp) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">Opportunité introuvable</h1>
        <Button asChild variant="outline"><Link to="/opportunites"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground mb-4">
            <Link to="/opportunites"><ArrowLeft className="mr-2 h-4 w-4" />Retour aux opportunités</Link>
          </Button>
          <div className="flex items-start gap-3 mb-2">
            <StatusBadge status={opp.statut} />
            <span className="text-sm text-primary-foreground/60 font-mono">{opp.reference}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-primary-foreground">{opp.titre}</h1>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Description</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground leading-relaxed">{opp.description}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Documents requis</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {opp.documentsRequis.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-muted-foreground" />{doc}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div><p className="text-xs text-muted-foreground mb-1">Type</p><p className="text-sm font-medium">{OPPORTUNITY_TYPES[opp.type]}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Catégorie</p><p className="text-sm font-medium">{opp.categorie}</p></div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Région</p><p className="text-sm font-medium">{opp.region}</p></div></div>
                  <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Structure émettrice</p><p className="text-sm font-medium">{opp.structureEmettrice}</p></div></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Date de publication</p><p className="text-sm font-medium">{new Date(opp.datePublication).toLocaleDateString('fr-FR')}</p></div></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-destructive" /><div><p className="text-xs text-muted-foreground">Date limite</p><p className="text-sm font-medium text-destructive">{new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</p></div></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Mode de réponse</p><p className="text-sm font-medium">{opp.modeReponse}</p></div>
                </CardContent>
              </Card>

              {opp.statut === 'publiee' && (
                <Button asChild className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">
                  <Link to="/connexion"><Send className="mr-2 h-4 w-4" />Soumettre ma candidature</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
