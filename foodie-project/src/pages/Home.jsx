import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SkeletonGrid } from '../components/SkeletonCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function Home() {
  const [recipeOfDay, setRecipeOfDay] = useState(null);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TheMealDB's random endpoint returns ONE meal per call, so we
  // fire off several calls to build a small "featured" grid, and use
  // the first one as today's "Recipe of the Day" banner.
  const fetchRandomMeals = () => {
    setLoading(true);
    setError(null);

    const requests = Array.from({ length: 9 }, () =>
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    );

    Promise.all(requests)
      .then((responses) => {
        const meals = responses.map((res) => res.data.meals[0]);
        const unique = Array.from(new Map(meals.map((m) => [m.idMeal, m])).values());
        setRecipeOfDay(unique[0]);
        setRandomMeals(unique.slice(1));
      })
      .catch(() => setError('Could not load featured recipes.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  return (
    <div>
      <div className="hero-food text-white text-center py-5 mb-4">
        <h1 className="fw-bold">Discover Delicious Recipes</h1>
        <p className="lead">Search thousands of recipes from around the world.</p>
        <Link to="/recipes" className="btn btn-light btn-lg mt-2">
          Browse Recipes
        </Link>
      </div>

      <div className="container">
        {/* Recipe of the Day banner */}
        {!loading && recipeOfDay && (
          <div className="rotd-banner row g-0 mb-5">
            <div className="col-md-5">
              <img src={recipeOfDay.strMealThumb} alt={recipeOfDay.strMeal} />
            </div>
            <div className="col-md-7 p-4 d-flex flex-column justify-content-center">
              <span className="badge bg-warning text-dark mb-2" style={{ width: 'fit-content' }}>
                ⭐ Recipe of the Day
              </span>
              <h3>{recipeOfDay.strMeal}</h3>
              <p className="text-light">
                {recipeOfDay.strCategory} {recipeOfDay.strArea && `• ${recipeOfDay.strArea} cuisine`}
              </p>
              <Link to={`/recipes/${recipeOfDay.idMeal}`} className="btn btn-warning mt-2" style={{ width: 'fit-content' }}>
                View Recipe
              </Link>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Today's Picks</h3>
          <button className="btn btn-sm btn-outline-danger" onClick={fetchRandomMeals}>
            🔀 Shuffle
          </button>
        </div>

        {loading && <SkeletonGrid count={8} />}
        {error && <ErrorMessage message={error} onRetry={fetchRandomMeals} />}

        {!loading && !error && (
          <div className="row">
            {randomMeals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
