import { useRef } from 'react';
import type { FC } from 'react';
import { useInView } from '../hooks/useInView';

const Hero: FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  useInView(ref);

  return (
    <section ref={ref} className="section">
      {/* simple nav */}
      <nav style={{ padding: '1rem 0' }}>
        <ul style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        </ul>
      </nav>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h1>Anugrah</h1>
          <p className="tagline" style={{ fontSize: '1.2rem', margin: '1rem 0', fontStyle: 'italic' }}>
            I Craft
          </p>
          <button onClick={() => window.open('https://www.instagram.com/anugr.hh_?igsh=OHZjMmE2aW82NjVy&utm_source=qr', '_blank', 'noopener,noreferrer')}>
            View My Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
