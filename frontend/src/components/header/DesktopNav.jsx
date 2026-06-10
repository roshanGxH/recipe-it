import React from 'react'
import { Link } from 'react-router-dom';

const DesktopNav = ({ menuItems, Logo, user, logout }) => {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12 border-b border-gray-100 bg-primary/30 backdrop-blur-sm'>
        <Link to="/">
          <img src={Logo} alt="logo" className='h-10 w-auto'/>
        </Link>
        <ul className='flex gap-7'>
            {menuItems.map((menu, index) => (
                <li key={index}>
                    <Link to={`/${menu}`} className='font-medium capitalize text-secondary hover:text-btnColor transition-colors'>{menu}</Link>
                </li>
            ))}
        </ul>
        
        {/* User state based buttons */}
        <div className='flex items-center gap-4 font-medium'>
            {user ? (
              <>
                <Link to="/recipes/new" className='text-btnColor hover:underline text-sm'>+ Add Recipe</Link>
                <Link to="/blogs/new" className='text-btnColor hover:underline text-sm mr-2'>+ Write Blog</Link>
                <span className='text-secondary text-sm font-semibold'>Hi, {user.username}</span>
                <button 
                  onClick={logout} 
                  className='bg-secondary text-white py-1.5 px-4 rounded-md text-sm hover:bg-opacity-90 transition-opacity shadow-sm'
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className='text-secondary py-2 px-4 rounded hover:bg-secondary/5 transition-colors'>
                  Log In
                </Link>
                <Link to="/signup" className='bg-btnColor text-white py-2 px-4 rounded hover:bg-opacity-90 transition-opacity shadow-sm'>
                  Sign Up
                </Link>
              </>
            )}
        </div>
    </div>
  )
}

export default DesktopNav