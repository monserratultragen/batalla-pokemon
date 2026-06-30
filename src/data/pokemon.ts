import type { Pokemon, Combatant, Move, PokemonTier } from '../types';
import { getMoveById } from './moves';

// ── Pool de 30 Pokémon Gen1 por tier (diversificado) ──────────

const BASIC_POKEMON: Pokemon[] = [
  {
    id: 'bulbasaur', name: 'Bulbasaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    types: ['Grass', 'Poison'], tier: 'basic',
    baseStats: { hp: 45, attack: 49, defense: 49, special: 65, speed: 45 },
    movePool: ['razorLeaf', 'sleepPowder', 'toxic', 'bodySlam'],
  },
  {
    id: 'charmander', name: 'Charmander',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
    types: ['Fire'], tier: 'basic',
    baseStats: { hp: 39, attack: 52, defense: 43, special: 50, speed: 65 },
    movePool: ['flamethrower', 'slash', 'quickAttack', 'dragonRage'],
  },
  {
    id: 'squirtle', name: 'Squirtle',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
    types: ['Water'], tier: 'basic',
    baseStats: { hp: 44, attack: 48, defense: 65, special: 50, speed: 43 },
    movePool: ['surf', 'iceBeam', 'bite', 'bodySlam'],
  },
  {
    id: 'nidoran-m', name: 'Nidoran♂',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/32.png',
    types: ['Poison'], tier: 'basic',
    baseStats: { hp: 46, attack: 57, defense: 40, special: 40, speed: 50 },
    movePool: ['sludge', 'bodySlam', 'thunderWave', 'earthquake'],
  },
  {
    id: 'vulpix', name: 'Vulpix',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/37.png',
    types: ['Fire'], tier: 'basic',
    baseStats: { hp: 38, attack: 41, defense: 40, special: 65, speed: 65 },
    movePool: ['flamethrower', 'quickAttack', 'bodySlam', 'confuseRay'],
  },
  {
    id: 'bellsprout', name: 'Bellsprout',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/69.png',
    types: ['Grass', 'Poison'], tier: 'basic',
    baseStats: { hp: 50, attack: 75, defense: 35, special: 70, speed: 40 },
    movePool: ['razorLeaf', 'sludge', 'bodySlam', 'sleepPowder'],
  },
  {
    id: 'grimer', name: 'Grimer',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/88.png',
    types: ['Poison'], tier: 'basic',
    baseStats: { hp: 80, attack: 80, defense: 50, special: 40, speed: 25 },
    movePool: ['sludge', 'bodySlam', 'earthquake', 'fireblast'],
  },
  {
    id: 'voltorb', name: 'Voltorb',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/100.png',
    types: ['Electric'], tier: 'basic',
    baseStats: { hp: 40, attack: 30, defense: 50, special: 55, speed: 100 },
    movePool: ['thunderbolt', 'thunderWave', 'quickAttack', 'bodySlam'],
  },
  {
    id: 'pikachu', name: 'Pikachu',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    types: ['Electric'], tier: 'basic',
    baseStats: { hp: 35, attack: 55, defense: 30, special: 50, speed: 90 },
    movePool: ['thunderbolt', 'quickAttack', 'thunderWave', 'bodySlam'],
  },
  {
    id: 'clefairy', name: 'Clefairy',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',
    types: ['Normal'], tier: 'basic',
    baseStats: { hp: 70, attack: 45, defense: 48, special: 60, speed: 35 },
    movePool: ['bodySlam', 'psychic', 'thunderWave', 'recover'],
  },
];

const MID_POKEMON: Pokemon[] = [
  {
    id: 'victreebel', name: 'Victreebel',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/71.png',
    types: ['Grass', 'Poison'], tier: 'mid',
    baseStats: { hp: 80, attack: 105, defense: 65, special: 100, speed: 70 },
    movePool: ['razorLeaf', 'solarBeam', 'sludge', 'bodySlam'],
  },
  {
    id: 'vileplume', name: 'Vileplume',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/45.png',
    types: ['Grass', 'Poison'], tier: 'mid',
    baseStats: { hp: 75, attack: 80, defense: 85, special: 100, speed: 50 },
    movePool: ['petalDance', 'sludge', 'sleepPowder', 'bodySlam'],
  },
  {
    id: 'haunter', name: 'Haunter',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/93.png',
    types: ['Ghost', 'Poison'], tier: 'mid',
    baseStats: { hp: 45, attack: 50, defense: 45, special: 115, speed: 95 },
    movePool: ['shadowBall', 'sludge', 'hypnosis', 'dreamEater'],
  },
  {
    id: 'kadabra', name: 'Kadabra',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/64.png',
    types: ['Psychic'], tier: 'mid',
    baseStats: { hp: 40, attack: 35, defense: 30, special: 120, speed: 105 },
    movePool: ['psychic', 'psybeam', 'shadowBall', 'recover'],
  },
  {
    id: 'marowak', name: 'Marowak',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/105.png',
    types: ['Ground'], tier: 'mid',
    baseStats: { hp: 60, attack: 80, defense: 110, special: 50, speed: 45 },
    movePool: ['earthquake', 'rockSlide', 'bodySlam', 'thunderWave'],
  },
  {
    id: 'kingler', name: 'Kingler',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/99.png',
    types: ['Water'], tier: 'mid',
    baseStats: { hp: 55, attack: 130, defense: 115, special: 50, speed: 75 },
    movePool: ['surf', 'bodySlam', 'sludge', 'rockSlide'],
  },
  {
    id: 'flareon', name: 'Flareon',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/136.png',
    types: ['Fire'], tier: 'mid',
    baseStats: { hp: 65, attack: 130, defense: 60, special: 95, speed: 65 },
    movePool: ['flamethrower', 'fireblast', 'quickAttack', 'bodySlam'],
  },
  {
    id: 'omanyte', name: 'Omanyte',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/138.png',
    types: ['Rock', 'Water'], tier: 'mid',
    baseStats: { hp: 35, attack: 40, defense: 100, special: 90, speed: 55 },
    movePool: ['surf', 'iceBeam', 'rockSlide', 'bodySlam'],
  },
  {
    id: 'kabuto', name: 'Kabuto',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/140.png',
    types: ['Rock', 'Water'], tier: 'mid',
    baseStats: { hp: 30, attack: 80, defense: 90, special: 45, speed: 55 },
    movePool: ['surf', 'rockSlide', 'slash', 'bodySlam'],
  },
  {
    id: 'porygon', name: 'Porygon',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/137.png',
    types: ['Normal'], tier: 'mid',
    baseStats: { hp: 65, attack: 60, defense: 70, special: 75, speed: 40 },
    movePool: ['iceBeam', 'thunderbolt', 'psychic', 'recover'],
  },
];

const STRONG_POKEMON: Pokemon[] = [
  {
    id: 'arcanine', name: 'Arcanine',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png',
    types: ['Fire'], tier: 'strong',
    baseStats: { hp: 90, attack: 110, defense: 80, special: 100, speed: 95 },
    movePool: ['flamethrower', 'fireblast', 'extremeSpeed', 'bodySlam'],
  },
  {
    id: 'ninetales', name: 'Ninetales',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/38.png',
    types: ['Fire'], tier: 'strong',
    baseStats: { hp: 73, attack: 76, defense: 75, special: 100, speed: 100 },
    movePool: ['flamethrower', 'confuseRay', 'quickAttack', 'bodySlam'],
  },
  {
    id: 'cloyster', name: 'Cloyster',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/91.png',
    types: ['Water', 'Ice'], tier: 'strong',
    baseStats: { hp: 50, attack: 95, defense: 180, special: 85, speed: 70 },
    movePool: ['iceBeam', 'surf', 'hydroPump', 'bodySlam'],
  },
  {
    id: 'nidoqueen', name: 'Nidoqueen',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/31.png',
    types: ['Poison', 'Ground'], tier: 'strong',
    baseStats: { hp: 90, attack: 82, defense: 87, special: 75, speed: 76 },
    movePool: ['earthquake', 'sludge', 'iceBeam', 'thunderbolt'],
  },
  {
    id: 'nidoking', name: 'Nidoking',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/34.png',
    types: ['Poison', 'Ground'], tier: 'strong',
    baseStats: { hp: 81, attack: 92, defense: 77, special: 75, speed: 85 },
    movePool: ['earthquake', 'sludge', 'iceBeam', 'thunderbolt'],
  },
  {
    id: 'starmie', name: 'Starmie',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/121.png',
    types: ['Water', 'Psychic'], tier: 'strong',
    baseStats: { hp: 60, attack: 75, defense: 85, special: 100, speed: 115 },
    movePool: ['surf', 'psychic', 'iceBeam', 'thunderbolt'],
  },
  {
    id: 'weezing', name: 'Weezing',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/110.png',
    types: ['Poison'], tier: 'strong',
    baseStats: { hp: 65, attack: 90, defense: 120, special: 85, speed: 60 },
    movePool: ['sludge', 'fireblast', 'thunderbolt', 'bodySlam'],
  },
  {
    id: 'sandslash', name: 'Sandslash',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/28.png',
    types: ['Ground'], tier: 'strong',
    baseStats: { hp: 75, attack: 100, defense: 110, special: 55, speed: 65 },
    movePool: ['earthquake', 'rockSlide', 'slash', 'bodySlam'],
  },
  {
    id: 'golduck', name: 'Golduck',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/55.png',
    types: ['Water'], tier: 'strong',
    baseStats: { hp: 80, attack: 82, defense: 78, special: 80, speed: 85 },
    movePool: ['hydroPump', 'surf', 'iceBeam', 'psychic'],
  },
  {
    id: 'rhydon', name: 'Rhydon',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png',
    backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/112.png',
    types: ['Ground', 'Rock'], tier: 'strong',
    baseStats: { hp: 105, attack: 130, defense: 120, special: 45, speed: 40 },
    movePool: ['earthquake', 'rockSlide', 'hornAttack', 'bodySlam'],
  },
];

export const POKEMON_POOL: Pokemon[] = [...BASIC_POKEMON, ...MID_POKEMON, ...STRONG_POKEMON];

export const BASIC_POOL = BASIC_POKEMON;
export const MID_POOL = MID_POKEMON;
export const STRONG_POOL = STRONG_POKEMON;

// ── Boss ──────────────────────────────────────────────────────

export const BOSS_GENGAR: Pokemon = {
  id: 'gengar-boss',
  name: 'Gengar',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
  backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png',
  types: ['Ghost', 'Poison'],
  tier: 'strong',
  baseStats: { hp: 85, attack: 75, defense: 70, special: 115, speed: 95 },
  movePool: ['shadowBall', 'hypnosis', 'dreamEater', 'thunderbolt', 'confuseRay', 'nightShade', 'psychic', 'recover'],
};

// ── Funciones de selección ────────────────────────────────────

export function getRandomPokemon(count: number): Pokemon[] {
  const pool = POKEMON_POOL.filter(p => p.id !== 'gengar');
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomByTier(tier: PokemonTier): Pokemon {
  const pool = tier === 'basic' ? BASIC_POOL : tier === 'mid' ? MID_POOL : STRONG_POOL;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
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
