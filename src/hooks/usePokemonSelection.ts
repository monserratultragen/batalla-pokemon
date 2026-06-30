import { useState, useCallback } from 'react';
import type { Pokemon, PokemonTier } from '../types';
import { getRandomByTier } from '../data/pokemon';

export interface PokeballSlot {
  pokemon: Pokemon;
  ballType: typeof POKEBALL_TYPES[number];
}

export interface Pokebelt {
  id: number;
  label: string;
  balls: PokeballSlot[];
}

export const POKEBALL_TYPES = [
  {
    id: 'classic',
    label: 'Poké Ball',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    // 60% basic, 30% mid, 10% strong
    weights: { basic: 0.6, mid: 0.3, strong: 0.1 },
  },
  {
    id: 'great',
    label: 'Great Ball',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
    // 20% basic, 50% mid, 30% strong
    weights: { basic: 0.2, mid: 0.5, strong: 0.3 },
  },
  {
    id: 'ultra',
    label: 'Ultra Ball',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
    // 10% basic, 30% mid, 60% strong
    weights: { basic: 0.1, mid: 0.3, strong: 0.6 },
  },
] as const;

function rollTier(weights: { basic: number; mid: number; strong: number }): PokemonTier {
  const r = Math.random();
  if (r < weights.basic) return 'basic';
  if (r < weights.basic + weights.mid) return 'mid';
  return 'strong';
}

function rollPokemonForBall(ballType: typeof POKEBALL_TYPES[number]): Pokemon {
  const tier = rollTier(ballType.weights);
  return getRandomByTier(tier);
}

function generateBelts(): Pokebelt[] {
  return [0, 1, 2].map(i => {
    const balls: PokeballSlot[] = [0, 1, 2].map(() => {
      const idx = Math.floor(Math.random() * POKEBALL_TYPES.length);
      const bt = POKEBALL_TYPES[idx];
      return {
        pokemon: rollPokemonForBall(bt),
        ballType: bt,
      };
    });

    return {
      id: i,
      label: `Cinturón ${i + 1}`,
      balls,
    };
  });
}

export function usePokemonSelection() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [belts] = useState<Pokebelt[]>(() => generateBelts());
  const [selectedBelt, setSelectedBelt] = useState<Pokebelt | null>(null);

  const selectBelt = useCallback((belt: Pokebelt) => {
    setSelectedBelt(belt);
  }, []);

  const selectPokemon = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  return {
    selectedPokemon,
    belts,
    selectedBelt,
    selectBelt,
    selectPokemon,
  };
}
