import { useState, useCallback, useEffect, useRef } from 'react';
import type { PlayerState, Direction, GameMap } from '../types';
import { TILES } from '../constants';

interface UseMovementOptions {
  initialX: number;
  initialY: number;
  map: GameMap;
  onTileInteraction?: (x: number, y: number) => void;
  onDoorEnter?: (target: string, spawnX: number, spawnY: number) => void;
}

export function useMovement({
  initialX,
  initialY,
  map,
  onTileInteraction,
  onDoorEnter,
}: UseMovementOptions) {
  const [player, setPlayer] = useState<PlayerState>({
    x: initialX,
    y: initialY,
    direction: 'down',
    isMoving: false,
    stepCount: 0,
  });

  const keysPressed = useRef<Set<string>>(new Set());
  const lastMoveTime = useRef<number>(0);
  const moveInterval = 120;

  const canMoveTo = useCallback((x: number, y: number): boolean => {
    if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
      return false;
    }

    const tileType = map.tiles[y][x];
    const tile = TILES[tileType];
    
    if (!tile.walkable) {
      return false;
    }

    const occupiedByNPC = map.npcs.some(npc => npc.x === x && npc.y === y);
    if (occupiedByNPC) {
      return false;
    }

    return true;
  }, [map]);

  const getDirectionFromKey = useCallback((key: string): Direction | null => {
    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        return 'up';
      case 'ArrowDown':
      case 's':
      case 'S':
        return 'down';
      case 'ArrowLeft':
      case 'a':
      case 'A':
        return 'left';
      case 'ArrowRight':
      case 'd':
      case 'D':
        return 'right';
      default:
        return null;
    }
  }, []);

  const getDelta = useCallback((direction: Direction): { dx: number; dy: number } => {
    switch (direction) {
      case 'up':
        return { dx: 0, dy: -1 };
      case 'down':
        return { dx: 0, dy: 1 };
      case 'left':
        return { dx: -1, dy: 0 };
      case 'right':
        return { dx: 1, dy: 0 };
    }
  }, []);

  const move = useCallback((direction: Direction) => {
    const now = Date.now();
    if (now - lastMoveTime.current < moveInterval) {
      return;
    }

    setPlayer(prev => {
      if (prev.isMoving) return prev;

      const { dx, dy } = getDelta(direction);
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      if (!canMoveTo(newX, newY)) {
        return { ...prev, direction };
      }

      lastMoveTime.current = now;

      return {
        ...prev,
        x: newX,
        y: newY,
        direction,
        isMoving: true,
        stepCount: prev.stepCount + 1,
      };
    });
  }, [canMoveTo, getDelta]);

  const handleInteraction = useCallback(() => {
    const { x, y, direction } = player;
    const { dx, dy } = getDelta(direction);
    const targetX = x + dx;
    const targetY = y + dy;

    if (targetX < 0 || targetX >= map.width || targetY < 0 || targetY >= map.height) {
      return;
    }

    const tileType = map.tiles[targetY][targetX];
    const tile = TILES[tileType];

    if (tile.interaction) {
      if (tile.interaction.type === 'door' && onDoorEnter) {
        onDoorEnter(tile.interaction.target, tile.interaction.spawnX, tile.interaction.spawnY);
      } else if (onTileInteraction) {
        onTileInteraction(targetX, targetY);
      }
    }

    const objectAtTarget = map.objects.find(obj => 
      targetX >= obj.x && targetX < obj.x + obj.width &&
      targetY >= obj.y && targetY < obj.y + obj.height
    );

    if (objectAtTarget?.interaction) {
      if (objectAtTarget.interaction.type === 'door' && onDoorEnter) {
        onDoorEnter(
          objectAtTarget.interaction.target,
          objectAtTarget.interaction.spawnX,
          objectAtTarget.interaction.spawnY
        );
      } else if (onTileInteraction) {
        onTileInteraction(targetX, targetY);
      }
    }
  }, [player, map, getDelta, onTileInteraction, onDoorEnter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        handleInteraction();
        return;
      }

      keysPressed.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleInteraction]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const pressedKeys = Array.from(keysPressed.current);
      
      for (const key of pressedKeys) {
        const direction = getDirectionFromKey(key);
        if (direction) {
          move(direction);
          break;
        }
      }

      setPlayer(prev => {
        if (prev.isMoving && keysPressed.current.size === 0) {
          return { ...prev, isMoving: false };
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [move, getDirectionFromKey]);

  const resetPosition = useCallback((x: number, y: number) => {
    setPlayer(prev => ({
      ...prev,
      x,
      y,
      direction: 'down',
      isMoving: false,
    }));
  }, []);

  return {
    player,
    resetPosition,
    handleInteraction,
  };
}
