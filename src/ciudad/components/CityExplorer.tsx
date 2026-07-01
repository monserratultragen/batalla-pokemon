import { useState, useCallback, useEffect } from 'react';
import type { CityView, InteriorMap } from '../types';
import { CITY_MAP } from '../data/cityMap';
import { getInterior } from '../data/interiors';
import { useMovement } from '../hooks/useMovement';
import { useInteraction } from '../hooks/useInteraction';
import { CityMap } from './CityMap';
import { InteriorMap as InteriorMapComponent } from './InteriorMap';
import { DialogBox } from './DialogBox';
import { IntroScreen } from './IntroScreen';

interface CityExplorerProps {
  onBack?: () => void;
}

export function CityExplorer({ onBack }: CityExplorerProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState<CityView>('exterior');
  const [currentInterior, setCurrentInterior] = useState<InteriorMap | null>(null);
  const [transitionActive, setTransitionActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const mapWidth = 320;
      const mapHeight = 240;
      const isMob = window.innerWidth <= 768 || 'ontouchstart' in window;
      const padding = isMob ? 20 : 40;
      const topOffset = isMob ? 120 : 100;
      const maxWidth = window.innerWidth - padding;
      const maxHeight = window.innerHeight - topOffset;

      const scaleX = maxWidth / mapWidth;
      const scaleY = maxHeight / mapHeight;
      const newScale = Math.min(scaleX, scaleY, 2.5);

      setScale(Math.max(newScale, 0.8));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const {
    player: exteriorPlayer,
    handleInteraction: exteriorInteraction,
  } = useMovement({
    initialX: 10,
    initialY: 12,
    map: CITY_MAP,
    onDoorEnter: (target, spawnX, spawnY) => {
      const interior = getInterior(target);
      if (interior) {
        setTransitionActive(true);
        setTimeout(() => {
          setCurrentInterior(interior);
          resetInteriorPosition(spawnX, spawnY);
          setView('interior');
          setTransitionActive(false);
        }, 300);
      }
    },
  });

  const {
    player: interiorPlayer,
    resetPosition: resetInteriorPosition,
    handleInteraction: interiorInteraction,
  } = useMovement({
    initialX: 2,
    initialY: 3,
    map: currentInterior || {
      id: 'empty',
      name: 'Empty',
      width: 0,
      height: 0,
      tiles: [],
      npcs: [],
      objects: [],
    },
    onDoorEnter: () => {
      handleExitInterior();
    },
  });

  const {
    isDialogActive,
    currentDialog,
    tryInteract,
    endDialog,
  } = useInteraction({
    player: view === 'exterior' ? exteriorPlayer : interiorPlayer,
    npcs: view === 'exterior' ? CITY_MAP.npcs : currentInterior?.npcs || [],
  });

  const handleExitInterior = useCallback(() => {
    setTransitionActive(true);
    setTimeout(() => {
      setCurrentInterior(null);
      setView('exterior');
      setTransitionActive(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        e.preventDefault();
        if (isDialogActive) {
          const dialog = tryInteract();
          if (!dialog) {
            endDialog();
          }
        } else {
          if (view === 'interior') {
            interiorInteraction();
          } else {
            exteriorInteraction();
          }
          tryInteract();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, view, isDialogActive, tryInteract, endDialog, exteriorInteraction, interiorInteraction]);

  const pressKey = useCallback((key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  }, []);

  const releaseKey = useCallback((key: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
  }, []);

  const handleAction = useCallback(() => {
    if (isDialogActive) {
      const dialog = tryInteract();
      if (!dialog) {
        endDialog();
      }
    } else {
      if (view === 'interior') {
        interiorInteraction();
      } else {
        exteriorInteraction();
      }
      tryInteract();
    }
  }, [isDialogActive, view, tryInteract, endDialog, exteriorInteraction, interiorInteraction]);

  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        background: '#0a0a0a',
        padding: '10px',
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        style={{
          marginBottom: '8px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h1
          style={{
            color: '#ffb3c6',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(14px, 4vw, 22px)',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          {view === 'exterior' ? 'La Dehesa, Chile — 2003' : currentInterior?.name || 'Interior'}
        </h1>
        <p
          style={{
            color: '#c77dff',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(9px, 2.5vw, 12px)',
            margin: '2px 0 0 0',
          }}
        >
          {isMobile ? 'Usa el joystick para moverte' : 'WASD/Flechas: Mover | E/Enter: Interactuar'}
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          opacity: transitionActive ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {view === 'exterior' ? (
          <CityMap map={CITY_MAP} player={exteriorPlayer} />
        ) : currentInterior ? (
          <InteriorMapComponent
            map={currentInterior}
            player={interiorPlayer}
            onExit={handleExitInterior}
          />
        ) : null}
      </div>

      {isDialogActive && currentDialog && (
        <DialogBox dialog={currentDialog} onClose={() => {
          handleAction();
        }} />
      )}

      <div
        style={{
          position: 'fixed',
          bottom: isMobile ? '190px' : '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: '#ffb3c6',
          padding: '4px 8px',
          borderRadius: '6px',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '10px',
          zIndex: 50,
          border: '1px solid rgba(255,182,193,0.2)',
        }}
      >
        ({exteriorPlayer.x}, {exteriorPlayer.y})
      </div>

      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            background: 'linear-gradient(135deg, #ff758f 0%, #ff8fa3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'Nunito, sans-serif',
            cursor: 'pointer',
            zIndex: 50,
            boxShadow: '0 2px 8px rgba(255, 117, 143, 0.3)',
          }}
        >
          ← Volver
        </button>
      )}

      {isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            zIndex: 100,
          }}
        >
          <button
            onTouchStart={(e) => { e.preventDefault(); pressKey('ArrowUp'); }}
            onTouchEnd={(e) => { e.preventDefault(); releaseKey('ArrowUp'); }}
            onTouchCancel={(e) => { e.preventDefault(); releaseKey('ArrowUp'); }}
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,117,143,0.25)',
              border: '2px solid rgba(255,182,193,0.4)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'none',
            }}
          >
            ▲
          </button>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onTouchStart={(e) => { e.preventDefault(); pressKey('ArrowLeft'); }}
              onTouchEnd={(e) => { e.preventDefault(); releaseKey('ArrowLeft'); }}
              onTouchCancel={(e) => { e.preventDefault(); releaseKey('ArrowLeft'); }}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,117,143,0.25)',
                border: '2px solid rgba(255,182,193,0.4)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
              }}
            >
              ◀
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); handleAction(); }}
              style={{
                width: '52px',
                height: '52px',
                background: 'rgba(6,214,160,0.35)',
                border: '2px solid rgba(6,214,160,0.6)',
                borderRadius: '50%',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'Nunito, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
              }}
            >
              A
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); pressKey('ArrowRight'); }}
              onTouchEnd={(e) => { e.preventDefault(); releaseKey('ArrowRight'); }}
              onTouchCancel={(e) => { e.preventDefault(); releaseKey('ArrowRight'); }}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,117,143,0.25)',
                border: '2px solid rgba(255,182,193,0.4)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
              }}
            >
              ▶
            </button>
          </div>
          <button
            onTouchStart={(e) => { e.preventDefault(); pressKey('ArrowDown'); }}
            onTouchEnd={(e) => { e.preventDefault(); releaseKey('ArrowDown'); }}
            onTouchCancel={(e) => { e.preventDefault(); releaseKey('ArrowDown'); }}
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,117,143,0.25)',
              border: '2px solid rgba(255,182,193,0.4)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'none',
            }}
          >
            ▼
          </button>
        </div>
      )}
    </div>
  );
}
