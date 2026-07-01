import type { GameMap, TileType } from '../types';

// ── City Map (20x15 tiles) - La Dehesa, Chile 2003 ──────────
// Layout: Residencia cómoda con jardín y elementos decorativos

const cityTiles: TileType[][] = [
  // Row 0 - Top border (árboles y cielo)
  ['tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree'],
  // Row 1 - Jardín superior
  ['grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'],
  // Row 2 - Residencia principal (frente)
  ['grass','grass','roof','roof','roof','roof','roof','grass','grass','grass','grass','grass','grass','roof','roof','roof','roof','roof','grass','grass'],
  // Row 3 - Puerta principal y ventana
  ['grass','grass','wall','wall','door','wall','wall','grass','grass','grass','grass','grass','grass','wall','window','wall','window','wall','grass','grass'],
  // Row 4 - Sendero principal
  ['path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path'],
  // Row 5 - Jardín medio con flores
  ['grass','grass','plant','grass','grass','plant','grass','grass','grass','grass','grass','grass','grass','grass','plant','grass','grass','plant','grass','grass'],
  // Row 6 - Sendero lateral
  ['path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path'],
  // Row 7 - Área de estar exterior
  ['grass','grass','grass','grass','grass','grass','sign','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'],
  // Row 8 - Sendero inferior
  ['path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path'],
  // Row 9 - Edificios secundarios
  ['grass','grass','roof','roof','roof','grass','grass','grass','roof','roof','roof','grass','grass','roof','roof','roof','grass','grass','grass','grass'],
  // Row 10 - Puertas secundarias
  ['grass','grass','wall','door','wall','grass','grass','grass','wall','door','wall','grass','grass','wall','door','wall','grass','grass','grass','grass'],
  // Row 11 - Sendero inferior
  ['path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path'],
  // Row 12 - Zona de juegos
  ['grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'],
  // Row 13 - Estanque decorativo
  ['grass','grass','water','water','water','water','grass','grass','grass','grass','grass','grass','grass','water','water','water','water','grass','grass','grass'],
  // Row 14 - Bottom border (árboles)
  ['tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree','tree'],
];

export const CITY_MAP: GameMap = {
  id: 'la-dehesa',
  name: 'La Dehesa, Chile',
  width: 20,
  height: 15,
  tiles: cityTiles,
  npcs: [
    {
      id: 'npc-mamá',
      name: 'Mamá',
      sprite: '👩',
      x: 5,
      y: 5,
      direction: 'down',
      dialog: [
        { text: '¡Hola cariño! ¿Ya vas a jugar afuera?', speaker: 'Mamá' },
        { text: 'Recuerda que la cena es a las 8.', speaker: 'Mamá' },
        { text: '¡Ten cuidado en el vecindario!', speaker: 'Mamá' },
      ],
      movement: { type: 'stationary' },
    },
    {
      id: 'npc-vecino',
      name: 'Don Carlos',
      sprite: '👴',
      x: 14,
      y: 5,
      direction: 'left',
      dialog: [
        { text: '¡Buenos días! ¿Cómo estás?', speaker: 'Don Carlos' },
        { text: 'Tu familia se mudó aquí hace poco, ¿verdad?', speaker: 'Don Carlos' },
        { text: '¡La Dehesa es un lugar tranquilo!', speaker: 'Don Carlos' },
      ],
      movement: { type: 'stationary' },
    },
    {
      id: 'npc-amiga',
      name: 'Isabella',
      sprite: '👧',
      x: 9,
      y: 12,
      direction: 'up',
      dialog: [
        { text: '¡Hola! ¿Quieres jugar conmigo?', speaker: 'Isabella' },
        { text: 'Hay un parque cerca de aquí.', speaker: 'Isabella' },
        { text: '¡Podemos explorar el barrio!', speaker: 'Isabella' },
      ],
      movement: { type: 'random' },
    },
    {
      id: 'npc-perro',
      name: 'Firulais',
      sprite: '🐕',
      x: 3,
      y: 7,
      direction: 'right',
      dialog: [
        { text: '*El perro mueve la cola felizmente*', speaker: 'Firulais' },
        { text: '*WOF WOF!*', speaker: 'Firulais' },
      ],
      movement: { type: 'patrol', path: [{ x: 2, y: 7 }, { x: 5, y: 7 }], speed: 300 },
    },
  ],
  objects: [
    // Residencia principal
    { id: 'main-house', type: 'roof', x: 2, y: 2, width: 5, height: 1 },
    { id: 'main-door', type: 'door', x: 4, y: 3, width: 1, height: 1, interaction: { type: 'door', target: 'house1', spawnX: 2, spawnY: 3 } },
    { id: 'main-window1', type: 'window', x: 5, y: 3, width: 1, height: 1 },
    { id: 'main-window2', type: 'window', x: 14, y: 3, width: 1, height: 1 },
    
    // Edificios secundarios (casas de vecinos)
    { id: 'house-left', type: 'roof', x: 2, y: 9, width: 3, height: 1 },
    { id: 'house-left-door', type: 'door', x: 3, y: 10, width: 1, height: 1, interaction: { type: 'door', target: 'house2', spawnX: 2, spawnY: 3 } },
    { id: 'house-center', type: 'roof', x: 8, y: 9, width: 3, height: 1 },
    { id: 'house-center-door', type: 'door', x: 9, y: 10, width: 1, height: 1, interaction: { type: 'door', target: 'house3', spawnX: 2, spawnY: 3 } },
    { id: 'house-right', type: 'roof', x: 13, y: 9, width: 3, height: 1 },
    { id: 'house-right-door', type: 'door', x: 14, y: 10, width: 1, height: 1, interaction: { type: 'door', target: 'house4', spawnX: 2, spawnY: 3 } },
    
    // Jardín y decoraciones
    { id: 'flower1', type: 'plant', x: 2, y: 5, width: 1, height: 1 },
    { id: 'flower2', type: 'plant', x: 5, y: 5, width: 1, height: 1 },
    { id: 'flower3', type: 'plant', x: 14, y: 5, width: 1, height: 1 },
    { id: 'flower4', type: 'plant', x: 17, y: 5, width: 1, height: 1 },
    
    // Señal de bienvenida
    { id: 'welcome-sign', type: 'sign', x: 6, y: 7, width: 1, height: 1, interaction: { type: 'sign', text: 'Bienvenido a La Dehesa - Chile 2003' } },
    
    // Estanque decorativo
    { id: 'pond1', type: 'water', x: 2, y: 13, width: 4, height: 1 },
    { id: 'pond2', type: 'water', x: 13, y: 13, width: 4, height: 1 },
    
    // Árboles decorativos
    { id: 'tree1', type: 'tree', x: 0, y: 0, width: 1, height: 1 },
    { id: 'tree2', type: 'tree', x: 19, y: 0, width: 1, height: 1 },
    { id: 'tree3', type: 'tree', x: 0, y: 14, width: 1, height: 1 },
    { id: 'tree4', type: 'tree', x: 19, y: 14, width: 1, height: 1 },
  ],
};
