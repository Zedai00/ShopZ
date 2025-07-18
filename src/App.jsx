import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]);
  const [geo, setGeo] = useState({ currencySymbol: "$" });


  useEffect(() => {
    const fetchGeoAndProducts = async () => {
      try {
        const [geoRes, productsRes] = await Promise.all([
          fetch("https://ipwhois.app/json/"),
          fetch("https://fakestoreapi.com/products"),
        ]);

        const geoData = await geoRes.json();
        const productsData = await productsRes.json();

        setGeo({
          currencySymbol: geoData.currency_symbol || "$",
        });

        setProducts(
          productsData.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            price: item.price,
          })),
        );
      } catch {
        setGeo({ currencySymbol: "$" });
      }
    };

    fetchGeoAndProducts();
  }, []);

  return (
    <>
      <Nav cart={cartItems} />
      <Outlet context={[cartItems, setCartItems, products, setProducts, geo]} />
    </>
  );

};

export default App;
