import React from 'react';
import LoveMessage from '../components/LoveMessage';
import { IoRestaurant } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';

export default function HomePage({ onAddMeal, mealCount }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 md:py-4 animate-fade-in">
      {/* Hero Section */}
      <div className="glass-strong p-3 md:p-8 text-center mb-2 md:mb-4 shadow-xl shadow-rose-200/30">
        <div className="text-3xl md:text-6xl mb-1 md:mb-3 animate-heart-beat">💖</div>
        <h1 className="font-cursive text-2xl md:text-5xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-1 md:mb-3 leading-tight">
          Hey love Sriii <IoMdHeartEmpty className="inline text-rose-400 animate-pulse" />
        </h1>
        <p className="text-rose-500 text-base md:text-xl font-semibold mb-1 md:mb-2">
          Em tinnav iroju ?
        </p>
        <p className="text-rose-400 text-xs md:text-sm">{today}</p>

        {/* Meal Count Summary */}
        {mealCount > 0 && (
          <div className="mt-2 md:mt-4 glass-card inline-block px-3 py-1.5 md:px-6 md:py-3">
            <p className="text-rose-500 font-semibold text-sm md:text-base">
              You had <span className="text-rose-600 font-bold text-lg">{mealCount}</span> meal
              {mealCount !== 1 ? 's' : ''} today ❤️
            </p>
          </div>
        )}

        {/* Add Meal Button */}
        <div className="mt-3 md:mt-6">
          <button
            onClick={onAddMeal}
            className="group relative px-5 md:px-10 py-2.5 md:py-4 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white font-bold text-base md:text-xl shadow-xl shadow-rose-300/50 hover:shadow-rose-400/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 md:gap-3 mx-auto">
            <IoRestaurant className="text-xl md:text-3xl" />
            <span className="relative z-10">Add Meal</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Love Message */}
      <div className="text-center">
        <LoveMessage />
      </div>
    </div>
  );
}
