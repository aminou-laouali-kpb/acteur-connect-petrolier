import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { mockCompanies } from '@/data/mock-data';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanyDetail() {
  const { id } = useParams();
  const company = mockCompanies.find(c => c.id === id);

  if (!company) return <div className="text-center py-16"><h1 className="text-xl font-bold">Entreprise introuvable</h1></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm"><Link to="/ministere/entreprises"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">{company.raisonSociale}</h1>
          <div className="flex items-center gap-3 mt-1">
            <StatusBadge status={company.status} />
            <span className="text-sm text-muted-foreground">{company.nif}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => toast.success('Entreprise validée')} className="bg-success hover:bg-success/90 text-success-foreground"><CheckCircle className="mr-2 h-4 w-4" />Valider</Button>
          <Button variant="outline" onClick={() => toast.info('Demande envoyée')}><MessageSquare className="mr-2 h-4 w-4" />Complément</Button>
          <Button variant="outline" onClick={() => toast.error('Entreprise rejetée')} className="text-destructive"><XCircle className="mr-2 h-4 w-4" />Rejeter</Button>
          <Button variant="outline" onClick={() => toast.warning('Entreprise suspendue')}><AlertTriangle className="mr-2 h-4 w-4" />Suspendre</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Raison sociale :</span> <strong>{company.raisonSociale}</strong></div>
                <div><span className="text-muted-foreground">Sigle :</span> <strong>{company.sigle}</strong></div>
                <div><span className="text-muted-foreground">Forme juridique :</span> <strong>{company.formeJuridique}</strong></div>
                <div><span className="text-muted-foreground">NIF :</span> <strong>{company.nif}</strong></div>
                <div><span className="text-muted-foreground">RCCM :</span> <strong>{company.rccm}</strong></div>
                <div><span className="text-muted-foreground">Date création :</span> <strong>{new Date(company.dateCreation).toLocaleDateString('fr-FR')}</strong></div>
                <div><span className="text-muted-foreground">Région :</span> <strong>{company.region}</strong></div>
                <div><span className="text-muted-foreground">Ville :</span> <strong>{company.ville}</strong></div>
                <div><span className="text-muted-foreground">Email :</span> <strong>{company.email}</strong></div>
                <div><span className="text-muted-foreground">Téléphone :</span> <strong>{company.telephone}</strong></div>
                <div><span className="text-muted-foreground">Secteur :</span> <strong>{company.secteurPrincipal}</strong></div>
                <div><span className="text-muted-foreground">Type acteur :</span> <strong>{company.typeActeur}</strong></div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{company.descriptionCourte}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Capacités</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><span className="text-muted-foreground">Effectif total</span><p className="text-lg font-bold">{company.effectifTotal}</p></div>
                <div><span className="text-muted-foreground">Effectif nigérien</span><p className="text-lg font-bold">{company.effectifNigerien}</p></div>
                <div><span className="text-muted-foreground">Taille</span><p className="text-lg font-bold">{company.tailleEntreprise}</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notes internes</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="border rounded-lg p-3 bg-muted/50">
                <p className="text-sm"><strong>Ibrahim Souley</strong> — 08/03/2026</p>
                <p className="text-sm text-muted-foreground">Dossier complet. Références vérifiées auprès de CNPC Niger.</p>
              </div>
              <Textarea placeholder="Ajouter une note interne..." rows={2} />
              <Button size="sm" variant="outline">Ajouter la note</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Complétion du profil</p>
              <Progress value={company.completionRate} className="mb-2" />
              <p className="text-sm font-bold">{company.completionRate}%</p>
              <p className="text-xs text-muted-foreground mt-3">Inscrit le {new Date(company.dateInscription).toLocaleDateString('fr-FR')}</p>
              <p className="text-xs text-muted-foreground">Mis à jour le {new Date(company.derniereMiseAJour).toLocaleDateString('fr-FR')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Documents soumis</CardTitle></CardHeader>
            <CardContent>
              {['NIF', 'RCCM', 'Chambre de Commerce', 'CNI Représentant', 'Statuts', 'Attestation localisation'].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">{d}</span>
                  <span className="text-xs text-success">✓ Reçu</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Historique</CardTitle></CardHeader>
            <CardContent>
              {[
                { date: '14/03/2026', action: 'Profil validé' },
                { date: '08/03/2026', action: 'Documents vérifiés' },
                { date: '01/03/2026', action: 'Dossier soumis' },
                { date: '15/01/2025', action: 'Inscription' },
              ].map((h, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
                  <span className="text-xs text-muted-foreground w-20">{h.date}</span>
                  <span className="text-sm">{h.action}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
