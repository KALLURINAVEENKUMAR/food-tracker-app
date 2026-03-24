import React, { useMemo } from 'react';

const loveMessages = [
  "Proud of you Sriii ❤️",
  "You're glowing today ✨",
  "Every bite is self-love 💕",
  "You're doing amazing 💖",
  "Nourishing yourself well 🌸",
  "Take care of yourself love 💗",
  "You're my favorite person 💕",
  "Eating well, living well ✨",
  "Beautiful inside and out 💫",
  "Love you so much Sriii 💖",
];

export default function LoveMessage() {
  const message = useMemo(() => {
    return loveMessages[Math.floor(Math.random() * loveMessages.length)];
  }, []);

  return (
    <div className="glass-card inline-block px-3 py-1.5 md:px-6 md:py-3 animate-float">
      <p className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-semibold text-xs md:text-sm font-cursive md:text-lg">
        {message}
      </p>
    </div>
  );
}
