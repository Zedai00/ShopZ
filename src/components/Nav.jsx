import { Link } from "react-router-dom";
import '../styles/Nav.css';

const Nav = ({ cart }) => {
  return (
    <header className="navbar">
      <h1><Link to="/">ShopZ</Link></h1>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart" className="cart-link">
          🛒
          <span className="cart-count">{cart.length}</span>
        </Link>
      </nav>
    </header >
  );
};

export default Nav;

