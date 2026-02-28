import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  useInView(ref);
  return (
    <section id="about" ref={ref} className="section" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-text)', backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E')" }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2>About Me</h2>
          <p>
            I’m a guitarist driven by passion, creativity, and individuality. Music is more than sound to me - it’s expression, identity, and energy. Every note I play reflects my personality, and my style isn’t just something I wear, it’s something I live.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
