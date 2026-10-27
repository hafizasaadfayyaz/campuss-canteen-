import { useState } from "react";
import MenuList from "../components/MenuList.jsx";

export default function MenuPage({ menu, loading, error, favourites, toggleFavourite }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyFavs, setOnlyFavs] = useState(false);

  if (loading) return <p className="status" role="status">Loading today’s menu…</p>;
  if (error) return <p className="status error" role="alert">Could not load the menu: {error}. Refresh to try again.</p>;

  const categories = ["All", ...new Set(menu.map((i) => i.category))];
  const visible = menu.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      i.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!onlyFavs || favourites.includes(i.id))
  );

  return (
    <section aria-labelledby="menu-title">
      <h1 id="menu-title">Today’s menu</h1>
      <div className="controls">
        <input
          type="search"
          placeholder="Search food or drinks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the menu"
        />
        <label className="check">
          <input type="checkbox" checked={onlyFavs} onChange={(e) => setOnlyFavs(e.target.checked)} />
          Favourites only
        </label>
      </div>
      <div className="chips" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${c === category ? "active" : ""}`}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <MenuList items={visible} favourites={favourites} onToggleFavourite={toggleFavourite} />
    </section>
  );
}
