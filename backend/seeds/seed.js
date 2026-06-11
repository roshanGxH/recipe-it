require('dotenv').config({ path: __dirname + '/../.env' });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Blog = require('../models/Blog');

const dummyRecipes = [
  {
    title: 'Avocado Toast with Poached Egg',
    description: 'Crispy sourdough bread topped with creamy mashed avocado, a perfectly poached egg, and a sprinkle of chili flakes.',
    ingredients: [
      '1 slice of sourdough bread',
      '1 ripe avocado',
      '1 fresh egg',
      '1 tsp lemon juice',
      'Salt and black pepper to taste',
      'Chili flakes and microgreens for garnish'
    ],
    instructions: [
      'Toast the sourdough bread to your desired level of crispiness.',
      'Mash the avocado in a bowl with lemon juice, salt, and black pepper.',
      'Poach the egg in simmering water with a splash of vinegar for 3-4 minutes.',
      'Spread the mashed avocado evenly over the toasted bread.',
      'Top with the poached egg and garnish with chili flakes and microgreens.'
    ],
    prepTime: '5 mins',
    cookTime: '5 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    category: 'breakfast',
    author: 'Chef Prakash'
  },
  {
    title: 'Classic Margherita Pizza',
    description: 'Authentic Italian pizza with a crispy thin crust, rich tomato sauce, fresh mozzarella, and aromatic basil leaves.',
    ingredients: [
      '1 pre-made pizza dough',
      '1/2 cup tomato purée',
      '1 cup fresh mozzarella cheese, sliced',
      'Fresh basil leaves',
      '1 tbsp extra virgin olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat your oven to 450°F (230°C).',
      'Roll out the pizza dough onto a baking sheet or pizza stone.',
      'Spread tomato purée evenly over the dough, leaving a small border around the edges.',
      'Arrange mozzarella slices on top of the sauce.',
      'Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.',
      'Remove from oven, top with fresh basil, drizzle with olive oil, and serve hot.'
    ],
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=600',
    category: 'lunch',
    author: 'Chef Prakash'
  },
  {
    title: 'Garlic Butter Tuscan Salmon',
    description: 'Pan-seared salmon fillets in a rich, creamy garlic butter sauce with spinach, sun-dried tomatoes, and parmesan.',
    ingredients: [
      '2 salmon fillets',
      '2 tbsp butter',
      '3 cloves garlic, minced',
      '1/2 cup sun-dried tomatoes',
      '2 cups fresh baby spinach',
      '1/2 cup heavy cream',
      '1/4 cup grated parmesan cheese'
    ],
    instructions: [
      'Season salmon fillets with salt and pepper.',
      'Heat butter in a large skillet over medium-high heat. Sear salmon for 5 minutes on each side; remove and set aside.',
      'In the same skillet, sauté garlic for 1 minute. Add sun-dried tomatoes and spinach, cooking until spinach is wilted.',
      'Pour in heavy cream and parmesan cheese. Bring to a simmer, reducing heat to medium-low.',
      'Return salmon to the skillet, spooning sauce over the fish, and let simmer for 2-3 minutes until heated through.'
    ],
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    category: 'dinner',
    author: 'Elena Rostova'
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'A rich chocolate cake with a warm, decadent molten chocolate center, served with vanilla ice cream.',
    ingredients: [
      '1/2 cup unsalted butter',
      '4 oz high-quality bittersweet chocolate',
      '2 whole eggs + 2 egg yolks',
      '1/4 cup granulated sugar',
      '2 tbsp all-purpose flour',
      'Pinch of salt'
    ],
    instructions: [
      'Preheat oven to 425°F (218°C) and grease four 6-ounce ramekins with butter and cocoa powder.',
      'Melt butter and chocolate together in a microwave or double boiler until smooth.',
      'In a medium bowl, whisk eggs, egg yolks, sugar, and salt until thick and pale.',
      'Fold the melted chocolate mixture and flour into the egg mixture until just combined.',
      'Divide batter among the ramekins and bake for 12-14 minutes until the edges are firm but centers are soft.',
      'Let cool for 1 minute, invert onto plates, dust with powdered sugar, and serve immediately.'
    ],
    prepTime: '15 mins',
    cookTime: '13 mins',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    category: 'desserts',
    author: 'Chef Prakash'
  },
  {
    title: 'Fresh Strawberry Mojito',
    description: 'A refreshing summer cocktail with fresh strawberries, mint leaves, lime juice, rum, and club soda.',
    ingredients: [
      '4 fresh strawberries, hulled',
      '6-8 fresh mint leaves',
      '1/2 lime, cut into wedges',
      '1 tbsp sugar or simple syrup',
      '2 oz white rum',
      'Club soda to top',
      'Crushed ice'
    ],
    instructions: [
      'Muddle strawberries, mint leaves, lime wedges, and sugar in a tall glass.',
      'Fill the glass with crushed ice.',
      'Pour in white rum and stir gently to combine.',
      'Top off the glass with club soda and garnish with a strawberry slice and mint sprig.'
    ],
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    author: 'Barman Joe'
  }
];

const dummyBlogs = [
  {
    title: '10 Essential Kitchen Tools Every Home Cook Needs',
    excerpt: 'Equip your kitchen with these fundamental tools that will elevate your cooking game and make meal prep a breeze.',
    content: 'Cooking delicious meals at home doesn\'t require every gadget on the market. In fact, most professional chefs rely on a small set of high-quality tools. In this guide, we break down the 10 must-have items for any kitchen:\n\n1. **A High-Quality Chef\'s Knife**: This is your most important tool. A sharp, balanced 8-inch knife makes prep work safer and faster.\n2. **Large Wooden Cutting Board**: Give yourself plenty of space to chop. Wood is gentler on your knives than plastic.\n3. **Cast Iron Skillet**: Renowned for heat retention and versatility, it\'s perfect for searing, baking, and frying.\n4. **Stainless Steel Prep Bowls**: Keep your ingredients organized (mise en place) before you start cooking.\n5. **Instant-Read Digital Thermometer**: Stop guessing if your meat is done. This ensures perfect cook levels every time.',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    author: 'Chef Prakash'
  },
  {
    title: 'The Secret to Perfecting Homemade Tomato Sauce',
    excerpt: 'Learn the techniques, ingredients, and simmer times required to create a rich, restaurant-style Italian tomato marinara.',
    content: 'A great tomato sauce is the backbone of Italian home cooking. While it seems simple, a few common mistakes can lead to an acidic, watery sauce. Here are the secrets to making it rich and flavorful:\n\n* **Use High-Quality Tomatoes**: San Marzano whole peeled tomatoes are the gold standard. Crushing them by hand gives the sauce a perfect rustic texture.\n* **Don\'t Skimp on Olive Oil**: Use a generous amount of extra-virgin olive oil to sauté your garlic. It creates a rich emulsion with the tomato juices.\n* **Simmer Low and Slow**: Letting the sauce simmer gently for at least 45 minutes allows the sugars in the tomatoes to caramelize, removing bitterness without adding sugar.\n* **Finish with Fresh Basil**: Add fresh basil leaves in the final 5 minutes of cooking. Adding them too early burns off the aromatic oils.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    author: 'Elena Rostova'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recipeit');
    console.log('Connected!');

    // Clean existing data
    await User.deleteMany();
    await Recipe.deleteMany();
    await Blog.deleteMany();
    console.log('Database collections cleared.');

    // Create a seed user
    const user = new User({
      username: 'prakash',
      email: 'prakash@recipeit.com',
      password: 'password123' // Will be hashed automatically
    });
    const seededUser = await user.save();
    console.log('Default user seeded successfully.');

    // Associate recipes and blogs with user
    const recipesWithAuthor = dummyRecipes.map(recipe => ({
      ...recipe,
      authorId: seededUser._id
    }));

    const blogsWithAuthor = dummyBlogs.map(blog => ({
      ...blog,
      authorId: seededUser._id
    }));

    // Seed recipes and blogs
    await Recipe.insertMany(recipesWithAuthor);
    console.log('Recipes seeded successfully.');

    await Blog.insertMany(blogsWithAuthor);
    console.log('Blogs seeded successfully.');

    console.log('Database seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
