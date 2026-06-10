import React, { useState, useContext } from 'react';
import logo from "/logo.svg";
import DesktopNav from './DesktopNav';
import MobileNav from '../MobileNav';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const [hideLeft, setHideLeft] = useState("-left-[1000px]");
    const { user, logout } = useContext(AuthContext);
    const menuItems = ["recipes", "resources", "ai-agent"];
    const onOpen = () => {
        setHideLeft("left-0");
    }
    const onClose = () => {
        setHideLeft("-left-[1000px]");
    }

  return (
    <>
    <div className='max-[900px]:hidden'>
      <DesktopNav 
      menuItems={menuItems} 
      Logo={logo}
      user={user}
      logout={logout}
      />
      </div>
    <div className='min-[900px]:hidden'>
    <MobileNav
    menuItems={menuItems}
    Logo={logo}
    onClose={onClose}
    hideLeft={hideLeft}
    onOpen={onOpen}
    user={user}
    logout={logout}
    />
    </div>
    </>
  )
}

export default Header