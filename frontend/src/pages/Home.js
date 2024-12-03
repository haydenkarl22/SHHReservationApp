import React, { useState, useEffect } from 'react';
import '../styles.css';
import restaurantLogo from '../img/SHHRestaurantLogo.jpg';
import food1 from '../img/food1.jpg';
import food2 from '../img/food2.jpg';
import food3 from '../img/food3.jpg';
import food4 from '../img/food4.jpg';
import food5 from '../img/food5.jpg';
import food6 from '../img/food6.jpg';


// Historical data of average customers by day and hour
const customerData = {
  monday: { '11': 20, '12': 30, '13': 20, '14': 30, '15': 15, '16': 20, '17': 40, '18': 50, '19': 60, '20': 10, '21':9 },
  tuesday: { '11': 15, '12': 35, '13': 40, '14': 25, '15': 15, '16': 20, '17': 35, '18': 40, '19': 65, '20': 15, '21': 10 },
  wednesday: { '11': 20, '12': 45, '13': 50, '14': 30, '15': 20, '16': 25, '17': 45, '18': 70, '19': 75, '20': 60, '21': 15 },
  thursday: { '11': 25, '12': 50, '13': 55, '14': 35, '15': 20, '16': 30, '17': 50, '18': 75, '19': 80, '20': 65, '21': 5 },
  friday: { '11': 30, '12': 60, '13': 65, '14': 40, '15': 25, '16': 35, '17': 60, '18': 85, '19': 90, '20': 75, '21': 20 },
  saturday: { '11': 35, '12': 65, '13': 70, '14': 45, '15': 30, '16': 40, '17': 65, '18': 90, '19': 95, '20': 80, '21': 55 },
  sunday: { '11': 30, '12': 55, '13': 60, '14': 40, '15': 25, '16': 35, '17': 55, '18': 80, '19': 85, '20': 70, '21': 45 }
};

const calculateWaitTime = (day, hour) => {
  day = day.toLowerCase();
  hour = hour.toString();

  if (!customerData[day] || !customerData[day][hour]) {
      return { isOpen: false };
  }

  const currentCustomers = customerData[day][hour];
  const utilizationRate = currentCustomers / (20 * 4); // 20 tables * 4 seats
  let waitTime = Math.ceil(utilizationRate * 60); // 60 minutes base service time

  // Adjust for peak hours
  if ((hour >= '12' && hour <= '14') || (hour >= '18' && hour <= '20')) {
      waitTime *= 1.5;
  }

  return {
      isOpen: true,
      estimatedWait: Math.min(waitTime, 90) // Cap at 90 minutes
  };
};

function Home() {
  const [waitTime, setWaitTime] = useState(null);
  const [displayTime, setDisplayTime] = useState(0);

  // First useEffect to calculate the actual wait time
  useEffect(() => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentHour = now.getHours().toString();
    const result = calculateWaitTime(currentDay, currentHour);
    setWaitTime(result);
    
    // Reset display time whenever wait time updates
    setDisplayTime(0);
  }, []);

  // Second useEffect to handle the animation
  useEffect(() => {
    if (waitTime?.isOpen && waitTime.estimatedWait > 0) {
      const targetValue = waitTime.estimatedWait;
      const duration = 1500; // Animation duration in milliseconds
      const frameRate = 30; // Updates per second
      const totalFrames = duration * (frameRate / 1000);
      const increment = targetValue / totalFrames;
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        setDisplayTime(prev => {
          const newValue = Math.min(Math.round(increment * frame), targetValue);
          if (newValue >= targetValue) {
            clearInterval(timer);
          }
          return newValue;
        });
      }, 1000 / frameRate);

      return () => clearInterval(timer);
    }
  }, [waitTime]);

  // Third useEffect for periodic updates (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentHour = now.getHours().toString();
      const result = calculateWaitTime(currentDay, currentHour);
      setWaitTime(result);
      setDisplayTime(0); // Reset display time for new animation
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="logo-section">
        <img 
          src={restaurantLogo} 
          alt="SHH Restaurant Logo" 
          className="restaurant-logo"
        />
      </div>
      
      <h1 className="home-title">HOME</h1>

      <div className="wait-time-info">
        {waitTime && (
          <h2>
            {waitTime.isOpen
              ? `Current Wait: ${displayTime} minutes`
              : "Currently Closed"}
          </h2>
        )}
      </div>

      <div className="food-gallery">
        <h2 className="gallery-title">Our Signature Dishes</h2>
        <div className="photo-grid">
          {/* Replace these with your actual image paths */}
          <img src={food1} alt="food1" className="food-photo" width="350" height="350" />
          <img src={food2} alt="food2" className="food-photo" width="350" height="350" />
          <img src={food3} alt="food3" className="food-photo" width="350" height="350" />
          <img src={food4} alt="food4" className="food-photo" width="350" height="350" />
          <img src={food5} alt="food5" className="food-photo" width="350" height="350" />
          <img src={food6} alt="food6" className="food-photo" width="350" height="350" />
        </div>
      </div>
    </div>
  );
}

export default Home;