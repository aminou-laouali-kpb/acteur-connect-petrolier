import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCompanies } from '@/data/mock-data';
import { CATEGORIES, REGIONS, QUALIFICATION_STATUS_LABELS } from '@/types';
import { RegistreMapNiger } from '@/components/operateur/RegistreMapNiger';
import { toast } from 'sonner';
import { Search, Star, Send, Award, MapPin, Users } from 'lucide-react';

const CERTIFS = ['ISO 9001', 'ISO 45001', 'ASME Section IX', 'ASNT Level II', 'NEBOSH', 'HACCP', 'ATEX'];

export default function Registre() {
  const [q, setQ] = useState('');
  const [famille, setFamille] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');
  const [certif, setCertif] = useState<string>('all');
  const [selected, setSelected] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('soraz-preselection') ?? '[]'); } catch { return []; }
  });

  const filtered = useMemo(() => {
    return mockCompanies.filter(c => {
      if (q && !`${c.raisonSociale} ${c.sigle} ${c.secteurPrincipal}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (famille !== 'all' && c.secteurPrincipal !== famille) return false;
      if (region !== 'all' && c.region !== region) return false;
      if (certif !== 'all' && !(c.certifications ?? []).some(x => x.toLowerCase().includes(certif.toLowerCase()))) return false;
      return true;
    });
  }, [q, famille, region, certif]);

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    setSelected(next);
    localStorage.setItem('soraz-preselection', JSON.stringify(next));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Registre fournisseurs qualifiés</h1>
        <p className="text-sm text-muted-foreground">Source : Registre National du Contenu Local Pétrolier · {mockCompanies.length} entreprises</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Rechercher nom, sigle, métier…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <div className="grid sm:grid-cols-3 gap-2">
                <Select value={famille} onValueChange={setFamille}>
                  <SelectTrigger><SelectValue placeholder="Famille métier" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes familles</SelectItem>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger><SelectValue placeholder="Région" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes régions</SelectItem>
                    {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={certif} onValueChange={setCertif}>
                  <SelectTrigger><SelectValue placeholder="Certification" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes certifications</SelectItem>
                    {CERTIFS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Star className="h-4 w-4 text-petroleum" /> Présélection ({selected.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-muted-foreground">Entreprises retenues pour invitation à des AO TAR.</p>
            <Button size="sm" className="w-full bg-petroleum hover:bg-petroleum/90" disabled={selected.length === 0} onClick={() => toast.success(`${selected.length} entreprise(s) ajoutée(s) à un AO (démo)`)}>
              <Send className="h-3.5 w-3.5 mr-1.5" /> Inviter à un AO
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Cartographie des capacités locales</CardTitle></CardHeader>
        <CardContent><RegistreMapNiger highlightFamille={famille === 'all' ? undefined : famille} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Résultats ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="divide-y">
          {filtered.map(c => (
            <div key={c.id} className="py-3 flex items-center gap-3">
              <Checkbox checked={selected.includes(c.id)} onCheckedChange={() => toggle(c.id)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{c.raisonSociale}</p>
                  <Badge variant="outline" className="text-[10px]">{c.sigle}</Badge>
                  {c.status === 'qualifie' && <Award className="h-3.5 w-3.5 text-success" />}
                </div>
                <p className="text-xs text-muted-foreground">{c.secteurPrincipal} · {c.region} · <Users className="inline h-3 w-3" /> {c.effectifTotal} ({Math.round(c.effectifNigerien/c.effectifTotal*100)}% nig.) · {QUALIFICATION_STATUS_LABELS[c.status]}</p>
                {c.certifications && c.certifications.length > 0 && (
                  <div className="flex gap-1 mt-1">{c.certifications.map(x => <Badge key={x} variant="secondary" className="text-[10px] font-normal">{x}</Badge>)}</div>
                )}
              </div>
              <div className="text-right text-xs">
                <p className="font-bold text-petroleum">{c.completionRate}%</p>
                <p className="text-muted-foreground">complétude</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-6 text-sm text-center text-muted-foreground">Aucune entreprise ne correspond aux filtres.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
