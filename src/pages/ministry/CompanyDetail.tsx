import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { mockCompanies } from '@/data/mock-data';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, AlertTriangle, ChevronRight, Home, Award, Wrench, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Badge } from '@/components/ui/badge';

export default function CompanyDetail() {
  const { id } = useParams();
  const company = mockCompanies.find(c => c.id === id);

  if (!company) return <div className="text-center py-16"><h1 className="text-xl font-bold">Entreprise introuvable</h1></div>;

  // Mock references
  const references = [
    { titre: 'Maintenance préventive Bloc Agadem', client: 'CNPC Niger', periode: '2022-2024', montant: '450M FCFA' },
    { titre: 'Réhabilitation compresseurs SORAZ', client: 'SORAZ SA', periode: '2022', montant: '120M FCFA' },
    { titre: 'Installation électrique site minier', client: 'SOPAMIN', periode: '2021', montant: '85M FCFA' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/ministere/dashboard" className="hover:text-foreground flex items-center gap-1"><Home className="h-3 w-3" />Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/ministere/entreprises" className="hover:text-foreground">Entreprises</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{company.sigle}</span>
      </nav>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">{company.raisonSociale}</h1>
          <div className="flex items-center gap-3 mt-1">
            <StatusBadge status={company.status} />
            <span className="text-sm text-muted-foreground">{company.nif}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <ConfirmDialog
            trigger={<Button className="bg-success hover:bg-success/90 text-success-foreground"><CheckCircle className="mr-2 h-4 w-4" />Valider</Button>}
            title="Valider cette entreprise ?"
            description={`Confirmez-vous la validation du profil de ${company.raisonSociale} ? L'entreprise pourra ensuite postuler aux opportunités.`}
            confirmLabel="Valider"
            onConfirm={() => toast.success(`${company.sigle} validé`)}
          />
          <Button variant="outline" onClick={() => toast.info('Demande envoyée')}><MessageSquare className="mr-2 h-4 w-4" />Complément</Button>
          <ConfirmDialog
            trigger={<Button variant="outline" className="text-destructive"><XCircle className="mr-2 h-4 w-4" />Rejeter</Button>}
            title="Rejeter cette entreprise ?"
            description={`Cette action rejettera le dossier de ${company.raisonSociale}. L'entreprise sera notifiée et devra soumettre un nouveau dossier.`}
            confirmLabel="Rejeter"
            variant="destructive"
            onConfirm={() => toast.error('Entreprise rejetée')}
          />
          <ConfirmDialog
            trigger={<Button variant="outline"><AlertTriangle className="mr-2 h-4 w-4" />Suspendre</Button>}
            title="Suspendre cette entreprise ?"
            description={`Le profil de ${company.raisonSociale} sera suspendu. L'entreprise ne pourra plus postuler aux opportunités jusqu'à réactivation.`}
            confirmLabel="Suspendre"
            variant="destructive"
            onConfirm={() => toast.warning('Entreprise suspendue')}
          />
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

          {/* Certifications */}
          {company.certifications && company.certifications.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-gold" />Certifications</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.certifications.map((cert, i) => (
                    <Badge key={i} variant="secondary" className="text-sm">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Équipements */}
          {company.equipements && company.equipements.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-gold" />Équipements</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.equipements.map((eq, i) => (
                    <Badge key={i} variant="outline" className="text-sm">{eq}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Références projets */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-gold" />Références projets</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {references.map((ref, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <h4 className="font-medium text-sm">{ref.titre}</h4>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Client : <strong className="text-foreground">{ref.client}</strong></span>
                      <span>Période : <strong className="text-foreground">{ref.periode}</strong></span>
                      <span>Montant : <strong className="text-foreground">{ref.montant}</strong></span>
                    </div>
                  </div>
                ))}
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
