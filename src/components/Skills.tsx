import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import JumpingText from './JumpingText';

const skills = [
  { name: 'HTML/CSS', level: 90 },
  { name: 'JavaScript/TypeScript', level: 85 },
  { name: 'React', level: 80 },
  { name: 'Design', level: 70 },
];

const Skills: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  useInView(ref);

  return (
    <section ref={ref} className="section">
      <div className="container">
        <h2><JumpingText text="Skills" /></h2>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}
        >
          {skills.map((skill, idx) => (
            <div key={idx} className="card">
              <h3><JumpingText text={skill.name} /></h3>
              <div
                style={{
                  height: '6px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'var(--color-accent)',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
