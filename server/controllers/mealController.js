const Meal = require('../models/Meal');
const path = require('path');
const fs = require('fs');

// @desc    Add a new meal
// @route   POST /api/meals
const addMeal = async (req, res) => {
  try {
    const { foodName, description, mealType, date } = req.body;

    if (!foodName || !mealType) {
      return res.status(400).json({ message: 'Food name and meal type are required' });
    }

    const allowedTypes = ['MORNING', 'AFTERNOON', 'EVENING'];
    if (!allowedTypes.includes(mealType)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    const meal = await Meal.create({
      foodName,
      description,
      mealType,
      date: date || new Date(),
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get meals by date
// @route   GET /api/meals?date=YYYY-MM-DD
const getMeals = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const meals = await Meal.find(filter).sort({ createdAt: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a meal
// @route   PUT /api/meals/:id
const updateMeal = async (req, res) => {
  try {
    const { foodName, description, mealType } = req.body;

    if (mealType) {
      const allowedTypes = ['MORNING', 'AFTERNOON', 'EVENING'];
      if (!allowedTypes.includes(mealType)) {
        return res.status(400).json({ message: 'Invalid meal type' });
      }
    }

    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    meal.foodName = foodName || meal.foodName;
    meal.description = description !== undefined ? description : meal.description;
    meal.mealType = mealType || meal.mealType;

    if (req.file) {
      // Remove old image if exists
      if (meal.imageUrl) {
        const oldPath = path.join(__dirname, '..', meal.imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      meal.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Remove associated image
    if (meal.imageUrl) {
      const imgPath = path.join(__dirname, '..', meal.imageUrl);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted with love 💕' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMeal, getMeals, updateMeal, deleteMeal };
