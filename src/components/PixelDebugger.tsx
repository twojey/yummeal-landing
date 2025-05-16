/**
 * Composant de débogage pour le pixel Facebook
 */
import { useState, useEffect } from 'react';
import { checkPixelStatus, debugFacebookPixel } from '../utils/facebookPixel';

interface PixelStatus {
  loaded: boolean;
  initialized: boolean;
  details: string;
}

const PixelDebugger = (): JSX.Element => {
  const [status, setStatus] = useState<PixelStatus>({ loaded: false, initialized: false, details: 'Vérification...' });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Vérifier le statut après un court délai pour laisser le pixel se charger
    const timer = setTimeout(() => {
      setStatus(checkPixelStatus());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDebug = () => {
    debugFacebookPixel();
    setStatus(checkPixelStatus());
  };

  const handleRefresh = () => {
    setStatus({ loaded: false, initialized: false, details: 'Actualisation...' });
    setTimeout(() => {
      setStatus(checkPixelStatus());
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#f0f2f5',
      border: '1px solid #dddfe2',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      zIndex: 9999,
      maxWidth: expanded ? '400px' : '200px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#4267B2' }}>
          Facebook Pixel Status
        </h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {expanded ? '▼' : '▶'}
        </button>
      </div>

      {expanded && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ 
                display: 'inline-block', 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: status.loaded ? '#4BB543' : '#FF3333',
                marginRight: '8px'
              }}></span>
              <span>Chargé: {status.loaded ? 'Oui' : 'Non'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ 
                display: 'inline-block', 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: status.initialized ? '#4BB543' : '#FF3333',
                marginRight: '8px'
              }}></span>
              <span>Initialisé: {status.initialized ? 'Oui' : 'Non'}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#606770', marginTop: '8px' }}>
              {status.details}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleRefresh}
              style={{ 
                backgroundColor: '#E4E6EB', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Actualiser
            </button>
            <button 
              onClick={handleDebug}
              style={{ 
                backgroundColor: '#4267B2', 
                color: 'white', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Déboguer (Console)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PixelDebugger;
