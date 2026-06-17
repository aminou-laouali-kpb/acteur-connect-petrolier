import { TAR_PHASE_LABELS } from '@/data/operateur-mock-data';
import type { TARPhase } from '@/types';
import { Check } from 'lucide-react';

const PHASES: TARPhase[] = ['scoping', 'contracting', 'pre_execution', 'execution', 'startup', 'post_tar'];

export function CampagneTimeline({ phase }: { phase: TARPhase }) {
  const currentIdx = PHASES.indexOf(phase);
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {PHASES.map((p, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={p} className="flex items-center gap-1 shrink-0">
            <div className={`flex flex-col items-center gap-1 ${active ? 'text-petroleum' : done ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${active ? 'border-petroleum bg-petroleum text-white' : done ? 'border-success bg-success text-white' : 'border-muted bg-background'}`}>
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-[11px] font-medium whitespace-nowrap">{TAR_PHASE_LABELS[p]}</span>
            </div>
            {i < PHASES.length - 1 && <div className={`h-px w-8 ${i < currentIdx ? 'bg-success' : 'bg-border'}`} />}
          </div>
        );
      })}
    </div>
  );
}
