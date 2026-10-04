import { createContext, useContext, useState, useEffect } from 'react';

const MealPlanContext = createContext();

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Shape: { Monday: meal|null, Tuesday: meal|null, ... }
export function MealPlanProvider({ children }) {
  const [plan, setPlan] = useState(() => {
    try {
      const stored = localStorage.getItem('foodiehub_mealplan');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('foodiehub_mealplan', JSON.stringify(plan));
  }, [plan]);

  const assignMeal = (day, meal) => {
    setPlan((prev) => ({ ...prev, [day]: meal }));
  };

  const clearDay = (day) => {
    setPlan((prev) => {
      const updated = { ...prev };
      delete updated[day];
      return updated;
    });
  };

  return (
    <MealPlanContext.Provider value={{ plan, assignMeal, clearDay }}>
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  return useContext(MealPlanContext);
}
