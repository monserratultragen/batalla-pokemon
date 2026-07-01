import { useMemo } from 'react';
import type { InteriorMap, PlayerState } from '../types';
import { TILE_SIZE, TILE_COLORS } from '../constants';
import { Player } from './Player';
import { NPC } from './NPC';

interface InteriorMapProps {
  map: InteriorMap;
  player: PlayerState;
  onExit: () => void;
}

export function InteriorMap({ map, player, onExit }: InteriorMapProps) {
  const tiles = useMemo(() => {
    const renderedTiles: React.ReactElement[] = [];
    
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tileType = map.tiles[y][x];
        const color = TILE_COLORS[tileType] || '#000';
        
        renderedTiles.push(
          <div
            key={`${x}-${y}`}
            style={{
              position: 'absolute',
              left: `${x * TILE_SIZE}px`,
              top: `${y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              backgroundColor: color,
              border: '0.5px solid rgba(0,0,0,0.1)',
            }}
          />
        );
      }
    }
    
    return renderedTiles;
  }, [map]);

  const objects = useMemo(() => {
    return map.objects.map(obj => (
      <div
        key={obj.id}
        style={{
          position: 'absolute',
          left: `${obj.x * TILE_SIZE}px`,
          top: `${obj.y * TILE_SIZE}px`,
          width: `${obj.width * TILE_SIZE}px`,
          height: `${obj.height * TILE_SIZE}px`,
          backgroundColor: TILE_COLORS[obj.type] || '#000',
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: '2px',
          zIndex: 2,
        }}
      >
        {obj.type === 'tv' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            📺
          </div>
        )}
        {obj.type === 'painting' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            🖼️
          </div>
        )}
        {obj.type === 'plant' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            🌿
          </div>
        )}
        {obj.type === 'bed' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            🛏️
          </div>
        )}
        {obj.type === 'bookshelf' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            📚
          </div>
        )}
        {obj.type === 'computer' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            💻
          </div>
        )}
        {obj.type === 'sign' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            📝
          </div>
        )}
        {obj.type === 'pokeball_item' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            animation: 'pokeball-bounce 1s ease-in-out infinite',
          }}>
            🔴
          </div>
        )}
      </div>
    ));
  }, [map]);

  const npcs = useMemo(() => {
    return map.npcs.map(npc => (
      <NPC key={npc.id} npc={npc} />
    ));
  }, [map]);

  return (
    <div
      style={{
        position: 'relative',
        width: `${map.width * TILE_SIZE}px`,
        height: `${map.height * TILE_SIZE}px`,
        overflow: 'hidden',
        backgroundColor: '#000',
        border: '2px solid #333',
        borderRadius: '8px',
      }}
    >
      {tiles}
      {objects}
      {npcs}
      <Player player={player} />
      
      <button
        onClick={onExit}
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'linear-gradient(135deg, #ff758f 0%, #ff8fa3 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '9999px',
          padding: '6px 12px',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: 'Nunito, sans-serif',
          cursor: 'pointer',
          zIndex: 20,
          boxShadow: '0 2px 8px rgba(255, 117, 143, 0.3)',
        }}
      >
        [E] Salir
      </button>
      
      <style>{`
        .interior-map-container {
          image-rendering: pixelated;
        }
        @keyframes pokeball-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
