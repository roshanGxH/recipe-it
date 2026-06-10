const express = require('express');
const router = express.Router();

// Fallback recipe dataset for smart matching
const FALLBACK_RECIPES = [
  {
    title: 'Tomato & Basil Bruschetta',
    description: 'Crispy toasted bread rubbed with garlic and topped with a fresh mixture of tomatoes, basil, and olive oil.',
    prepTime: '10 mins',
    cookTime: '5 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Tomato', 'Basil', 'Bread', 'Garlic', 'Olive Oil'],
    keyIngredients: ['tomato', 'bread', 'basil', 'garlic'],
    instructions: [
      { text: 'Dice the tomatoes and chop the fresh basil leaves.', time: '4 mins' },
      { text: 'Mix tomatoes, basil, minced garlic, olive oil, salt, and pepper in a bowl.', time: '2 mins' },
      { text: 'Slice the bread and toast or grill it until crispy.', time: '4 mins' },
      { text: 'Rub a raw garlic clove over the toasted bread slices.', time: '1 min' },
      { text: 'Spoon the tomato mixture generously over the toasted bread and serve.', time: '4 mins' }
    ]
  },
  {
    title: 'Classic Grilled Cheese Sandwich',
    description: 'Perfectly golden, crispy bread on the outside with a warm, gooey, melted cheese center.',
    prepTime: '5 mins',
    cookTime: '6 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Bread', 'Cheese', 'Butter'],
    keyIngredients: ['bread', 'cheese', 'butter'],
    instructions: [
      { text: 'Butter one side of each bread slice.', time: '2 mins' },
      { text: 'Place one slice butter-side down in a hot skillet.', time: '1 min' },
      { text: 'Top with cheese slices and place the other bread slice butter-side up on top.', time: '1 min' },
      { text: 'Cook until the bottom bread is golden brown and cheese begins to melt (about 3 minutes).', time: '3 mins' },
      { text: 'Flip and cook the other side until golden and cheese is fully melted.', time: '3 mins' }
    ]
  },
  {
    title: 'Avocado Egg Toast',
    description: 'Sourdough toast topped with creamy avocado mash, a fried or poached egg, and red pepper flakes.',
    prepTime: '5 mins',
    cookTime: '5 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Avocado', 'Egg', 'Bread', 'Lemon', 'Butter'],
    keyIngredients: ['avocado', 'egg', 'bread'],
    instructions: [
      { text: 'Toast the slice of bread until golden and crisp.', time: '3 mins' },
      { text: 'Mash avocado in a bowl with a squeeze of lemon juice, salt, and pepper.', time: '2 mins' },
      { text: 'Melt a small pat of butter in a pan and fry the egg to your liking.', time: '4 mins' },
      { text: 'Spread the mashed avocado over the toasted bread.', time: '1 min' },
      { text: 'Slide the fried egg on top and season with chili flakes.', time: '1 min' }
    ]
  },
  {
    title: 'Pasta Aglio e Olio',
    description: 'A traditional Italian pasta dish made by sautéing sliced garlic in olive oil, tossed with spaghetti and chili flakes.',
    prepTime: '5 mins',
    cookTime: '10 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1563379971899-63424bc6f446?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Pasta', 'Garlic', 'Olive Oil', 'Chili Flakes'],
    keyIngredients: ['pasta', 'garlic', 'olive oil'],
    instructions: [
      { text: 'Boil water in a large pot, add salt, and cook pasta according to package instructions.', time: '8 mins' },
      { text: 'Thinly slice garlic cloves while the pasta cooks.', time: '2 mins' },
      { text: 'Heat olive oil in a pan, add sliced garlic and chili flakes, sautéing until garlic is fragrant and lightly gold.', time: '3 mins' },
      { text: 'Drain the pasta, reserving a small splash of cooking water.', time: '1 min' },
      { text: 'Toss pasta into the garlic oil mixture, add cooking water, and mix vigorously until coated.', time: '2 mins' }
    ]
  },
  {
    title: 'Simple Chicken Fried Rice',
    description: 'Sautéed rice with pieces of tender chicken, carrots, peas, egg, and soy sauce.',
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Chicken', 'Rice', 'Egg', 'Onion', 'Garlic', 'Butter', 'Soy Sauce'],
    keyIngredients: ['chicken', 'rice', 'egg', 'garlic'],
    instructions: [
      { text: 'Whisk eggs in a bowl and scramble them in a hot skillet, then set aside.', time: '3 mins' },
      { text: 'Cut chicken breast into small cubes and cook in the skillet with butter and garlic until done.', time: '6 mins' },
      { text: 'Add chopped onion and cook until soft and translucent.', time: '3 mins' },
      { text: 'Stir in pre-cooked cold rice, scrambled eggs, and soy sauce.', time: '4 mins' },
      { text: 'Stir-fry everything over high heat for 3-4 minutes until piping hot.', time: '4 mins' }
    ]
  },
  {
    title: 'Spinach Scrambled Eggs',
    description: 'Fluffy eggs scrambled with fresh baby spinach and a touch of butter.',
    prepTime: '3 mins',
    cookTime: '4 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Egg', 'Spinach', 'Butter', 'Milk'],
    keyIngredients: ['egg', 'spinach', 'butter'],
    instructions: [
      { text: 'Whisk eggs and a splash of milk together in a bowl with a pinch of salt and pepper.', time: '2 mins' },
      { text: 'Melt butter in a non-stick skillet over medium-low heat.', time: '1 min' },
      { text: 'Add fresh spinach leaves to the pan and sauté until wilted (about 1-2 minutes).', time: '2 mins' },
      { text: 'Pour in the beaten eggs and stir slowly until soft, creamy curds form.', time: '3 mins' },
      { text: 'Remove from heat just before they look fully dry and serve.', time: '1 min' }
    ]
  },
  {
    title: 'Classic Hot Chocolate',
    description: 'Rich and creamy hot chocolate made from scratch with milk, cocoa powder, and chocolate chips.',
    prepTime: '2 mins',
    cookTime: '5 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Milk', 'Chocolate', 'Sugar'],
    keyIngredients: ['milk', 'chocolate'],
    instructions: [
      { text: 'Pour milk into a small saucepan over medium heat.', time: '2 mins' },
      { text: 'Add sugar and cocoa powder/chocolate chips, whisking continuously.', time: '2 mins' },
      { text: 'Bring to a gentle simmer (do not boil) until the chocolate is completely melted and smooth.', time: '3 mins' },
      { text: 'Pour into mugs and serve warm, optionally topped with whipped cream.', time: '1 min' }
    ]
  },
  {
    title: 'Garlic Butter Sautéed Mushrooms',
    description: 'Plump mushrooms sautéed in a rich garlic butter sauce, finished with parsley.',
    prepTime: '5 mins',
    cookTime: '7 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Mushroom', 'Garlic', 'Butter', 'Olive Oil'],
    keyIngredients: ['mushroom', 'garlic', 'butter'],
    instructions: [
      { text: 'Clean the mushrooms with a damp paper towel and slice them.', time: '3 mins' },
      { text: 'Heat olive oil and butter in a pan over medium-high heat.', time: '1 min' },
      { text: 'Add sliced mushrooms and sauté without stirring for 2-3 minutes to get a nice brown color.', time: '3 mins' },
      { text: 'Add minced garlic and stir, cooking for another 2 minutes until fragrant.', time: '2 mins' },
      { text: 'Season with salt, pepper, and fresh parsley, then serve.', time: '1 min' }
    ]
  },
  {
    title: 'Banana Honey Smoothie',
    description: 'A quick and nourishing blended smoothie of bananas, yogurt, milk, and honey.',
    prepTime: '4 mins',
    cookTime: '0 mins',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Banana', 'Yogurt', 'Milk', 'Honey'],
    keyIngredients: ['banana', 'yogurt', 'milk', 'honey'],
    instructions: [
      { text: 'Peel the banana and slice it into pieces.', time: '1 min' },
      { text: 'Add banana slices, yogurt, milk, and a drizzle of honey into a blender.', time: '2 mins' },
      { text: 'Blend on high speed until completely smooth and creamy.', time: '1 min' },
      { text: 'Pour into a tall glass and enjoy immediately.', time: '1 min' }
    ]
  },
  {
    title: 'Fresh Guacamole Salad',
    description: 'Creamy avocado chunks tossed with cherry tomatoes, red onion, lemon juice, and cilantro.',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Avocado', 'Tomato', 'Onion', 'Lemon'],
    keyIngredients: ['avocado', 'tomato', 'onion', 'lemon'],
    instructions: [
      { text: 'Dice the avocados and place in a salad bowl.', time: '3 mins' },
      { text: 'Halve the cherry tomatoes and finely chop the red onion.', time: '4 mins' },
      { text: 'Add tomatoes and onion to the bowl with avocado.', time: '1 min' },
      { text: 'Drizzle with fresh lemon juice and olive oil, then season with salt and pepper.', time: '1 min' },
      { text: 'Toss gently to combine without mashing the avocado chunks.', time: '1 min' }
    ]
  },
  {
    title: 'Spiced Roasted Eggplant (Baingan)',
    description: 'Tender roasted eggplant slices infused with garlic, cumin, and turmeric.',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=600',
    ingredients: ['Eggplant', 'Garlic', 'Olive Oil', 'Salt', 'Turmeric'],
    keyIngredients: ['eggplant', 'baigan', 'baingan', 'brinjal'],
    instructions: [
      { text: 'Preheat your oven to 400°F (200°C) and grease a baking sheet.', time: '5 mins' },
      { text: 'Slice the eggplant into 1/2-inch thick rounds.', time: '3 mins' },
      { text: 'Brush both sides of eggplant slices with olive oil and minced garlic.', time: '2 mins' },
      { text: 'Sprinkle with salt, pepper, and a pinch of turmeric.', time: '1 min' },
      { text: 'Bake for 20 minutes until tender and caramelized on the edges.', time: '20 mins' }
    ]
  }
];

// Helper to calculate ingredient matching score
const scoreRecipes = (userIngredients, recipeList) => {
  const normalizedUserList = userIngredients.map(ing => ing.toLowerCase().trim());
  
  return recipeList.map(recipe => {
    let score = 0;
    
    // Check key ingredients match
    recipe.keyIngredients.forEach(keyIng => {
      if (normalizedUserList.some(userIng => userIng.includes(keyIng) || keyIng.includes(userIng))) {
        score += 3; // key ingredient match has high weight
      }
    });

    // Check full ingredients list match
    recipe.ingredients.forEach(ing => {
      if (normalizedUserList.some(userIng => ing.toLowerCase().includes(userIng))) {
        score += 1;
      }
    });

    return { ...recipe, score };
  });
};

// @route   POST /api/ai/generate
// @desc    Generate 3 recipes based on provided available food ingredients
// @access  Public
router.post('/generate', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide a list of available food items.' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      console.log('Utilizing Gemini LLM API to deduce recipes...');
      
      const promptText = `
        You are an advanced AI cooking assistant. The user has the following food items available: ${ingredients.join(', ')}.
        Based primarily on these ingredients, deduce between 1 to 3 recipes that can be made. 
        
        CRITICAL REQUIREMENT: The user's input ingredients MUST be the MAIN material/star ingredients of the deduced dishes (constituting roughly 70% or the core bulk of the recipe, not just secondary garnishes, minor toppings, or minor seasonings). For example, if they enter 'Tomato', suggest dishes like Tomato Soup or Bruschetta where Tomato is the primary star.
        
        Each recipe MUST require at least one of the user's available ingredients as a key component.
        If you can only find 1 or 2 valid recipes that use the available ingredients as the main stars, return only those (do not pad to 3).
        You must return at least 1 recipe always. (If absolutely no recipes can be made from these items, return exactly 1 popular simple recipe).
        You may include minimal pantry staples (like salt, pepper, oil, water, flour, etc.) if needed to complete the recipes.
        
        Provide the response in raw JSON format. The response must be a JSON array of 1 to 3 objects. Do not wrap in markdown \`\`\`json blocks.
        Each object in the array must have the following structure:
        {
          "title": "A highly creative recipe title",
          "description": "A brief overview describing why this dish is great",
          "prepTime": "Estimated prep time (e.g. 10 mins)",
          "cookTime": "Estimated cooking time (e.g. 15 mins)",
          "servings": 2,
          "imageUrl": "Use a relevant culinary food image from unsplash starting with https://images.unsplash.com/",
          "ingredients": ["ingredient 1 (with quantity)", "ingredient 2"],
          "instructions": [
            { "text": "Detail description of step 1", "time": "Duration of step (e.g. 5 mins)" },
            { "text": "Detail description of step 2", "time": "Duration of step (e.g. 10 mins)" }
          ]
        }
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        }
      );

      const responseData = await response.json();
      
      if (responseData.candidates && responseData.candidates[0].content.parts[0].text) {
        const resultText = responseData.candidates[0].content.parts[0].text;
        const parsedRecipes = JSON.parse(resultText);
        if (Array.isArray(parsedRecipes) && parsedRecipes.length >= 1) {
          return res.json({ success: true, data: parsedRecipes.slice(0, 3) });
        }
      }
      
      console.log('Gemini output invalid, falling back to smart local matching...');
    } catch (err) {
      console.error('Gemini API Error:', err.message);
      console.log('Falling back to local match generator...');
    }
  }

  // Fallback dynamic generator (scoring matching ingredients)
  try {
    const scored = scoreRecipes(ingredients, FALLBACK_RECIPES);
    
    // Strict Filter: Only include recipes where the matched ingredients are in 'keyIngredients' (main materials)
    const matchingRecipes = scored.filter(recipe => {
      const normalizedUserList = ingredients.map(ing => ing.toLowerCase().trim());
      return recipe.keyIngredients.some(keyIng => 
        normalizedUserList.some(userIng => userIng.includes(keyIng) || keyIng.includes(userIng))
      );
    });
    
    let selectedRecipes = [];
    
    if (matchingRecipes.length > 0) {
      // Sort by score in descending order, then slice top 3
      const sorted = matchingRecipes.sort((a, b) => b.score - a.score);
      selectedRecipes = sorted.slice(0, 3).map(({ score, keyIngredients, ...recipe }) => recipe);
    } else {
      // If no matching recipes, return exactly 1 fallback recipe to give at least 1 always
      const { score, keyIngredients, ...defaultRecipe } = FALLBACK_RECIPES[1]; // Grilled Cheese
      selectedRecipes = [defaultRecipe];
    }
    
    return res.json({ success: true, data: selectedRecipes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
