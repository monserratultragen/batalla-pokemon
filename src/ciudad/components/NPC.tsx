import { useMemo } from 'react';
import type { NPCData } from '../types';
import { TILE_SIZE } from '../constants';

interface NPCProps {
  npc: NPCData;
  offsetX?: number;
  offsetY?: number;
}

export function NPC({ npc, offsetX = 0, offsetY = 0 }: NPCProps) {
  const spriteStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: `${npc.x * TILE_SIZE + offsetX}px`,
    top: `${npc.y * TILE_SIZE + offsetY}px`,
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    zIndex: 5,
    imageRendering: 'auto' as const,
  }), [npc.x, npc.y, offsetX, offsetY]);

  const facingLeft = npc.direction === 'left';

  return (
    <div style={spriteStyle} className="npc-character">
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          transform: facingLeft ? 'scaleX(-1)' : 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
        }}
      >
        {npc.sprite}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '6px',
          fontWeight: 'bold',
          color: '#333',
          whiteSpace: 'nowrap',
          background: 'rgba(255,255,255,0.8)',
          padding: '1px 3px',
          borderRadius: '3px',
        }}
      >
        {npc.name}
      </div>
    </div>
  );
}
