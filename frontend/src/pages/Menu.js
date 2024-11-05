// src/pages/Menu.js
import React from 'react';
import Header from '../components/Header';
import '../styles.css';

function Menu() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="menu-container">
        <h1 className="restaurant-name">La Dolce Vita</h1>

        <div className="menu-columns">
          <div className="menu-column">
            <section className="menu-section">
              <h2 className="section-header">ANTIPASTI</h2>
              <p className="section-subtitle">Appetizers</p>

              <div className="menu-item">
                <h3>Bruschetta al Pomodoro</h3>
                <p>Grilled artisan bread topped with fresh diced tomatoes, basil, garlic, and extra virgin olive oil.</p>
                <span className="price">$8</span>
              </div>

              <div className="menu-item">
                <h3>Caprese Salad</h3>
                <p>Vine-ripened tomatoes, fresh mozzarella, basil, and a drizzle of balsamic reduction.</p>
                <span className="price">$12</span>
              </div>

              <div className="menu-item">
                <h3>Calamari Fritti</h3>
                <p>Crispy golden fried calamari served with a side of marinara sauce and lemon wedges.</p>
                <span className="price">$14</span>
              </div>

              <div className="menu-item">
                <h3>Arancini</h3>
                <p>Crispy risotto balls stuffed with mozzarella, peas, and ragu, served with marinara sauce.</p>
                <span className="price">$10</span>
              </div>

            </section>

            <section className="menu-section">
              <h2 className="section-header">ZUPPE E INSALATE</h2>
              <p className="section-subtitle">Soups & Salads</p>

              <div className="menu-item">
                <h3>Zuppa Toscana</h3>
                <p>Hearty Tuscan soup with sausage, kale, and potatoes in a creamy broth.</p>
                <span className="price">$9</span>
              </div>

              <div className="menu-item">
                <h3>Pasta e Fagioli</h3>
                <p>Traditional Italian bean and pasta soup with a savory tomato base.</p>
                <span className="price">$8</span>
              </div>

              <div className="menu-item">
                <h3>Insalata Mista</h3>
                <p>Mixed greens, cherry tomatoes, cucumbers, and red onions, tossed in a light balsamic vinaigrette.</p>
                <span className="price">$9</span>
              </div>

              <div className="menu-item">
                <h3>Insalata Caesar</h3>
                <p>Romaine lettuce, Parmesan cheese, croutons, and Caesar dressing. Add grilled chicken for $4.</p>
                <span className="price">$10</span>
              </div>

            </section>

            <section className="menu-section">
              <h2 className="section-header">PASTA</h2>
              
              <div className="menu-item">
                <h3>Spaghetti Carbonara</h3>
                <p>Classic Roman pasta with pancetta, egg, Parmesan cheese, and freshly ground black pepper.</p>
                <span className="price">$18</span>
              </div>

              <div className="menu-item">
                <h3>Fettuccine Alfredo con Pollo</h3>
                <p>Fettuccine tossed in a rich, creamy Alfredo sauce with grilled chicken.</p>
                <span className="price">$19</span>
              </div>

              <div className="menu-item">
                <h3>Lasagna della Nonna</h3>
                <p>Layers of pasta, Bolognese sauce, ricotta, mozzarella, and Parmesan baked to perfection.</p>
                <span className="price">$20</span>
              </div>

              <div className="menu-item">
                <h3>Penne alla Vodka</h3>
                <p>Penne pasta in a creamy tomato vodka sauce, finished with fresh basil and Parmesan.</p>
                <span className="price">$17</span>
              </div>

              <div className="menu-item">
                <h3>Gnocchi al Pesto</h3>
                <p>Soft potato gnocchi tossed in house-made basil pesto, pine nuts, and Parmesan cheese.</p>
                <span className="price">$18</span>
              </div>

            </section>
          </div>

          <div className="menu-column">
            <section className="menu-section">
              <h2 className="section-header">PIZZA</h2>
              <p className="section-subtitle">Wood-Fired</p>

              <div className="menu-item">
                <h3>Margherita</h3>
                <p>Tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil.</p>
                <span className="price">$15</span>
              </div>

              <div className="menu-item">
                <h3>Quattro Stagioni</h3>
                <p>Artichokes, ham, mushrooms, and black olives on a classic tomato sauce base.</p>
                <span className="price">$18</span>
              </div>

              <div className="menu-item">
                <h3>Prosciutto e Rucola</h3>
                <p>Prosciutto di Parma, arugula, fresh mozzarella, and shaved Parmesan.</p>
                <span className="price">$19</span>
              </div>

              <div className="menu-item">
                <h3>Salsiccia e Cipolla</h3>
                <p>Italian sausage, caramelized onions, mozzarella, and tomato sauce.</p>
                <span className="price">$17</span>
              </div>

            </section>

            <section className="menu-section">
              <h2 className="section-header">SECONDI</h2>
              <p className="section-subtitle">Main Courses</p>

              <div className="menu-item">
                <h3>Pollo alla Parmigiana</h3>
                <p>Breaded chicken breast topped with marinara and melted mozzarella, served with a side of spaghetti.</p>
                <span className="price">$22</span>
              </div>

              <div className="menu-item">
                <h3>Saltimbocca alla Romana</h3>
                <p>Veal medallions with sage and prosciutto, sautéed in white wine sauce, served with roasted potatoes.</p>
                <span className="price">$24</span>
              </div>

              <div className="menu-item">
                <h3>Branzino al Limone</h3>
                <p>Pan-seared Mediterranean sea bass with lemon and caper sauce, served with grilled vegetables.</p>
                <span className="price">$26</span>
              </div>

              <div className="menu-item">
                <h3>Bistecca Fiorentina</h3>
                <p>Grilled T-bone steak, Tuscan style, served with rosemary potatoes and a side salad.</p>
                <span className="price">$32</span>
              </div>

            </section>

            <section className="menu-section">
              <h2 className="section-header">DOLCI</h2>
              <p className="section-subtitle">Desserts</p>

              <div className="menu-item">
                <h3>Tiramisu</h3>
                <p>Layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.</p>
                <span className="price">$8</span>
              </div>

              <div className="menu-item">
                <h3>Cannoli Siciliani</h3>
                <p>Crisp pastry shells filled with sweet ricotta cream and chocolate chips.</p>
                <span className="price">$7</span>
              </div>

              <div className="menu-item">
                <h3>Panna Cotta al Limone</h3>
                <p>Velvety lemon panna cotta served with a berry compote.</p>
                <span className="price">$9</span>
              </div>

              <div className="menu-item">
                <h3>Affogato al Caffè</h3>
                <p>Vanilla gelato "drowned" in a shot of hot espresso.</p>
                <span className="price">$6</span>
              </div>

            </section>

            <section className="menu-section">
              <h2 className="section-header">BEVANDE</h2>
              <p className="section-subtitle">Beverages</p>

              <div className="menu-item">
                <h3>Espresso</h3>
                <span className="price">$4</span>
              </div>

              <div className="menu-item">
                <h3>Cappuccino</h3>
                <span className="price">$5</span>
              </div>

              <div className="menu-item">
                <h3>Limonata Fresca</h3>
                <span className="price">$5</span>
              </div>

              <div className="menu-item">
                <h3>Acqua Minerale (Still or Sparkling)</h3>
                <span className="price">$3</span>
              </div>

              <div className="menu-item">
                <h3>House Red/White Wine (Glass)</h3>
                <span className="price">$8</span>
              </div>

            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;