import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/SHHRestaurantLogo.jpg';
import '../styles.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="Restaurant Logo" className="restaurant-logo" />
        </div>
        <nav className="nav-container">
          <ul className="nav-list">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/booking">BOOKING</Link></li>
            <li><Link to="/menu">MENU</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
