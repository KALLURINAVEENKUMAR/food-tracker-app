import React from 'react';
import MealCard from '../components/MealCard';
import LoveMessage from '../components/LoveMessage';
import { IoAdd } from 'react-icons/io5';

const sections = [
  { type: 'MORNING', label: 'Morning', icon: '🌅', gradient: 'from-amber-100/30 to-orange-100/30' },
  { type: 'AFTERNOON', label: 'Afternoon', icon: '☀️', gradient: 'from-yellow-100/30 to-amber-100/30' },
  { type: 'EVENING', label: 'Evening', icon: '🌙', gradient: 'from-indigo-100/30 to-purple-100/30' },
];

export default function DashboardPage({ meals, onEdit, onDelete, onAddMeal }) {
  const grouped = {
    MORNING: meals.filter((m) => m.mealType === 'MORNING'),
    AFTERNOON: meals.filter((m) => m.mealType === 'AFTERNOON'),
    EVENING: meals.filter((m) => m.mealType === 'EVENING'),
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="glass-strong p-8 text-center mb-6 shadow-lg shadow-rose-200/20">
        <h2 className="font-cursive text-4xl bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">Today's Dashboard</h2>
        <p className="text-rose-400 text-sm mb-4">{today}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="glass-card px-6 py-3">
            <span className="text-rose-600 font-bold text-2xl">{meals.length}</span>
            <span className="text-rose-400 text-sm ml-2">meal{meals.length !== 1 ? 's' : ''} ❤️</span>
          </div>
          <button
            onClick={onAddMeal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold text-base shadow-lg shadow-rose-300/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IoAdd className="text-xl" />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Meal Sections */}
      {meals.length === 0 ? (
        <div className="glass-strong p-12 text-center">
          <p className="text-6xl mb-4">🍽️</p>
          <p className="text-rose-500 font-semibold text-lg">No meals recorded yet today</p>
          <p className="text-rose-400 text-sm mt-1">Tap "Add Meal" to get started 💕</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => {
            const sectionMeals = grouped[section.type];
            if (sectionMeals.length === 0) return null;

            return (
              <div key={section.type} className="animate-slide-up">
                <div className={`glass-strong p-6 bg-gradient-to-br ${section.gradient}`}>
                  <h3 className="font-cursive text-3xl bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-3xl">{section.icon}</span>
                    {section.label}
                    <span className="text-sm font-sans font-normal text-rose-400 ml-auto">
                      {sectionMeals.length} meal{sectionMeals.length !== 1 ? 's' : ''}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {sectionMeals.map((meal) => (
                      <MealCard
                        key={meal._id}
                        meal={meal}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Love Message */}
      {meals.length > 0 && (
        <div className="text-center mt-8">
          <LoveMessage />
        </div>
      )}
    </div>
  );
}
