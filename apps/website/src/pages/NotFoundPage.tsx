import { Link } from 'react-router-dom';
import { Arrow } from '../components/Arrow';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">// 404</p>
      <h1>THAT FISH SWAM AWAY.</h1>
      <p>The requested page is not in this part of the aquarium.</p>
      <Link className="button button--primary" to="/"><Arrow /> Return home</Link>
    </section>
  );
}
