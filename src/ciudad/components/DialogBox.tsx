import type { DialogLine } from '../types';

interface DialogBoxProps {
  dialog: DialogLine;
  onClose: () => void;
}

export function DialogBox({ dialog, onClose }: DialogBoxProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #333',
        borderRadius: '12px',
        padding: '16px',
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {dialog.speaker && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '16px',
            background: '#ff758f',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          {dialog.speaker}
        </div>
      )}
      
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#333',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 600,
          paddingTop: dialog.speaker ? '8px' : 0,
        }}
      >
        {dialog.text}
      </p>
      
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '12px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #ff758f 0%, #ff8fa3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '8px 20px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Nunito, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(255, 117, 143, 0.3)',
          }}
        >
          Continuar →
        </button>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '16px',
          fontSize: '10px',
          color: '#999',
        }}
      >
        [Enter/E] para continuar
      </div>
    </div>
  );
}
