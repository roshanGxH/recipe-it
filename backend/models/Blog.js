const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add the blog content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please add a short excerpt']
  },
  imageUrl: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Blog', blogSchema);
