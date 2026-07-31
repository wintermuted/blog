# Title
Homepage split hero refresh

## Overview
Revise the homepage hero from a narrow text-only block into a split layout that uses the available width more intentionally. Option 3 will pair the intro copy with a small action panel so the homepage feels balanced against the wide top navigation.

## Phases
1. [x] Update the homepage include to render a split hero with an intro column and a supporting links column.
2. [x] Add homepage-specific styles for the split layout, responsive stacking, and the secondary panel treatment.
3. [x] Validate the page in the browser and adjust spacing if the new layout feels cramped or too dense.

## Relevant Files
- `/_includes/homepage.html`
- `/_sass/main.scss`

## Verification
- Open the homepage in the browser and confirm the hero spans the container more naturally.
- Check the stacked mobile layout still reads cleanly.

## Decisions
- Use a lightweight split layout rather than a full-bleed treatment for the first pass.
- Keep the existing hero copy and add only a small set of supporting links to avoid overloading the page.
