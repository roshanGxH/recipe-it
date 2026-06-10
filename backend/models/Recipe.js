const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a recipe title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add at least one ingredient']
  },
  instructions: {
    type: [String],
    required: [true, 'Please add at least one instruction step']
  },
  prepTime: {
    type: String,
    default: '0 mins'
  },
  cookTime: {
    type: String,
    default: '0 mins'
  },
  servings: {
    type: Number,
    default: 1
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['recipes', 'desserts', 'drinks', 'breakfast', 'lunch', 'dinner', 'others', 'appetizers']
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
