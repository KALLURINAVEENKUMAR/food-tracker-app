import React from 'react';
import { IoHome, IoStatsChart } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="relative z-10 px-4 py-2 md:py-6">
      <div className="max-w-5xl mx-auto glass-strong px-3 py-2 md:px-8 md:py-6">
        {/* Logo/Title */}
        <div className="text-center mb-2 md:mb-5">
          <h1 className="font-cursive text-xl md:text-4xl bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <IoMdHeart className="text-rose-400 animate-pulse" />
            Sri's FoodTrack
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
              currentPage === 'home'
                ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50'
                : 'text-rose-500 hover:bg-white/50'
            }`}
          >
            <IoHome className="text-lg md:text-xl" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
              currentPage === 'dashboard'
                ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50'
                : 'text-rose-500 hover:bg-white/50'
            }`}
          >
            <IoStatsChart className="text-lg md:text-xl" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
