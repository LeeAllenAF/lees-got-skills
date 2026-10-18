import type { ReactNode } from 'react';
import { FishArtwork } from './FishArtwork';
import './PageIntro.css';

interface PageIntroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro__copy">
        <p className="eyebrow">// {eyebrow}</p>
        <h1>{title}</h1>
        <div className="page-summary">{children}</div>
      </div>
      <FishArtwork compact />
    </section>
  );
}
