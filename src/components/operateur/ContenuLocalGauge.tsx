import { Progress } from '@/components/ui/progress';

interface Props {
  label: string;
  objectif: number;
  realise: number;
}

export function ContenuLocalGauge({ label, objectif, realise }: Props) {
  const ok = realise >= objectif;
  const ratio = Math.min(100, Math.round((realise / objectif) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">Objectif {objectif}%</span>
      </div>
      <Progress value={realise} className="h-3" />
      <div className="flex items-baseline justify-between text-xs">
        <span className={`font-bold ${ok ? 'text-success' : 'text-warning'}`}>{realise}% réalisé</span>
        <span className="text-muted-foreground">{ratio}% de l'objectif</span>
      </div>
    </div>
  );
}
