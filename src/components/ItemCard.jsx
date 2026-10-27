import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ItemCard({ item, isFavourite, onToggleFavourite }) {
  const { addItem } = useCart();
  return (
    <article className="card">
      <button
        className={`fav ${isFavourite ? "on" : ""}`}
        onClick={() => onToggleFavourite(item.id)}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
      >
        {isFavourite ? "♥" : "♡"}
      </button>
      <Link to={`/item/${item.id}`} className="card-link">
        <div className="emoji" aria-hidden="true">{item.emoji}</div>
        <h3>{item.name}</h3>
        <p className="muted">{item.category}</p>
      </Link>
      <div className="card-foot">
        <strong>Rs. {item.price}</strong>
        <button className="btn" onClick={() => addItem(item)}>Add to cart</button>
      </div>
    </article>
  );
}
