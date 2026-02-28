import { useState, useEffect } from 'react';
import './App.css';

import CursorBirds from './components/CursorBirds';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleEnter = () => {
    if (hasEntered) return;
    setHasEntered(true);
    setTimeout(() => {
      setShowContent(true);
    }, 800); // 800ms delay to wait for layers to start sliding
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [hasEntered]);

  return (
    <>
      <CursorBirds />
      <div
        className={`intro-layer brown-layer ${hasEntered ? 'slide-out' : ''}`}
        onClick={handleEnter}
      ></div>
      <div
        className={`intro-layer offwhite-layer ${hasEntered ? 'slide-out' : ''}`}
        onClick={handleEnter}
      >
        {!hasEntered && (
          <div className="enter-prompt">
            <span>EXPLORE</span>
          </div>
        )}
      </div>
      <main className={showContent ? 'content-ready' : ''}>
        <Hero />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
