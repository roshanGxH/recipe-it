import React from 'react';
import { Link } from 'react-router-dom';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

const MobileNav = ({ menuItems, Logo, onClose, hideLeft, onOpen, user, logout }) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 border-b border-gray-100 bg-primary/35">
      {/* Top Bar for Mobile */}
      <Link to="/">
        <img src={Logo} alt="logo" className="h-10 w-auto" />
      </Link>
      
      <button 
        onClick={onOpen}
        className="text-secondary hover:text-btnColor focus:outline-none p-2"
        aria-label="Open Menu"
      >
        <IoMenuOutline className="w-8 h-8" />
      </button>

      {/* Background Overlay */}
      {hideLeft === 'left-0' && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer Menu */}
      <div 
        className={`fixed top-0 bottom-0 z-50 w-72 bg-white p-6 shadow-2xl transition-all duration-300 ease-in-out ${hideLeft}`}
      >
        <div className="flex justify-between items-center mb-8">
          <img src={Logo} alt="logo" className="h-9 w-auto" />
          <button 
            onClick={onClose}
            className="text-secondary hover:text-btnColor focus:outline-none p-1"
            aria-label="Close Menu"
          >
            <IoCloseOutline className="w-7 h-7" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-5 mb-8">
          {menuItems.map((menu, index) => (
            <li key={index}>
              <Link 
                to={`/${menu}`}
                onClick={onClose}
                className="font-medium capitalize text-secondary hover:text-btnColor transition-colors block py-2 text-lg"
              >
                {menu}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link 
                  to="/recipes/new"
                  onClick={onClose}
                  className="font-medium text-btnColor hover:underline transition-colors block py-2 text-lg"
                >
                  + Add Recipe
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs/new"
                  onClick={onClose}
                  className="font-medium text-btnColor hover:underline transition-colors block py-2 text-lg"
                >
                  + Write Blog
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Login and Signup or Logout */}
        <div className="flex flex-col gap-4 font-medium pt-6 border-t border-gray-100">
          {user ? (
            <>
              <div className="text-secondary text-sm font-semibold mb-2">Hi, {user.username}</div>
              <button 
                onClick={() => { logout(); onClose(); }}
                className="bg-secondary text-white py-2.5 px-4 rounded hover:bg-opacity-90 transition-opacity text-center"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                onClick={onClose}
                className="text-secondary py-2.5 px-4 rounded border border-secondary/20 hover:bg-secondary/5 transition-colors text-center block"
              >
                Log In
              </Link>
              <Link 
                to="/signup"
                onClick={onClose}
                className="bg-btnColor text-white py-2.5 px-4 rounded hover:bg-opacity-90 transition-opacity shadow-sm text-center block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

