import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// cart shape: { [itemId]: { item, qty } }
export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addItem = (item, qty = 1) =>
    setCart((prev) => ({
      ...prev,
      [item.id]: { item, qty: (prev[item.id]?.qty || 0) + qty },
    }));

  const changeQty = (id, delta) =>
    setCart((prev) => {
      const entry = prev[id];
      if (!entry) return prev;
      const qty = entry.qty + delta;
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = { ...entry, qty };
      return next;
    });

  const removeItem = (id) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const clearCart = () => setCart({});

  const lines = Object.values(cart);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.qty * l.item.price, 0);

  return (
    <CartContext.Provider
      value={{ lines, count, total, addItem, changeQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
