import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { mockCompanies } from '@/data/mock-data';
import { REGIONS, CATEGORIES } from '@/types';
import { Search, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = mockCompanies.filter((c) => {
    if (search && !c.raisonSociale.toLowerCase().includes(search.toLowerCase()) && !c.sigle.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== 'all' && c.region !== region) return false;
    if (category !== 'all' && c.secteurPrincipal !== category) return false;
    if (status !== 'all' && c.status !== status) return false;
    return true;
  });

  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="text-3xl font-heading font-bold text-primary-foreground mb-2">Annuaire des entreprises</h1>
          <p className="text-primary-foreground/80">Répertoire des acteurs nationaux du secteur pétrolier au Niger.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une entreprise..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Région" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Catégorie" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="valide">Validé</SelectItem>
                <SelectItem value="en_revue">En revue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{filtered.length} entreprise(s) trouvée(s)</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary text-xs">{company.sigle}</span>
                    </div>
                    <StatusBadge status={company.status} />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-1">{company.raisonSociale}</h3>
                  <p className="text-xs text-gold font-medium mb-2">{company.secteurPrincipal}</p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{company.descriptionCourte}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{company.region}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{company.effectifTotal} employés</span>
                  </div>
                  <Button asChild variant="link" size="sm" className="px-0 text-gold">
                    <Link to={`/annuaire/${company.id}`}>Voir le profil <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Aucune entreprise trouvée</h3>
              <p className="text-sm text-muted-foreground">Modifiez vos critères de recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
