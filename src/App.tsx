import { useState, useEffect, useRef } from 'react';
import { usePokemonSelection, POKEBALL_TYPES } from './hooks/usePokemonSelection';
import { useBattle } from './hooks/useBattle';
import type { Pokemon } from './types';
import type { Pokebelt } from './hooks/usePokemonSelection';
import { HPBar } from './components/HPBar';
import { MoveButton } from './components/MoveButton';
import { PokemonSprite } from './components/PokemonSprite';
import { TypeBadge } from './components/TypeBadge';
import { StatPreview } from './components/StatPreview';

// Import assets
import entrenadoraFace from './assets/entrenadora-face.png';
import entrenadoraFull from './assets/entrenadora-full.png';
import battleBg from './assets/battle-bg.png';

function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [introStep, setIntroStep] = useState(0);

  const dialogs = [
    {
      text: "La entrenadora Monserrat te ha detectado y te desafía...",
    },
    {
      text: "Monserrat: '¡Te reto a una batalla pokemon! ¡No pienses que será fácil!'",
    }
  ];

  const handleNext = () => {
    if (introStep < dialogs.length - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-3 sm:px-6 w-full" style={{ background: '#000' }}>
      <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl relative flex flex-col items-center overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div className="w-full px-4 sm:px-8 pt-5 sm:pt-8 pb-3 sm:pb-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff758f' }} />
          <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: 'rgba(255,182,193,0.7)', fontFamily: 'Nunito, sans-serif' }}>Retadora</h1>
        </div>

        {/* Cinematic Area */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 pb-5 sm:pb-6 flex-1 justify-center">

          {/* Trainer Face - elegant circular frame */}
          <div className="flex flex-col items-center shrink-0">
            <div style={{ background: 'linear-gradient(135deg, #ff758f, #c77dff)', padding: '3px', borderRadius: '9999px', boxShadow: '0 0 30px rgba(255,117,143,0.4)' }}>
              <img
                src={entrenadoraFace}
                alt="Rostro Entrenadora Monserrat"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                style={{ display: 'block' }}
              />
            </div>
            <span className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-bold tracking-wide" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif' }}>Monserrat</span>
          </div>

          {/* Dialog Box */}
          <div className="flex-1 p-3 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between" style={{ background: 'rgba(255,240,245,0.08)' }}>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
              {dialogs[introStep].text}
            </p>
            <div className="flex justify-end mt-4 sm:mt-6">
              <button
                onClick={handleNext}
                className="btn-pixel"
              >
                {introStep === dialogs.length - 1 ? "Elegir Pokémon" : "Siguiente →"}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function SelectionScreen({ onSelectBelt }: { onSelectBelt: (belt: Pokebelt) => void }) {
  const { belts } = usePokemonSelection();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-3 sm:px-4 w-full" style={{ background: '#000' }}>
      <h1 className="pixel-font text-lg sm:text-2xl text-yellow-400 mb-2 sm:mb-4 text-shadow text-center font-bold">
        ¡SELECCIONA TU POKÉMON!
      </h1>
      <p className="text-xs sm:text-sm mb-5 sm:mb-8 text-center" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif' }}>
        Elige un cinturón de pokébolas
      </p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {belts.map(belt => (
          <div
            key={belt.id}
            onClick={() => onSelectBelt(belt)}
            className="cursor-pointer p-4 sm:p-6 rounded-xl gameboy-border transition-all hover:scale-105 hover:shadow-lg w-full max-w-[220px] sm:w-64"
          >
            <div className="text-center mb-3 sm:mb-4">
              <span className="pixel-font text-sm sm:text-base text-gray-900 font-bold">{belt.label}</span>
            </div>
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {belt.balls.map((ball, i) => (
                <img
                  key={i}
                  src={ball.ballType.sprite}
                  alt={ball.ballType.label}
                  className="pokeball-img w-10 h-10 sm:w-14 sm:h-14"
                  title={ball.ballType.label}
                />
              ))}
            </div>
            <div className="text-center">
              <span className="text-[11px] sm:text-xs font-bold tracking-wide" style={{ color: '#c77dff', fontFamily: 'Nunito, sans-serif' }}>
                3 pokébolas misteriosas
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PokeballSelectScreen({
  belt,
  onSelectPokemon,
}: {
  belt: Pokebelt;
  onSelectPokemon: (pokemon: Pokemon) => void;
}) {
  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null);
  const [modalBallType, setModalBallType] = useState<typeof POKEBALL_TYPES[number]>(POKEBALL_TYPES[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-3 sm:px-4 w-full" style={{ background: '#000' }}>
      <h1 className="pixel-font text-lg sm:text-2xl text-yellow-400 mb-2 sm:mb-4 text-shadow text-center font-bold">
        ¡Elige una pokébola!
      </h1>
      <p className="text-xs sm:text-sm mb-5 sm:mb-8 text-center" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif' }}>
        {belt.label} — Toca una pokébola para revelar su contenido
      </p>

      <div className="flex justify-center items-center gap-4 sm:gap-8">
        {belt.balls.map((ball, i) => (
          <div
            key={i}
            onClick={() => { setModalPokemon(ball.pokemon); setModalBallType(ball.ballType); }}
            className="cursor-pointer flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-2xl gameboy-border transition-all hover:scale-110 hover:shadow-lg"
          >
            <img
              src={ball.ballType.sprite}
              alt={ball.ballType.label}
              className="pokeball-img w-14 h-14 sm:w-20 sm:h-20 pokeball-bounce"
            />
            <span className="text-[11px] sm:text-xs font-bold" style={{ color: '#c77dff', fontFamily: 'Nunito, sans-serif' }}>
              {ball.ballType.label}
            </span>
          </div>
        ))}
      </div>

      {modalPokemon && (
        <PokemonRevealModal
          pokemon={modalPokemon}
          ballType={modalBallType}
          onConfirm={() => {
            onSelectPokemon(modalPokemon);
          }}
          onClose={() => setModalPokemon(null)}
        />
      )}
    </div>
  );
}

function PokemonRevealModal({
  pokemon,
  ballType,
  onConfirm,
  onClose,
}: {
  pokemon: Pokemon;
  ballType: typeof POKEBALL_TYPES[number];
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<'shaking' | 'revealing' | 'revealed'>('shaking');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('revealing'), 600);
    const t2 = setTimeout(() => setPhase('revealed'), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-card ${phase === 'revealed' ? 'modal-card-open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {phase !== 'revealed' ? (
          <div className={`flex flex-col items-center justify-center py-8 sm:py-12 ${phase === 'shaking' ? 'pokeball-shake' : 'pokeball-flash'}`}>
            <img
              src={ballType.sprite}
              alt={ballType.label}
              className="w-20 h-20 sm:w-28 sm:h-28"
            />
            <p className="pixel-font text-xs sm:text-sm mt-4" style={{ color: '#ff758f' }}>
              {phase === 'shaking' ? '...' : '¡Se abre!'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center p-4 sm:p-6 modal-reveal">
            <div className="flex justify-center mb-3 sm:mb-4 h-28 sm:h-36 items-end">
              <PokemonSprite pokemon={pokemon} side="enemy" />
            </div>
            <div className="text-center pixel-font text-base sm:text-xl text-gray-900 uppercase font-bold mb-2">
              {pokemon.name}
            </div>
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
            <div className="w-full max-w-[260px] sm:max-w-xs text-gray-800 mb-4 sm:mb-6">
              <StatPreview stats={pokemon.baseStats} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button onClick={onConfirm} className="btn-pixel text-xs sm:text-sm">
                ¡USAR ESTE POKÉMON!
              </button>
              <button onClick={onClose} className="btn-pixel-blue text-xs sm:text-sm">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreludeScreen({ playerPokemon: _playerPokemon, onFinish }: { playerPokemon: Pokemon; onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [gengarPhase, setGengarPhase] = useState<'hidden' | 'pokeball' | 'flash' | 'launch' | 'landed'>('hidden');

  useEffect(() => {
    const t1 = setTimeout(() => setIsMounted(true), 100);
    // Monserrat enters, then after 1.2s start the pokeball sequence
    const t2 = setTimeout(() => setGengarPhase('pokeball'), 1200);
    const t3 = setTimeout(() => setGengarPhase('flash'), 1800);
    const t4 = setTimeout(() => setGengarPhase('launch'), 2100);
    const t5 = setTimeout(() => setGengarPhase('landed'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  const dialogs = [
    {
      text: "Monserrat: '¡No me contendré! ¡Adelante, Gengar!'",
      showGengar: true,
    },
    {
      text: "Monserrat: '¡Prepárate! ¡Esta batalla decidirá quién es el mejor de nosotros!'",
      showGengar: true,
    }
  ];

  const handleNext = () => {
    if (step < dialogs.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-3 sm:px-6 w-full" style={{ background: '#000' }}>
      <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl relative flex flex-col items-center overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,182,193,0.15)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
        
        {/* Header */}
        <div className="w-full px-4 sm:px-8 pt-5 sm:pt-8 pb-3 sm:pb-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff758f' }} />
          <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: 'rgba(255,182,193,0.7)', fontFamily: 'Nunito, sans-serif' }}>Antesala del Combate</h1>
        </div>

        {/* Visual Arena */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0015 0%, #1a0030 60%, #0d001f 100%)' }}>
          
          {/* Trainer Monserrat - slides from left */}
          <div className={`absolute left-3 sm:left-6 bottom-2 sm:bottom-4 transition-all duration-1000 ease-out transform ${isMounted ? 'translate-x-0' : '-translate-x-full'} flex justify-center items-end`}>
            <img 
              src={entrenadoraFull} 
              alt="Entrenadora Monserrat" 
              className="h-[180px] sm:h-[240px] md:h-[290px] object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,117,143,0.3))' }}
            />

            {/* Pokeball that opens - appears near Monserrat's hand */}
            {(gengarPhase === 'pokeball' || gengarPhase === 'flash') && (
              <div className="absolute -right-4 sm:-right-6 bottom-16 sm:bottom-24 z-10">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="Pokébola"
                  className={`w-8 h-8 sm:w-10 sm:h-10 ${gengarPhase === 'flash' ? 'pokeball-flash' : ''}`}
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.8))' }}
                />
              </div>
            )}
          </div>

          {/* Gengar - curved launch animation */}
          {gengarPhase === 'launch' && (
            <div className="gengar-launch absolute z-20" style={{ left: '25%', bottom: '40%' }}>
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" 
                alt="Gengar" 
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 pokemon-sprite"
                style={{ filter: 'drop-shadow(0 0 25px rgba(180,100,255,0.9))' }}
              />
            </div>
          )}

          {/* Gengar - landed position */}
          {gengarPhase === 'landed' && dialogs[step].showGengar && (
            <div className="absolute right-4 sm:right-10 md:right-16 bottom-6 sm:bottom-10 flex flex-col items-center gengar-landed">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" 
                alt="Gengar" 
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 pokemon-sprite"
                style={{ filter: 'drop-shadow(0 0 20px rgba(180,100,255,0.6))' }}
              />
              <span className="mt-1 sm:mt-2 text-[11px] sm:text-xs font-bold" style={{ color: '#c77dff', fontFamily: 'Nunito, sans-serif', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '9999px' }}>
                Gengar Nv.50
              </span>
            </div>
          )}

          {/* Flash burst effect */}
          {gengarPhase === 'flash' && (
            <div className="absolute left-1/3 bottom-1/3 w-24 h-24 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 gengar-burst z-30 pointer-events-none" />
          )}
        </div>

        {/* Dialog Box */}
        <div className="w-full p-4 sm:p-6 flex flex-col justify-between" style={{ background: 'rgba(255,240,245,0.06)', borderTop: '1px solid rgba(255,182,193,0.1)' }}>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
            {dialogs[step].text}
          </p>
          <div className="flex justify-end mt-4 sm:mt-5">
            <button 
              onClick={handleNext} 
              className="btn-pixel"
            >
              {step === dialogs.length - 1 ? "¡Iniciar Batalla!" : "Siguiente →"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function BattleScreen({ playerPokemon, onFinish }: { playerPokemon: Pokemon; onFinish: () => void }) {
  const {
    player, enemy, phase, winner, currentEvent,
    playerAnimation, enemyAnimation,
    initBattle, nextEvent, selectMove, resetBattle
  } = useBattle({
    initialPlayerPokemon: playerPokemon
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initBattle();
      initialized.current = true;
    }
  }, [initBattle]);

  // Auto-advance visual animations
  useEffect(() => {
    if (currentEvent && currentEvent.type === 'animation') {
      const timer = setTimeout(() => {
        nextEvent();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentEvent, nextEvent]);

  if (!player || !enemy) return null;

  const isShowingMessage = currentEvent && (currentEvent.type === 'message' || currentEvent.type === 'damage');
  const messageText = isShowingMessage
    ? (currentEvent.message || (currentEvent.type === 'damage' ? `¡${currentEvent.target === 'player' ? player.pokemon.name : enemy.pokemon.name} recibió ${currentEvent.damage} de daño!` : ''))
    : '';

  return (
    <div className="flex flex-col min-h-screen w-full" style={{ background: '#000' }}>
      <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full rounded-none sm:rounded-2xl sm:my-2 sm:overflow-hidden overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8)', border: '1px solid rgba(255,182,193,0.15)' }}>

        {/* ARENA - fixed height on mobile, fills remaining space on desktop */}
        <div className="flex-1 relative min-h-0 p-2 sm:p-4 arena-container" style={{ backgroundImage: `url(${battleBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          {/* ENEMY SIDE */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 w-40 sm:w-44 md:w-48 flex gap-1.5 sm:gap-2 md:gap-2">
            <img
              src={entrenadoraFace}
              alt="Monserrat Face"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 object-cover shrink-0"
              style={{ borderColor: '#ff758f', background: 'rgba(255,182,193,0.15)' }}
            />
            <div className="gameboy-screen p-1.5 sm:p-2 md:p-2 flex-1 min-w-0">
              <div className="flex flex-col mb-0.5 text-left">
                <span className="pixel-font text-[11px] sm:text-xs md:text-xs font-bold truncate" style={{ color: '#3b82f6' }}>Monserrat</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="pixel-font text-[11px] sm:text-xs md:text-xs text-gray-800 uppercase font-bold truncate">{enemy.pokemon.name}</span>
                  <span className="pixel-font text-[10px] sm:text-[11px] md:text-[11px] text-gray-500 shrink-0 ml-1">Nv.50</span>
                </div>
              </div>
              <HPBar combatant={enemy} />
            </div>
          </div>
          <div className="absolute top-6 sm:top-8 md:top-10 right-2 sm:right-6 md:right-10">
            <PokemonSprite pokemon={enemy.pokemon} side="enemy" animate={enemyAnimation} />
          </div>

          {/* PLAYER SIDE */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-6 md:bottom-6 md:left-10">
            <PokemonSprite pokemon={player.pokemon} side="player" animate={playerAnimation} />
          </div>
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 w-40 sm:w-44 md:w-48">
            <div className="gameboy-screen p-1.5 sm:p-2 md:p-2">
              <div className="flex flex-col mb-0.5 text-left">
                <span className="pixel-font text-[11px] sm:text-xs md:text-xs font-bold truncate" style={{ color: '#3b82f6' }}>Usuario</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="pixel-font text-[11px] sm:text-xs md:text-xs text-gray-800 uppercase font-bold truncate">{player.pokemon.name}</span>
                  <span className="pixel-font text-[10px] sm:text-[11px] md:text-[11px] text-gray-500 shrink-0 ml-1">Nv.50</span>
                </div>
              </div>
              <HPBar combatant={player} />
            </div>
          </div>

        </div>

        {/* CONTROLS PANEL - alternates between messages and moves */}
        <div className="shrink-0 p-2 sm:p-3 md:p-4 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] flex flex-col" style={{ background: 'linear-gradient(135deg, #fff5f6 0%, #f0e6ff 100%)', borderTop: '1px solid rgba(255,182,193,0.3)' }}>
          {phase === 'ended' && winner ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              {winner === 'player' ? (
                <div className="text-center space-y-2 sm:space-y-3">
                  <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#06d6a0', fontFamily: 'Nunito, sans-serif' }}>
                    ¡Felicidades! ¡Me venciste!
                  </h2>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent font-bold text-sm sm:text-xl font-mono tracking-wider animate-pulse">
                      R2D2 tiene un secreto
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText('R2D2 tiene un secreto')}
                      className="p-2 sm:p-1.5 rounded-lg transition-all hover:scale-110 active:scale-95"
                      style={{ background: 'rgba(255,182,193,0.2)', border: '1px solid rgba(255,182,193,0.3)' }}
                      title="Copiar al portapapeles"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ff758f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold" style={{ color: '#c77dff', fontFamily: 'Nunito, sans-serif' }}>
                    ¡Escríbeme con esta palabra clave para canjear tu premio!
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#ff758f', fontFamily: 'Nunito, sans-serif' }}>
                    ¡Monserrat te ha derrotado!
                  </h2>
                </div>
              )}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                <button onClick={() => resetBattle(playerPokemon)} className="btn-pixel-blue text-xs sm:text-sm">Reintentar</button>
                <button onClick={onFinish} className="btn-pixel text-xs sm:text-sm">Volver</button>
              </div>
            </div>
          ) : isShowingMessage ? (
            /* MESSAGE MODE */
            <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 w-full max-w-md">
                <img
                  src={entrenadoraFace}
                  alt="Monserrat"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-rose-950 object-cover bg-rose-200 shrink-0 mt-0.5"
                />
                <div className="flex-1 p-3 sm:p-4 rounded-xl" style={{ background: 'rgba(255,240,245,0.15)', border: '1px solid rgba(255,182,193,0.1)' }}>
                  <p className="pixel-font text-sm sm:text-base text-rose-950 leading-relaxed font-bold">
                    {messageText}
                  </p>
                </div>
              </div>
              <button
                onClick={nextEvent}
                className="btn-pixel text-xs sm:text-sm"
              >
                SIGUIENTE
              </button>
            </div>
          ) : (
            /* MOVE SELECTION MODE */
            <div className="flex-1 flex flex-col justify-between">
              <div className="text-[10px] sm:text-xs font-bold mb-1 sm:mb-2" style={{ color: '#ff758f', fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Elige un movimiento:</div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 flex-1 content-start">
                {player.moves.map(move => (
                  <MoveButton
                    key={move.id}
                    move={move}
                    onClick={() => selectMove(move.id)}
                    disabled={currentEvent !== null}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState<'intro' | 'selection' | 'pokeball-select' | 'prelude' | 'battle'>('intro');
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [selectedBelt, setSelectedBelt] = useState<Pokebelt | null>(null);

  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionOpacity, setTransitionOpacity] = useState(0);
  const [transitionColor, setTransitionColor] = useState<'black' | 'white'>('black');

  const startTransition = (color: 'black' | 'white', callback: () => void) => {
    setTransitionColor(color);
    setTransitionActive(true);
    setTransitionOpacity(0);

    // Step 1: Fade-in overlay
    setTimeout(() => {
      setTransitionOpacity(1);
    }, 50);

    // Step 2: Switch view mid-transition (when overlay is solid)
    setTimeout(() => {
      callback();
    }, 500);

    // Step 3: Fade-out overlay
    setTimeout(() => {
      setTransitionOpacity(0);
    }, 650);

    // Step 4: Complete transition and clean up
    setTimeout(() => {
      setTransitionActive(false);
    }, 1100);
  };

  const handleFinishIntro = () => {
    // Transition to selection with a BLACK fadeout
    startTransition('black', () => {
      setView('selection');
    });
  };

  const handleSelectBelt = (belt: Pokebelt) => {
    setSelectedBelt(belt);
    setView('pokeball-select');
  };

  const handleSelectFromModal = (pokemon: Pokemon) => {
    setPlayerPokemon(pokemon);
    setSelectedBelt(null);
    setView('prelude');
  };

  const handleFinishPrelude = () => {
    // Transition to battle with a WHITE flash
    startTransition('white', () => {
      setView('battle');
    });
  };

  const handleFinishBattle = () => {
    setPlayerPokemon(null);
    setView('intro');
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      {/* Screen transition overlay */}
      {transitionActive && (
        <div
          style={{ opacity: transitionOpacity }}
          className={`fixed inset-0 z-50 transition-opacity duration-300 pointer-events-none ${transitionColor === 'black' ? 'bg-black' : 'bg-white'
            }`}
        />
      )}

      {view === 'intro' && <IntroScreen onFinish={handleFinishIntro} />}
      {view === 'selection' && <SelectionScreen onSelectBelt={handleSelectBelt} />}
      {view === 'pokeball-select' && selectedBelt && (
        <PokeballSelectScreen
          belt={selectedBelt}
          onSelectPokemon={handleSelectFromModal}
        />
      )}
      {view === 'prelude' && playerPokemon && <PreludeScreen playerPokemon={playerPokemon} onFinish={handleFinishPrelude} />}
      {view === 'battle' && playerPokemon && <BattleScreen playerPokemon={playerPokemon} onFinish={handleFinishBattle} />}
    </div>
  );
}

export default App
