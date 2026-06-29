import { TYPE_COLORS } from '../data/constants';

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] || '#777';

  return (
    <span
      className="type-badge"
      style={{ backgroundColor: color }}
    >
      {type.toUpperCase()}
    </span>
  );
}