import type { Combatant, Move } from '../types';
import { TYPE_EFFECTIVENESS, STAB_MULTIPLIER, RNG_RANGE } from '../data/constants';
import { SeededRNG } from './rng';

export function calculateDamage(
  attacker: Combatant,
  defender: Combatant,
  move: Move,
  rng: SeededRNG
): number {
  const level = 50;
  const power = move.power;
  const isPhysical = move.category === 'physical';
  const attack = isPhysical ? attacker.stats.attack : attacker.stats.special;
  const defense = isPhysical ? defender.stats.defense : defender.stats.special;

  if (power === 0) return 0;

  const baseDamage = Math.floor(Math.floor(Math.floor((2 * level) / 5 + 2) * power * attack / defense) / 50) + 2;

  const stab = attacker.pokemon.types.includes(move.type) ? STAB_MULTIPLIER : 1;

  const typeEff = getTypeEffectiveness(move.type, defender.pokemon.types);

  const randomFactor = RNG_RANGE[0] + rng.next() * (RNG_RANGE[1] - RNG_RANGE[0]);

  const damage = Math.floor(baseDamage * stab * typeEff * randomFactor);

  return Math.max(1, damage);
}

export function checkAccuracy(move: Move, rng: SeededRNG): boolean {
  if (move.accuracy === 100) return true;
  const roll = rng.nextInt(1, 100);
  return roll <= move.accuracy;
}

export function getTypeEffectiveness(moveType: string, defenderTypes: string[]): number {
  let effectiveness = 1;
  for (const defType of defenderTypes) {
    const typeMap = TYPE_EFFECTIVENESS[moveType];
    if (typeMap && typeMap[defType] !== undefined) {
      effectiveness *= typeMap[defType];
    }
  }
  return effectiveness;
}

export function determineTurnOrder(player: Combatant, enemy: Combatant, rng: SeededRNG): 'player' | 'enemy' {
  if (player.stats.speed > enemy.stats.speed) return 'player';
  if (enemy.stats.speed > player.stats.speed) return 'enemy';
  return rng.nextBoolean(0.5) ? 'player' : 'enemy';
}

export function applyDamage(target: Combatant, damage: number): Combatant {
  return {
    ...target,
    currentHP: Math.max(0, target.currentHP - damage),
  };
}

export function isFainted(combatant: Combatant): boolean {
  return combatant.currentHP <= 0;
}

export function healCombatant(combatant: Combatant, amount: number): Combatant {
  return {
    ...combatant,
    currentHP: Math.min(combatant.maxHP, combatant.currentHP + amount),
  };
}

export function getEffectivenessText(effectiveness: number): string {
  if (effectiveness >= 2) return '¡Es superefectivo!';
  if (effectiveness <= 0.5 && effectiveness > 0) return 'No es muy efectivo...';
  if (effectiveness === 0) return 'No afecta...';
  return '';
}