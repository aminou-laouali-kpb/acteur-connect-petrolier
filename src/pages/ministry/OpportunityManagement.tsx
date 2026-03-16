import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { DeadlineBadge } from '@/components/DeadlineBadge';
import { mockOpportunities, mockApplications } from '@/data/mock-data';
import { REGIONS, CATEGORIES, OPPORTUNITY_TYPES } from '@/types';
import { Plus, Edit, Eye, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Pagination } from '@/components/Pagination';

const ITEMS_PER_PAGE = 6;

export default function OpportunityManagement() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(mockOpportunities.length / ITEMS_PER_PAGE);
  const paged = mockOpportunities.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getCandidatureCount = (oppId: string) => mockApplications.filter(a => a.opportuniteId === oppId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Gestion des opportunités</h1>
          <p className="text-sm text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold hover:bg-gold/90 text-gold-foreground"><Plus className="mr-2 h-4 w-4" />Nouvelle opportunité</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Créer une opportunité</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Titre *</Label><Input placeholder="Titre de l'opportunité" /></div>
                <div><Label>Référence *</Label><Input placeholder="AMI-2026-XXX" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Type *</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>{Object.entries(OPPORTUNITY_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Catégorie *</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Région *</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>{REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Structure émettrice *</Label><Input placeholder="Nom de la structure" /></div>
              </div>
              <div><Label>Description *</Label><Textarea placeholder="Description détaillée de l'opportunité..." rows={4} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Date de publication *</Label><Input type="date" /></div>
                <div><Label>Date limite *</Label><Input type="date" /></div>
              </div>
              <div><Label>Documents requis</Label><Textarea placeholder="Un document par ligne..." rows={3} /></div>
              <div>
                <Label>Mode de réponse *</Label>
                <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronique">Dépôt électronique uniquement</SelectItem>
                    <SelectItem value="physique">Dépôt physique</SelectItem>
                    <SelectItem value="mixte">Dépôt physique et électronique</SelectItem>
                    <SelectItem value="inscription">Inscription en ligne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gold hover:bg-gold/90 text-gold-foreground" onClick={() => toast.success('Opportunité créée avec succès')}>Publier l'opportunité</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Date limite</TableHead>
                <TableHead>Candidatures</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map(opp => (
                <TableRow key={opp.id}>
                  <TableCell className="font-mono text-sm">{opp.reference}</TableCell>
                  <TableCell className="font-medium text-sm max-w-xs truncate">{opp.titre}</TableCell>
                  <TableCell className="text-sm">{opp.type}</TableCell>
                  <TableCell className="text-sm">{opp.region}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">{new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</span>
                      <DeadlineBadge dateLimite={opp.dateLimite} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{getCandidatureCount(opp.id)}</span>
                  </TableCell>
                  <TableCell><StatusBadge status={opp.statut} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon"><Archive className="h-4 w-4" /></Button>}
                        title="Archiver cette opportunité ?"
                        description="Cette action archivera l'opportunité et elle ne sera plus visible sur le portail public."
                        confirmLabel="Archiver"
                        onConfirm={() => toast.info('Opportunité archivée')}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
