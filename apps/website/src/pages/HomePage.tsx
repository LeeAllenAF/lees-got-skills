import { Link } from 'react-router-dom';
import { Arrow } from '../components/Arrow';
import { FishArtwork } from '../components/FishArtwork';
import './HomePage.css';

const homeCards = [
  { icon: '</>', title: 'Agent Skills', text: 'Small, useful, and built to travel.', to: '/skills' },
  { icon: '▤', title: 'The Blog', text: 'Experiments, mistakes, victories.', to: '/blog' },
  { icon: '◉', title: 'About Me', text: 'The human behind the keyboard.', to: '/about' },
] as const;

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            <span>GOOD SKILLS.</span>
            <span>BAD PUNS.</span>
            <span>BETTER SOFTWARE.</span>
          </h1>
          <p className="hero-intro">
            A collection of portable agent skills, engineering experiments, and notes from the command line.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/skills"><Arrow /> Explore Skills</Link>
            <Link className="button" to="/blog"><Arrow /> Read the Blog</Link>
          </div>
        </div>
        <FishArtwork />
      </section>
      <section aria-labelledby="explore-title">
        <h2 className="sr-only" id="explore-title">Explore the site</h2>
        <ul className="home-cards">
          {homeCards.map((card) => (
            <li key={card.title}>
              <Link className="home-card" to={card.to}>
                <span className="card-icon" aria-hidden="true">{card.icon}</span>
                <span>
                  <strong>{card.title}</strong>
                  <small>{card.text}</small>
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
