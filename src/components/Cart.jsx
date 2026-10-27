import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { lines, total, count, changeQty, removeItem, clearCart } = useCart();

  if (count === 0) {
    return (
      <div className="status">
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Browse the menu</Link>
      </div>
    );
  }

  return (
    <section aria-labelledby="cart-title">
      <h2 id="cart-title">Your order</h2>
      <ul className="cart-list">
        {lines.map(({ item, qty }) => (
          <li key={item.id} className="cart-row">
            <span className="emoji sm" aria-hidden="true">{item.emoji}</span>
            <div className="cart-info">
              <strong>{item.name}</strong>
              <span className="muted">Rs. {item.price} each</span>
            </div>
            <div className="qty">
              <button onClick={() => changeQty(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
              <span>{qty}</span>
              <button onClick={() => changeQty(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
            </div>
            <strong className="line-total">Rs. {item.price * qty}</strong>
            <button className="link-btn" onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-bar">
        <span>Total ({count} items)</span>
        <strong>Rs. {total}</strong>
      </div>
      <div className="actions">
        <button className="btn ghost" onClick={clearCart}>Clear cart</button>
        <button className="btn" onClick={() => { alert("Order placed! (demo)"); clearCart(); }}>
          Place order
        </button>
      </div>
    </section>
  );
}
