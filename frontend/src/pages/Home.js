import React from 'react';
import Header from '../components/Header';
import '../styles.css';

function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-container">
        <h1>HOME</h1>
      </div>
    </div>
  );
}

export default Home;