import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import StarRating from '../components/StarRating.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useRatings } from '../context/RatingsContext.jsx';
import { useMealPlan, DAYS } from '../context/MealPlanContext.jsx';

function RecipeDetails() {
  const { id } = useParams(); // dynamic route param
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addReview, getReviews, getAverageRating } = useRatings();
  const { assignMeal } = useMealPlan();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [planMsg, setPlanMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        const data = res.data.meals ? res.data.meals[0] : null;
        if (!data) throw new Error('not found');
        setMeal(data);
      })
      .catch(() => setError('Recipe not found.'))
      .finally(() => setLoading(false));
  }, [id]); // re-fetch whenever the :id in the URL changes

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!meal) return null;

  // TheMealDB stores ingredients as strIngredient1..20 / strMeasure1..20
  // fields instead of an array, so we build the list ourselves.
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ id: i, name: ing, measure });
    }
  }

  const fav = isFavorite(meal.idMeal);
  const reviews = getReviews(meal.idMeal);
  const avgRating = getAverageRating(meal.idMeal);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0) return;
    addReview(meal.idMeal, newRating, newReviewText.trim());
    setNewRating(0);
    setNewReviewText('');
  };

  const handleAddToPlan = () => {
    assignMeal(selectedDay, meal);
    setPlanMsg(`Added to ${selectedDay}!`);
    setTimeout(() => setPlanMsg(''), 2000);
  };

  return (
    <div className="container py-4">
      <Link to="/recipes" className="btn btn-link ps-0">&larr; Back to Recipes</Link>

      <div className="row mt-3">
        <div className="col-md-5 text-center">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h2>{meal.strMeal}</h2>
          <p className="text-muted">
            {meal.strCategory} {meal.strArea && `• ${meal.strArea} cuisine`}
          </p>

          <div className="d-flex align-items-center mb-3">
            <StarRating value={avgRating} />
            <span className="ms-2 text-muted">
              {reviews.length > 0 ? `${avgRating.toFixed(1)} (${reviews.length} review${reviews.length > 1 ? 's' : ''})` : 'No reviews yet'}
            </span>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <button
              className={`btn ${fav ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => toggleFavorite(meal)}
            >
              {fav ? '❤️ Saved to Favorites' : '🤍 Save Recipe'}
            </button>

            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn btn-outline-dark">
                ▶ Watch on YouTube
              </a>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 mb-2">
            <select
              className="form-select form-select-sm"
              style={{ width: 'auto' }}
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button className="btn btn-sm btn-outline-primary" onClick={handleAddToPlan}>
              📅 Add to Meal Plan
            </button>
            {planMsg && <span className="text-success small">{planMsg}</span>}
          </div>

          <h5 className="mt-4">Ingredients</h5>
          <ul>
            {ingredients.map((item) => (
              <li key={item.id}>
                {item.measure} {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h5>Instructions</h5>
        <p style={{ whiteSpace: 'pre-line' }}>{meal.strInstructions}</p>
      </div>

      <div className="mt-4">
        <h5>Reviews</h5>

        {reviews.length === 0 && <p className="text-muted">Be the first to review this recipe.</p>}

        {reviews.map((r) => (
          <div key={r.id} className="border-bottom py-2">
            <StarRating value={r.rating} />
            <span className="text-muted small ms-2">{r.date}</span>
            {r.text && <p className="mb-0 mt-1">{r.text}</p>}
          </div>
        ))}

        <form onSubmit={handleReviewSubmit} className="mt-3">
          <label className="form-label d-block">Your rating</label>
          <StarRating value={newRating} interactive onChange={setNewRating} />
          <textarea
            className="form-control mt-2"
            rows="2"
            placeholder="Write a review (optional)..."
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <button type="submit" className="btn btn-danger btn-sm mt-2" disabled={newRating === 0}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecipeDetails;
