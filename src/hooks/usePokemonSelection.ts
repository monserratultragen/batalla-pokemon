import { useState, useCallback } from 'react';
import type { Pokemon } from '../types';
import { getRandomPokemon } from '../data/pokemon';

export function usePokemonSelection() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [availableOptions, setAvailableOptions] = useState<Pokemon[]>([]);

  const reroll = useCallback(() => {
    const newOptions = getRandomPokemon(3);
    setAvailableOptions(newOptions);
    setSelectedPokemon(null);
  }, []);

  const selectPokemon = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  return {
    selectedPokemon,
    availableOptions,
    selectPokemon,
    reroll,
  };
}