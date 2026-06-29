import type { Pokemon, CombatantSide } from '../types';

interface PokemonSpriteProps {
  pokemon: Pokemon;
  side: CombatantSide;
  animate?: 'idle' | 'hit' | 'faint' | 'shake' | 'flash';
}

export function PokemonSprite({ pokemon, side, animate }: PokemonSpriteProps) {
  const spriteUrl = side === 'player' ? pokemon.backSprite : pokemon.sprite;
  
  let animationClass = 'fade-in';
  if (animate === 'hit') {
    animationClass = 'shake flash';
  } else if (animate === 'faint') {
    animationClass = 'opacity-0 transition-all duration-500 scale-50';
  }

  return (
    <img
      src={spriteUrl}
      alt={pokemon.name}
      className={`pokemon-sprite ${animationClass} ${side === 'player' ? 'h-48' : 'h-40'} transition-all`}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
  );
}