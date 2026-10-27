import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import useMenu from "./context/useMenu.js";

export default function App() {
  const { menu, loading, error } = useMenu();
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const shared = { menu, loading, error, favourites, toggleFavourite };

  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<MenuPage {...shared} />} />
          <Route path="/item/:id" element={<ItemPage {...shared} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<p className="status">Page not found.</p>} />
        </Routes>
      </main>
      <footer className="footer">Campus Canteen · open 8 am to 6 pm</footer>
    </>
  );
}
