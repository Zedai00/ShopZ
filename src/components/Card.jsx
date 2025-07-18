import { useState } from "react";
import "../styles/Card.css";

const Card = ({ item, onAdd, onRemove, variant, geo }) => {
  const [qty, setQty] = useState(item.qty || 1);

  const increment = () => setQty(prev => prev + 1);
  const decrement = () => setQty(prev => (prev > 1 ? prev - 1 : 1));

  const handleQty = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
      setQty(val);
    } else if (e.target.value === "") {
      setQty("");
    }
  };

  const handleAdd = () => {
    const quantity = parseInt(qty);
    if (!isNaN(quantity) && quantity >= 1) {
      onAdd(item, quantity);
      setQty(1);
    }
  };

  return (
    <div className="card">
      <img src={item.image} alt={item.title} className="product-img" />
      <div className="card-content">
        <h2 className="card-title">{item.title}</h2>
        <div className="bottom-group">
          <div className="card-price">{geo.currencySymbol}
            {item.price.toFixed(2)}</div>

          {variant === "shop" && (
            <>
              <div className="quantity-control">
                <button onClick={decrement}>-</button>
                <input
                  type="number"
                  value={qty}
                  onChange={handleQty}
                  min="1"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <button onClick={increment}>+</button>
              </div>
              <button onClick={handleAdd}>Add to Cart</button>
            </>
          )}

          {variant === "cart" && (
            <div className="cart-extras">
              <p className="cart-qty">Qty: {item.qty}</p>
              <p className="cart-total">Total: {geo.currencySymbol}{(item.price * item.qty).toFixed(2)}</p>
              {onRemove && (
                <button className="remove-btn" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Card;

