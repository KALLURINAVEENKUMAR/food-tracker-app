import React from 'react';
import { IoMdHeart } from 'react-icons/io';

export default function Footer() {
  return (
    <footer className="relative z-10 py-2 md:py-6 text-center">
      <div className="glass-card inline-block px-3 py-1.5 md:px-8 md:py-3">
        <p className="text-rose-500 font-medium text-xs md:text-sm flex items-center gap-2">
          Made with <IoMdHeart className="animate-heart-beat text-rose-400 text-base md:text-lg" /> just for you
        </p>
      </div>
    </footer>
  );
}
