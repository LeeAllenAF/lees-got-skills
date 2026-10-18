import { PageIntro } from '../components/PageIntro';
import './AboutPage.css';

const values = [
  ['✦', 'Curiosity first', 'Ask questions, explore ideas, and embrace the weird.'],
  ['>_', 'Deterministic by default', 'Prefer practical, inspectable solutions whenever possible.'],
  ['⌾', 'Security & responsibility', 'Build with intent, validate what matters, and be transparent.'],
  ['↗', 'Real-world focus', 'Make tools that solve actual problems and can be used today.'],
] as const;

export function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="THE HUMAN BEHIND THE KEYBOARD.">
        <p>I’m Lee—a developer, problem solver, and perpetual tinkerer. Lee’s Got Skills is my personal lab for exploring agentic development, building useful tools, and documenting the journey.</p>
      </PageIntro>
      <section aria-labelledby="values-title">
        <h2 className="sr-only" id="values-title">Working values</h2>
        <ul className="about-grid">
          {values.map(([icon, title, description]) => (
            <li key={title}>
              <article className="value-card">
                <span aria-hidden="true">{icon}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section className="about-note" aria-label="Site independence">
        <p>Lee’s Got Skills is an independent developer workshop. It flies the AlienFish flag and links to the related <a href="https://github.com/AlienFish">AlienFish GitHub organization</a>, but this site does not claim to be owned by AlienFish.</p>
      </section>
    </>
  );
}
