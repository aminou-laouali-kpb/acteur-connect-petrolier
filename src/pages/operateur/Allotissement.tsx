import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockCampagnes, getLotsForCampagne, getEligibleCompaniesForLot, LOT_STATUT_LABELS } from '@/data/operateur-mock-data';
import { LotCard } from '@/components/operateur/LotCard';
import { toast } from 'sonner';
import { Download, Plus, AlertTriangle } from 'lucide-react';

export default function Allotissement() {
  const [campagneId, setCampagneId] = useState(mockCampagnes[0].id);
  const lots = getLotsForCampagne(campagneId);
  const gaps = lots.filter(l => getEligibleCompaniesForLot(l).length < 2);
  const byStatut = lots.reduce((acc, l) => { (acc[l.statut] ??= 0); acc[l.statut]++; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold">Scoping &amp; Allotissement</h1>
          <p className="text-sm text-muted-foreground">Décomposition du périmètre TAR en lots contractuels</p>
        </div>
        <div className="flex gap-2">
          <Select value={campagneId} onValueChange={setCampagneId}>
            <SelectTrigger className="w-[280px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {mockCampagnes.map(c => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => toast.success('Plan d\'allotissement exporté (démo)')}><Download className="h-4 w-4 mr-1.5" /> Exporter</Button>
          <Button size="sm" className="bg-petroleum hover:bg-petroleum/90"><Plus className="h-4 w-4 mr-1.5" /> Nouveau lot</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {(['identifie','scope','ao_lance','attribue','execute','cloture'] as const).map(s => (
          <Card key={s}><CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">{LOT_STATUT_LABELS[s]}</p>
            <p className="text-xl font-bold">{byStatut[s] ?? 0}</p>
          </CardContent></Card>
        ))}
      </div>

      {gaps.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">{gaps.length} lot(s) à risque de dépendance étrangère</p>
              <p className="text-muted-foreground">Moins de 2 prestataires locaux qualifiés dans la famille. Action recommandée : campagne de recensement ciblée auprès du Ministère.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">Lots ({lots.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {lots.map(l => <LotCard key={l.id} lot={l} onAction={() => toast.info(`Édition du lot ${l.reference} (démo)`)} />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
