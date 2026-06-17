import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCampagnes, TAR_PHASE_LABELS, getLotsForCampagne } from '@/data/operateur-mock-data';
import { CalendarClock, ArrowRight, Plus } from 'lucide-react';

export default function Campagnes() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Campagnes de maintenance</h1>
          <p className="text-sm text-muted-foreground">Grandes maintenances (TAR) et arrêts planifiés</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1.5" /> Nouvelle campagne</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mockCampagnes.map(c => {
          const lots = getLotsForCampagne(c.id);
          const dArret = new Date(c.dateArretPrevue);
          const future = dArret.getTime() > Date.now();
          return (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{c.reference}</p>
                    <h3 className="font-heading font-bold mt-0.5">{c.nom}</h3>
                  </div>
                  <Badge variant={future ? 'default' : 'secondary'} className={future ? 'bg-petroleum' : ''}>
                    {TAR_PHASE_LABELS[c.phaseActuelle]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="grid grid-cols-3 gap-3 text-xs pt-2 border-t">
                  <div>
                    <p className="text-muted-foreground">Arrêt</p>
                    <p className="font-semibold flex items-center gap-1"><CalendarClock className="h-3 w-3" /> {dArret.toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Durée</p>
                    <p className="font-semibold">{c.dureeArretJours} jours</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lots</p>
                    <p className="font-semibold">{lots.length}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button asChild variant="ghost" size="sm"><Link to={`/operateur/campagnes/${c.id}`}>Ouvrir <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
