import { useState, useCallback, useRef } from 'react';
import type { Pokemon, Combatant, Move } from '../types';
import { createCombatant, getPokemonById, BOSS_GENGAR } from '../data/pokemon';
import { calculateDamage, checkAccuracy, getTypeEffectiveness, determineTurnOrder } from '../utils/battleMath';
import { selectEnemyMove } from '../utils/battleAI';
import { createRNG } from '../utils/rng';

export interface BattleEvent {
  type: 'message' | 'damage' | 'animation' | 'win' | 'lose';
  message?: string;
  target?: 'player' | 'enemy';
  animation?: 'shake' | 'flash' | 'faint';
  damage?: number;
  newHP?: number;
}

interface UseBattleOptions {
  initialPlayerPokemon: Pokemon;
}

export function useBattle({ initialPlayerPokemon }: UseBattleOptions) {
  const rngRef = useRef(createRNG());

  const initPlayer = useRef(createCombatant(initialPlayerPokemon));
  const initEnemy = useRef(createCombatant(getPokemonById('gengar-boss') || BOSS_GENGAR, true));

  const [player, setPlayer] = useState<Combatant>(initPlayer.current);
  const [enemy, setEnemy] = useState<Combatant>(initEnemy.current);

  const [eventQueue, setEventQueue] = useState<BattleEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<BattleEvent | null>(null);

  const [playerAnimation, setPlayerAnimation] = useState<'idle' | 'hit' | 'faint'>('idle');
  const [enemyAnimation, setEnemyAnimation] = useState<'idle' | 'hit' | 'faint'>('idle');

  const [phase, setPhase] = useState<'battling' | 'ended'>('battling');
  const [winner, setWinner] = useState<'player' | 'enemy' | null>(null);

  // Initialize opening text events
  const initBattle = useCallback(() => {
    const queue: BattleEvent[] = [
      { type: 'message', message: `¡La entrenadora Monserrat envió a Gengar!` },
      { type: 'message', message: `¡Adelante, ${initPlayer.current.pokemon.name}!` }
    ];
    setEventQueue(queue);
    setCurrentEvent(queue[0]);
  }, []);

  const nextEvent = useCallback(() => {
    if (eventQueue.length === 0) return;

    const remaining = eventQueue.slice(1);
    setEventQueue(remaining);

    if (remaining.length > 0) {
      const next = remaining[0];
      setCurrentEvent(next);

      // Handle structural side-effects when an event is loaded
      if (next.type === 'animation' && next.target && next.animation) {
        if (next.target === 'player') {
          setPlayerAnimation(next.animation);
          setTimeout(() => setPlayerAnimation('idle'), 500);
        } else {
          setEnemyAnimation(next.animation);
          setTimeout(() => setEnemyAnimation('idle'), 500);
        }
      }

      if (next.type === 'damage' && next.target && next.newHP !== undefined) {
        if (next.target === 'player') {
          setPlayer(prev => ({ ...prev, currentHP: next.newHP! }));
        } else {
          setEnemy(prev => ({ ...prev, currentHP: next.newHP! }));
        }
      }

      if (next.type === 'win') {
        setPhase('ended');
        setWinner('player');
      }

      if (next.type === 'lose') {
        setPhase('ended');
        setWinner('enemy');
      }
    } else {
      setCurrentEvent(null);
    }
  }, [eventQueue]);

  const selectMove = useCallback((moveId: string) => {
    if (eventQueue.length > 0 || phase === 'ended') return;

    const pMove = player.moves.find(m => m.id === moveId);
    if (!pMove) return;

    // Deduct PP
    setPlayer(prev => ({
      ...prev,
      moves: prev.moves.map(m => m.id === moveId ? { ...m, pp: Math.max(0, m.pp - 1) } : m)
    }));

    const eMove = selectEnemyMove(enemy, player, rngRef.current);

    // Determine who goes first
    const firstTurn = determineTurnOrder(player, enemy, rngRef.current);
    const queue: BattleEvent[] = [];

    // Local snapshot HP variables to compute cascading damage sequence
    let currentEnemyHP = enemy.currentHP;
    let currentPlayerHP = player.currentHP;

    const executePlayerAttack = () => {
      queue.push({ type: 'message', message: `¡${player.pokemon.name} usó ${pMove.name}!` });
      
      const hit = checkAccuracy(pMove, rngRef.current);
      if (!hit) {
        queue.push({ type: 'message', message: '... ¡pero falló!' });
        return false;
      }

      const damage = calculateDamage(player, enemy, pMove, rngRef.current);
      const typeEff = getTypeEffectiveness(pMove.type, enemy.pokemon.types);
      currentEnemyHP = Math.max(0, currentEnemyHP - damage);

      queue.push({ type: 'animation', target: 'enemy', animation: 'flash' });
      queue.push({ type: 'damage', target: 'enemy', damage, newHP: currentEnemyHP });

      if (typeEff >= 2) {
        queue.push({ type: 'message', message: '¡Es superefectivo!' });
      } else if (typeEff > 0 && typeEff < 1) {
        queue.push({ type: 'message', message: 'No es muy efectivo...' });
      } else if (typeEff === 0) {
        queue.push({ type: 'message', message: '¡No afecta!' });
      }

      if (currentEnemyHP === 0) {
        queue.push({ type: 'animation', target: 'enemy', animation: 'faint' });
        queue.push({ type: 'message', message: '¡Gengar enemigo se debilitó!' });
        queue.push({ type: 'message', message: '¡Has derrotado a la entrenadora Monserrat!' });
        queue.push({ type: 'win' });
        return true; // Enemy fainted
      }

      return false;
    };

    const executeEnemyAttack = () => {
      queue.push({ type: 'message', message: `¡El Gengar enemigo usó ${eMove.name}!` });

      const hit = checkAccuracy(eMove, rngRef.current);
      if (!hit) {
        queue.push({ type: 'message', message: '... ¡pero falló!' });
        return false;
      }

      const damage = calculateDamage(enemy, player, eMove, rngRef.current);
      const typeEff = getTypeEffectiveness(eMove.type, player.pokemon.types);
      currentPlayerHP = Math.max(0, currentPlayerHP - damage);

      queue.push({ type: 'animation', target: 'player', animation: 'flash' });
      queue.push({ type: 'damage', target: 'player', damage, newHP: currentPlayerHP });

      if (typeEff >= 2) {
        queue.push({ type: 'message', message: '¡Es superefectivo!' });
      } else if (typeEff > 0 && typeEff < 1) {
        queue.push({ type: 'message', message: 'No es muy efectivo...' });
      } else if (typeEff === 0) {
        queue.push({ type: 'message', message: '¡No afecta!' });
      }

      if (currentPlayerHP === 0) {
        queue.push({ type: 'animation', target: 'player', animation: 'faint' });
        queue.push({ type: 'message', message: `¡${player.pokemon.name} se debilitó!` });
        queue.push({ type: 'message', message: '¡La entrenadora Monserrat te ha derrotado!' });
        queue.push({ type: 'lose' });
        return true; // Player fainted
      }

      return false;
    };

    if (firstTurn === 'player') {
      const enemyFainted = executePlayerAttack();
      if (!enemyFainted) {
        executeEnemyAttack();
      }
    } else {
      const playerFainted = executeEnemyAttack();
      if (!playerFainted) {
        executePlayerAttack();
      }
    }

    setEventQueue(queue);
    setCurrentEvent(queue[0]);
  }, [player, enemy, phase, eventQueue.length]);

  const resetBattle = useCallback((newPokemon: Pokemon) => {
    rngRef.current = createRNG();
    const pCombatant = createCombatant(newPokemon);
    const eCombatant = createCombatant(getPokemonById('gengar-boss') || BOSS_GENGAR, true);

    setPlayer(pCombatant);
    setEnemy(eCombatant);
    setPhase('battling');
    setWinner(null);
    setPlayerAnimation('idle');
    setEnemyAnimation('idle');

    const queue: BattleEvent[] = [
      { type: 'message', message: `¡La entrenadora Monserrat envió a Gengar!` },
      { type: 'message', message: `¡Adelante, ${pCombatant.pokemon.name}!` }
    ];
    setEventQueue(queue);
    setCurrentEvent(queue[0]);
  }, []);

  return {
    player,
    enemy,
    eventQueue,
    currentEvent,
    playerAnimation,
    enemyAnimation,
    phase,
    winner,
    initBattle,
    nextEvent,
    selectMove,
    resetBattle,
  };
}