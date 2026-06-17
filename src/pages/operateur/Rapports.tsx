import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sorazCampagne, mockEngagementsCL } from '@/data/operateur-mock-data';
import { FileText, Download, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const RAPPORTS = [
  { id: 'r1', nom: 'Rapport mensuel CL — Avril 2026', date: '2026-04-30', statut: 'Soumis', destinataire: 'Ministère du Pétrole' },
  { id: 'r2', nom: 'Rapport mensuel CL — Mars 2026', date: '2026-03-31', statut: 'Validé', destinataire: 'Ministère du Pétrole' },
  { id: 'r3', nom: 'Rapport pré-TAR — GM SORAZ 2026', date: '2026-02-15', statut: 'Validé', destinataire: 'Ministère du Pétrole' },
];

export default function Rapports() {
  const handleGenerate = () => toast.success('Rapport contenu local généré (PDF mock) — prêt à transmettre au Ministère');
  const handleSend = () => toast.success('Rapport transmis au Ministère via la plateforme');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Rapports réglementaires Ministère</h1>
        <p className="text-sm text-muted-foreground">Conformité Ordonnance n°2024-34 du 2 août 2024 — Contenu Local</p>
      </div>

      <Card className="border-petroleum/30 bg-petroleum/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-petroleum" /> Générer un nouveau rapport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Synthèse automatique des engagements contenu local pour la campagne <strong>{sorazCampagne.nom}</strong></p>
          <div className="grid sm:grid-cols-3 gap-2 text-xs">
            {mockEngagementsCL.map(e => (
              <div key={e.poste} className="p-2 bg-background rounded border">
                <p className="text-muted-foreground capitalize">{e.poste.replace(/_/g, ' ')}</p>
                <p className="font-bold">{e.realisePct}% / {e.objectifPct}%</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleGenerate} className="bg-petroleum hover:bg-petroleum/90"><FileText className="h-4 w-4 mr-1.5" /> Générer le rapport PDF</Button>
            <Button variant="outline" onClick={handleSend}><Send className="h-4 w-4 mr-1.5" /> Transmettre au Ministère</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Historique des rapports transmis</CardTitle></CardHeader>
        <CardContent className="divide-y">
          {RAPPORTS.map(r => (
            <div key={r.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-petroleum shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{r.nom}</p>
                  <p className="text-xs text-muted-foreground">{r.destinataire} · {new Date(r.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={r.statut === 'Validé' ? 'default' : 'secondary'} className={r.statut === 'Validé' ? 'bg-success' : ''}>
                  {r.statut === 'Validé' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {r.statut}
                </Badge>
                <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
