import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { mockApplications } from '@/data/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export default function ApplicationManagement() {
  const [statusFilter, setStatusFilter] = useState('all');
  const filtered = mockApplications.filter(a => statusFilter === 'all' || a.statut === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Candidatures reçues</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="soumise">Soumise</SelectItem>
            <SelectItem value="en_examen">En examen</SelectItem>
            <SelectItem value="retenue">Retenue</SelectItem>
            <SelectItem value="non_retenue">Non retenue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entreprise</TableHead>
                <TableHead>Opportunité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium text-sm">{app.entrepriseNom}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate">{app.opportuniteTitre}</TableCell>
                  <TableCell><StatusBadge status={app.statut} /></TableCell>
                  <TableCell className="text-sm">{new Date(app.dateSoumission).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-sm">{app.documents.length}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => toast.success('Statut mis à jour')}>Traiter</Button>
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
