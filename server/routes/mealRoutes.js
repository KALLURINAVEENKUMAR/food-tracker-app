const express = require('express');
const router = express.Router();
const { addMeal, getMeals, updateMeal, deleteMeal } = require('../controllers/mealController');
const upload = require('../middleware/upload');

router.route('/').post(upload.single('image'), addMeal).get(getMeals);
router.route('/:id').put(upload.single('image'), updateMeal).delete(deleteMeal);

module.exports = router;
