import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';

const AddRecipe = () => {
  const { user, token, API_URL } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState(2);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('lunch');

  // Dynamic lists
  const [ingredients, setIngredients] = useState([]);
  const [currIngredient, setCurrIngredient] = useState('');
  
  const [instructions, setInstructions] = useState([]);
  const [currInstruction, setCurrInstruction] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (currIngredient.trim()) {
      setIngredients([...ingredients, currIngredient.trim()]);
      setCurrIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, idx) => idx !== index));
  };

  const handleAddInstruction = (e) => {
    e.preventDefault();
    if (currInstruction.trim()) {
      setInstructions([...instructions, currInstruction.trim()]);
      setCurrInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || ingredients.length === 0 || instructions.length === 0 || !category) {
      setError('Please fill in all required fields and add at least one ingredient and instruction step.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          prepTime: prepTime || '0 mins',
          cookTime: cookTime || '0 mins',
          servings: Number(servings),
          imageUrl,
          category,
          ingredients,
          instructions
        })
      });

      const data = await response.json();
      setSubmitting(false);

      if (data.success) {
        navigate(`/recipes/${data.data._id}`);
      } else {
        setError(data.message || 'Failed to create recipe.');
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="bg-primary/10 min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
        <div className="border-b border-gray-100 pb-5 mb-8">
          <h1 className="text-3xl font-extrabold text-secondary font-serif">Share Your Recipe</h1>
          <p className="text-sm text-gray-500 mt-1">Submit your custom recipe for others to try and love!</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-secondary mb-1">
              Recipe Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grandma's Apple Pie"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-secondary mb-1">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dish, its origins, or why it's special..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
            />
          </div>

          {/* Times & Servings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-semibold text-secondary mb-1">
                Prep Time
              </label>
              <input
                id="prepTime"
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="e.g. 15 mins"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
            </div>
            <div>
              <label htmlFor="cookTime" className="block text-sm font-semibold text-secondary mb-1">
                Cook Time
              </label>
              <input
                id="cookTime"
                type="text"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                placeholder="e.g. 30 mins"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
            </div>
            <div>
              <label htmlFor="servings" className="block text-sm font-semibold text-secondary mb-1">
                Servings
              </label>
              <input
                id="servings"
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
            </div>
          </div>

          {/* Category & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-secondary mb-1">
                Category *
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary bg-white"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
                <option value="appetizers">Appetizers</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-secondary mb-1">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
            </div>
          </div>

          {/* Ingredients Addition list */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold text-secondary font-serif mb-3">Ingredients *</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currIngredient}
                onChange={(e) => setCurrIngredient(e.target.value)}
                placeholder="e.g. 2 cups of sugar"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-secondary text-white p-2.5 rounded-lg hover:bg-opacity-90 transition-opacity"
              >
                <IoAddOutline className="w-5 h-5" />
              </button>
            </div>

            {ingredients.length > 0 && (
              <ul className="bg-primary/10 rounded-xl p-4 border border-gray-100 space-y-2">
                {ingredients.map((ing, index) => (
                  <li key={index} className="flex justify-between items-center text-sm text-secondary">
                    <span>• {ing}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Instructions Addition list */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold text-secondary font-serif mb-3">Instructions *</h3>
            <div className="flex gap-2 mb-4">
              <textarea
                value={currInstruction}
                onChange={(e) => setCurrInstruction(e.target.value)}
                placeholder="e.g. Preheat oven to 350 degrees..."
                rows={2}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
              <button
                type="button"
                onClick={handleAddInstruction}
                className="bg-secondary text-white p-2.5 rounded-lg hover:bg-opacity-90 transition-opacity self-end"
              >
                <IoAddOutline className="w-5 h-5" />
              </button>
            </div>

            {instructions.length > 0 && (
              <ol className="bg-primary/10 rounded-xl p-4 border border-gray-100 space-y-3.5 list-decimal list-inside">
                {instructions.map((step, index) => (
                  <li key={index} className="text-sm text-secondary items-start">
                    <span className="pl-1 text-left inline-block w-[90%]">{step}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(index)}
                      className="text-gray-400 hover:text-red-500 p-1 float-right"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                    <div className="clear-both"></div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-btnColor text-white font-semibold rounded-lg hover:bg-opacity-95 transition-opacity disabled:opacity-50 shadow-md text-sm"
            >
              {submitting ? 'Submitting Recipe...' : 'Publish Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
