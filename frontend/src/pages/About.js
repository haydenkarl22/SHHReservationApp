// src/pages/About.js
import React from 'react';
import Header from '../components/Header';
import '../styles.css';
import logo from '../img/SHHRestaurantLogo.jpg'

function About() {
  return (
    <div className="page-wrapper">

      <div className="about-container">
        <div className="logo-container">
          <img src={logo} alt="La Dolce Vita Logo" className="restaurant-logo" />
        </div>

        <section className="about-section">
          <h2 className="section-title">ABOUT</h2>
          <p>
            La Dolce Vita was founded in 1987 by the Bellucci family, who brought their love for traditional Italian cooking from their hometown in Tuscany to the heart of the city. Originally a small trattoria, the restaurant quickly gained a loyal following for its authentic dishes, handcrafted pastas, and wood-fired pizzas. Over the years, La Dolce Vita has grown into a beloved local institution, known for its warm, rustic ambiance and dedication to using fresh, locally sourced ingredients alongside imported Italian specialties. Today, the restaurant continues to honor its roots while introducing modern Italian flavors to a new generation of diners.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">HOURS</h2>
          <div className="hours-grid">
            <div className="hours-row">
              <span className="day">Monday:</span>
              <span className="time">11 am - 9 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Tuesday:</span>
              <span className="time">11 am - 9 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Wednesday:</span>
              <span className="time">11 am - 9 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Thursday:</span>
              <span className="time">11 am - 9 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Friday:</span>
              <span className="time">11 am - 10 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Saturday:</span>
              <span className="time">11 am - 10 pm</span>
            </div>
            <div className="hours-row">
              <span className="day">Sunday:</span>
              <span className="time">11 am - 10 pm</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">AWARDS</h2>
          <div className="awards-list">
            <div className="award-item">
              <h3>Best Wood-Fired Pizza in the City</h3>
              <p className="award-source">Culinary Critics Circle, 2022</p>
              <p>Awarded for the restaurant's dedication to authentic, wood-fired pizza that captures the true flavors of Italy.</p>
            </div>
            <div className="award-item">
              <h3>Top 10 Romantic Dining Spots</h3>
              <p className="award-source">City Life Magazine, 2021</p>
              <p>Recognized for its warm, intimate atmosphere, perfect for couples looking to enjoy an unforgettable Italian meal.</p>
            </div>
            <div className="award-item">
              <h3>Best Family-Owned Restaurant</h3>
              <p className="award-source">Local Eats Awards, 2020</p>
              <p>Honoring the Bellucci family's commitment to serving fresh, homemade Italian dishes passed down through generations.</p>
            </div>
            <div className="award-item">
              <h3>Outstanding Pasta Dish – Spaghetti Carbonara</h3>
              <p className="award-source">Pasta Lovers Expo, 2019</p>
              <p>Praised for its perfectly balanced blend of traditional ingredients and rich flavors in the iconic Roman dish.</p>
            </div>
            <div className="award-item">
              <h3>Best Italian Restaurant – Neighborhood Choice Awards</h3>
              <p className="award-source">2023</p>
              <p>Chosen by local residents for its consistent quality, welcoming ambiance, and exceptional service.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">CONTACT INFO</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> ladolce@gmail.com</p>
            <p><strong>Phone:</strong> 314-555-5456</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;