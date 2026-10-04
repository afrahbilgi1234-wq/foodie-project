import { createContext, useContext, useState, useEffect } from 'react';

const RatingsContext = createContext();

// Shape stored in localStorage: { [mealId]: [{ id, rating, text, date }] }
export function RatingsProvider({ children }) {
  const [reviewsByMeal, setReviewsByMeal] = useState(() => {
    try {
      const stored = localStorage.getItem('foodiehub_reviews');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('foodiehub_reviews', JSON.stringify(reviewsByMeal));
  }, [reviewsByMeal]);

  const addReview = (mealId, rating, text) => {
    const newReview = { id: Date.now(), rating, text, date: new Date().toLocaleDateString() };
    setReviewsByMeal((prev) => ({
      ...prev,
      [mealId]: [...(prev[mealId] || []), newReview],
    }));
  };

  const getReviews = (mealId) => reviewsByMeal[mealId] || [];

  const getAverageRating = (mealId) => {
    const reviews = reviewsByMeal[mealId] || [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  };

  return (
    <RatingsContext.Provider value={{ addReview, getReviews, getAverageRating }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatings() {
  return useContext(RatingsContext);
}
