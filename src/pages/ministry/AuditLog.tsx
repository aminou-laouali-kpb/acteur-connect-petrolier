import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAuditLog } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { Search, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/Pagination';

const ACTION_TYPES = [
  'Validation de profil',
  'Publication d\'opportunité',
  'Demande de complément',
  'Suspension de compte',
  'Modification d\'opportunité',
  'Connexion administrateur',
  'Évaluation candidature',
  'Clôture d\'opportunité',
  'Inscription entreprise',
  'Export de rapport',
];

const ITEMS_PER_PAGE = 8;

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [page, setPage] = useState(1);

  const hasFilters = search || actionFilter !== 'all';
  const resetFilters = () => { setSearch(''); setActionFilter('all'); setPage(1); };

  const filtered = mockAuditLog.filter(e => {
    if (search && !e.action.toLowerCase().includes(search.toLowerCase()) && !e.cible.toLowerCase().includes(search.toLowerCase()) && !e.utilisateur.toLowerCase().includes(search.toLowerCase())) return false;
    if (actionFilter !== 'all' && e.action !== actionFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getActionColor = (action: string) => {
    if (action.includes('Validation') || action.includes('validé')) return 'bg-success/10 text-success';
    if (action.includes('Suspension') || action.includes('Rejet')) return 'bg-destructive/10 text-destructive';
    if (action.includes('Publication') || action.includes('Inscription')) return 'bg-primary/10 text-primary';
    if (action.includes('Connexion') || action.includes('Export')) return 'bg-muted text-muted-foreground';
    return 'bg-warning/10 text-warning';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Journal d'audit</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} entrée(s)</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher dans le journal..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
        </div>
        <Select value={actionFilter} onValueChange={v => { setActionFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Type d'action" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les actions</SelectItem>
            {ACTION_TYPES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
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
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Cible</TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{entry.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${getActionColor(entry.action)}`}>
                      {entry.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{entry.utilisateur}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.role}</TableCell>
                  <TableCell className="text-sm">{entry.cible}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{entry.details}</TableCell>
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
