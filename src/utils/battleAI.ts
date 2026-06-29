import type { Combatant, Move } from '../types';
import { calculateDamage, checkAccuracy } from './battleMath';
import { SeededRNG } from './rng';

export function selectEnemyMove(enemy: Combatant, player: Combatant, rng: SeededRNG): Move {
  const availableMoves = enemy.moves.filter(m => m.pp > 0);
  if (availableMoves.length === 0) {
    return enemy.moves[0];
  }

  const hpRatio = enemy.currentHP / enemy.maxHP;

  if (hpRatio < 0.3) {
    const healMove = availableMoves.find(m => m.effect === 'heal');
    if (healMove && rng.nextBoolean(0.3)) {
      return healMove;
    }
  }

  let bestMove: Move | null = null;
  let bestExpectedDamage = -1;

  for (const move of availableMoves) {
    if (move.power === 0) continue;

    const damage = calculateDamage(enemy, player, move, rng);
    const accuracy = move.accuracy / 100;
    const expectedDamage = damage * accuracy;

    if (damage >= player.currentHP && checkAccuracy(move, rng)) {
      return move;
    }

    if (expectedDamage > bestExpectedDamage) {
      bestExpectedDamage = expectedDamage;
      bestMove = move;
    }
  }

  if (bestMove) return bestMove;

  const weightedMoves = availableMoves.map(move => ({
    move,
    weight: (move.power || 1) * (move.accuracy / 100),
  }));

  const totalWeight = weightedMoves.reduce((sum, w) => sum + w.weight, 0);
  let random = rng.next() * totalWeight;

  for (const { move, weight } of weightedMoves) {
    random -= weight;
    if (random <= 0) return move;
  }

  return availableMoves[0];
}