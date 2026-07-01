import { useMemo } from 'react';
import type { GameMap, PlayerState } from '../types';
import { TILE_SIZE, TILE_COLORS } from '../constants';
import { Player } from './Player';
import { NPC } from './NPC';

interface CityMapProps {
  map: GameMap;
  player: PlayerState;
}

export function CityMap({ map, player }: CityMapProps) {
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
        {obj.type === 'door' && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
          }}>
            🚪
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
      
      <style>{`
        .city-map-container {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}
