
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Every Story Deserves a Voice</h1>
        <p>
          Welcome to Rawi, a platform connecting authors,
          narrators, and listeners to bring stories to life.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Discover Rawi</h2>

        <div className="feature-cards">
          <div className="feature-card">
            <h3>For Authors</h3>
            <p>
              Upload your books, find narrators, and
              turn your stories into audiobooks.
            </p>
          </div>

          <div className="feature-card">
            <h3>For Narrators</h3>
            <p>
              Explore books, submit auditions, and
              share your voice with the world.
            </p>
          </div>

          <div className="feature-card">
            <h3>For Listeners</h3>
            <p>
              Discover audiobooks and enjoy
              listening to your favorite stories.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
