import { useState, useEffect } from 'react';
import axios from 'axios';
import { SkeletonGrid } from '../components/SkeletonCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function Recipes() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('Chicken'); // default search so the page isn't empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of categories once, on mount
  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => setCategories(res.data.meals))
      .catch(() => {
        /* categories are non-critical; fail silently */
      });
  }, []);

  const searchByName = (term) => {
    setLoading(true);
    setError(null);
    setSelectedCategory('');
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => setMeals(res.data.meals || []))
      .catch(() => setError('Search failed. Please try again.'))
      .finally(() => setLoading(false));
  };

  const filterByCategory = (category) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => setMeals(res.data.meals || []))
      .catch(() => setError('Could not load this category.'))
      .finally(() => setLoading(false));
  };

  // Initial load: search for the default term
  useEffect(() => {
    searchByName(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) searchByName(searchTerm.trim());
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Browse Recipes</h2>

      <form onSubmit={handleSearchSubmit} className="row g-2 mb-3">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes by name (e.g. pasta, chicken, cake)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
          >
            <option value="">Filter by category...</option>
            {categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-danger w-100">
            Search
          </button>
        </div>
      </form>

      {loading && <SkeletonGrid count={8} />}
      {error && <ErrorMessage message={error} onRetry={() => searchByName(searchTerm)} />}

      {!loading && !error && meals.length === 0 && (
        <p className="text-muted">No recipes found. Try a different search.</p>
      )}

      {!loading && !error && (
        <div className="row">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
