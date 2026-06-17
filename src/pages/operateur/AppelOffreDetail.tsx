import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockAppelsOffresOperateur, mockLots, AO_STATUT_LABELS } from '@/data/operateur-mock-data';
import { ArrowLeft, Award, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function AppelOffreDetail() {
  const { id } = useParams();
  const ao = mockAppelsOffresOperateur.find(a => a.id === id);
  if (!ao) return <p>Appel d'offres introuvable.</p>;
  const lot = mockLots.find(l => l.id === ao.lotId);

  const scored = ao.offres.map(o => ({
    ...o,
    scoreGlobal: Math.round(
      (o.noteTechnique * ao.ponderationTechnique +
       o.noteFinanciere * ao.ponderationFinanciere +
       o.noteContenuLocal * ao.ponderationContenuLocal) / 100
    ),
  })).sort((a, b) => b.scoreGlobal - a.scoreGlobal);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm"><Link to="/operateur/appels-offres"><ArrowLeft className="h-4 w-4 mr-1.5" /> Appels d'offres</Link></Button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{ao.reference}</p>
          <h1 className="text-2xl font-heading font-bold mt-1">{ao.titre}</h1>
          {lot && <p className="text-sm text-muted-foreground mt-1">Lot {lot.reference} · {lot.famille} · {lot.dureeJours}j · {lot.effectifRequis} pers.</p>}
        </div>
        <Badge className="bg-petroleum text-white">{AO_STATUT_LABELS[ao.statut]}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Grille de pondération</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-3 rounded bg-muted"><p className="text-xs text-muted-foreground">Technique</p><p className="text-2xl font-bold">{ao.ponderationTechnique}%</p></div>
            <div className="text-center p-3 rounded bg-muted"><p className="text-xs text-muted-foreground">Financière</p><p className="text-2xl font-bold">{ao.ponderationFinanciere}%</p></div>
            <div className="text-center p-3 rounded bg-petroleum/10"><p className="text-xs text-petroleum font-semibold">Contenu local</p><p className="text-2xl font-bold text-petroleum">{ao.ponderationContenuLocal}%</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Tableau comparatif des offres ({scored.length})</CardTitle>
          <Button size="sm" variant="outline" onClick={() => toast.success('Comparatif exporté (démo)')}><Download className="h-4 w-4 mr-1.5" /> Exporter</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Soumissionnaire</TableHead>
                <TableHead className="text-right">Tech.</TableHead>
                <TableHead className="text-right">Fin.</TableHead>
                <TableHead className="text-right">CL</TableHead>
                <TableHead className="text-right">Montant (M)</TableHead>
                <TableHead className="text-right">% Nig.</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scored.map((o, i) => (
                <TableRow key={o.id} className={i === 0 ? 'bg-success/5' : ''}>
                  <TableCell className="font-medium">{o.entrepriseNom}</TableCell>
                  <TableCell className="text-right">{o.noteTechnique}</TableCell>
                  <TableCell className="text-right">{o.noteFinanciere}</TableCell>
                  <TableCell className="text-right">{o.noteContenuLocal}</TableCell>
                  <TableCell className="text-right">{o.montantMFCFA}</TableCell>
                  <TableCell className="text-right">{o.effectifNigerienPct}%</TableCell>
                  <TableCell className="text-right font-bold">{o.scoreGlobal}</TableCell>
                  <TableCell className="text-right">
                    {i === 0 ? (
                      <Button size="sm" className="bg-success hover:bg-success/90 h-7 text-xs" onClick={() => toast.success(`Attribution proposée à ${o.entrepriseNom} (démo)`)}>
                        <Award className="h-3 w-3 mr-1" /> Attribuer
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">#{i + 1}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {scored.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-6">Aucune offre reçue à ce jour.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
