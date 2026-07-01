import type { InteriorMap } from '../../types';

export const SCHOOL_INTERIOR: InteriorMap = {
  id: 'school',
  name: 'Escuela Pokémon',
  parentId: 'pallet-town',
  spawnX: 2,
  spawnY: 3,
  exitTile: { x: 2, y: 0 },
  width: 8,
  height: 6,
  tiles: [
    ['wall','wall','door','wall','wall','wall','wall','wall'],
    ['wall','floor','floor','floor','floor','floor','floor','wall'],
    ['wall','floor','carpet','carpet','carpet','carpet','floor','wall'],
    ['wall','floor','carpet','carpet','carpet','carpet','floor','wall'],
    ['wall','floor','floor','floor','floor','floor','floor','wall'],
    ['wall','floor','floor','floor','floor','floor','floor','wall'],
  ],
  npcs: [
    {
      id: 'teacher',
      name: 'Profesora',
      sprite: '👩‍🏫',
      x: 4,
      y: 1,
      direction: 'down',
      dialog: [
        { text: '¡Bienvenido a la Escuela Pokémon!', speaker: 'Profesora' },
        { text: 'Aquí aprendes todo sobre los Pokémon.', speaker: 'Profesora' },
        { text: '¡El conocimiento es poder!', speaker: 'Profesora' },
      ],
      movement: { type: 'stationary' },
    },
  ],
  objects: [
    { id: 'teacher_desk', type: 'desk', x: 3, y: 1, width: 2, height: 1 },
    { id: 'pupil_desk1', type: 'pupil_desk', x: 1, y: 3, width: 1, height: 1 },
    { id: 'pupil_desk2', type: 'pupil_desk', x: 2, y: 3, width: 1, height: 1 },
    { id: 'pupil_desk3', type: 'pupil_desk', x: 4, y: 3, width: 1, height: 1 },
    { id: 'pupil_desk4', type: 'pupil_desk', x: 5, y: 3, width: 1, height: 1 },
    { id: 'bookshelf3', type: 'bookshelf', x: 6, y: 1, width: 1, height: 2 },
    { id: 'blackboard', type: 'painting', x: 1, y: 0, width: 3, height: 1 },
    { id: 'plant5', type: 'plant', x: 0, y: 1, width: 1, height: 1 },
  ],
};
