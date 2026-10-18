# Website design references

The homepage follows the handoff image `OPTION-A-HOMEPAGE-AUTHORITATIVE.png`
(SHA-256 `864c7518be18d4cb206aa246a11549c75112933638420268f139023137deafd5`)
for its compact terminal composition, green-on-black palette, card layout, and
responsive direction.

The website-owned `src/assets/alienfish-logo-animation-master.svg` is the
runtime mascot asset, while `src/assets/alienfish-logo-savage.png` remains a
raster fallback and visual reference. The runtime asset's CSS treatment is
monochrome neon green with restrained glow and a reduced-motion fallback. The
favicon is kept in `public/favicon.ico` so Vite publishes it at the site root.

The concept images are design inputs only and are intentionally not shipped in
the production bundle.
