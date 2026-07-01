import type { Tile, TileType } from './types';

// ── Map Dimensions ──────────────────────────────────────────
export const TILE_SIZE = 16;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;
export const VIEWPORT_WIDTH = 320;
export const VIEWPORT_HEIGHT = 240;

// ── Player Constants ────────────────────────────────────────
export const PLAYER_SPEED = 150;
export const STEP_ANIMATION_DURATION = 150;

// ── Tile Definitions ────────────────────────────────────────
export const TILES: Record<TileType, Tile> = {
  grass: { type: 'grass', walkable: true, color: '#90EE90' },
  path: { type: 'path', walkable: true, color: '#D2B48C' },
  water: { type: 'water', walkable: false, color: '#4A90D9' },
  tree: { type: 'tree', walkable: false, color: '#228B22' },
  wall: { type: 'wall', walkable: false, color: '#8B4513' },
  door: { type: 'door', walkable: true, color: '#8B4513' },
  floor: { type: 'floor', walkable: true, color: '#DEB887' },
  carpet: { type: 'carpet', walkable: true, color: '#B22222' },
  counter: { type: 'counter', walkable: false, color: '#A0522D' },
  table: { type: 'table', walkable: false, color: '#8B4513' },
  chair: { type: 'chair', walkable: false, color: '#CD853F' },
  bed: { type: 'bed', walkable: false, color: '#E6E6FA' },
  bookshelf: { type: 'bookshelf', walkable: false, color: '#8B4513' },
  tv: { type: 'tv', walkable: false, color: '#2F2F2F' },
  painting: { type: 'painting', walkable: false, color: '#FFD700' },
  window: { type: 'window', walkable: false, color: '#87CEEB' },
  plant: { type: 'plant', walkable: false, color: '#228B22' },
  gym_floor: { type: 'gym_floor', walkable: true, color: '#CD853F' },
  desk: { type: 'desk', walkable: false, color: '#8B4513' },
  pupil_desk: { type: 'pupil_desk', walkable: false, color: '#DEB887' },
  bar_counter: { type: 'bar_counter', walkable: false, color: '#8B0000' },
  stool: { type: 'stool', walkable: false, color: '#8B4513' },
  barrel: { type: 'barrel', walkable: false, color: '#A0522D' },
  lab_table: { type: 'lab_table', walkable: false, color: '#E0E0E0' },
  computer: { type: 'computer', walkable: false, color: '#404040' },
  pokeball_item: { type: 'pokeball_item', walkable: true, color: '#FF0000' },
  sign: { type: 'sign', walkable: false, color: '#8B4513' },
  fence: { type: 'fence', walkable: false, color: '#DEB887' },
  roof: { type: 'roof', walkable: false, color: '#B22222' },
  stair: { type: 'stair', walkable: true, color: '#A0522D' },
};

// ── Tile Colors for Rendering ───────────────────────────────
export const TILE_COLORS: Record<TileType, string> = {
  grass: '#7CCD7C',
  path: '#D2B48C',
  water: '#4A90D9',
  tree: '#228B22',
  wall: '#8B7355',
  door: '#8B4513',
  floor: '#DEB887',
  carpet: '#CD5C5C',
  counter: '#A0522D',
  table: '#8B4513',
  chair: '#CD853F',
  bed: '#E6E6FA',
  bookshelf: '#8B4513',
  tv: '#2F2F2F',
  painting: '#FFD700',
  window: '#87CEEB',
  plant: '#228B22',
  gym_floor: '#CD853F',
  desk: '#8B4513',
  pupil_desk: '#DEB887',
  bar_counter: '#8B0000',
  stool: '#8B4513',
  barrel: '#A0522D',
  lab_table: '#E0E0E0',
  computer: '#404040',
  pokeball_item: '#FF0000',
  sign: '#8B4513',
  fence: '#DEB887',
  roof: '#B22222',
  stair: '#A0522D',
};

// ── Tile Emojis for Visual Representation ───────────────────
export const TILE_EMOJIS: Partial<Record<TileType, string>> = {
  tree: '🌳',
  water: '💧',
  door: '🚪',
  tv: '📺',
  painting: '🖼️',
  window: '🪟',
  plant: '🌿',
  bed: '🛏️',
  bookshelf: '📚',
  computer: '💻',
  pokeball_item: '🔴',
  sign: '📝',
  barrel: '🪣',
};

// ── Interaction Prompts ─────────────────────────────────────
export const INTERACTION_PROMPT = '[E] Interactuar';
export const DOOR_PROMPT = '[E] Entrar';
export const SIGN_PROMPT = '[E] Leer';
