# FoodieHub — Recipe Discovery App (FEDL Mini Project)

A complete, working React SPA for browsing and saving recipes, using the
**free TheMealDB API** (https://www.themealdb.com/api.php) — no API key,
no backend needed.

## Features (mapped to CO1–CO5)
- Functional components + JSX (Navbar, Footer, RecipeCard, Loader, ErrorMessage, StarRating, SkeletonCard)
- Component composition & props (with PropTypes validation)
- `useState` for search, category filters, favorites, ratings, meal plan
- Conditional rendering (loading / error / empty states)
- Rendering lists with keys (recipe grids, ingredient lists, reviews, meal plan days)
- `useEffect` for API calls, re-fetching on route param change, persisting to localStorage
- React Router: Home, Recipes (search/filter), Recipe Details (dynamic `:id`), Favorites,
  Ingredient Search, Meal Plan, About
- REST API integration via Axios (search by name, filter by category/ingredient, get by id, random)
- Global state via React Context (`FavoritesContext`, `ThemeContext`, `RatingsContext`, `MealPlanContext`) + localStorage persistence
- Responsive UI built with Bootstrap 5

## Extra features added
- **🌙 Dark mode** — toggle in the navbar, persisted across sessions, implemented via CSS variables + a `data-theme` attribute on `<html>`.
- **⭐ Ratings & reviews** — rate any recipe 1–5 stars and leave a comment; stored locally per recipe, shows a live average.
- **🥕 "What Can I Cook?"** — enter ingredients you have; the app calls TheMealDB's filter-by-ingredient endpoint once per ingredient and shows recipes containing ALL of them (client-side intersection, since the free API only filters by one ingredient per call).
- **📅 Weekly Meal Plan** — assign any recipe to a day of the week from its detail page; view/manage the whole week on the Meal Plan page.
- **💫 Skeleton loading** — animated placeholder cards while data is fetching, instead of a plain spinner.
- **🎬 Card animations** — recipe cards fade/slide in on load and lift on hover.
- **🌟 Recipe of the Day** — a featured banner on the Home page, refreshed with the "Shuffle" button.

## How to run
```bash
npm install
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## Project structure
```
src/
├── components/   Navbar, Footer, Loader, ErrorMessage, RecipeCard,
│                 StarRating, SkeletonCard
├── context/      FavoritesContext, ThemeContext, RatingsContext, MealPlanContext
├── pages/        Home, Recipes, RecipeDetails, Favorites,
│                 IngredientSearch, MealPlan, About
├── App.jsx        routes + provider tree
├── main.jsx        entry point
└── index.css       includes dark-mode variables, skeleton shimmer, animations
```

## Viva talking points
- TheMealDB endpoints used: `random.php`, `search.php?s=`, `filter.php?c=`,
  `list.php?c=list`, `lookup.php?i=`.
- Why favorites are stored in `localStorage` (persist across page reloads)
  in addition to React state.
- How `useEffect`'s `[id]` dependency refetches recipe details whenever
  the URL changes.
- How ingredients are reconstructed from TheMealDB's flat
  `strIngredient1..20` / `strMeasure1..20` fields into a list.
