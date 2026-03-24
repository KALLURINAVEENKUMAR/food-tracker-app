const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    mealType: {
      type: String,
      required: true,
      enum: ['MORNING', 'AFTERNOON', 'EVENING'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Meal', mealSchema);
