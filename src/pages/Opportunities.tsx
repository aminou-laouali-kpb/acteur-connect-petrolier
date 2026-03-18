import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { DeadlineBadge } from '@/components/DeadlineBadge';
import { mockOpportunities } from '@/data/mock-data';
import { REGIONS, OPPORTUNITY_TYPES, STRUCTURE_EMETTRICE_LABELS } from '@/types';
import type { StructureEmettriceType } from '@/types';
import { Search, ArrowRight, Calendar, MapPin, Building, RotateCcw } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';

const ITEMS_PER_PAGE = 6;

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [emettriceFilter, setEmettriceFilter] = useState('all');
  const [page, setPage] = useState(1);

  const hasFilters = search || regionFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all' || emettriceFilter !== 'all';
  const resetFilters = () => { setSearch(''); setRegionFilter('all'); setTypeFilter('all'); setStatusFilter('all'); setEmettriceFilter('all'); setPage(1); };

  const filtered = mockOpportunities.filter((opp) => {
    if (search && !opp.titre.toLowerCase().includes(search.toLowerCase())) return false;
    if (regionFilter !== 'all' && opp.region !== regionFilter) return false;
    if (typeFilter !== 'all' && opp.type !== typeFilter) return false;
    if (statusFilter !== 'all' && opp.statut !== statusFilter) return false;
    if (emettriceFilter !== 'all' && opp.structureEmettriceType !== emettriceFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="text-3xl font-heading font-bold text-primary-foreground mb-2">Opportunités</h1>
          <p className="text-primary-foreground/80">Marchés et appels publiés par les compagnies pétrolières, sous-traitants principaux et le Ministère du Pétrole.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une opportunité..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
            </div>
            <Select value={regionFilter} onValueChange={v => { setRegionFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Région" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {Object.entries(OPPORTUNITY_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={emettriceFilter} onValueChange={v => { setEmettriceFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Donneur d'ordre" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les donneurs d'ordre</SelectItem>
                {(Object.entries(STRUCTURE_EMETTRICE_LABELS) as [StructureEmettriceType, string][]).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="publiee">Publiée</SelectItem>
                <SelectItem value="fermee">Fermée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} opportunité(s) trouvée(s)</p>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <RotateCcw className="mr-2 h-3 w-3" />Réinitialiser les filtres
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {paged.map((opp) => (
              <Card key={opp.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <StatusBadge status={opp.statut} />
                    <span className="text-xs text-muted-foreground font-mono">{opp.reference}</span>
                    <DeadlineBadge dateLimite={opp.dateLimite} />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{opp.titre}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{opp.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1"><Building className="h-3 w-3" /><span className="line-clamp-1">{opp.structureEmettrice}</span></div>
                    <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.region}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />Publié : {new Date(opp.datePublication).toLocaleDateString('fr-FR')}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />Limite : {new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{STRUCTURE_EMETTRICE_LABELS[opp.structureEmettriceType]}</Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/opportunites/${opp.id}`}>Voir les détails <ArrowRight className="ml-1 h-3 w-3" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Aucune opportunité trouvée</h3>
              <p className="text-sm text-muted-foreground mb-4">Modifiez vos critères de recherche pour voir plus de résultats.</p>
              <Button variant="outline" onClick={resetFilters}><RotateCcw className="mr-2 h-4 w-4" />Réinitialiser</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
