import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const result = await signup(username, email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Failed to sign up. Try a different username/email.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-primary/20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-secondary">
            Join Recipe-It!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-btnColor hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-xs space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-secondary mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-secondary focus:outline-none focus:ring-btnColor focus:border-btnColor focus:z-10 sm:text-sm"
                placeholder="Prakash"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-secondary mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-secondary focus:outline-none focus:ring-btnColor focus:border-btnColor focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-secondary focus:outline-none focus:ring-btnColor focus:border-btnColor focus:z-10 sm:text-sm"
                placeholder="Minimum 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-secondary mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-secondary focus:outline-none focus:ring-btnColor focus:border-btnColor focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-btnColor hover:bg-opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btnColor disabled:opacity-50 transition-colors shadow-md"
            >
              {submitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
