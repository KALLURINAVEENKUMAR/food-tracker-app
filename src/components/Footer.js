import React from 'react';
import { IoMdHeart } from 'react-icons/io';

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 text-center">
      <div className="glass-card inline-block px-8 py-3">
        <p className="text-rose-500 font-medium text-sm flex items-center gap-2">
          Made with <IoMdHeart className="animate-heart-beat text-rose-400 text-lg" /> just for you
        </p>
      </div>
    </footer>
  );
}
