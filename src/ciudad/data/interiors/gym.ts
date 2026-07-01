import type { InteriorMap } from '../../types';

export const GYM_INTERIOR: InteriorMap = {
  id: 'gym',
  name: 'Gimnasio Pokémon',
  parentId: 'pallet-town',
  spawnX: 2,
  spawnY: 3,
  exitTile: { x: 2, y: 0 },
  width: 8,
  height: 6,
  tiles: [
    ['wall','wall','door','wall','wall','wall','wall','wall'],
    ['wall','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','wall'],
    ['wall','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','wall'],
    ['wall','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','wall'],
    ['wall','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','wall'],
    ['wall','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','gym_floor','wall'],
  ],
  npcs: [
    {
      id: 'gym-leader',
      name: 'Líder Brock',
      sprite: '👨',
      x: 4,
      y: 2,
      direction: 'down',
      dialog: [
        { text: '¡Bienvenido al Gimnasio de Ciudad Paleta!', speaker: 'Brock' },
        { text: 'Soy Brock, el líder de este gimnasio.', speaker: 'Brock' },
        { text: '¡Si me derrotas, ganarás una medalla!', speaker: 'Brock' },
      ],
      movement: { type: 'stationary' },
    },
  ],
  objects: [
    { id: 'gym_counter', type: 'counter', x: 1, y: 1, width: 2, height: 1 },
    { id: 'gym_statue1', type: 'plant', x: 6, y: 1, width: 1, height: 1 },
    { id: 'gym_statue2', type: 'plant', x: 6, y: 4, width: 1, height: 1 },
    { id: 'gym_sign', type: 'sign', x: 1, y: 0, width: 1, height: 1, interaction: { type: 'sign', text: 'Gimnasio Pokémon - ¡Desafía al Líder!' } },
  ],
};
