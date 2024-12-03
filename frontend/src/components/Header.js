// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/booking">BOOKING</Link></li>
          <li><Link to="/menu">MENU</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/jobs">JOBS</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;