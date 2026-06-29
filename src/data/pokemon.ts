import type { Pokemon, Combatant, Move } from '../types';
import { getMoveById } from './moves';

export const POKEMON_POOL: Pokemon[] = [
  {
    id: 'charizard',
    name: 'Charizard',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
    types: ['Fire', 'Flying'],
    baseStats: { hp: 78, attack: 84, defense: 78, special: 109, speed: 100 },
    movePool: ['flamethrower', 'fireblast', 'slash', 'seismicToss', 'bodySlam', 'hyperBeam'],
  },
  {
    id: 'blastoise',
    name: 'Blastoise',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
    types: ['Water'],
    baseStats: { hp: 79, attack: 83, defense: 100, special: 85, speed: 78 },
    movePool: ['hydroPump', 'surf', 'iceBeam', 'blizzard', 'bodySlam', 'seismicToss'],
  },
  {
    id: 'venusaur',
    name: 'Venusaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
    types: ['Grass', 'Poison'],
    baseStats: { hp: 80, attack: 82, defense: 83, special: 100, speed: 80 },
    movePool: ['razorLeaf', 'solarBeam', 'sleepPowder', 'petalDance', 'bodySlam', 'toxic'],
  },
  {
    id: 'alakazam',
    name: 'Alakazam',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/65.png',
    types: ['Psychic'],
    baseStats: { hp: 55, attack: 50, defense: 45, special: 135, speed: 120 },
    movePool: ['psychic', 'psybeam', 'recover', 'reflect', 'lightScreen', 'shadowBall'],
  },
  {
    id: 'gengar',
    name: 'Gengar',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png',
    types: ['Ghost', 'Poison'],
    baseStats: { hp: 60, attack: 65, defense: 60, special: 130, speed: 110 },
    movePool: ['shadowBall', 'hypnosis', 'dreamEater', 'thunderbolt', 'confuseRay', 'nightShade'],
  },
  {
    id: 'machamp',
    name: 'Machamp',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/68.png',
    types: ['Fighting'],
    baseStats: { hp: 90, attack: 130, defense: 80, special: 65, speed: 55 },
    movePool: ['submission', 'seismicToss', 'bodySlam', 'counter', 'earthquake', 'rockSlide'],
  },
  {
    id: 'gyarados',
    name: 'Gyarados',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/130.png',
    types: ['Water', 'Flying'],
    baseStats: { hp: 95, attack: 125, defense: 79, special: 100, speed: 81 },
    movePool: ['hydroPump', 'surf', 'hyperBeam', 'bodySlam', 'earthquake', 'thunderbolt'],
  },
  {
    id: 'dragonite',
    name: 'Dragonite',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png',
    types: ['Dragon', 'Flying'],
    baseStats: { hp: 91, attack: 134, defense: 95, special: 100, speed: 80 },
    movePool: ['hyperBeam', 'thunderbolt', 'blizzard', 'bodySlam', 'dragonRage', 'wingAttack'],
  },
  {
    id: 'arcanine',
    name: 'Arcanine',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png',
    types: ['Fire'],
    baseStats: { hp: 90, attack: 110, defense: 80, special: 100, speed: 95 },
    movePool: ['flamethrower', 'fireblast', 'hyperBeam', 'bodySlam', 'extremeSpeed', 'takeDown'],
  },
];

export const BOSS_GENGAR: Pokemon = {
  id: 'gengar-boss',
  name: 'Gengar',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
  backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png',
  types: ['Ghost', 'Poison'],
  baseStats: { hp: 85, attack: 75, defense: 70, special: 115, speed: 95 },
  movePool: ['shadowBall', 'hypnosis', 'dreamEater', 'thunderbolt', 'confuseRay', 'nightShade', 'psychic', 'recover'],
};

export function getRandomPokemon(count: number): Pokemon[] {
  const pool = POKEMON_POOL.filter(p => p.id !== 'gengar');
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPokemonById(id: string): Pokemon | undefined {
  if (id === 'gengar-boss') return BOSS_GENGAR;
  return POKEMON_POOL.find(p => p.id === id);
}

export function createCombatant(pokemon: Pokemon, _isBoss = false): Combatant {
  const selectedMoves = [...pokemon.movePool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(id => getMoveById(id)!)
    .filter((m): m is Move => m !== undefined);

  const level = 50;
  const hpStat = Math.floor(((pokemon.baseStats.hp * 2 + 15) * level) / 100) + level + 10;
  const otherStat = (base: number) => Math.floor(((base * 2 + 15) * level) / 100) + 5;

  const maxHP = Math.floor(hpStat * 1.8);

  return {
    pokemon,
    currentHP: maxHP,
    maxHP,
    stats: {
      hp: hpStat,
      attack: otherStat(pokemon.baseStats.attack),
      defense: otherStat(pokemon.baseStats.defense),
      special: otherStat(pokemon.baseStats.special),
      speed: otherStat(pokemon.baseStats.speed),
    },
    moves: selectedMoves,
  };
}