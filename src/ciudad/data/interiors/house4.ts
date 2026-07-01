import type { InteriorMap } from '../../types';

export const HOUSE4_INTERIOR: InteriorMap = {
  id: 'house4',
  name: 'Casa 4',
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
    { id: 'bed2', type: 'bed', x: 1, y: 1, width: 2, height: 1 },
    { id: 'bookshelf2', type: 'bookshelf', x: 4, y: 1, width: 1, height: 2 },
    { id: 'desk2', type: 'desk', x: 4, y: 3, width: 1, height: 1 },
    { id: 'plant4', type: 'plant', x: 0, y: 3, width: 1, height: 1 },
    { id: 'painting3', type: 'painting', x: 1, y: 0, width: 1, height: 1 },
    { id: 'tv3', type: 'tv', x: 3, y: 1, width: 1, height: 1 },
  ],
};
