import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { IoChevronDownOutline, IoChevronUpOutline, IoBookOutline } from 'react-icons/io5';

const Blogs = () => {
  const { API_URL } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Track expanded blogs inline
  const [expandedBlogIds, setExpandedBlogIds] = useState({});

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError('Failed to fetch blogs.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [API_URL]);

  const toggleExpandBlog = (id) => {
    setExpandedBlogIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-primary/10 min-h-screen pb-16">
      {/* Blogs Header Banner */}
      <div className="relative bg-secondary text-white py-16 px-6 sm:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-btnColor/20 to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative max-w-2xl mx-auto space-y-4">
          <span className="text-btnColor uppercase tracking-widest text-xs font-semibold">Kitchen Knowledge & Tips</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif">Culinary Blogs & Guides</h1>
          <p className="text-gray-300 font-light text-base max-w-xl mx-auto">
            Expand your kitchen expertise with tutorials, chef guides, and culinary secrets from our top contributors.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        {loading ? (
          <div className="space-y-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 animate-pulse h-64" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 font-medium">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-xs border border-gray-100">
            <IoBookOutline className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No guides or blogs published yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => {
              const isExpanded = !!expandedBlogIds[blog._id];
              return (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Blog Image */}
                    <div className="w-full md:w-80 h-52 md:h-auto relative flex-shrink-0">
                      <img
                        src={blog.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                          <span>By {blog.author}</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-secondary font-serif hover:text-btnColor transition-colors mb-3">
                          {blog.title}
                        </h2>
                        
                        {/* Summary / Excerpt */}
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                          {blog.excerpt}
                        </p>
                        
                        {/* Expanded Full Content */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-100 text-secondary text-sm leading-relaxed whitespace-pre-line space-y-2 animate-fadeIn">
                            {blog.content}
                          </div>
                        )}
                      </div>

                      {/* Expand / Collapse Toggle button */}
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => toggleExpandBlog(blog._id)}
                          className="flex items-center gap-1.5 text-btnColor font-semibold text-xs uppercase tracking-wider hover:underline focus:outline-none"
                        >
                          <span>{isExpanded ? 'Collapse Article' : 'Read Article'}</span>
                          {isExpanded ? <IoChevronUpOutline className="w-4 h-4" /> : <IoChevronDownOutline className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
