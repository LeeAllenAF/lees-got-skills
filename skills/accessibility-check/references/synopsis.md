# Accessibility Review Synopsis

> Compact routing reference, not the full WCAG normative text or a certification checklist.

- **Target:** WCAG 2.2 Level AA (all applicable A + AA success criteria)
- **Normative source:** https://www.w3.org/TR/WCAG22/
- **Baseline publication observed:** 12 December 2024 W3C Recommendation
- **Synopsis last prepared:** 2026-10-17
- **Live source reconciliation:** Not exhaustively verified; review current normative source at use time
- **Other useful references:** https://www.w3.org/WAI/test-evaluate/ ; https://www.w3.org/WAI/WCAG22/quickref/

## Route by affected behavior

| Code or experience | Review focus | Relevant WCAG 2.2 criteria (examples; not exhaustive) |
| --- | --- | --- |
| Images, SVG, icons, charts | Informative alternatives; decorative suppression; semantic information | 1.1.1, 1.3.1 |
| Headings, landmarks, tables, reading order | Programmatic structure, meaningful sequence, relationships | 1.3.1, 1.3.2, 2.4.6 |
| Navigation, links, routes | Skip repeated blocks, link purpose, page title, focus management for SPA changes | 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.7, 3.2.3 |
| Interactive controls, menus, dialogs | Keyboard operation, no traps, focus visibility/not obscured, name/role/value, target size | 2.1.1, 2.1.2, 2.4.7, 2.4.11, 2.5.8, 4.1.2 |
| Forms, authentication, checkout | Labels, instructions, errors, recovery, accessible authentication, redundant entry | 1.3.5, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8 |
| Dynamic status, validation, loaders | Accessible status announcements and updates, predictable focus | 3.2.2, 4.1.3, 4.1.2 |
| Colors, typography, themes | Text/non-text contrast, meaning beyond color, text spacing and resizing | 1.4.1, 1.4.3, 1.4.4, 1.4.11, 1.4.12 |
| Responsive, zoom, touch, dragging | Reflow, orientation, pointer cancellation, drag alternatives, minimum target size | 1.3.4, 1.4.10, 2.5.2, 2.5.7, 2.5.8 |
| Motion, timers, animation, flashing | Pause or stop, reduced-motion implementation, motion-actuation alternatives, flash limits | 2.2.2, 2.3.1, 2.5.4; reduced-motion is helpful beyond specific WCAG criteria |
| Audio/video/live media | Captions, audio description, prerecorded alternatives where required, audio control | 1.2.1–1.2.5, 1.4.2 |
| Language and help | Page/part language, predictable instructions, consistent help | 3.1.1, 3.1.2, 3.2.6 |
| Custom widgets and embedded content | Native semantics first; fallback role/name/state; keyboard; embeds within evaluated scope | 1.3.1, 2.1.1, 4.1.2 |

## Broad review invariants

- Prefer semantic HTML and native controls to reimplementations. ARIA cannot make an inaccessible interaction accessible on its own.
- User-visible functionality must not depend solely on hover, pointer, color, position, or sound.
- Review actual empty, loading, error, disabled, selected, and success states; responsive variations matter.
- Contrast and other perceptual characteristics usually require inspecting rendered combinations, not just source tokens.
- A single criterion can apply to multiple categories; categories are an index, **not** a pass/fail coverage map. Check **all applicable A and AA criteria** before any full conformance evaluation.
- Affected user paths require manual keyboard evaluation and, where relevant, representative screen-reader, zoom/reflow, contrast, motion, and touch checks; automated checks alone are insufficient.
- Do not claim WCAG conformance absent a qualified full-page evaluation. See the W3C conformance requirements in the normative Recommendation.

## Freshness process

1. Retrieve the latest published **WCAG 2.2** W3C Recommendation (not its editor's draft) and record the date/URL actually retrieved.
2. Compare status, publication date, applicable Level A/AA success criteria and material normative revisions with this synopsis.
3. Correct affected route entries and the baseline metadata only after verifying a substantive difference; make the smallest accurate edit.
4. If retrieval fails, retain the last-known baseline; explicitly label freshness **unverified** in the review. Do not manufacture a verification date.
5. If WCAG 3 or other newer guidance exists, report it as an optional migration consideration, not a silent replacement for WCAG 2.2 AA.
