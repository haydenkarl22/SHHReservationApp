// src/App.js
import { React, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Menu from './pages/Menu';
import About from './pages/About';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Header from './components/Header'

import './styles.css';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Triggered on pathname change

  return null; // This component does not render anything
};



function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Header /> {}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element = {<Jobs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;