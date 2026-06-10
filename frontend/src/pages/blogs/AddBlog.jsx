import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AddBlog = () => {
  const { token, API_URL } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !excerpt || !content) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          imageUrl
        })
      });

      const data = await response.json();
      setSubmitting(false);

      if (data.success) {
        navigate('/resources');
      } else {
        setError(data.message || 'Failed to submit article.');
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
          <h1 className="text-3xl font-extrabold text-secondary font-serif">Write an Article</h1>
          <p className="text-sm text-gray-500 mt-1">Publish kitchen tips, recipes secrets, or ingredients guides.</p>
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
              Article Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master the French Omelette"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-secondary mb-1">
              Brief Excerpt *
            </label>
            <textarea
              id="excerpt"
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short one-to-two sentence description showing on the list page..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-secondary mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/blog-hero.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary"
            />
          </div>

          {/* Full Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-secondary mb-1">
              Article Body *
            </label>
            <textarea
              id="content"
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your guide content here. Supports spacing, bullets, and paragraphs..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-btnColor focus:border-btnColor sm:text-sm text-secondary font-light"
            />
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-btnColor text-white font-semibold rounded-lg hover:bg-opacity-95 transition-opacity disabled:opacity-50 shadow-md text-sm"
            >
              {submitting ? 'Publishing Article...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
