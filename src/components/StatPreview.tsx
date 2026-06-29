import type { Pokemon } from '../types';

const MAX_STAT = 200;
const STAT_LABELS = ['PS', 'ATK', 'DEF', 'ESP', 'VEL'];

interface StatPreviewProps {
  stats: Pokemon['baseStats'];
}

export function StatPreview({ stats }: StatPreviewProps) {
  const values = [stats.hp, stats.attack, stats.defense, stats.special, stats.speed];

  return (
    <div className="space-y-1">
      {STAT_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className="stat-label w-10">{label}</span>
          <div className="flex-1 h-2 bg-gray-700 rounded overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (values[i] / MAX_STAT) * 100)}%` }}
            />
          </div>
          <span className="stat-value w-10 text-right">{values[i]}</span>
        </div>
      ))}
    </div>
  );
}