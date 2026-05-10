# Wintermuted Theme Migration Phase 3

## Overview
This plan continues the blog migration to @wintermuted/ui-theme after completing PR fixes (Phase 1) and npm/symlink migration (Phase 2). It aligns implementation with current theme docs/source and applies button component usage across navigation CTAs with visual verification as changes are made.

## Phases
1. [x] Phase 1 - PR fix completion
- Restored Lightbox assets.
- Added missing grid shims (`.col-md-4`, `.row-cols-md-2`).
- Confirmed build and fixed review concerns.

2. [x] Phase 2 - npm package migration
- Added local package dependency for `@wintermuted/ui-theme`.
- Replaced vendored theme files with `css/wm-theme` symlink to `node_modules` styles.
- Verified Jekyll build success.

3. [x] Phase 3 - Button component migration
- Add button component CSS import in global head include.
- Convert header nav links to theme button classes where appropriate.
- Convert weblog mode nav (`Simple`, `By Year`, `Gallery`, `Summary`) to button classes.
- Convert post next/older navigation links to button classes.
- Remove or narrow conflicting custom button/link styles in `main.scss`.
- Visually verify each updated surface in browser.

4. [x] Phase 4 - Card alignment cleanup
- Audit Bootstrap-era card sub-classes not provided by theme (`card-title`, `card-text`, `card-link`, `card-img-top`, `card-subtitle`).
- Normalize card markup/styles to theme-supported card primitives.

5. [x] Phase 5 - Layout exploration (post-launch)
- Evaluate migration from custom grid (`.container/.row/.col-*`) to theme layout primitives (`.app-shell`, etc.).
- Only proceed after validating no regressions in blog content pages.
- Current feasibility snapshot:
  - 85 custom-grid class usages across 24 files.
  - Concentrated in `_layouts/` and `_includes/` structural templates.
  - Includes nested card/gallery layouts that will require incremental migration rather than single-pass replacement.
- Incremental migration sequence:
  - [x] Step 1: enable `layout.css` globally and migrate `page.html` outer wrapper to `.app-shell`.
  - [x] Step 2: migrate `post.html` outer wrapper and title region to `.app-shell` + layout primitives.
  - [x] Step 3: migrate archive/wiki layouts (`year/month/day/tag/category/wiki-home`) outer wrappers.
  - [x] Step 4: evaluate replacing sidebar page row/col structure with `.sidebar-layout` where it reduces custom CSS.
    - Evaluation note: theme `sidebar-layout-aside` is optimized for left-rail sidebars, while blog templates currently use right-rail sidebars.
    - Recommendation: keep current row/col sidebar structure until a right-rail utility exists (or add a scoped blog-side variant in theme/app styles).
  - [x] Step 5: migrate remaining page-specific wrappers (`page-wiki-hub`, `page-wiki`, `page-about`, `projects-home`) to `.app-shell`.
  - Outcome: all `_layouts/*.html` wrappers now use `.app-shell`; inner grid/sidebar structures remain intentionally unchanged for stability.

## Relevant Files
- `_includes/head.html`
- `_includes/header.html`
- `_includes/weblog-nav.html`
- `_includes/post-navigation.html`
- `_sass/main.scss`
- `.github/plans/2026-05-09-wintermuted-theme-migration-phase3.md`

## Verification
- Run `bundle exec jekyll build` with zero errors.
- Visual checks on:
  - `/`
  - `/weblog/`
  - `/weblog-summary/`
  - representative post page with post navigation
- Confirm button classes render correctly in light and dark mode.

## Decisions
- Use theme-supported button classes with base `.btn` class + variant modifiers.
- Do not use `.btn-neutral` in blog migration because it is documented in showcase but not implemented in `styles/components/button.css`.
- Keep local dependency mode (`file:../wintermuted-ui-theme`) during migration for rapid iteration.
