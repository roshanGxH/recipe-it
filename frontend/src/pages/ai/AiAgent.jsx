import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { 
  IoAddOutline, 
  IoCloseOutline, 
  IoSparklesOutline, 
  IoTimeOutline, 
  IoPeopleOutline, 
  IoChevronBackOutline,
  IoCheckmarkCircleOutline,
  IoBookOutline,
  IoListOutline
} from 'react-icons/io5';

// Predefined list of common ingredients with English names and Hindi synonyms
const SUGGESTED_FOODS = [
  { name: 'Tomato', synonyms: ['tamatar', 'tomato'] },
  { name: 'Potato', synonyms: ['aloo', 'potato'] },
  { name: 'Onion', synonyms: ['pyaz', 'pyaaz', 'onion'] },
  { name: 'Garlic', synonyms: ['lehsun', 'lahsun', 'garlic'] },
  { name: 'Cheese', synonyms: ['paneer', 'cheese'] },
  { name: 'Chicken', synonyms: ['chicken', 'murga'] },
  { name: 'Bread', synonyms: ['double roti', 'bread'] },
  { name: 'Egg', synonyms: ['anda', 'egg'] },
  { name: 'Butter', synonyms: ['makkhan', 'butter'] },
  { name: 'Milk', synonyms: ['doodh', 'milk'] },
  { name: 'Rice', synonyms: ['chawal', 'rice'] },
  { name: 'Pasta', synonyms: ['pasta', 'macaroni'] },
  { name: 'Carrot', synonyms: ['gajar', 'carrot'] },
  { name: 'Spinach', synonyms: ['palak', 'spinach'] },
  { name: 'Bell Pepper', synonyms: ['shimla mirch', 'capsicum', 'bell pepper'] },
  { name: 'Mushroom', synonyms: ['mushroom', 'khumbi'] },
  { name: 'Lemon', synonyms: ['nimbu', 'lemon'] },
  { name: 'Avocado', synonyms: ['avocado'] },
  { name: 'Salmon', synonyms: ['fish', 'machli', 'salmon'] },
  { name: 'Eggplant', synonyms: ['baigan', 'baingan', 'brinjal', 'eggplant'] },
  { name: 'Flour', synonyms: ['aata', 'maida', 'flour'] },
  { name: 'Chocolate', synonyms: ['chocolate'] },
  { name: 'Strawberry', synonyms: ['strawberry'] },
  { name: 'Mint', synonyms: ['pudina', 'mint'] },
  { name: 'Beef', synonyms: ['beef'] },
  { name: 'Ginger', synonyms: ['adrak', 'ginger'] },
  { name: 'Yogurt', synonyms: ['dahi', 'yogurt'] },
  { name: 'Apple', synonyms: ['seb', 'apple'] },
  { name: 'Banana', synonyms: ['kela', 'banana'] },
  { name: 'Honey', synonyms: ['shahad', 'honey'] },
  { name: 'Olive Oil', synonyms: ['olive oil', 'jaithun ka tel'] },
  { name: 'Salt', synonyms: ['namak', 'salt'] },
  { name: 'Black Pepper', synonyms: ['kali mirch', 'black pepper'] },
  { name: 'Basil', synonyms: ['tulsi', 'basil'] },
  { name: 'Cilantro', synonyms: ['dhania', 'coriander', 'cilantro'] },
  { name: 'Parsley', synonyms: ['parsley'] }
];

// Local Recipe Card Component with Tab State
const RecipeCard = ({ recipe, choiceIndex, selectedIngredients }) => {
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'steps'
  const [checkedSteps, setCheckedSteps] = useState({});

  const toggleStep = (idx) => {
    setCheckedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Analyze available (matched) and missing ingredients
  const normalizedSelected = selectedIngredients.map(i => i.toLowerCase().trim());
  const matched = [];
  const missing = [];

  recipe.ingredients.forEach(ing => {
    const ingLower = ing.toLowerCase();
    const isMatched = normalizedSelected.some(selected => 
      ingLower.includes(selected) || selected.includes(ingLower)
    );
    if (isMatched) {
      matched.push(ing);
    } else {
      missing.push(ing);
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-150 overflow-hidden flex flex-col h-[520px] w-full sm:w-[330px] hover:shadow-xl transition-all duration-300">
      
      {/* Food Picture */}
      <div className="h-44 w-full relative overflow-hidden flex-shrink-0 bg-gray-100 border-b border-gray-100">
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=600'}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-btnColor text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm z-10">
          Choice {choiceIndex}
        </div>
      </div>

      {/* Card Body Container */}
      <div className="p-5 flex flex-col flex-grow overflow-hidden">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-secondary font-serif leading-snug line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2 h-8 leading-relaxed font-light">
            {recipe.description}
          </p>
        </div>

        {/* Tab Switcher Headers */}
        <div className="flex border-b border-gray-100 mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 pb-2 flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'info' 
                ? 'border-b-2 border-btnColor text-btnColor' 
                : 'text-gray-400 hover:text-secondary'
            }`}
          >
            <IoListOutline className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 pb-2 flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'steps' 
                ? 'border-b-2 border-btnColor text-btnColor' 
                : 'text-gray-400 hover:text-secondary'
            }`}
          >
            <IoBookOutline className="w-4 h-4" />
            <span>Cooking Steps</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-grow overflow-y-auto pr-1">
          {activeTab === 'info' ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Metadata Time & Servings */}
              <div className="grid grid-cols-3 gap-2 bg-primary/30 p-2.5 rounded-xl border border-gray-100 text-center text-xs">
                <div>
                  <span className="block text-[9px] uppercase text-gray-400 font-bold">Prep</span>
                  <span className="text-secondary font-bold flex items-center justify-center gap-0.5 mt-0.5">
                    <IoTimeOutline className="text-btnColor" /> {recipe.prepTime}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-gray-400 font-bold">Cook</span>
                  <span className="text-secondary font-bold flex items-center justify-center gap-0.5 mt-0.5">
                    <IoTimeOutline className="text-btnColor" /> {recipe.cookTime}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-gray-400 font-bold">Servings</span>
                  <span className="text-secondary font-bold flex items-center justify-center gap-0.5 mt-0.5">
                    <IoPeopleOutline className="text-btnColor" /> {recipe.servings}
                  </span>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-3">
                {matched.length > 0 && (
                  <div>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider block mb-1">Available (from your list):</span>
                    <ul className="text-xs text-secondary/90 space-y-1 pl-1">
                      {matched.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-green-700">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="line-clamp-1 font-medium">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {missing.length > 0 && (
                  <div>
                    <span className="text-[10px] text-btnColor font-bold uppercase tracking-wider block mb-1">Additional Needed:</span>
                    <ul className="text-xs text-secondary/90 space-y-1 pl-1">
                      {missing.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-gray-500">
                          <span className="text-btnColor font-semibold">+</span>
                          <span className="line-clamp-1">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-[10px] text-gray-400 italic block mb-1">Check off instructions as you go:</span>
              <div className="space-y-3.5 pr-0.5">
                {recipe.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className="flex gap-2.5 items-start cursor-pointer select-none group text-xs"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <IoCheckmarkCircleOutline 
                        className={`w-4 h-4 transition-colors ${
                          checkedSteps[idx] ? 'text-green-500' : 'text-gray-300 group-hover:text-btnColor'
                        }`} 
                      />
                    </div>
                    <div className="flex-grow leading-relaxed">
                      <p className={`text-secondary font-medium transition-all ${
                        checkedSteps[idx] ? 'line-through text-gray-400' : 'group-hover:text-btnColor'
                      }`}>
                        {step.text}
                      </p>
                      <span className="text-[9px] text-btnColor font-semibold block mt-0.5">
                        Duration: {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const AiAgent = () => {
  const { API_URL } = useContext(AuthContext);

  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false); // Controls output overlap state

  const dropdownRef = useRef(null);

  // Filter autocomplete suggestions based on user input
  useEffect(() => {
    if (!inputVal.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = SUGGESTED_FOODS.filter(food => {
      const query = inputVal.toLowerCase();
      const alreadySelected = selectedIngredients.some(selected => 
        selected.toLowerCase() === food.name.toLowerCase()
      );
      if (alreadySelected) return false;

      return food.name.toLowerCase().includes(query) || 
             food.synonyms.some(syn => syn.toLowerCase().includes(query));
    }).slice(0, 5); // Limit to top 5 suggestions

    setSuggestions(filtered);
  }, [inputVal, selectedIngredients]);

  // Close suggestions if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddIngredient = (ingredient) => {
    const cleaned = ingredient.trim();
    if (!cleaned) return;

    // Avoid duplicates
    if (!selectedIngredients.some(i => i.toLowerCase() === cleaned.toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, cleaned]);
    }
    setInputVal('');
    setSuggestions([]);
  };

  const handleRemoveIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, idx) => idx !== index));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If there are suggestions, select the first one, else add typed value
      if (suggestions.length > 0) {
        handleAddIngredient(suggestions[0].name);
      } else if (inputVal.trim()) {
        handleAddIngredient(inputVal);
      }
    }
  };

  const handleMakeFood = async () => {
    if (selectedIngredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: selectedIngredients })
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        setRecipes(data.data);
        setShowOutput(true); // Show overlapping output
      } else {
        setError(data.message || 'Failed to generate recipes.');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-primary/25 overflow-hidden flex flex-col items-center py-12 px-4 sm:px-6">
      
      {/* Decorative background vectors */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-btnColor/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* INPUT CARD SECTION */}
      <div className="relative max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 z-10 transition-all duration-300">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-btnColor/10 rounded-2xl text-btnColor">
            <IoSparklesOutline className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-secondary font-serif">AI Culinary Agent</h1>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Input the ingredients sitting in your kitchen, and our agent will deduce 3 customized recipes with timing checklists.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6" role="alert">
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Autocomplete Input */}
          <div className="relative" ref={dropdownRef}>
            <label htmlFor="ingredient-input" className="block text-sm font-semibold text-secondary mb-1">
              Add Available Food Items
            </label>
            <div className="flex gap-2">
              <input
                id="ingredient-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type ingredient (e.g. Tomato, Garlic...)"
                className="flex-grow px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
              />
              <button
                type="button"
                onClick={() => handleAddIngredient(inputVal)}
                className="bg-secondary text-white p-3 rounded-xl hover:bg-opacity-90 transition-opacity"
              >
                <IoAddOutline className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden divide-y divide-gray-100">
                {suggestions.map((food, idx) => {
                  const matchedSynonym = food.synonyms.find(syn => 
                    syn.toLowerCase().includes(inputVal.toLowerCase()) && 
                    syn.toLowerCase() !== food.name.toLowerCase()
                  );
                  const displayText = matchedSynonym 
                    ? `${food.name} (${matchedSynonym.charAt(0).toUpperCase() + matchedSynonym.slice(1)})`
                    : food.name;

                  return (
                    <li
                      key={food.name}
                      onClick={() => handleAddIngredient(food.name)}
                      className="px-4 py-2.5 hover:bg-primary/40 text-sm text-secondary cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <span>{displayText}</span>
                      <span className="text-[10px] text-btnColor font-medium uppercase tracking-wider">Suggested</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Selected Ingredients Area */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-2.5">Your Selected Ingredients</h3>
            {selectedIngredients.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-2xl py-8 text-center text-gray-400 text-xs">
                Your selected food items will show up here. Add items to get started!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 p-4 bg-primary/20 rounded-2xl border border-gray-100 max-h-48 overflow-y-auto">
                {selectedIngredients.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-white text-secondary text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs hover:border-red-200 hover:text-red-600 transition-all cursor-pointer group"
                    onClick={() => handleRemoveIngredient(index)}
                    title="Click to remove"
                  >
                    <span>{item}</span>
                    <IoCloseOutline className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Trigger */}
          <button
            type="button"
            disabled={loading || selectedIngredients.length === 0}
            onClick={handleMakeFood}
            className="w-full py-3.5 bg-btnColor text-white font-bold rounded-xl hover:bg-opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btnColor transition-all disabled:opacity-50 shadow-md text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Deducing recipes...</span>
              </>
            ) : (
              <>
                <IoSparklesOutline className="w-4 h-4" />
                <span>Make Food</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* OUTPUT SCREEN (OVERLAPPING SECTION) */}
      {showOutput && (
        <div className="fixed inset-0 bg-secondary/80 backdrop-blur-lg z-50 flex items-start justify-center p-4 sm:p-10 overflow-y-auto animate-fadeIn">
          <div className="relative bg-[#f9f7f3] max-w-6xl w-full rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-200/50 my-8 animate-slideUp flex flex-col">
            
            {/* Overlay Header */}
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-5 mb-8">
              <button
                onClick={() => setShowOutput(false)}
                className="flex items-center gap-1.5 text-secondary hover:text-btnColor transition-colors text-sm font-semibold"
              >
                <IoChevronBackOutline className="w-5 h-5" />
                <span>Back to Selection</span>
              </button>
              <div className="text-center hidden md:block">
                <h2 className="text-xl font-bold font-serif text-secondary flex items-center justify-center gap-2">
                  <IoSparklesOutline className="text-btnColor" /> Deductions from Ingredients
                </h2>
              </div>
              <button
                onClick={() => setShowOutput(false)}
                className="p-1.5 rounded-xl bg-gray-200/50 hover:bg-gray-200 text-secondary transition-colors"
                aria-label="Close Output"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>

            {/* Centered Flex list of Recipes */}
            <div className="flex flex-wrap justify-center gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  choiceIndex={index + 1} 
                  selectedIngredients={selectedIngredients}
                />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-gray-200/60 flex justify-center">
              <button
                onClick={() => setShowOutput(false)}
                className="bg-secondary text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-opacity shadow-md"
              >
                Modify Available Food Items
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AiAgent;
