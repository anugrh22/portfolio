import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import JumpingText from './JumpingText';

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Brief description of project one.',
    image: 'https://via.placeholder.com/400x250?text=Project+1',
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'Brief description of project two.',
    image: 'https://via.placeholder.com/400x250?text=Project+2',
    link: '#',
  },
];

const Projects: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  useInView(ref);

  return (
    <section ref={ref} id="projects" className="section">
      <div className="container">
        <h2><JumpingText text="Projects" /></h2>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}
        >
          {projects.map((proj, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={proj.image} alt={proj.title} style={{ borderRadius: '6px', marginBottom: '1rem' }} />
              <h3><JumpingText text={proj.title} /></h3>
              <p style={{ flexGrow: 1 }}><JumpingText text={proj.description} /></p>
              <a href={proj.link} style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
                <button>View</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
