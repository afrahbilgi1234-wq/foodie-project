import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container text-center py-5">
        <h3>No favorite recipes yet</h3>
        <p className="text-muted">Save recipes you like and they'll show up here.</p>
        <Link to="/recipes" className="btn btn-danger mt-2">Browse Recipes</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Favorite Recipes</h2>
      <div className="row">
        {favorites.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
