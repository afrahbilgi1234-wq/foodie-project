import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/FavoritesContext.jsx';

function RecipeCard({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(meal.idMeal);

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card recipe-card h-100 shadow-sm">
        <Link to={`/recipes/${meal.idMeal}`}>
          <img src={meal.strMealThumb} className="recipe-img w-100" alt={meal.strMeal} />
        </Link>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate" title={meal.strMeal}>
            {meal.strMeal}
          </h6>
          {meal.strCategory && (
            <p className="text-muted small text-capitalize mb-2">{meal.strCategory}</p>
          )}
          <button
            className={`btn mt-auto ${fav ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => toggleFavorite(meal)}
          >
            {fav ? '❤️ Saved' : '🤍 Save Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
