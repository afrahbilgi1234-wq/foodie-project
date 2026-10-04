import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { RatingsProvider } from './context/RatingsContext.jsx';
import { MealPlanProvider } from './context/MealPlanContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Recipes from './pages/Recipes.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import IngredientSearch from './pages/IngredientSearch.jsx';
import MealPlan from './pages/MealPlan.jsx';
import About from './pages/About.jsx';

function NotFound() {
  return (
    <div className="container text-center py-5">
      <h2>404 — Page Not Found</h2>
      <p className="text-muted">The recipe or page you're looking for doesn't exist.</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RatingsProvider>
          <MealPlanProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/ingredient-search" element={<IngredientSearch />} />
                <Route path="/meal-plan" element={<MealPlan />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </MealPlanProvider>
        </RatingsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
