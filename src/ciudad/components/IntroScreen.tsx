import { useState, useEffect } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

const introLines = [
  { text: 'Año 2003...', delay: 100 },
  { text: 'Comuna de La Dehesa, Chile', delay: 80 },
  { text: ' ', delay: 50 },
  { text: 'Una tranquila residencia se alza bajo el sol de la tarde.', delay: 60 },
  { text: 'El viento sopla suavemente entre los árboles del jardín.', delay: 60 },
  { text: ' ', delay: 50 },
  { text: 'Es el comienzo de una nueva aventura...', delay: 80 },
];

export function IntroScreen({ onFinish }: IntroScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= introLines.length) {
      setIsComplete(true);
      return;
    }

    const line = introLines[currentLine];
    
    if (line.text === ' ') {
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, '']);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 200);
      return;
    }

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLine) {
            newLines.push('');
          }
          newLines[currentLine] = line.text.substring(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(prev => prev + 1);
      }, line.delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  const handleSkip = () => {
    onFinish();
  };

  const handleComplete = () => {
    onFinish();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        {displayedLines.map((line, index) => (
          <p
            key={index}
            style={{
              color: index < 2 ? '#ffb3c6' : '#c77dff',
              fontSize: index < 2 ? '18px' : '14px',
              fontWeight: index < 2 ? 'bold' : 600,
              margin: line === '' ? '12px 0' : '4px 0',
              lineHeight: '1.6',
              letterSpacing: index < 2 ? '2px' : '0.5px',
            }}
          >
            {line}
            {index === currentLine && !isComplete && (
              <span
                style={{
                  opacity: showCursor ? 1 : 0,
                  color: '#ff758f',
                }}
              >
                _
              </span>
            )}
          </p>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          display: 'flex',
          gap: '16px',
        }}
      >
        {!isComplete ? (
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,182,193,0.3)',
              color: '#ffb3c6',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'Nunito, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Saltar →
          </button>
        ) : (
          <button
            onClick={handleComplete}
            style={{
              background: 'linear-gradient(135deg, #ff758f 0%, #ff8fa3 100%)',
              border: 'none',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Nunito, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 117, 143, 0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            Comenzar
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
