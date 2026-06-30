import type { Combatant } from '../types';

interface HPBarProps {
  combatant: Combatant;
  animate?: boolean;
}

export function HPBar({ combatant, animate = true }: HPBarProps) {
  const percentage = Math.max(0, (combatant.currentHP / combatant.maxHP) * 100);
  const hpText = `${combatant.currentHP} / ${combatant.maxHP}`;

  let barClass = 'hp-bar-green';
  if (percentage <= 20) barClass = 'hp-bar-red';
  else if (percentage <= 50) barClass = 'hp-bar-yellow';

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="hp-bar-bg h-3 rounded">
        <div
          className={`${barClass} h-full rounded transition-all duration-300 ease-out ${animate ? '' : 'notransition'}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={combatant.currentHP}
          aria-valuemin={0}
          aria-valuemax={combatant.maxHP}
          aria-label={`HP: ${hpText}`}
        />
      </div>
      <div className="flex justify-end text-[11px] sm:text-xs text-gray-600 font-mono">
        {hpText}
      </div>
    </div>
  );
}