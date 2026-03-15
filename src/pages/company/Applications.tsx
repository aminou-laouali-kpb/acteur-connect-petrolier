import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { mockApplications } from '@/data/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanyApplications() {
  const myApps = mockApplications.filter(a => a.entrepriseId === '1');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Mes candidatures</h1>
          <p className="text-sm text-muted-foreground">{myApps.length} candidature(s)</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de soumission</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myApps.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium text-sm max-w-xs truncate">{app.opportuniteTitre}</TableCell>
                  <TableCell><StatusBadge status={app.statut} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(app.dateSoumission).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-sm">{app.documents.length} fichier(s)</TableCell>
                  <TableCell><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {myApps.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold mb-2">Aucune candidature</h3>
          <p className="text-sm text-muted-foreground">Consultez les opportunités pour soumettre votre première candidature.</p>
        </div>
      )}
    </div>
  );
}
