const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid ID or Server Error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, content, excerpt, imageUrl } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      excerpt,
      imageUrl,
      author: req.user.username,
      authorId: req.user._id
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
