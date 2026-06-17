import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LOT_STATUT_LABELS, getEligibleCompaniesForLot } from '@/data/operateur-mock-data';
import { mockCompanies } from '@/data/mock-data';
import type { LotTAR } from '@/types';
import { AlertTriangle, Users, Calendar, Wallet, ArrowRight } from 'lucide-react';

const STATUT_VARIANT: Record<string, string> = {
  identifie: 'bg-muted text-muted-foreground',
  scope: 'bg-blue-100 text-blue-800',
  ao_lance: 'bg-amber-100 text-amber-800',
  attribue: 'bg-emerald-100 text-emerald-800',
  execute: 'bg-petroleum/10 text-petroleum',
  cloture: 'bg-slate-200 text-slate-800',
};

export function LotCard({ lot, onAction }: { lot: LotTAR; onAction?: (lot: LotTAR) => void }) {
  const eligibles = getEligibleCompaniesForLot(lot);
  const gap = eligibles.length < 2;
  const attributaire = lot.attributaireId ? mockCompanies.find(c => c.id === lot.attributaireId) : null;

  return (
    <Card className={`hover:shadow-md transition-shadow ${gap ? 'border-warning/40' : ''}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">{lot.reference}</span>
              <Badge className={STATUT_VARIANT[lot.statut]} variant="outline">{LOT_STATUT_LABELS[lot.statut]}</Badge>
            </div>
            <h4 className="font-heading font-semibold text-sm leading-tight">{lot.intitule}</h4>
            <p className="text-xs text-muted-foreground mt-1">{lot.famille}</p>
          </div>
          {gap && (
            <div className="flex items-center gap-1 text-warning shrink-0" title="Moins de 2 prestataires locaux qualifiés">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-[11px] font-medium">Gap CL</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {lot.dureeJours}j</div>
          <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-muted-foreground" /> {lot.effectifRequis} pers.</div>
          <div className="flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5 text-muted-foreground" /> {lot.budgetEstimeMFCFA} M</div>
        </div>

        {lot.certificationsRequises.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lot.certificationsRequises.slice(0, 3).map(c => (
              <Badge key={c} variant="secondary" className="text-[10px] font-normal">{c}</Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {attributaire ? (
              <>Attribué à <strong className="text-foreground">{attributaire.sigle}</strong></>
            ) : (
              <><strong className={gap ? 'text-warning' : 'text-foreground'}>{eligibles.length}</strong> prestataire(s) éligible(s)</>
            )}
          </span>
          {onAction && (
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => onAction(lot)}>
              Gérer <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
