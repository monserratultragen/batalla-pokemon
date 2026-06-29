import type { Move } from '../types';
import { TYPE_COLORS } from '../data/constants';

interface MoveButtonProps {
  move: Move;
  onClick: () => void;
  disabled?: boolean;
}

export function MoveButton({ move, onClick, disabled = false }: MoveButtonProps) {
  const typeColor = TYPE_COLORS[move.type] || '#777';
  const powerText = move.power > 0 ? `${move.power}` : '—';
  const accuracyText = move.accuracy > 0 ? `${move.accuracy}%` : '—';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`move-button w-full text-left ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ borderLeft: `4px solid ${typeColor}` }}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold">{move.name}</span>
        <span className="type-badge text-xs" style={{ backgroundColor: typeColor }}>
          {move.type}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>POD: {powerText}</span>
        <span>PRE: {accuracyText}</span>
        <span>PP: {move.pp}/{move.maxPP}</span>
      </div>
    </button>
  );
}