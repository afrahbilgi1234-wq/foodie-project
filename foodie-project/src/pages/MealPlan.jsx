import { Link } from 'react-router-dom';
import { useMealPlan, DAYS } from '../context/MealPlanContext.jsx';

function MealPlan() {
  const { plan, clearDay } = useMealPlan();

  return (
    <div className="container py-4">
      <h2 className="mb-2">Weekly Meal Plan</h2>
      <p className="text-muted">
        Open any recipe and click "Add to Meal Plan" to assign it to a day.
      </p>

      <div className="row">
        {DAYS.map((day) => {
          const meal = plan[day];
          return (
            <div key={day} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header fw-bold">{day}</div>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  {meal ? (
                    <>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <Link to={`/recipes/${meal.idMeal}`} className="mt-2 text-center">
                        {meal.strMeal}
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => clearDay(day)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p className="text-muted mb-0">No meal planned</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MealPlan;
