const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/auth');

// @route   GET /api/recipes
// @desc    Get all recipes (supports category filter and keyword search)
// @access  Public
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  if (category && category !== 'recipes' && category !== 'all') {
    query.category = category.toLowerCase();
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid ID or Server Error' });
  }
});

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, description, ingredients, instructions, prepTime, cookTime, servings, imageUrl, category } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      imageUrl,
      category,
      author: req.user.username,
      authorId: req.user._id
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json({ success: true, data: savedRecipe });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update an existing recipe
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    // Check if recipe belongs to user
    if (recipe.authorId && recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'User not authorized to update this recipe' });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    // Check if recipe belongs to user
    if (recipe.authorId && recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'User not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Recipe removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
