import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { mockCompanies } from '@/data/mock-data';
import { REGIONS } from '@/types';
import { Search, Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanyManagement() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = mockCompanies.filter(c => {
    if (search && !c.raisonSociale.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== 'all' && c.region !== region) return false;
    if (status !== 'all' && c.status !== status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Gestion des entreprises</h1>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={region} onValueChange={setRegion}><SelectTrigger className="w-[150px]"><SelectValue placeholder="Région" /></SelectTrigger><SelectContent><SelectItem value="all">Toutes</SelectItem>{REGIONS.map(r=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
        <Select value={status} onValueChange={setStatus}><SelectTrigger className="w-[180px]"><SelectValue placeholder="Statut" /></SelectTrigger><SelectContent><SelectItem value="all">Tous statuts</SelectItem><SelectItem value="valide">Validé</SelectItem><SelectItem value="en_revue">En revue</SelectItem><SelectItem value="complement_demande">Complément</SelectItem><SelectItem value="brouillon">Brouillon</SelectItem><SelectItem value="suspendu">Suspendu</SelectItem></SelectContent></Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entreprise</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Complétion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell><div><p className="font-medium text-sm">{c.raisonSociale}</p><p className="text-xs text-muted-foreground">{c.sigle}</p></div></TableCell>
                  <TableCell className="text-sm font-mono">{c.nif}</TableCell>
                  <TableCell className="text-sm">{c.region}</TableCell>
                  <TableCell className="text-sm">{c.secteurPrincipal}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell><div className="flex items-center gap-2"><Progress value={c.completionRate} className="w-16 h-2" /><span className="text-xs">{c.completionRate}%</span></div></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button asChild variant="ghost" size="icon" title="Voir"><Link to={`/ministere/entreprises/${c.id}`}><Eye className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="icon" title="Valider" onClick={() => toast.success(`${c.sigle} validé`)}><CheckCircle className="h-4 w-4 text-success" /></Button>
                      <Button variant="ghost" size="icon" title="Demander complément" onClick={() => toast.info('Demande envoyée')}><MessageSquare className="h-4 w-4 text-warning" /></Button>
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
