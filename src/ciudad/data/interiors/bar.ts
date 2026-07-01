import type { InteriorMap } from '../../types';

export const BAR_INTERIOR: InteriorMap = {
  id: 'bar',
  name: 'Poké Bar',
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
      id: 'bartender',
      name: 'Bartender',
      sprite: '🧔',
      x: 1,
      y: 1,
      direction: 'right',
      dialog: [
        { text: '¡Bienvenido al Poké Bar!', speaker: 'Bartender' },
        { text: '¿Qué te gustaría tomar?', speaker: 'Bartender' },
        { text: '¡Tenemos el mejor jugo de Bayas!', speaker: 'Bartender' },
      ],
      movement: { type: 'stationary' },
    },
    {
      id: 'customer1',
      name: 'Cliente',
      sprite: '🧑',
      x: 4,
      y: 3,
      direction: 'left',
      dialog: [
        { text: 'Este lugar es genial.', speaker: 'Cliente' },
        { text: 'Ven aquí después de entrenar.', speaker: 'Cliente' },
      ],
      movement: { type: 'stationary' },
    },
  ],
  objects: [
    { id: 'bar_counter1', type: 'bar_counter', x: 1, y: 1, width: 1, height: 2 },
    { id: 'bar_counter2', type: 'bar_counter', x: 1, y: 3, width: 3, height: 1 },
    { id: 'stool1', type: 'stool', x: 2, y: 4, width: 1, height: 1 },
    { id: 'stool2', type: 'stool', x: 3, y: 4, width: 1, height: 1 },
    { id: 'barrel1', type: 'barrel', x: 6, y: 1, width: 1, height: 1 },
    { id: 'barrel2', type: 'barrel', x: 6, y: 2, width: 1, height: 1 },
    { id: 'bar_sign', type: 'sign', x: 1, y: 0, width: 1, height: 1, interaction: { type: 'sign', text: 'Poké Bar - ¡Refrescos y diversión!' } },
  ],
};
