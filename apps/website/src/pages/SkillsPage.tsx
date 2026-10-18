import { Arrow } from '../components/Arrow';
import { PageIntro } from '../components/PageIntro';
import { skills } from '../data/skills';
import { formatCount } from '../formatters';
import './SkillsPage.css';

export function SkillsPage() {
  return (
    <>
      <PageIntro eyebrow="SKILLS" title="INDEPENDENTLY PACKAGED. BUILT TO TRAVEL.">
        <p>A small catalog of portable agent skills and developer tools. Source remains proprietary; only officially released artifacts are free to use under their release terms.</p>
      </PageIntro>
      <section className="content-section" aria-labelledby="skill-catalog-title">
        <div className="section-heading">
          <h2 id="skill-catalog-title">Skill catalog</h2>
          <span>{formatCount(skills.length, 'entry', 'entries')}</span>
        </div>
        {skills.length === 0 ? (
          <p className="empty-state">No skills are currently available. Released artifacts will appear here when they are ready.</p>
        ) : (
          <ul className="skill-list">
            {skills.map((skill) => (
              <li key={skill.name}>
                <article className="skill-card">
                  <div className="skill-glyph" aria-hidden="true">◇</div>
                  <div className="skill-main">
                    <div className="skill-title-row">
                      <h3>{skill.name}</h3>
                      <span className={`status status--${skill.releaseStatus}`}>{skill.releaseStatus}</span>
                    </div>
                    <p>{skill.description}</p>
                    <ul className="tag-row" aria-label="Compatible agents">
                      {skill.agentCompatibility.map((agent) => (
                        <li className="tag" key={agent}>{agent}</li>
                      ))}
                    </ul>
                  </div>
                  <dl className="skill-meta">
                    <div><dt>Version</dt><dd>v{skill.version}</dd></div>
                    <div><dt>Release</dt><dd>No official release yet</dd></div>
                  </dl>
                  <div className="skill-links">
                    <a href={skill.docsUrl}>Documentation <Arrow /></a>
                    {skill.installUrl ? <a href={skill.installUrl}>Install <Arrow /></a> : <span>Install pending</span>}
                    {skill.releaseUrl ? <a href={skill.releaseUrl}>Release notes <Arrow /></a> : <span>Release notes pending</span>}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
        <p className="catalog-note">Local typed metadata is the source for this catalog today. A release manifest can replace it later without changing the page contract.</p>
      </section>
    </>
  );
}
