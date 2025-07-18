import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems, , , geo] = useOutletContext();

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start adding items to see them here.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <Card key={item.id} item={item} variant="cart" onRemove={handleRemove} geo={geo} />
          ))}
        </div>
        <div className="cart-sidebar">
          <h3>Cart Summary</h3>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Amount: {geo.currencySymbol}{total.toFixed(2)}</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

