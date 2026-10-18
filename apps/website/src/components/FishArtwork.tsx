import alienFishLogo from '../assets/alienfish-logo-animation-master.svg';
import './FishArtwork.css';

interface FishArtworkProps {
  readonly compact?: boolean;
}

export function FishArtwork({ compact = false }: FishArtworkProps) {
  const className = compact ? 'fish-art fish-art--compact' : 'fish-art';

  return (
    <div className={className} aria-hidden="true">
      <span className="orb orb--one" />
      <span className="orb orb--two" />
      <img src={alienFishLogo} alt="" />
      {!compact && (
        <p className="terminal-note">
          STAY<br />CURIOUS.<br />BUILD<br />ANYWAY.
        </p>
      )}
    </div>
  );
}
