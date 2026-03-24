import React, { useState, useRef } from 'react';
import { IoClose, IoCamera, IoCheckmarkCircle } from 'react-icons/io5';

const mealTypes = [
  { value: 'MORNING', label: 'Morning', icon: '🌅', color: 'from-amber-200/60 to-orange-200/60' },
  { value: 'AFTERNOON', label: 'Afternoon', icon: '☀️', color: 'from-yellow-200/60 to-amber-200/60' },
  { value: 'EVENING', label: 'Evening', icon: '🌙', color: 'from-indigo-200/60 to-purple-200/60' },
];

export default function AddMealModal({ isOpen, onClose, onSubmit, editingMeal }) {
  const [foodName, setFoodName] = useState(editingMeal?.foodName || '');
  const [description, setDescription] = useState(editingMeal?.description || '');
  const [mealType, setMealType] = useState(editingMeal?.mealType || '');
  const [imagePreview, setImagePreview] = useState(editingMeal?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const imageFileRef = useRef(null);

  React.useEffect(() => {
    if (editingMeal) {
      setFoodName(editingMeal.foodName || '');
      setDescription(editingMeal.description || '');
      setMealType(editingMeal.mealType || '');
      setImagePreview(
        editingMeal.imageUrl
          ? `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : 'http://localhost:5000'}${editingMeal.imageUrl}`
          : null
      );
    } else {
      setFoodName('');
      setDescription('');
      setMealType('');
      setImagePreview(null);
    }
    imageFileRef.current = null;
  }, [editingMeal, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      imageFileRef.current = file;
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName.trim() || !mealType) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('foodName', foodName.trim());
    formData.append('description', description.trim());
    formData.append('mealType', mealType);
    formData.append('date', new Date().toISOString());
    if (imageFileRef.current) {
      formData.append('image', imageFileRef.current);
    }

    try {
      await onSubmit(formData, editingMeal?._id);
      onClose();
    } catch (err) {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="glass-strong relative z-10 w-full max-w-md p-8 animate-scale-in shadow-2xl shadow-rose-200/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 text-2xl transition-colors flex items-center justify-center w-8 h-8"
        >
          <IoClose />
        </button>

        <h2 className="font-cursive text-4xl bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2 text-center">
          {editingMeal ? 'Edit Meal' : 'Add a Meal'}
        </h2>
        <p className="text-rose-400 text-sm text-center mb-6">What did you enjoy? 💕</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Type Selection */}
          <div>
            <label className="block text-rose-500 font-semibold text-sm mb-2">
              When did you eat? 💕
            </label>
            <div className="grid grid-cols-3 gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setMealType(type.value)}
                  className={`p-3 rounded-xl text-center transition-all duration-300 border ${
                    mealType === type.value
                      ? `bg-gradient-to-br ${type.color} border-rose-300 shadow-lg scale-105`
                      : 'glass border-white/30 hover:border-rose-200 hover:scale-102'
                  }`}
                >
                  <span className="text-2xl block">{type.icon}</span>
                  <span className="text-xs font-semibold text-rose-500 mt-1 block">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Name */}
          <div>
            <label className="block text-rose-500 font-semibold text-sm mb-1">
              Food Name ❤️
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g., Pasta with love"
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl glass border border-white/30 text-rose-600 placeholder-rose-400/50 font-medium focus:border-rose-300 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-rose-500 font-semibold text-sm mb-1">
              Description (optional) 💭
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="How was it?"
              maxLength={500}
              rows={2}
              className="w-full px-4 py-3 rounded-xl glass border border-white/30 text-rose-600 placeholder-rose-400/50 font-medium resize-none focus:border-rose-300 transition-all"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-rose-500 font-semibold text-sm mb-1">
              Photo (optional) 📸
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl glass border-2 border-dashed border-rose-200 text-rose-500 hover:border-rose-300 hover:bg-rose-50/20 transition-all text-sm font-medium flex items-center justify-center gap-2"
            >
              <IoCamera className="text-lg" />
              <span>{imagePreview ? 'Change Photo' : 'Upload a photo of your food'}</span>
            </button>
            {imagePreview && (
              <div className="mt-2 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl border-2 border-rose-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    imageFileRef.current = null;
                  }}
                  className="absolute -top-2 -right-2 bg-rose-400 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-rose-500"
                >
                  <IoClose />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!foodName.trim() || !mealType || isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white font-bold text-lg shadow-lg shadow-rose-300/50 hover:shadow-rose-400/60 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Saving... 💕'
            ) : (
              <>
                <IoCheckmarkCircle className="text-xl" />
                <span>{editingMeal ? 'Update Meal' : 'Add Meal ❤️'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
