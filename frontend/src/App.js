import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Menu from './pages/Menu';
import About from './pages/About';
import Signup from './pages/Signup';
import Header from './components/Header'; 
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <Header /> {}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
