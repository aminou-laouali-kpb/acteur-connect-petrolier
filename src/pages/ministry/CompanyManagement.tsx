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
import { REGIONS, QUALIFICATION_STATUS_LABELS } from '@/types';
import type { QualificationStatus } from '@/types';
import { Search, Eye, ShieldCheck, ShieldAlert, Ban, RefreshCw, RotateCcw, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Pagination } from '@/components/Pagination';

const ITEMS_PER_PAGE = 8;

export default function CompanyManagement() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const hasFilters = search || region !== 'all' || status !== 'all';
  const resetFilters = () => { setSearch(''); setRegion('all'); setStatus('all'); setPage(1); };

  const filtered = mockCompanies.filter(c => {
    if (search && !c.raisonSociale.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== 'all' && c.region !== region) return false;
    if (status !== 'all' && c.status !== status) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Registre des entreprises — Parcours de qualification</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} entreprise(s) · Gestion du processus de qualification</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
        </div>
        <Select value={region} onValueChange={v => { setRegion(v); setPage(1); }}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Région" /></SelectTrigger>
          <SelectContent><SelectItem value="all">Toutes</SelectItem>{REGIONS.map(r=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={status} onValueChange={v => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {(Object.entries(QUALIFICATION_STATUS_LABELS) as [QualificationStatus, string][]).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}><RotateCcw className="mr-2 h-3 w-3" />Réinitialiser</Button>
        )}
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
                <TableHead>Statut de qualification</TableHead>
                <TableHead>Complétion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map(c => (
                <TableRow key={c.id}>
                  <TableCell><div><p className="font-medium text-sm">{c.raisonSociale}</p><p className="text-xs text-muted-foreground">{c.sigle}</p></div></TableCell>
                  <TableCell className="text-sm font-mono">{c.nif}</TableCell>
                  <TableCell className="text-sm">{c.region}</TableCell>
                  <TableCell className="text-sm">{c.secteurPrincipal}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell><div className="flex items-center gap-2"><Progress value={c.completionRate} className="w-16 h-2" /><span className="text-xs">{c.completionRate}%</span></div></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button asChild variant="ghost" size="icon" title="Voir le dossier"><Link to={`/ministere/entreprises/${c.id}`}><Eye className="h-4 w-4" /></Link></Button>
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon" title="Qualifier"><ShieldCheck className="h-4 w-4 text-success" /></Button>}
                        title="Qualifier cette entreprise ?"
                        description={`Confirmez-vous la qualification de ${c.raisonSociale} ?`}
                        confirmLabel="Qualifier"
                        onConfirm={() => toast.success(`${c.sigle} qualifié`)}
                      />
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon" title="Qualifier avec réserves"><ShieldAlert className="h-4 w-4 text-warning" /></Button>}
                        title="Qualifier avec réserves ?"
                        description={`Qualifier ${c.raisonSociale} avec des réserves à lever ?`}
                        confirmLabel="Qualifier avec réserves"
                        onConfirm={() => toast.info(`${c.sigle} qualifié avec réserves`)}
                      />
                      <Button variant="ghost" size="icon" title="Demander mise à jour" onClick={() => toast.info('Demande de mise à jour envoyée')}><RefreshCw className="h-4 w-4 text-gold" /></Button>
                      <ConfirmDialog
                        trigger={<Button variant="ghost" size="icon" title="Suspendre"><Ban className="h-4 w-4 text-destructive" /></Button>}
                        title="Suspendre ce dossier ?"
                        description={`Confirmez-vous la suspension du dossier de ${c.raisonSociale} ?`}
                        confirmLabel="Suspendre"
                        onConfirm={() => toast.error(`${c.sigle} suspendu`)}
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
