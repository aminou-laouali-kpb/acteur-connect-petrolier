import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { REGIONS, CATEGORIES } from '@/types';
import { toast } from 'sonner';
import { Save, Upload } from 'lucide-react';

export default function CompanyProfile() {
  const { currentCompany } = useAuth();
  const c = currentCompany!;

  const handleSave = () => toast.success('Profil sauvegardé', { description: 'Vos modifications ont été enregistrées.' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Profil entreprise</h1>
          <p className="text-sm text-muted-foreground">Complétez votre dossier pour être qualifié</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{c.completionRate}% complété</p>
            <Progress value={c.completionRate} className="w-32 h-2" />
          </div>
          <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-gold-foreground"><Save className="mr-2 h-4 w-4" />Sauvegarder</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="general">Informations générales</TabsTrigger>
          <TabsTrigger value="representant">Représentant légal</TabsTrigger>
          <TabsTrigger value="activites">Activités</TabsTrigger>
          <TabsTrigger value="capacites">Capacités</TabsTrigger>
          <TabsTrigger value="references">Références</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="declaration">Déclaration</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card><CardHeader><CardTitle>Informations générales</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Raison sociale</Label><Input defaultValue={c.raisonSociale} /></div>
              <div><Label>Sigle</Label><Input defaultValue={c.sigle} /></div>
              <div><Label>Forme juridique</Label><Select defaultValue={c.formeJuridique.toLowerCase()}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sa">SA</SelectItem><SelectItem value="sarl">SARL</SelectItem><SelectItem value="sas">SAS</SelectItem></SelectContent></Select></div>
              <div><Label>NIF</Label><Input defaultValue={c.nif} /></div>
              <div><Label>RCCM</Label><Input defaultValue={c.rccm} /></div>
              <div><Label>N° Chambre de Commerce</Label><Input defaultValue="CC-NIA-2018-456" /></div>
              <div><Label>Date de création</Label><Input type="date" defaultValue={c.dateCreation} /></div>
              <div><Label>Pays</Label><Input defaultValue="Niger" disabled /></div>
              <div><Label>Région</Label><Select defaultValue={c.region}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{REGIONS.map(r=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Ville</Label><Input defaultValue={c.ville} /></div>
              <div><Label>Adresse</Label><Input defaultValue="Quartier Plateau, Rue NB-42" /></div>
              <div><Label>Email officiel</Label><Input type="email" defaultValue={c.email} /></div>
              <div><Label>Téléphone</Label><Input defaultValue={c.telephone} /></div>
              <div><Label>WhatsApp</Label><Input defaultValue={c.telephone} /></div>
              <div><Label>Site web</Label><Input defaultValue={c.siteWeb || ''} placeholder="https://" /></div>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="representant">
          <Card><CardHeader><CardTitle>Représentant légal</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Nom</Label><Input defaultValue="Diallo" /></div>
              <div><Label>Prénom</Label><Input defaultValue="Moussa" /></div>
              <div><Label>Fonction</Label><Input defaultValue="Directeur Général" /></div>
              <div><Label>Téléphone</Label><Input defaultValue="+227 90 12 34 56" /></div>
              <div><Label>Email</Label><Input type="email" defaultValue="m.diallo@ssi-niger.ne" /></div>
              <div><Label>Type de pièce d'identité</Label><Select defaultValue="cni"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="cni">CNI</SelectItem><SelectItem value="passeport">Passeport</SelectItem></SelectContent></Select></div>
              <div><Label>Numéro de pièce</Label><Input defaultValue="CNI-2024-78901" /></div>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="activites">
          <Card><CardHeader><CardTitle>Activités</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Secteur principal</Label><Select defaultValue={c.secteurPrincipal}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map(cat=><SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Type d'acteur</Label><Select defaultValue="prestataire"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="prestataire">Prestataire de services</SelectItem><SelectItem value="fournisseur">Fournisseur</SelectItem><SelectItem value="soustraitant">Sous-traitant</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Description courte</Label><Textarea defaultValue={c.descriptionCourte} rows={3} /></div>
            <div><Label>Description détaillée</Label><Textarea defaultValue="SAHEL SERVICES INDUSTRIELS SA est une société spécialisée dans la maintenance industrielle, la soudure haute pression et la mécanique de précision. Nous intervenons principalement sur les installations pétrolières et minières au Niger, avec une expertise reconnue en maintenance préventive et corrective." rows={5} /></div>
            <div><Label>Zones d'intervention</Label><Input defaultValue="Niamey, Agadez, Diffa, Zinder" /></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="capacites">
          <Card><CardHeader><CardTitle>Capacités et moyens</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>Effectif total</Label><Input type="number" defaultValue={c.effectifTotal} /></div>
              <div><Label>Effectif nigérien</Label><Input type="number" defaultValue={c.effectifNigerien} /></div>
              <div><Label>Effectif technique</Label><Input type="number" defaultValue="45" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Taille d'entreprise</Label><Select defaultValue={c.tailleEntreprise.toLowerCase()}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tpe">TPE</SelectItem><SelectItem value="pme">PME</SelectItem><SelectItem value="eti">ETI</SelectItem><SelectItem value="ge">GE</SelectItem></SelectContent></Select></div>
              <div><Label>Certifications</Label><Input defaultValue="ISO 9001, Certification HSE" /></div>
            </div>
            <div><Label>Équipements principaux</Label><Textarea defaultValue="12 postes de soudure TIG/MIG, 3 groupes électrogènes, 2 camions-ateliers, outillage de métrologie" rows={3} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Politique HSE</Label><Select defaultValue="oui"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="oui">Oui</SelectItem><SelectItem value="non">Non</SelectItem></SelectContent></Select></div>
              <div><Label>Assurance professionnelle</Label><Select defaultValue="oui"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="oui">Oui</SelectItem><SelectItem value="non">Non</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Capacité de mobilisation rapide</Label><Select defaultValue="48h"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="24h">24 heures</SelectItem><SelectItem value="48h">48 heures</SelectItem><SelectItem value="1semaine">1 semaine</SelectItem></SelectContent></Select></div>
            <div><Label>Besoins de renforcement</Label><Textarea defaultValue="Formation en soudure sous-marine, certification ASME" rows={2} /></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="references">
          <Card><CardHeader><CardTitle>Références</CardTitle></CardHeader><CardContent className="space-y-4">
            <div><Label>Principaux clients</Label><Textarea defaultValue="CNPC Niger Petroleum, SORAZ, SOPAMIN, Orano Mining Niger" rows={2} /></div>
            <div><Label>Expérience dans le secteur pétrolier</Label><Textarea defaultValue="Maintenance des installations de production du Bloc Agadem (2020-2024), révision des compresseurs pour SORAZ (2022)" rows={3} /></div>
            <div><Label>Expérience hors secteur pétrolier</Label><Textarea defaultValue="Maintenance électromécanique pour la cimenterie de Malbaza (2019-2021)" rows={2} /></div>
            <h4 className="font-heading font-semibold mt-6 mb-3">Projets de référence</h4>
            {[
              { titre: 'Maintenance préventive Bloc Agadem', client: 'CNPC Niger', periode: '2022-2024', montant: '450M FCFA' },
              { titre: 'Réhabilitation compresseurs SORAZ', client: 'SORAZ SA', periode: '2022', montant: '120M FCFA' },
              { titre: 'Installation électrique site minier', client: 'SOPAMIN', periode: '2021', montant: '85M FCFA' },
            ].map((p, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><Label>Titre du projet</Label><Input defaultValue={p.titre} /></div>
                  <div><Label>Client</Label><Input defaultValue={p.client} /></div>
                  <div><Label>Période</Label><Input defaultValue={p.periode} /></div>
                  <div><Label>Montant</Label><Input defaultValue={p.montant} /></div>
                </div>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card><CardHeader><CardTitle>Documents</CardTitle></CardHeader><CardContent>
            <div className="space-y-4">
              {[
                { nom: 'NIF', statut: 'uploaded' },
                { nom: 'RCCM', statut: 'uploaded' },
                { nom: 'Chambre de Commerce', statut: 'uploaded' },
                { nom: 'Pièce d\'identité du représentant', statut: 'uploaded' },
                { nom: 'Statuts de l\'entreprise', statut: 'uploaded' },
                { nom: 'Attestation de localisation', statut: 'uploaded' },
                { nom: 'Attestation d\'assurance professionnelle', statut: 'missing' },
                { nom: 'Politique HSE signée', statut: 'missing' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${doc.statut === 'uploaded' ? 'bg-success' : 'bg-warning'}`} />
                    <span className="text-sm">{doc.nom}</span>
                  </div>
                  <Button variant="outline" size="sm"><Upload className="mr-2 h-3 w-3" />{doc.statut === 'uploaded' ? 'Remplacer' : 'Téléverser'}</Button>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="declaration">
          <Card><CardHeader><CardTitle>Déclaration finale</CardTitle></CardHeader><CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">En soumettant ce dossier, je certifie que les informations fournies sont exactes et complètes. Je m'engage à mettre à jour mon profil en cas de changement.</p>
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1 rounded" /><span className="text-sm">Je certifie l'exactitude des informations fournies dans ce dossier.</span></label>
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1 rounded" /><span className="text-sm">J'autorise le Ministère du Pétrole à vérifier les informations déclarées.</span></label>
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1 rounded" /><span className="text-sm">J'accepte les conditions d'utilisation de la plateforme.</span></label>
            <Button className="bg-gold hover:bg-gold/90 text-gold-foreground">Soumettre le dossier pour validation</Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
