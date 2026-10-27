import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ItemPage({ menu, loading, error, favourites, toggleFavourite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) return <p className="status" role="status">Loading item…</p>;
  if (error) return <p className="status error" role="alert">Could not load the menu: {error}</p>;

  const item = menu.find((i) => String(i.id) === id);
  if (!item) {
    return (
      <div className="status">
        <p>This item is not on today’s menu.</p>
        <Link to="/" className="btn">Back to menu</Link>
      </div>
    );
  }

  const fav = favourites.includes(item.id);
  const handleAdd = () => {
    addItem(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="detail">
      <button className="link-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-body">
        <div className="emoji xl" aria-hidden="true">{item.emoji}</div>
        <div>
          <h1>{item.name}</h1>
          <p className="muted">{item.category}</p>
          <p>{item.description}</p>
          <p className="price">Rs. {item.price}</p>
          <div className="qty big">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
          </div>
          <div className="actions left">
            <button className="btn" onClick={handleAdd}>
              {added ? "Added ✓" : `Add ${qty} to cart · Rs. ${item.price * qty}`}
            </button>
            <button className="btn ghost" onClick={() => toggleFavourite(item.id)} aria-pressed={fav}>
              {fav ? "♥ Saved" : "♡ Save"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
