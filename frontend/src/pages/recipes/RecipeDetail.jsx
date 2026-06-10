import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoArrowBackOutline, IoTimeOutline, IoPeopleOutline, IoTrashOutline } from 'react-icons/io5';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_URL, user, token } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Interactive checklist state
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedInstructions, setCheckedInstructions] = useState({});

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/${id}`);
        const data = await response.json();

        if (data.success) {
          setRecipe(data.data);
        } else {
          setError(data.message || 'Recipe not found');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, API_URL]);

  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleInstruction = (idx) => {
    setCheckedInstructions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        navigate('/');
      } else {
        alert(data.message || 'Failed to delete recipe.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting recipe.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-96 bg-gray-200 rounded-2xl" />
        <div className="h-10 bg-gray-200 rounded w-3/4" />
        <div className="h-20 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-block">
          <p className="font-semibold">{error}</p>
        </div>
        <div className="mt-6">
          <Link to="/" className="text-btnColor hover:underline flex items-center justify-center gap-2">
            <IoArrowBackOutline /> Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation / Back Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-secondary/80 hover:text-btnColor flex items-center gap-2 font-medium transition-colors">
            <IoArrowBackOutline className="w-5 h-5" />
            <span>Back to recipes</span>
          </Link>

          {user && user.username === recipe.author && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
            >
              <IoTrashOutline className="w-4 h-4" />
              <span>Delete Recipe</span>
            </button>
          )}
        </div>

        {/* Recipe Main details Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          {/* Main Image */}
          <div className="h-[400px] w-full relative">
            <img
              src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1200'}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-6 left-6 bg-btnColor text-white text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-md">
              {recipe.category}
            </span>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            {/* Title & Creator */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary font-serif leading-tight">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-4 items-center">
                <span>By <strong className="text-secondary">{recipe.author}</strong></span>
                <span>•</span>
                <span>Published on {new Date(recipe.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 text-lg leading-relaxed font-light italic">
                "{recipe.description}"
              </p>
            </div>

            {/* Timing / Serving Info boxes */}
            <div className="grid grid-cols-3 gap-4 bg-primary/20 p-6 rounded-2xl border border-gray-100 text-center">
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Prep Time</span>
                <span className="text-secondary font-bold text-base mt-1 block flex items-center justify-center gap-1">
                  <IoTimeOutline className="text-btnColor" /> {recipe.prepTime}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Cook Time</span>
                <span className="text-secondary font-bold text-base mt-1 block flex items-center justify-center gap-1">
                  <IoTimeOutline className="text-btnColor" /> {recipe.cookTime}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Servings</span>
                <span className="text-secondary font-bold text-base mt-1 block flex items-center justify-center gap-1">
                  <IoPeopleOutline className="text-btnColor" /> {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Recipe Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pt-4">
              {/* Ingredients Column */}
              <div className="md:col-span-2 space-y-5">
                <h3 className="text-xl font-bold text-secondary font-serif border-b border-gray-100 pb-2">
                  Ingredients
                </h3>
                <p className="text-xs text-gray-400 italic">Check off ingredients as you prepare them:</p>
                <ul className="space-y-3.5">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className="flex items-start gap-3 cursor-pointer group select-none"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedIngredients[idx]}
                        onChange={() => {}} // toggled on container click
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-btnColor focus:ring-btnColor pointer-events-none"
                      />
                      <span className={`text-sm text-secondary transition-all ${
                        checkedIngredients[idx] ? 'line-through text-gray-400' : 'group-hover:text-btnColor'
                      }`}>
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Column */}
              <div className="md:col-span-3 space-y-5">
                <h3 className="text-xl font-bold text-secondary font-serif border-b border-gray-100 pb-2">
                  Instructions
                </h3>
                <p className="text-xs text-gray-400 italic">Check off steps as you complete them:</p>
                <div className="space-y-6">
                  {recipe.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleInstruction(idx)}
                      className="flex gap-4 cursor-pointer group select-none"
                    >
                      <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        checkedInstructions[idx]
                          ? 'bg-gray-100 text-gray-400 line-through'
                          : 'bg-btnColor/10 text-btnColor font-serif'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-grow pt-0.5">
                        <p className={`text-sm text-secondary leading-relaxed transition-all ${
                          checkedInstructions[idx] ? 'line-through text-gray-400' : 'group-hover:text-btnColor'
                        }`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
