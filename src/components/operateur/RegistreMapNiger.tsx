import { mockCompanies } from '@/data/mock-data';
import { REGIONS } from '@/types';

// Schematic positions for Niger regions (approximate)
const POS: Record<string, { x: number; y: number }> = {
  Niamey: { x: 90, y: 200 },
  Tillabéri: { x: 70, y: 175 },
  Dosso: { x: 130, y: 220 },
  Tahoua: { x: 165, y: 160 },
  Maradi: { x: 220, y: 215 },
  Zinder: { x: 280, y: 195 },
  Diffa: { x: 360, y: 215 },
  Agadez: { x: 220, y: 90 },
};

export function RegistreMapNiger({ highlightFamille }: { highlightFamille?: string }) {
  const counts: Record<string, number> = {};
  mockCompanies.forEach(c => {
    if (highlightFamille && c.secteurPrincipal !== highlightFamille) return;
    counts[c.region] = (counts[c.region] ?? 0) + 1;
  });

  const max = Math.max(1, ...Object.values(counts));

  return (
    <div className="w-full bg-petroleum/5 rounded-lg p-4 border">
      <svg viewBox="0 0 420 280" className="w-full h-auto">
        <rect x="10" y="10" width="400" height="260" fill="hsl(207 30% 96%)" stroke="hsl(207 70% 18%)" strokeWidth="1" rx="8" />
        <text x="20" y="30" className="fill-petroleum" fontSize="11" fontWeight="600">République du Niger — Densité de prestataires</text>
        {REGIONS.map(region => {
          const p = POS[region];
          if (!p) return null;
          const n = counts[region] ?? 0;
          const r = 6 + (n / max) * 18;
          return (
            <g key={region}>
              <circle cx={p.x} cy={p.y} r={r} fill="hsl(188 78% 38%)" fillOpacity={0.3} stroke="hsl(188 78% 38%)" strokeWidth={1.5} />
              <circle cx={p.x} cy={p.y} r={3} fill="hsl(207 70% 18%)" />
              <text x={p.x + 8} y={p.y - 8} fontSize="10" fill="hsl(207 70% 18%)" fontWeight="600">{region}</text>
              <text x={p.x + 8} y={p.y + 4} fontSize="9" fill="hsl(215 14% 46%)">{n} prest.</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
