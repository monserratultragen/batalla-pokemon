import type { InteriorMap } from '../../types';

export const HOUSE3_INTERIOR: InteriorMap = {
  id: 'house3',
  name: 'Casa 3',
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
    { id: 'table2', type: 'table', x: 3, y: 1, width: 2, height: 1 },
    { id: 'chair3', type: 'chair', x: 3, y: 2, width: 1, height: 1 },
    { id: 'chair4', type: 'chair', x: 4, y: 2, width: 1, height: 1 },
    { id: 'tv2', type: 'tv', x: 1, y: 1, width: 1, height: 1 },
    { id: 'window1', type: 'window', x: 5, y: 0, width: 1, height: 1 },
    { id: 'plant3', type: 'plant', x: 0, y: 3, width: 1, height: 1 },
  ],
};
