import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function Navbar() {
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 sticky-top" style={{ backgroundColor: 'var(--navbar-bg)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🍔 FoodieHub</Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ingredient-search">What Can I Cook?</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/meal-plan">Meal Plan</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>

          <button
            className="btn btn-outline-light me-2"
            onClick={toggleTheme}
            title="Toggle dark mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <NavLink to="/favorites" className="btn btn-outline-light">
            ❤️ Favorites ({favorites.length})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
