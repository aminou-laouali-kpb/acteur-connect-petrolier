import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck } from 'lucide-react';

const DEFAULT_ITEMS = [
  { id: 'doc_juridique', label: 'Documents juridiques conformes (NIF, RCCM, statuts)' },
  { id: 'doc_fiscal', label: 'Régularité fiscale et sociale' },
  { id: 'doc_hse', label: 'Plan / certification HSE valides' },
  { id: 'doc_capacite', label: 'Capacité technique et équipements vérifiés' },
  { id: 'doc_refs', label: 'Références projets contrôlées' },
  { id: 'doc_contenu_local', label: 'Engagement contenu local signé' },
];

export function ChecklistVerification({ companyId }: { companyId: string }) {
  const storageKey = `checklist-${companyId}`;
  const [state, setState] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; }
  });

  const toggle = (id: string) => {
    const next = { ...state, [id]: !state[id] };
    setState(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const done = DEFAULT_ITEMS.filter(i => state[i.id]).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4 text-primary" />Checklist de vérification</span>
          <span className="text-xs text-muted-foreground font-normal">{done}/{DEFAULT_ITEMS.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {DEFAULT_ITEMS.map(item => (
          <label key={item.id} className="flex items-start gap-2 cursor-pointer text-sm">
            <Checkbox checked={!!state[item.id]} onCheckedChange={() => toggle(item.id)} className="mt-0.5" />
            <span className={state[item.id] ? 'line-through text-muted-foreground' : ''}>{item.label}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
