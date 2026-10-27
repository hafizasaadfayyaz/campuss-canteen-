import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="header">
      <Link to="/" className="brand">Campus Canteen</Link>
      <nav className="nav" aria-label="Main">
        <NavLink to="/" end>Menu</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart <span className="badge" aria-label={`${count} items in cart`}>{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}
