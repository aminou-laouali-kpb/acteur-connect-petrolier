import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEngagementsCL, mockLots, sorazCampagne, LOT_STATUT_LABELS } from '@/data/operateur-mock-data';
import { ContenuLocalGauge } from '@/components/operateur/ContenuLocalGauge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ENG_LABELS = {
  depenses_locales: 'Dépenses prestataires nigériens',
  main_oeuvre_nigerienne: 'Main-d\'œuvre nigérienne',
  materiaux_locaux: 'Matériaux d\'origine locale',
};

export default function ContenuLocal() {
  const lotData = mockLots.map(l => ({
    nom: l.reference,
    'Objectif CL': sorazCampagne.objectifContenuLocalPct,
    'Réalisé CL': Math.round(40 + Math.random() * 40),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord — Contenu Local</h1>
        <p className="text-sm text-muted-foreground">Suivi temps réel des engagements (Ordonnance n°2024-34)</p>
      </div>

      <Card className="border-l-4 border-l-petroleum">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-heading font-semibold">Contenu local global — {sorazCampagne.nom}</h3>
              <p className="text-xs text-muted-foreground">Objectif réglementaire : {sorazCampagne.objectifContenuLocalPct}%</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-petroleum">{sorazCampagne.realiseContenuLocalPct}%</p>
              <Badge variant={sorazCampagne.realiseContenuLocalPct >= sorazCampagne.objectifContenuLocalPct ? 'default' : 'secondary'} className="bg-warning text-warning-foreground">
                Écart {sorazCampagne.objectifContenuLocalPct - sorazCampagne.realiseContenuLocalPct} pts
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        {mockEngagementsCL.map(e => (
          <Card key={e.poste}><CardContent className="p-5">
            <ContenuLocalGauge label={ENG_LABELS[e.poste]} objectif={e.objectifPct} realise={e.realisePct} />
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Contenu local par lot</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={lotData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nom" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Objectif CL" fill="hsl(214 20% 70%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Réalisé CL" fill="hsl(207 70% 30%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Détail par lot</CardTitle></CardHeader>
        <CardContent className="divide-y text-sm">
          {mockLots.map(l => (
            <div key={l.id} className="py-2 flex items-center justify-between">
              <span className="truncate"><span className="font-mono text-xs text-muted-foreground mr-2">{l.reference}</span>{l.intitule}</span>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px]">{LOT_STATUT_LABELS[l.statut]}</Badge>
                <span className="text-xs text-muted-foreground">{l.budgetEstimeMFCFA} M FCFA</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
