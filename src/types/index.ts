export interface Move {
  id: string;
  name: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  maxPP: number;
  category: 'physical' | 'special' | 'status';
  effect?: 'heal' | 'status' | 'stat';
  effectChance?: number;
}

export interface Pokemon {
  id: string;
  name: string;
  sprite: string;
  backSprite: string;
  types: string[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    special: number;
    speed: number;
  };
  movePool: string[];
}

export interface Combatant {
  pokemon: Pokemon;
  currentHP: number;
  maxHP: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special: number;
    speed: number;
  };
  moves: Move[];
}

export type BattlePhase = 'selecting' | 'battling' | 'ended';

export type CombatantSide = 'player' | 'enemy';

export interface BattleLogEntry {
  turn: number;
  actor: CombatantSide;
  action: string;
  details: string;
  damage?: number;
  effectiveness?: number;
  timestamp: number;
}

export interface BattleState {
  phase: BattlePhase;
  player: Combatant | null;
  enemy: Combatant | null;
  turn: CombatantSide | null;
  turnCount: number;
  log: BattleLogEntry[];
  winner: CombatantSide | null;
}

export interface GameConfig {
  onWin?: (pokemon: Pokemon) => void;
  onLose?: () => void;
}