import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command';
import { mockCompanies, mockOpportunities, mockApplications } from '@/data/mock-data';
import { Building2, Briefcase, FileText, ShieldCheck } from 'lucide-react';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (path: string) => { setOpen(false); navigate(path); };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md border bg-muted/40 text-sm text-muted-foreground hover:bg-muted transition"
        title="Recherche globale (Ctrl/Cmd + K)"
      >
        <ShieldCheck className="h-4 w-4" />
        <span>Rechercher…</span>
        <kbd className="ml-2 hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px]">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher entreprises, opportunités, candidatures…" />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          <CommandGroup heading="Entreprises">
            {mockCompanies.slice(0, 30).map(c => (
              <CommandItem key={c.id} value={`${c.raisonSociale} ${c.sigle} ${c.nif} ${c.region}`} onSelect={() => go(`/ministere/entreprises/${c.id}`)}>
                <Building2 className="mr-2 h-4 w-4 text-primary" />
                <span>{c.raisonSociale}</span>
                <span className="ml-auto text-xs text-muted-foreground">{c.region}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Opportunités">
            {mockOpportunities.slice(0, 20).map(o => (
              <CommandItem key={o.id} value={`${o.titre} ${o.reference}`} onSelect={() => go(`/ministere/opportunites`)}>
                <Briefcase className="mr-2 h-4 w-4 text-gold" />
                <span className="truncate">{o.titre}</span>
                <span className="ml-auto text-xs text-muted-foreground">{o.reference}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Candidatures">
            {mockApplications.slice(0, 15).map(a => (
              <CommandItem key={a.id} value={`${a.entrepriseNom} ${a.opportuniteTitre}`} onSelect={() => go(`/ministere/candidatures`)}>
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="truncate">{a.entrepriseNom}</span>
                <span className="ml-auto text-xs text-muted-foreground truncate max-w-[200px]">{a.opportuniteTitre}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
