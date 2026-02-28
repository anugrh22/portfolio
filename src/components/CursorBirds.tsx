import { useEffect, useRef } from 'react';

const numBirds = 6;

const CursorBirds: React.FC = () => {
    const birdsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Initial mouse center position
        const mouse = {
            x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
            y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        };

        // Initialize birds properties (x, y, rotation angle, trailing speed, and mouse offset)
        const birds = Array.from({ length: numBirds }, (_, i) => ({
            x: mouse.x,
            y: mouse.y,
            angle: 0,
            speed: 0.03 + (numBirds - i) * 0.015,
            offset: {
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 80
            }
        }));

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        const render = () => {
            birds.forEach((bird, i) => {
                let tx = mouse.x + bird.offset.x;
                let ty = mouse.y + bird.offset.y;

                let dx = tx - bird.x;
                let dy = ty - bird.y;

                let moveX = dx * bird.speed;
                let moveY = dy * bird.speed;

                bird.x += moveX;
                bird.y += moveY;

                // Only trigger rotation change if distance moved is significant enough to calculate accurate angle
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                    let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                    let deltaAngle = targetAngle - bird.angle;

                    // Normalize angle to prevent harsh spin flip when crossing polar 180/-180 boundary
                    while (deltaAngle > 180) deltaAngle -= 360;
                    while (deltaAngle < -180) deltaAngle += 360;

                    // Smooth rotational easing
                    bird.angle += deltaAngle * 0.15;
                }

                if (birdsRef.current[i]) {
                    birdsRef.current[i]!.style.transform = `translate(${bird.x}px, ${bird.y}px) rotate(${bird.angle}deg)`;
                }
            });
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
            {Array.from({ length: numBirds }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) birdsRef.current[i] = el;
                    }}
                    style={{
                        position: 'absolute',
                        top: -12,
                        left: -12,
                        opacity: 0.8,
                        willChange: 'transform'
                    }}
                >
                    <svg
                        width={16 + (numBirds - i) * 2}
                        height={16 + (numBirds - i) * 2}
                        viewBox="0 0 24 24"
                        style={{
                            animation: `flap ${0.25 + i * 0.08}s infinite alternate ease-in-out`,
                            transformOrigin: '50% 50%',
                            fill: 'var(--color-text)'
                        }}
                    >
                        <path d="M 12 2 L 22 12 Q 17 14 12 10 Q 7 14 2 12 Z" />
                    </svg>
                </div>
            ))}
            <style>{`
        @keyframes flap {
          0% { transform: scaleX(1) scaleY(1); }
          100% { transform: scaleX(0.5) scaleY(1.1); }
        }
      `}</style>
        </div>
    );
};

export default CursorBirds;
