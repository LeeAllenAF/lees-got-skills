# Web Accessibility Engineering Policy

Use this policy when planning, implementing, reviewing, or releasing public web content and interactive experiences.

## Baseline and Scope

- Target the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) Level AA success criteria for every complete page and responsive variation.
- Treat accessibility as a continuous engineering responsibility, not a one-time certification step.
- Apply this policy to content, navigation, forms, media, documents, third-party embeds, responsive states, and failure or empty states.
- Do not publish a WCAG conformance claim or badge unless a qualified evaluation has verified the complete claimed scope and documented the required claim details.
- This policy is engineering guidance, not legal advice or a guarantee against claims. Applicable obligations vary by organization, service, audience, and jurisdiction; seek qualified legal advice when legal applicability or risk is material.

## Implementation Requirements

- Use semantic HTML and native controls before ARIA. Add ARIA only when native semantics cannot express the required name, role, value, state, or relationship.
- Make every action operable by keyboard alone. Preserve a logical focus order, visible focus, expected activation keys, and a reliable way to dismiss temporary interfaces.
- Provide a skip mechanism when repeated navigation precedes primary content, and manage focus deliberately after client-side route changes.
- Give every control an accessible name. Associate instructions, validation messages, and error recovery with the affected control.
- Provide text alternatives for informative non-text content. Use empty alternative text or presentation semantics only for genuinely decorative content.
- Preserve information and operation without relying only on color, position, shape, sound, pointer gestures, or hover.
- Maintain sufficient text, component, and focus-indicator contrast. Check actual foreground and background combinations in every state.
- Support zoom, text resizing, reflow, narrow viewports, touch input, and content expansion without loss of information or functionality.
- Respect reduced-motion preferences. Avoid flashing content and provide controls for motion or media that starts automatically when the applicable WCAG criteria require them.
- Provide captions, transcripts, audio descriptions, or other alternatives for time-based media as required by the content and target criteria.
- Use descriptive page titles, headings, landmarks, link text, labels, status messages, and error text. Keep the document language accurate.
- Ensure loading, error, empty, disabled, selected, expanded, and success states are perceivable and programmatically available where needed.
- Do not use accessibility overlays or widgets as a substitute for accessible design, implementation, content, and testing.

## Validation Requirements

Use a combination of automated and human evaluation. Automated tools can identify some defects, but they cannot determine accessibility or WCAG conformance by themselves.

For each materially changed user path:

1. Run available automated accessibility and behavior checks.
2. Complete the path using only the keyboard, including opening and dismissing menus, dialogs, and other temporary UI.
3. Check focus order, focus visibility, accessible names, headings, landmarks, errors, and dynamic announcements.
4. Review the path at narrow widths and at 200% zoom; include 400% zoom or equivalent reflow testing when applicable to the content.
5. Smoke-test the primary path with at least one representative browser and screen-reader combination when the change affects structure, navigation, forms, or dynamic content.
6. Review color contrast, reduced-motion behavior, touch target usability, and content at common responsive breakpoints.

Treat an accessibility regression in a changed user path as release-blocking unless the responsible owner explicitly documents the impact, mitigation, and remediation plan.

## Evaluation Records and Claims

When recording an accessibility review, include:

- the date and exact pages, states, viewport variations, and components evaluated;
- the WCAG version and target level;
- browsers, assistive technologies, automated tools, and manual methods used;
- findings, known limitations, remediation owners, and retest status;
- the evaluator's name or responsible team.

A passing automated scan, a checklist, or limited assistive-technology testing is not a conformance determination. W3C conformance applies to complete pages and requires every applicable success criterion at the claimed level.

## Primary References

- [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/)
- [W3C guidance on selecting accessibility evaluation tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/)
- [W3C easy checks for an initial accessibility review](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [U.S. Department of Justice guidance on web accessibility and the ADA](https://www.ada.gov/resources/web-guidance/)
