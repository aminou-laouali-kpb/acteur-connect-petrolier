import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAppelsOffresOperateur, mockLots, AO_STATUT_LABELS } from '@/data/operateur-mock-data';
import { ArrowRight, Plus, FileSearch } from 'lucide-react';

const TYPE_LABELS = { rfi: 'RFI — Manif. intérêt', rfq: 'RFQ — Appel d\'offres' };

export default function AppelsOffres() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Appels d'offres (RFI / RFQ)</h1>
          <p className="text-sm text-muted-foreground">Consultations lancées vers les prestataires du registre</p>
        </div>
        <Button size="sm" className="bg-petroleum hover:bg-petroleum/90"><Plus className="h-4 w-4 mr-1.5" /> Lancer un AO</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mockAppelsOffresOperateur.map(a => {
          const lot = mockLots.find(l => l.id === a.lotId);
          return (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-muted-foreground">{a.reference}</p>
                    <h3 className="font-semibold leading-tight">{a.titre}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline">{TYPE_LABELS[a.type]}</Badge>
                    <Badge className={a.statut === 'publie' ? 'bg-petroleum' : a.statut === 'attribue' ? 'bg-success' : ''} variant={a.statut === 'publie' || a.statut === 'attribue' ? 'default' : 'secondary'}>{AO_STATUT_LABELS[a.statut]}</Badge>
                  </div>
                </div>
                {lot && <p className="text-xs text-muted-foreground">Lot : {lot.reference} · {lot.famille}</p>}
                <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t">
                  <div><p className="text-muted-foreground">Publication</p><p className="font-medium">{new Date(a.datePublication).toLocaleDateString('fr-FR')}</p></div>
                  <div><p className="text-muted-foreground">Clôture</p><p className="font-medium">{new Date(a.dateLimite).toLocaleDateString('fr-FR')}</p></div>
                  <div><p className="text-muted-foreground">Offres reçues</p><p className="font-medium">{a.offres.length} / {a.invites.length}</p></div>
                </div>
                <div className="flex justify-end pt-1">
                  <Button asChild variant="ghost" size="sm"><Link to={`/operateur/appels-offres/${a.id}`}><FileSearch className="h-3.5 w-3.5 mr-1" /> Détail <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
