// ── Tile Types ──────────────────────────────────────────────
export type TileType = 
  | 'grass' | 'path' | 'water' | 'tree' | 'wall'
  | 'door' | 'floor' | 'carpet' | 'counter' | 'table'
  | 'chair' | 'bed' | 'bookshelf' | 'tv' | 'painting'
  | 'window' | 'plant' | 'gym_floor' | 'desk' | 'pupil_desk'
  | 'bar_counter' | 'stool' | 'barrel' | 'lab_table' | 'computer'
  | 'pokeball_item' | 'sign' | 'fence' | 'roof' | 'stair';

export interface Tile {
  type: TileType;
  walkable: boolean;
  color: string;
  sprite?: string;
  interaction?: TileInteraction;
}

export type TileInteraction = 
  | { type: 'door'; target: string; spawnX: number; spawnY: number }
  | { type: 'npc'; npcId: string }
  | { type: 'item'; itemId: string }
  | { type: 'sign'; text: string }
  | { type: 'transition'; targetMap: string; spawnX: number; spawnY: number };

// ── Map Types ───────────────────────────────────────────────
export interface GameMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  npcs: NPCData[];
  objects: MapObject[];
}

export interface MapObject {
  id: string;
  type: TileType;
  x: number;
  y: number;
  width: number;
  height: number;
  interaction?: TileInteraction;
}

// ── Player Types ────────────────────────────────────────────
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface PlayerState {
  x: number;
  y: number;
  direction: Direction;
  isMoving: boolean;
  stepCount: number;
}

// ── NPC Types ───────────────────────────────────────────────
export interface NPCData {
  id: string;
  name: string;
  sprite: string;
  x: number;
  y: number;
  direction: Direction;
  dialog: DialogLine[];
  movement?: NPCMovement;
}

export interface DialogLine {
  text: string;
  speaker?: string;
  action?: DialogAction;
}

export type DialogAction = 
  | { type: 'giveItem'; itemId: string }
  | { type: 'startBattle'; trainerId: string }
  | { type: 'heal' }
  | { type: 'setFlag'; flag: string };

export interface NPCMovement {
  type: 'stationary' | 'patrol' | 'random';
  path?: { x: number; y: number }[];
  speed?: number;
}

// ── Interior Types ──────────────────────────────────────────
export interface InteriorMap extends GameMap {
  parentId: string;
  spawnX: number;
  spawnY: number;
  exitTile: { x: number; y: number };
}

// ── City State ──────────────────────────────────────────────
export type CityView = 'exterior' | 'interior';

export interface CityState {
  currentMap: string;
  view: CityView;
  player: PlayerState;
  interactedNPC: NPCData | null;
  dialogQueue: DialogLine[];
  flags: Record<string, boolean>;
}
