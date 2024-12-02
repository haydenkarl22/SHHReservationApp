// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Menu from './pages/Menu';
import About from './pages/About';
import Jobs from './pages/Jobs';
import Signup from './pages/Signup';

import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/booking">Booking</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to ="/jobs">Jobs</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element = {<Jobs />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>


    </Router>
  );
}

export default App;