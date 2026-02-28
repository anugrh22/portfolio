import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const images = [
  { src: 'https://via.placeholder.com/600x400?text=Image+1', caption: 'Caption 1' },
  { src: 'https://via.placeholder.com/600x400?text=Image+2', caption: 'Caption 2' },
  { src: 'https://via.placeholder.com/600x400?text=Image+3', caption: 'Caption 3' },
  { src: 'https://via.placeholder.com/600x400?text=Image+4', caption: 'Caption 4' },
];

const Gallery: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  useInView(ref);

  return (
    <section ref={ref} className="section" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h2>Visual Storytelling</h2>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="img-hover">
              <img src={img.src} alt={img.caption} />
              <div className="caption">{img.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
