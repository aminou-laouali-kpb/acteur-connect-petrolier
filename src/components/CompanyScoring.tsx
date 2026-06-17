import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  score: number;
  recommandation: string;
  justification: string;
  onApply?: () => void;
}

export function CompanyScoring({ score, recommandation, justification, onApply }: Props) {
  const tone =
    score >= 85 ? 'text-success' :
    score >= 70 ? 'text-gold' :
    score >= 50 ? 'text-warning' : 'text-destructive';

  return (
    <Card className="border-gold/30 bg-gold/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-gold" />
          Suggestion automatique
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-muted-foreground">Score consolidé</span>
            <span className={`text-2xl font-heading font-bold ${tone}`}>{score}<span className="text-sm text-muted-foreground">/100</span></span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
        <div className="rounded-md border bg-card p-3 space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Recommandation
          </p>
          <p className={`font-semibold ${tone}`}>{recommandation}</p>
          <p className="text-xs text-muted-foreground">{justification}</p>
        </div>
        {onApply && (
          <Button size="sm" variant="outline" className="w-full" onClick={onApply}>
            Appliquer la recommandation
          </Button>
        )}
        <p className="text-[10px] text-muted-foreground italic">
          Évaluation automatique fondée sur la complétude du dossier, l'ancienneté et les certifications. Décision finale réservée à l'agent.
        </p>
      </CardContent>
    </Card>
  );
}
