import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCampagnes, getLotsForCampagne, getAOsForCampagne, TAR_PHASE_LABELS, LOT_STATUT_LABELS, AO_STATUT_LABELS } from '@/data/operateur-mock-data';
import { CampagneTimeline } from '@/components/operateur/CampagneTimeline';
import { ArrowLeft } from 'lucide-react';

export default function CampagneDetail() {
  const { id } = useParams();
  const campagne = mockCampagnes.find(c => c.id === id);
  if (!campagne) return <p>Campagne introuvable.</p>;
  const lots = getLotsForCampagne(campagne.id);
  const aos = getAOsForCampagne(campagne.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm"><Link to="/operateur/campagnes"><ArrowLeft className="h-4 w-4 mr-1.5" /> Campagnes</Link></Button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{campagne.reference}</p>
          <h1 className="text-2xl font-heading font-bold mt-1">{campagne.nom}</h1>
          <p className="text-sm text-muted-foreground max-w-3xl mt-1">{campagne.description}</p>
        </div>
        <Badge className="bg-petroleum text-white">{TAR_PHASE_LABELS[campagne.phaseActuelle]}</Badge>
      </div>

      <Card>
        <CardContent className="p-5"><CampagneTimeline phase={campagne.phaseActuelle} /></CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-3 text-sm">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Arrêt prévu</p><p className="font-bold">{new Date(campagne.dateArretPrevue).toLocaleDateString('fr-FR')}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Durée</p><p className="font-bold">{campagne.dureeArretJours} jours</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Budget</p><p className="font-bold">{campagne.budgetMillionsFCFA.toLocaleString('fr-FR')} M FCFA</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Effectif pic</p><p className="font-bold">{campagne.effectifPicEstime.toLocaleString('fr-FR')}</p></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Lots ({lots.length})</CardTitle></CardHeader>
          <CardContent className="divide-y">
            {lots.map(l => (
              <div key={l.id} className="py-2 text-sm flex items-center justify-between gap-2">
                <span className="truncate"><span className="font-mono text-xs text-muted-foreground mr-2">{l.reference}</span>{l.intitule}</span>
                <Badge variant="outline">{LOT_STATUT_LABELS[l.statut]}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Appels d'offres ({aos.length})</CardTitle></CardHeader>
          <CardContent className="divide-y">
            {aos.map(a => (
              <Link key={a.id} to={`/operateur/appels-offres/${a.id}`} className="block py-2 text-sm hover:bg-muted/50 rounded px-2 -mx-2">
                <div className="flex items-center justify-between">
                  <span className="truncate"><span className="font-mono text-xs text-muted-foreground mr-2">{a.reference}</span>{a.titre}</span>
                  <Badge variant="outline">{AO_STATUT_LABELS[a.statut]}</Badge>
                </div>
              </Link>
            ))}
            {aos.length === 0 && <p className="text-sm text-muted-foreground py-2">Aucun appel d'offres.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
