import { useMemo } from 'react';
import type { PlayerState } from '../types';
import { TILE_SIZE } from '../constants';

interface PlayerProps {
  player: PlayerState;
  offsetX?: number;
  offsetY?: number;
}

const DIRECTION_EMOJIS: Record<string, string> = {
  down: '🧑',
  up: '🧑',
  left: '🧑',
  right: '🧑',
};

export function Player({ player, offsetX = 0, offsetY = 0 }: PlayerProps) {
  const spriteStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: `${player.x * TILE_SIZE + offsetX}px`,
    top: `${player.y * TILE_SIZE + offsetY}px`,
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    transition: 'left 0.15s ease-out, top 0.15s ease-out',
    zIndex: 10,
    imageRendering: 'auto' as const,
  }), [player.x, player.y, offsetX, offsetY]);

  const facingLeft = player.direction === 'left';

  return (
    <div style={spriteStyle} className="player-character">
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          transform: facingLeft ? 'scaleX(-1)' : 'none',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
      >
        {DIRECTION_EMOJIS[player.direction]}
      </div>
      <style>{`
        .player-character {
          image-rendering: pixelated;
        }
        .player-character::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 4px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
