import type { BattleLogEntry, CombatantSide } from '../types';

interface BattleLogProps {
  entries: BattleLogEntry[];
  maxVisible?: number;
}

export function BattleLog({ entries, maxVisible = 8 }: BattleLogProps) {
  const visibleEntries = entries.slice(-maxVisible);

  return (
    <div className="gameboy-screen p-3 h-40 overflow-y-auto font-mono text-xs leading-relaxed text-gray-800">
      {visibleEntries.map((entry, index) => (
        <div
          key={entry.timestamp + index}
          className={`battle-log-entry ${entry.actor} slide-up`}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <span className="text-gray-400">[{entry.turn}]</span>{' '}
          {entry.actor !== 'system' && (
            <>
              <span className={`font-bold ${entry.actor === 'player' ? 'text-blue-700' : 'text-red-700'} capitalize`}>
                {entry.actor === 'player' ? 'Tú' : 'Enemigo'}:
              </span>{' '}
            </>
          )}
          {entry.details}
          {entry.damage !== undefined && entry.damage > 0 && (
            <span className="text-red-700 font-bold"> (-{entry.damage} PS)</span>
          )}
        </div>
      ))}
    </div>
  );
}