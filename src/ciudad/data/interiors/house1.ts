import type { InteriorMap } from '../../types';

export const HOUSE1_INTERIOR: InteriorMap = {
  id: 'house1',
  name: 'Casa 1',
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
    { id: 'table1', type: 'table', x: 1, y: 1, width: 2, height: 1 },
    { id: 'chair1', type: 'chair', x: 1, y: 2, width: 1, height: 1 },
    { id: 'chair2', type: 'chair', x: 2, y: 2, width: 1, height: 1 },
    { id: 'tv1', type: 'tv', x: 4, y: 1, width: 1, height: 1 },
    { id: 'painting1', type: 'painting', x: 4, y: 0, width: 1, height: 1 },
    { id: 'plant1', type: 'plant', x: 0, y: 1, width: 1, height: 1 },
  ],
};
