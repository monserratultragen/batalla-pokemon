import { useState, useEffect, useRef } from 'react';
import { usePokemonSelection } from './hooks/usePokemonSelection';
import { useBattle } from './hooks/useBattle';
import type { Pokemon } from './types';
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ background: '#000' }}>
      <div className="w-full max-w-2xl rounded-3xl relative flex flex-col items-center overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,182,193,0.15)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div className="w-full px-8 pt-8 pb-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff758f' }} />
          <h1 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'rgba(255,182,193,0.7)', fontFamily: 'Nunito, sans-serif' }}>Retadora</h1>
        </div>

        {/* Cinematic Area */}
        <div className="w-full flex flex-col md:flex-row items-center gap-6 px-8 pb-6 flex-1 justify-center">

          {/* Trainer Face - elegant circular frame */}
          <div className="flex flex-col items-center shrink-0">
            <div style={{ background: 'linear-gradient(135deg, #ff758f, #c77dff)', padding: '3px', borderRadius: '9999px', boxShadow: '0 0 30px rgba(255,117,143,0.4)' }}>
              <img
                src={entrenadoraFace}
                alt="Rostro Entrenadora Monserrat"
                className="w-32 h-32 object-cover rounded-full"
                style={{ display: 'block' }}
              />
            </div>
            <span className="mt-3 text-xs font-bold tracking-wide" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif' }}>Monserrat</span>
          </div>

          {/* Dialog Box */}
          <div className="flex-1 p-5 rounded-2xl flex flex-col justify-between" style={{ background: 'rgba(255,240,245,0.08)', border: '1px solid rgba(255,182,193,0.15)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
              {dialogs[introStep].text}
            </p>
            <div className="flex justify-end mt-6">
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

function SelectionScreen({ onSelect }: { onSelect: (p: Pokemon) => void }) {
  const { selectedPokemon, availableOptions, selectPokemon, reroll } = usePokemonSelection();

  useEffect(() => {
    if (availableOptions.length === 0) reroll();
  }, [availableOptions.length, reroll]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full" style={{ background: '#000' }}>
      <h1 className="pixel-font text-2xl text-yellow-400 mb-8 text-shadow text-center font-bold">
        ¡SELECCIONA TU POKÉMON!
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {availableOptions.map(p => (
          <div
            key={p.id}
            onClick={() => selectPokemon(p)}
            className={`cursor-pointer p-6 rounded-xl gameboy-border transition-transform w-64 ${selectedPokemon?.id === p.id ? 'scale-110 ring-4 ring-yellow-400 bg-gray-100' : 'hover:scale-105 bg-gray-200'}`}
          >
            {/* Show Pokémon facing front during selection */}
            <div className="flex justify-center mb-4 h-32 items-end">
              <PokemonSprite pokemon={p} side="enemy" />
            </div>
            <div className="text-center mt-2 pixel-font text-base text-gray-900 uppercase font-bold">{p.name}</div>
            <div className="flex justify-center gap-2 mt-3">
              {p.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
            <div className="mt-4 text-gray-800">
              <StatPreview stats={p.baseStats} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => selectedPokemon && onSelect(selectedPokemon)}
          disabled={!selectedPokemon}
          className="btn-pixel"
        >
          ¡CONFIRMAR POKÉMON!
        </button>
      </div>
    </div>
  );
}

function PreludeScreen({ playerPokemon: _playerPokemon, onFinish }: { playerPokemon: Pokemon; onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full" style={{ background: '#000' }}>
      <div className="w-full max-w-2xl rounded-3xl relative flex flex-col items-center overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,182,193,0.15)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
        
        {/* Header */}
        <div className="w-full px-8 pt-8 pb-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff758f' }} />
          <h1 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'rgba(255,182,193,0.7)', fontFamily: 'Nunito, sans-serif' }}>Antesala del Combate</h1>
        </div>

        {/* Visual Arena - Full body sliding from Left, Gengar on Right */}
        <div className="relative w-full h-80 overflow-hidden flex items-end justify-between px-6 pb-2" style={{ background: 'linear-gradient(180deg, #0a0015 0%, #1a0030 60%, #0d001f 100%)' }}>
          
          {/* Trainer Monserrat - slides from left */}
          <div className={`transition-all duration-1000 ease-out transform ${isMounted ? 'translate-x-0' : '-translate-x-full'} flex justify-center items-end h-full`}>
            <img 
              src={entrenadoraFull} 
              alt="Entrenadora Monserrat" 
              className="h-[290px] object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,117,143,0.3))' }}
            />
          </div>

          {/* Gengar Sprite */}
          {dialogs[step].showGengar && (
            <div className="flex flex-col items-center mr-10 justify-end h-full pb-10">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" 
                alt="Gengar" 
                className="w-36 h-36 pokemon-sprite"
                style={{ filter: 'drop-shadow(0 0 20px rgba(180,100,255,0.6))' }}
              />
              <span className="mt-2 text-xs font-bold" style={{ color: '#c77dff', fontFamily: 'Nunito, sans-serif', background: 'rgba(0,0,0,0.5)', padding: '2px 10px', borderRadius: '9999px' }}>
                Gengar Nv.50
              </span>
            </div>
          )}
        </div>

        {/* Dialog Box */}
        <div className="w-full p-6 flex flex-col justify-between" style={{ background: 'rgba(255,240,245,0.06)', borderTop: '1px solid rgba(255,182,193,0.1)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
            {dialogs[step].text}
          </p>
          <div className="flex justify-end mt-5">
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

  // Show Monserrat's face inside Gengar notifications
  const showMonserratFace = currentEvent &&
    (currentEvent.message?.includes('Gengar') || currentEvent.message?.includes('Monserrat') || currentEvent.target === 'player');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full" style={{ background: '#000' }}>
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden relative" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8)', border: '1px solid rgba(255,182,193,0.15)' }}>

        {/* Top notification log */}
        {currentEvent && (currentEvent.type === 'message' || currentEvent.type === 'damage') && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-pink-100/95 border-none p-3 rounded-xl shadow-lg z-50 flex items-center gap-3">
            {showMonserratFace && (
              <img
                src={entrenadoraFace}
                alt="Monserrat"
                className="w-10 h-10 rounded-full border-2 border-rose-950 object-cover bg-rose-200 shrink-0"
              />
            )}
            <p className="pixel-font text-xs text-rose-950 leading-relaxed flex-1 font-bold">
              {currentEvent.message || (currentEvent.type === 'damage' ? `¡${currentEvent.target === 'player' ? player.pokemon.name : enemy.pokemon.name} recibió ${currentEvent.damage} de daño!` : '')}
            </p>
            <button
              onClick={nextEvent}
              className="px-3 py-1 bg-rose-800 text-white rounded font-bold hover:bg-rose-700 active:bg-rose-900 pixel-font text-[10px]"
            >
              SIGUIENTE
            </button>
          </div>
        )}

        {/* ARENA - Stormy night battlefield */}
        <div className="relative h-96 p-4" style={{ backgroundImage: `url(${battleBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          {/* ENEMY SIDE - includes Monserrat face next to Gengar's bar */}
          <div className="absolute top-6 left-6 w-56 flex gap-2">
            <img
              src={entrenadoraFace}
              alt="Monserrat Face"
              className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover bg-rose-200 shrink-0"
            />
            <div className="bg-white p-2 rounded-lg border-2 border-gray-800 shadow flex-1">
              <div className="flex flex-col mb-1 text-left">
                <span className="pixel-font text-[9px] text-rose-850 font-bold">Monserrat</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="pixel-font text-[10px] text-gray-800 uppercase font-bold">{enemy.pokemon.name}</span>
                  <span className="pixel-font text-[9px] text-gray-600">Nv.50</span>
                </div>
              </div>
              <HPBar combatant={enemy} />
            </div>
          </div>
          <div className="absolute top-10 right-16">
            <PokemonSprite pokemon={enemy.pokemon} side="enemy" animate={enemyAnimation} />
          </div>

          {/* PLAYER SIDE */}
          <div className="absolute bottom-6 left-16">
            <PokemonSprite pokemon={player.pokemon} side="player" animate={playerAnimation} />
          </div>
          <div className="absolute bottom-6 right-6 w-56">
            <div className="bg-white p-2 rounded-lg border-2 border-gray-800 shadow">
              <div className="flex flex-col mb-1 text-left">
                <span className="pixel-font text-[9px] text-blue-700 font-bold">Usuario</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="pixel-font text-[10px] text-gray-800 uppercase font-bold">{player.pokemon.name}</span>
                  <span className="pixel-font text-[9px] text-gray-600">Nv.50</span>
                </div>
              </div>
              <HPBar combatant={player} />
            </div>
          </div>

        </div>

        {/* CONTROLS & LOG PANEL */}
        <div className="p-5 h-56 flex flex-col" style={{ background: 'rgba(255,255,255,0.06)', borderTop: '1px solid rgba(255,182,193,0.1)' }}>
          {phase === 'ended' && winner ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {winner === 'player' ? (
                <div className="text-center space-y-6" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                  <h2 className="text-2xl font-bold text-center" style={{ color: '#06d6a0', fontFamily: 'Nunito, sans-serif' }}>
                    ¡Felicidades! ¡Me venciste!
                  </h2>
                  <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl font-mono tracking-wider animate-pulse">
                    R2D2 tiene un secreto
                  </div>
                  <p className="text-sm sm:text-base text-center w-full" style={{ color: '#ffb3c6', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}>
                    ¡Escríbeme con esta palabra clave para canjear tu premio!
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#ff758f', fontFamily: 'Nunito, sans-serif' }}>
                    ¡Monserrat te ha derrotado!
                  </h2>
                </div>
              )}
              <div className="flex gap-4 mt-8">
                <button onClick={() => resetBattle(playerPokemon)} className="btn-pixel-blue">Reintentar</button>
                <button onClick={onFinish} className="btn-pixel">Volver</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div className="text-xs font-bold mb-2" style={{ color: 'rgba(255,182,193,0.5)', fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Elige un movimiento:</div>
              <div className="grid grid-cols-2 gap-3 flex-1">
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
  const [view, setView] = useState<'intro' | 'selection' | 'prelude' | 'battle'>('intro');
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);

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

  const handleSelect = (pokemon: Pokemon) => {
    setPlayerPokemon(pokemon);
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
      {view === 'selection' && <SelectionScreen onSelect={handleSelect} />}
      {view === 'prelude' && playerPokemon && <PreludeScreen playerPokemon={playerPokemon} onFinish={handleFinishPrelude} />}
      {view === 'battle' && playerPokemon && <BattleScreen playerPokemon={playerPokemon} onFinish={handleFinishBattle} />}
    </div>
  );
}

export default App
