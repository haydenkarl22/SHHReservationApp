// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import '../styles.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => cleanup();
  }, []);

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/booking">BOOKING</Link></li>
          <li><Link to="/menu">MENU</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          {isLoggedIn ? (
            <li><Link to="/profile">PROFILE</Link></li>
          ) : (
            <li><Link to="/login">LOGIN</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;