/**
 * Composant de test pour le tracking
 * À utiliser uniquement en développement
 */
import { useState } from 'react';
import { trackDownloadClick } from '../utils/tracking';
import { debugFacebookPixel } from '../utils/facebookPixel';

const TrackingTester = (): JSX.Element => {
  const [platform, setPlatform] = useState<'apple' | 'google'>('apple');
  const [buttonLocation, setButtonLocation] = useState('test_button');
  const [result, setResult] = useState<string>('');

  const handleTestClick = () => {
    setResult(`Test lancé à ${new Date().toLocaleTimeString()}...`);
    try {
      trackDownloadClick(platform, buttonLocation);
      setResult(`✅ Événement download_click envoyé avec succès à ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      setResult(`❌ Erreur: ${error}`);
    }
  };

  const handleDebugPixel = () => {
    debugFacebookPixel();
    setResult(`🔍 Débogage du pixel lancé à ${new Date().toLocaleTimeString()}`);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '350px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Testeur de Tracking</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Plateforme:
        </label>
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value as 'apple' | 'google')}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #ddd' 
          }}
        >
          <option value="apple">Apple</option>
          <option value="google">Google</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Emplacement du bouton:
        </label>
        <input 
          type="text" 
          value={buttonLocation} 
          onChange={(e) => setButtonLocation(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={handleTestClick}
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            padding: '10px 15px', 
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          Tester download_click
        </button>
        
        <button 
          onClick={handleDebugPixel}
          style={{ 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            padding: '10px 15px', 
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          Déboguer Pixel
        </button>
      </div>
      
      {result && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: result.includes('✅') ? '#e8f5e9' : result.includes('❌') ? '#ffebee' : '#e3f2fd',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default TrackingTester;
