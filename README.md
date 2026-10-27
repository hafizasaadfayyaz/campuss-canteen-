# Campus Canteen Menu (React)

## Run
```
npm install
npm run dev
```
Open the URL shown (usually http://localhost:5173).

## Structure
- `public/menu.json` – menu data (fetched at runtime, not typed in the page)
- `src/context/CartContext.jsx` – cart state shared via Context (count + total)
- `src/context/useMenu.js` – `useEffect` + `fetch` + `async/await`, loading and error state
- `src/components/` – `Header`, `MenuList`, `ItemCard`, `Cart`
- `src/pages/` – `MenuPage`, `ItemPage`, `CartPage` (React Router)

## Features
Search + category filter + favourites filter, favourite toggle, item details with quantity,
cart with +/- and remove, header cart count always in sync, responsive (phone / tablet / desktop).
