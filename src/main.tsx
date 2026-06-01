import React, { useEffect, useState } from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Loader from './components/Loader';
import Splash from './components/Splash';
import './index.css';

// Enable dark theme by default site-wide
document.documentElement.classList.add('dark');

const RootApp: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('duo_seen');
      if (!seen) {
        setShowLoader(true);
        // Let the Splash component control timing; it will call onComplete.
      }
    } catch (e) {
      setShowLoader(false);
    }
  }, []);

  return (
    <>
      <App />
      {showLoader && (
        <Splash
          onComplete={() => {
            try { localStorage.setItem('duo_seen', '1'); } catch {}
            setShowLoader(false);
          }}
        />
      )}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);
