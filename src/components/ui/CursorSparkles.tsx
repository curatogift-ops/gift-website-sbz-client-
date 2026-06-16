import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const COLORS = [
  '#FFD700', // Gold
  '#FF6B6B', // Red-Pink
  '#4ECDC4', // Teal
  '#A020F0', // Purple
  '#FF8C00', // Orange
  '#1E90FF', // Blue
  '#FF1493', // Deep Pink
  '#00FA9A', // Medium Spring Green
];

type Sparkle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
};

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let sparkleId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const distance = Math.hypot(clientX - lastX, clientY - lastY);
      
      // Spawn a sparkle every 45 pixels (less frequent)
      if (distance > 45) {
        lastX = clientX;
        lastY = clientY;
        
        const newSparkle: Sparkle = {
          id: sparkleId++,
          x: clientX,
          y: clientY,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 10 + Math.random() * 10, // 10px to 20px (slightly smaller)
          rotation: Math.random() * 90, // Random initial rotation
        };
        
        setSparkles(prev => [...prev, newSparkle]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 350); // Fast remove
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute origin-center animate-cursor-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
            <path
              fill={sparkle.color}
              d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z"
              style={{ filter: 'drop-shadow(0px 0px 2px rgba(255,255,255,0.4))' }}
            />
          </svg>
        </div>
      ))}
    </div>,
    document.body
  );
}
