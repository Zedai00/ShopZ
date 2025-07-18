import Card from "../components/Card";
import "../styles/Shop.css";
import { useOutletContext } from "react-router-dom";

const Shop = () => {
  const [cartItems, setCartItems, products, , geo] = useOutletContext();

  const onAdd = (item, quantity) => {
    const existingItem = cartItems.find(p => p.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(p =>
        p.id === item.id ? { ...p, qty: p.qty + quantity } : p,
      ));
    } else {
      setCartItems([...cartItems, { ...item, qty: quantity }]);
    }
  };

  return (
    <section className="shop">
      {products.map(item => (
        <Card key={item.id} variant="shop" item={item} onAdd={onAdd} geo={geo} />
      ))}
    </section>
  );
};

export default Shop;

