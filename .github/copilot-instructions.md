# Copilot Instructions — Blog

Personal weblog built with Jekyll 4 and the Minima theme, deployed via Netlify.

## Stack

- **Framework:** Jekyll ~4.0 (Ruby)
- **Theme:** Minima ~2.0
- **Markdown:** kramdown with GFM input
- **Styles:** SASS (compressed), source in `_sass/`
- **Deploy:** Netlify (`netlify.toml`)

## Commands

| Task | Command |
|------|---------|
| Install deps | `bundle install` |
| Serve locally | `bundle exec jekyll serve` |
| Build | `bundle exec jekyll build` |

## Project Structure

```
_config.yml          # Site config, plugin list, permalink pattern
_layouts/            # Page layouts
_includes/           # Reusable partials
_sass/               # SASS stylesheets
_data/               # Data files
assets/              # Static assets (images, fonts)
collections/         # Content collections (software_development, miscellaneous, cascadia)
css/                 # Compiled CSS output
js/                  # JavaScript
```

## Content Conventions

### Posts & Collections

- Posts live in `collections/` under their collection name (e.g., `collections/_software_development/`)
- Collections defined in `_config.yml`: `software_development`, `miscellaneous`, `cascadia`
- Permalink pattern: `/weblog/:categories/:year/:month/:day/:title.html`
- Use `<!--description-->` as the excerpt separator

### Front Matter

Every post/page requires Jekyll front matter. Match existing patterns — typically `layout`, `title`, `date`, `tags`, and `categories`.

### Archives

Jekyll Archives plugin generates year, month, day, category, and tag archive pages automatically. Layouts: `year-archive`, `month-archive`, `day-archive`, `category-archive`, `tag-archive`.

## Plugins

- `jekyll-feed` — Atom feed generation
- `jekyll-archives` — Date/category/tag archives
- `jekyll_picture_tag` — Responsive images
- `jekyll-autoprefixer` — CSS vendor prefixes
- `jekyll-timeago` — Relative time formatting

## Style Guidelines

- Match existing SASS patterns in `_sass/`
- Do not add new CSS frameworks — the site uses Minima + custom SASS
- Preserve the existing permalink structure
- Keep page templates consistent with existing layouts
