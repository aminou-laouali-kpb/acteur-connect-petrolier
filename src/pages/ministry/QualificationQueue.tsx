import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { mockCompanies } from '@/data/mock-data';
import { mockAgents, mockCompanyAssignments, computeCompanyScore } from '@/data/admin-mock-data';
import { toast } from 'sonner';
import { ShieldCheck, ShieldAlert, RefreshCw, Ban, UserCog, Eye, ListTodo, Clock, Sparkles } from 'lucide-react';

const PRIORITY_STATUSES = ['recense', 'dossier_complete', 'en_cours_qualification', 'a_mettre_a_jour'];

export default function QualificationQueue() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [agent, setAgent] = useState('all');

  const queue = useMemo(() => {
    const items = mockCompanies
      .filter(c => PRIORITY_STATUSES.includes(c.status))
      .map(c => {
        const daysSince = Math.floor((Date.now() - new Date(c.derniereMiseAJour).getTime()) / 86400000);
        const score = computeCompanyScore(c.id).score;
        const priority = daysSince * 1.2 + (100 - c.completionRate) + (score < 60 ? 20 : 0);
        return { c, daysSince, score, priority, agent: mockCompanyAssignments[c.id] };
      })
      .filter(i => !search || i.c.raisonSociale.toLowerCase().includes(search.toLowerCase()) || i.c.nif.toLowerCase().includes(search.toLowerCase()))
      .filter(i => agent === 'all' || (agent === 'none' ? !i.agent : i.agent === agent))
      .sort((a, b) => b.priority - a.priority);
    return items;
  }, [search, agent]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleAll = () => setSelected(selected.size === queue.length ? new Set() : new Set(queue.map(i => i.c.id)));

  const bulkAction = (label: string, tone: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    toast[tone](`${label} appliqué à ${selected.size} dossier(s)`);
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><ListTodo className="h-6 w-6 text-primary" />File de qualification</h1>
        <p className="text-sm text-muted-foreground">Dossiers priorisés par ancienneté, complétude et signaux automatiques · {queue.length} en attente</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder="Rechercher (nom, NIF)…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={agent} onValueChange={setAgent}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Agent assigné" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les agents</SelectItem>
            <SelectItem value="none">Non assigné</SelectItem>
            {mockAgents.map(a => <SelectItem key={a.id} value={a.nom}>{a.nom}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {selected.size > 0 && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
            <span className="text-sm font-medium">{selected.size} dossier(s) sélectionné(s)</span>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => bulkAction('Qualifié', 'success')}><ShieldCheck className="mr-1 h-4 w-4" />Qualifier</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction('Qualifié avec réserves', 'warning')}><ShieldAlert className="mr-1 h-4 w-4" />Avec réserves</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction('Demande de mise à jour envoyée', 'info')}><RefreshCw className="mr-1 h-4 w-4" />Mise à jour</Button>
              <Button size="sm" variant="outline" onClick={() => bulkAction('Réassignation effectuée', 'info')}><UserCog className="mr-1 h-4 w-4" />Réassigner</Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => bulkAction('Suspendu', 'error')}><Ban className="mr-1 h-4 w-4" />Suspendre</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2 px-2">
        <Checkbox checked={selected.size === queue.length && queue.length > 0} onCheckedChange={toggleAll} />
        <span className="text-xs text-muted-foreground">Tout sélectionner</span>
      </div>

      <div className="space-y-3">
        {queue.map(({ c, daysSince, score, agent: assigned }) => (
          <Card key={c.id} className={selected.has(c.id) ? 'border-primary' : ''}>
            <CardContent className="p-4 flex items-start gap-4">
              <Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggle(c.id)} className="mt-1" />
              <div className="flex-1 grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <p className="font-semibold text-sm">{c.raisonSociale}</p>
                  <p className="text-xs text-muted-foreground">{c.nif} · {c.region} · {c.secteurPrincipal}</p>
                </div>
                <div className="md:col-span-2"><StatusBadge status={c.status} /></div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Progress value={c.completionRate} className="h-2 flex-1" />
                    <span className="text-xs">{c.completionRate}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Sparkles className="h-3 w-3 text-gold" />Score IA {score}/100</p>
                </div>
                <div className="md:col-span-2 text-xs">
                  <p className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{daysSince}j d'attente</p>
                  <p className="text-muted-foreground mt-1">{assigned ? <Badge variant="secondary" className="text-[10px]">{assigned}</Badge> : <span className="italic">Non assigné</span>}</p>
                </div>
                <div className="md:col-span-2 flex justify-end gap-1">
                  <Button asChild size="sm" variant="outline"><Link to={`/ministere/entreprises/${c.id}`}><Eye className="mr-1 h-3 w-3" />Ouvrir</Link></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {queue.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun dossier en attente avec ces filtres.</p>}
      </div>
    </div>
  );
}
