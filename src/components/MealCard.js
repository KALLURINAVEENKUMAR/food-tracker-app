import React, { useState } from 'react';
import { IoCreate, IoTrash, IoTime } from 'react-icons/io5';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace('/api', '')
  : 'http://localhost:5000';

const mealIcons = {
  MORNING: '🌅',
  AFTERNOON: '☀️',
  EVENING: '🌙',
};

const mealGradients = {
  MORNING: 'from-amber-200/40 to-orange-200/40',
  AFTERNOON: 'from-yellow-200/40 to-amber-200/40',
  EVENING: 'from-indigo-200/40 to-purple-200/40',
};

export default function MealCard({ meal, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(meal._id);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const time = new Date(meal.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`glass-card p-5 animate-slide-up bg-gradient-to-br ${mealGradients[meal.mealType] || ''}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        {meal.imageUrl && (
          <div className="flex-shrink-0 w-full sm:w-24">
            <img
              src={`${API_URL}${meal.imageUrl}`}
              alt={meal.foodName}
              className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-xl border-2 border-white/50 shadow-md"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent text-lg leading-tight break-words">
                {mealIcons[meal.mealType]} {meal.foodName}
              </h3>
              {meal.description && (
                <p className="text-rose-400/70 text-sm mt-1 line-clamp-2 break-words">{meal.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
            <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
              <IoTime className="text-sm" /> {time}
            </span>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onEdit(meal)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 glass border border-rose-200/50 hover:bg-rose-100/30 hover:border-rose-300 transition-all flex items-center gap-1"
              >
                <IoCreate className="text-sm" /> Edit
              </button>
              {showConfirm ? (
                <div className="flex gap-1">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-400 hover:bg-rose-500 transition-all"
                  >
                    {isDeleting ? '...' : 'Yes'}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 glass border border-rose-200/50 hover:bg-rose-100/30 transition-all"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 glass border border-rose-200/50 hover:bg-rose-100/30 hover:border-rose-300 transition-all flex items-center gap-1"
                >
                  <IoTrash className="text-sm" /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
