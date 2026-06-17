import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { mockCompanies } from '@/data/mock-data';
import { REGIONS, QUALIFICATION_STATUS_LABELS } from '@/types';
import type { QualificationStatus } from '@/types';
import {
  Search, Eye, ShieldCheck, ShieldAlert, Ban, RefreshCw, RotateCcw, Download, Bookmark, Save, Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Pagination } from '@/components/Pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ITEMS_PER_PAGE = 8;
const SAVED_KEY = 'ministry-saved-searches';

type QuickFilter = 'all' | 'a_qualifier' | 'incomplet' | 'a_mettre_a_jour' | 'nouveaux' | 'qualifies';

interface SavedSearch {
  id: string;
  name: string;
  search: string;
  region: string;
  status: string;
  quick: QuickFilter;
  minCompletion: number;
}

export default function CompanyManagement() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [status, setStatus] = useState('all');
  const [quick, setQuick] = useState<QuickFilter>('all');
  const [minCompletion, setMinCompletion] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<SavedSearch[]>([]);
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')); } catch {}
  }, []);

  const persistSaved = (next: SavedSearch[]) => {
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  const hasFilters = search || region !== 'all' || status !== 'all' || quick !== 'all' || minCompletion > 0;
  const resetFilters = () => { setSearch(''); setRegion('all'); setStatus('all'); setQuick('all'); setMinCompletion(0); setPage(1); };

  const filtered = useMemo(() => mockCompanies.filter(c => {
    if (search) {
      const s = search.toLowerCase();
      if (!c.raisonSociale.toLowerCase().includes(s) && !c.nif.toLowerCase().includes(s) && !c.secteurPrincipal.toLowerCase().includes(s) && !c.sigle.toLowerCase().includes(s)) return false;
    }
    if (region !== 'all' && c.region !== region) return false;
    if (status !== 'all' && c.status !== status) return false;
    if (c.completionRate < minCompletion) return false;
    if (quick === 'a_qualifier' && !['dossier_complete', 'en_cours_qualification'].includes(c.status)) return false;
    if (quick === 'incomplet' && c.completionRate >= 70) return false;
    if (quick === 'a_mettre_a_jour' && c.status !== 'a_mettre_a_jour') return false;
    if (quick === 'qualifies' && !['qualifie', 'qualifie_avec_reserves'].includes(c.status)) return false;
    if (quick === 'nouveaux') {
      const days = (Date.now() - new Date(c.dateInscription).getTime()) / 86400000;
      if (days > 30) return false;
    }
    return true;
  }), [search, region, status, quick, minCompletion]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleAll = () => setSelected(selected.size === paged.length ? new Set() : new Set(paged.map(c => c.id)));

  const exportCsv = () => {
    const headers = ['Raison sociale', 'Sigle', 'NIF', 'Région', 'Secteur', 'Statut', 'Complétion %', 'Inscription'];
    const rows = filtered.map(c => [c.raisonSociale, c.sigle, c.nif, c.region, c.secteurPrincipal, QUALIFICATION_STATUS_LABELS[c.status], c.completionRate, c.dateInscription]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `registre-export-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
    toast.success(`Export de ${filtered.length} entreprise(s) généré`);
  };

  const saveCurrentSearch = () => {
    if (!savedName.trim()) { toast.error('Donnez un nom à votre recherche'); return; }
    const next: SavedSearch = { id: String(Date.now()), name: savedName.trim(), search, region, status, quick, minCompletion };
    persistSaved([next, ...saved]);
    setSavedName('');
    toast.success(`Recherche « ${next.name} » enregistrée`);
  };
  const applySaved = (s: SavedSearch) => {
    setSearch(s.search); setRegion(s.region); setStatus(s.status); setQuick(s.quick); setMinCompletion(s.minCompletion); setPage(1);
  };
  const deleteSaved = (id: string) => persistSaved(saved.filter(s => s.id !== id));

  const bulkAction = (label: string, tone: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    toast[tone](`${label} appliqué à ${selected.size} dossier(s)`);
    setSelected(new Set());
  };

  const chips: { key: QuickFilter; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'a_qualifier', label: 'À qualifier' },
    { key: 'incomplet', label: 'Dossiers incomplets' },
    { key: 'a_mettre_a_jour', label: 'Mises à jour requises' },
    { key: 'nouveaux', label: 'Nouvelles inscriptions (30j)' },
    { key: 'qualifies', label: 'Qualifiés' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold">Registre des entreprises — Parcours de qualification</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} entreprise(s) · Gestion du processus de qualification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Exporter CSV</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm"><Bookmark className="mr-2 h-4 w-4" />Recherches sauvegardées ({saved.length})</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Nom de la recherche…" value={savedName} onChange={e => setSavedName(e.target.value)} className="h-8 text-xs" />
                  <Button size="sm" onClick={saveCurrentSearch}><Save className="h-3 w-3" /></Button>
                </div>
                <div className="space-y-1 max-h-60 overflow-auto">
                  {saved.length === 0 && <p className="text-xs text-muted-foreground italic text-center py-3">Aucune recherche enregistrée.</p>}
                  {saved.map(s => (
                    <div key={s.id} className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted">
                      <button className="text-sm text-left flex-1 truncate" onClick={() => applySaved(s)}>{s.name}</button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteSaved(s.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map(c => (
          <button
            key={c.key}
            onClick={() => { setQuick(c.key); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${quick === c.key ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher nom, NIF, sigle, secteur…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
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
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Complétion ≥ {minCompletion}%</span>
          <Slider value={[minCompletion]} onValueChange={v => { setMinCompletion(v[0]); setPage(1); }} max={100} step={5} className="w-32" />
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}><RotateCcw className="mr-2 h-3 w-3" />Réinitialiser</Button>
        )}
      </div>

      {selected.size > 0 && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex items-center justify-between gap-3 py-3 flex-wrap">
            <span className="text-sm font-medium">{selected.size} sélectionné(s)</span>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => bulkAction('Qualification', 'success')}><ShieldCheck className="mr-1 h-3 w-3" />Qualifier</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction('Avec réserves', 'warning')}><ShieldAlert className="mr-1 h-3 w-3" />Avec réserves</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction('Demande de mise à jour', 'info')}><RefreshCw className="mr-1 h-3 w-3" />Mise à jour</Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => bulkAction('Suspension', 'error')}><Ban className="mr-1 h-3 w-3" />Suspendre</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={paged.length > 0 && selected.size === paged.length} onCheckedChange={toggleAll} /></TableHead>
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
              {paged.map(c => (
                <TableRow key={c.id} className={selected.has(c.id) ? 'bg-primary/5' : ''}>
                  <TableCell><Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggleSelect(c.id)} /></TableCell>
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
              {paged.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Aucune entreprise ne correspond aux filtres.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
