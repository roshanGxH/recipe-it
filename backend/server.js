require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
  const conn = require('./config/db');
  await conn();
};

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const blogRoutes = require('./routes/blogs');
const aiRoutes = require('./routes/ai');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/ai', aiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Recipe-It API is running...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
