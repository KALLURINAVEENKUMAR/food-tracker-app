import React, { useMemo } from 'react';

const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🩷'];

export default function FloatingHearts() {
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      heart: hearts[i % hearts.length],
      left: `${(i * 7.3) % 100}%`,
      delay: `${(i * 1.7) % 10}s`,
      duration: `${12 + (i * 2.3) % 10}s`,
      size: `${14 + (i * 3) % 16}px`,
    }));
  }, []);

  return (
    <div className="hearts-bg">
      {floatingHearts.map((h) => (
        <span
          key={h.id}
          className="heart-float"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.heart}
        </span>
      ))}
    </div>
  );
}
