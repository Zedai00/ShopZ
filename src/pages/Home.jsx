import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import "../styles/Home.css";

const Home = () => {
  const [, , products, , geo] = useOutletContext();
  const featured = products.slice(0, 6);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to ShopZ 🛍️</h1>
        <p>Your one-stop shop for quality products at great prices.</p>
        <Link to="/shop" className="cta-button">Shop Now</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>🚚 Fast Delivery</h2>
          <p>Get your orders delivered in record time!</p>
        </div>
        <div className="feature-card">
          <h2>✅ Quality Products</h2>
          <p>Top-rated items with great reviews and value.</p>
        </div>
        <div className="feature-card">
          <h2>🔒 Secure Payments</h2>
          <p>Checkout with full confidence and data safety.</p>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="card-grid">
          {featured.map(item => (
            <Card key={item.id} item={item} geo={geo} />
          ))}
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          ShopZ is a student-built e-commerce site focused on delivering a fast,
          simple, and secure shopping experience — made with React ❤️.
        </p>
      </section>

      <footer className="footer">
        <p>📞 Contact us at <a href="mailto:support@shopz.com">support@shopz.com</a></p>
        <p>© 2025 ShopZ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

