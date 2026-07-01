import type { InteriorMap } from '../../types';

export const HOUSE2_INTERIOR: InteriorMap = {
  id: 'house2',
  name: 'Casa 2',
  parentId: 'pallet-town',
  spawnX: 2,
  spawnY: 3,
  exitTile: { x: 2, y: 0 },
  width: 6,
  height: 5,
  tiles: [
    ['wall','wall','door','wall','wall','wall'],
    ['wall','floor','floor','floor','floor','wall'],
    ['wall','floor','carpet','carpet','floor','wall'],
    ['wall','floor','carpet','carpet','floor','wall'],
    ['wall','floor','floor','floor','floor','wall'],
  ],
  npcs: [],
  objects: [
    { id: 'bed1', type: 'bed', x: 1, y: 1, width: 2, height: 1 },
    { id: 'bookshelf1', type: 'bookshelf', x: 4, y: 1, width: 1, height: 2 },
    { id: 'desk1', type: 'desk', x: 4, y: 3, width: 1, height: 1 },
    { id: 'plant2', type: 'plant', x: 0, y: 3, width: 1, height: 1 },
    { id: 'painting2', type: 'painting', x: 1, y: 0, width: 1, height: 1 },
  ],
};
