import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoSearchOutline, IoTimeOutline, IoPeopleOutline, IoTrashOutline } from 'react-icons/io5';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');

  const { API_URL, user, token } = useContext(AuthContext);

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'desserts', 'drinks', 'appetizers'];

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const url = new URL(`${API_URL}/recipes`, window.location.origin);
      if (selectedCategory && selectedCategory !== 'all') {
        url.searchParams.append('category', selectedCategory);
      }
      if (search) {
        url.searchParams.append('search', search);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.success) {
        setRecipes(data.data);
      } else {
        setError('Failed to fetch recipes.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleDelete = async (id, e) => {
    e.preventDefault(); // Prevent navigating to detail page when deleting
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
        // Remove from local list
        setRecipes(recipes.filter(r => r._id !== id));
      } else {
        alert(data.message || 'Failed to delete recipe.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting recipe.');
    }
  };

  return (
    <div className="bg-primary/10 min-h-screen pb-16">
      {/* Hero Banner Section */}
      <div className="relative bg-secondary text-white overflow-hidden py-16 px-6 sm:px-12 text-center">
        {/* Background gradient pattern */}
        <div className="absolute inset-0 bg-radial-gradient from-btnColor/20 to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto space-y-6">
          <span className="text-btnColor uppercase tracking-widest text-xs font-semibold">Perfect Recipes Daily</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif leading-tight">
            Unleash Your Inner Chef
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Discover, share, and enjoy thousands of premium recipes curated by home cooks and professional chefs around the world.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-100 mt-8">
            <div className="flex items-center flex-grow pl-4 text-gray-400">
              <IoSearchOutline className="w-5 h-5 text-secondary/70" />
              <input
                type="text"
                placeholder="Search recipe titles, descriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-secondary pl-2 py-2.5 sm:text-sm placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-btnColor hover:bg-opacity-95 text-white font-medium px-6 py-2.5 rounded-full transition-colors sm:text-sm shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories Filter list */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200/80 pb-5 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-secondary font-serif">Explore Recipes</h2>
            <p className="text-sm text-gray-500 mt-1">Browse our handpicked collections of delectable dishes</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-btnColor text-white shadow-md'
                    : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid listing */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 animate-pulse h-96" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 font-medium">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-xs border border-gray-100 mt-8">
            <p className="text-gray-400 text-lg">No recipes found matching your criteria.</p>
            <p className="text-btnColor mt-2 font-medium">Try checking another category or adjusting your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe._id}
                to={`/recipes/${recipe._id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-gray-100 transition-all flex flex-col h-full"
              >
                {/* Recipe Image with overlay category */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=600'}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-btnColor text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {recipe.category}
                  </span>
                </div>

                {/* Recipe Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-bold text-secondary font-serif line-clamp-1 group-hover:text-btnColor transition-colors">
                      {recipe.title}
                    </h3>
                    {user && user.username === recipe.author && (
                      <button
                        onClick={(e) => handleDelete(recipe._id, e)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                        title="Delete recipe"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
                    {recipe.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <IoTimeOutline className="w-4 h-4 text-btnColor/80" />
                      <span>Prep: {recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoPeopleOutline className="w-4 h-4 text-btnColor/80" />
                      <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
                    <span>By {recipe.author}</span>
                    <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;