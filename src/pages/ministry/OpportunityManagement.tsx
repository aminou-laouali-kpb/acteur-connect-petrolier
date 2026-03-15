import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { mockOpportunities } from '@/data/mock-data';
import { Plus, Edit, Eye, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function OpportunityManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Gestion des opportunités</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold hover:bg-gold/90 text-gold-foreground"><Plus className="mr-2 h-4 w-4" />Nouvelle opportunité</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Créer une opportunité</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Titre</Label><Input placeholder="Titre de l'opportunité" /></div>
                <div><Label>Référence</Label><Input placeholder="AMI-2026-XXX" /></div>
              </div>
              <div><Label>Description</Label><Textarea placeholder="Description détaillée..." rows={4} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Date de publication</Label><Input type="date" /></div>
                <div><Label>Date limite</Label><Input type="date" /></div>
              </div>
              <Button className="bg-gold hover:bg-gold/90 text-gold-foreground" onClick={() => toast.success('Opportunité créée')}>Publier l'opportunité</Button>
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
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOpportunities.map(opp => (
                <TableRow key={opp.id}>
                  <TableCell className="font-mono text-sm">{opp.reference}</TableCell>
                  <TableCell className="font-medium text-sm max-w-xs truncate">{opp.titre}</TableCell>
                  <TableCell className="text-sm">{opp.type}</TableCell>
                  <TableCell className="text-sm">{opp.region}</TableCell>
                  <TableCell className="text-sm">{new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell><StatusBadge status={opp.statut} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => toast.info('Archivé')}><Archive className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
