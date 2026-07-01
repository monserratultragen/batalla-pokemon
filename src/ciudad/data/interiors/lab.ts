import type { InteriorMap } from '../../types';

export const LAB_INTERIOR: InteriorMap = {
  id: 'lab',
  name: 'Laboratorio Pokémon',
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
      id: 'prof-oak-lab',
      name: 'Prof. Oak',
      sprite: '👨‍🔬',
      x: 4,
      y: 1,
      direction: 'down',
      dialog: [
        { text: '¡Ah, eres el nuevo entrenador!', speaker: 'Prof. Oak' },
        { text: 'He estado investigando Pokémon durante años.', speaker: 'Prof. Oak' },
        { text: '¡Un día te daré una Pokédex!', speaker: 'Prof. Oak' },
      ],
      movement: { type: 'stationary' },
    },
    {
      id: 'assistant',
      name: 'Asistente',
      sprite: '👩‍🔬',
      x: 6,
      y: 3,
      direction: 'left',
      dialog: [
        { text: 'Trabajo con el Profesor Oak.', speaker: 'Asistente' },
        { text: '¡Los Pokémon son fascinantes!', speaker: 'Asistente' },
      ],
      movement: { type: 'stationary' },
    },
  ],
  objects: [
    { id: 'lab_desk1', type: 'lab_table', x: 3, y: 1, width: 2, height: 1 },
    { id: 'lab_desk2', type: 'lab_table', x: 5, y: 3, width: 2, height: 1 },
    { id: 'computer1', type: 'computer', x: 3, y: 2, width: 1, height: 1 },
    { id: 'computer2', type: 'computer', x: 4, y: 2, width: 1, height: 1 },
    { id: 'bookshelf4', type: 'bookshelf', x: 6, y: 1, width: 1, height: 2 },
    { id: 'lab_plant', type: 'plant', x: 0, y: 1, width: 1, height: 1 },
    { id: 'pokeball_item1', type: 'pokeball_item', x: 1, y: 4, width: 1, height: 1, interaction: { type: 'item', itemId: 'pokeball' } },
    { id: 'lab_sign', type: 'sign', x: 1, y: 0, width: 1, height: 1, interaction: { type: 'sign', text: 'Laboratorio Pokémon - Investigación avanzada' } },
  ],
};
