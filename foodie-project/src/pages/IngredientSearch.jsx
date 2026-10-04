import { useState } from 'react';
import axios from 'axios';
import { SkeletonGrid } from '../components/SkeletonCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function IngredientSearch() {
  const [ingredientsInput, setIngredientsInput] = useState('chicken, garlic');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const ingredients = ingredientsInput
      .split(',')
      .map((i) => i.trim().toLowerCase().replace(/\s+/g, '_'))
      .filter(Boolean);

    if (ingredients.length === 0) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      // TheMealDB's free tier only filters by ONE ingredient per call,
      // so we call it once per ingredient, then intersect the results
      // client-side to find recipes containing ALL of them.
      const requests = ingredients.map((ing) =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
      );
      const responses = await Promise.all(requests);
      const resultSets = responses.map((res) => res.data.meals || []);

      if (resultSets.some((set) => set.length === 0)) {
        setMeals([]);
      } else {
        // Intersect by idMeal across all result sets
        const [first, ...rest] = resultSets;
        const intersected = first.filter((meal) =>
          rest.every((set) => set.some((m) => m.idMeal === meal.idMeal))
        );
        setMeals(intersected);
      }
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-2">What Can I Cook?</h2>
      <p className="text-muted">
        Enter ingredients you have (comma-separated) and we'll find recipes using ALL of them.
      </p>

      <form onSubmit={handleSearch} className="row g-2 mb-4">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. chicken, garlic, lemon"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-danger w-100">
            Find Recipes
          </button>
        </div>
      </form>

      {loading && <SkeletonGrid count={4} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && searched && meals.length === 0 && (
        <p className="text-muted">
          No recipes found with all of these ingredients together. Try fewer or different ingredients.
        </p>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="row">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default IngredientSearch;
