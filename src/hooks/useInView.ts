import { useEffect } from 'react';
import type { RefObject } from 'react';

// simple hook to add "in-view" class when an element scrolls into view
// accepts a ref that may be null initially
export function useInView(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [ref]);
}
