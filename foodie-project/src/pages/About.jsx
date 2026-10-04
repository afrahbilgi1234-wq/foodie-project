function About() {
  return (
    <div className="container py-5">
      <h2>About FoodieHub</h2>
      <p className="mt-3">
        FoodieHub is a recipe discovery app built for the Front End Development
        Lab (FEDL) course. It showcases functional components, JSX, props,
        the <code>useState</code> and <code>useEffect</code> hooks, React Router
        for navigation, and REST API integration using Axios against the free{' '}
        <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">
          TheMealDB API
        </a>.
      </p>
      <p>Built with React + Vite + React Router + Bootstrap.</p>
    </div>
  );
}

export default About;
