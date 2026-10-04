import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Initialize from localStorage so favorites persist across refreshes
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('foodiehub_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Whenever favorites changes, save it back to localStorage
  useEffect(() => {
    localStorage.setItem('foodiehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((r) => r.idMeal === id);

  const toggleFavorite = (meal) => {
    setFavorites((prev) =>
      prev.some((r) => r.idMeal === meal.idMeal)
        ? prev.filter((r) => r.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
