import { useEffect, useState } from "react";

// Loads menu.json once; returns { menu, loading, error }
export default function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/menu.json");
        if (!res.ok) throw new Error(`Server replied ${res.status}`);
        const data = await res.json();
        if (!cancelled) setMenu(data.items);
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load the menu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { menu, loading, error };
}
