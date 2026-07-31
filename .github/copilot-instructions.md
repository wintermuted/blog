# Copilot Instructions — Blog

Personal weblog and wiki built with Jekyll 4. Deployed to Netlify.

## Stack

- **Runtime:** Ruby 2.7+
- **Static site generator:** Jekyll 4
- **Theme:** Minima
- **Plugins:** jekyll-feed, jekyll-timeago, jekyll-archives, jekyll_picture_tag, jekyll-autoprefixer
- **Deployment:** Netlify (auto-deploy from main branch)
- **Markdown:** kramdown (GitHub Flavored Markdown)

## Commands

| Task | Command |
|------|---------|
| Install dependencies | `bundle install` |
| Build (production) | `bundle exec jekyll build` |
| Serve locally (development) | `bundle exec jekyll serve` |

**Development URL:** `http://localhost:4000` (default Jekyll port)

## Project Structure

```
blog/
  _config.yml          # Site configuration
  _sass/               # SASS stylesheets (compiled to css/)
  css/                 # Compiled stylesheets (generated)
  collections/         # Post collections by type
    software_development/  # Software development posts
    [other categories]/
  _includes/           # Reusable template partials
  _layouts/            # Page layouts (extends Minima theme)
  assets/              # Images, media, and other assets
  index.html           # Homepage
  about.md             # About pages
  Gemfile              # Ruby dependencies
  netlify.toml         # Netlify deployment configuration
```

## Conventions

- **Posts** live in `collections/<category>/` directories and use front matter YAML for metadata (title, date, categories, tags)
- **Front matter excerpt marker:** `<!--description-->` separates the excerpt from full content (configured in `_config.yml`)
- **Styling:** SASS files in `_sass/` are compiled to `css/`. Use CSS custom properties and the Minima base styles — do not add additional CSS frameworks
- **Markdown flavor:** Kramdown with GitHub Flavored Markdown enabled
- **URLs:** Posts use the permalink pattern `/weblog/:categories/:year/:month/:day/:title.html`
- **Archives:** Auto-generated year, month, tag, and category archive pages via jekyll-archives plugin
- **Images:** Use jekyll_picture_tag plugin for responsive images; place source images in `assets/` with appropriate naming

## Development Workflow

1. Make edits to post content in `collections/` or styling in `_sass/`
2. Run `bundle exec jekyll serve` to preview locally
3. Changes auto-reload; view at `http://localhost:4000`
4. Commit and push to main — Netlify auto-deploys
5. Monitor build status via [Netlify dashboard](https://app.netlify.com/sites/reverent-aryabhata-74e98b)

## Adding a New Post

1. Create a new Markdown file in `collections/<category>/` using the ISO date prefix: `YYYY-MM-DD-post-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: Your Post Title
   date: YYYY-MM-DD HH:MM:SS +ZZZZ
   categories: [category]
   tags: [tag1, tag2]
   ---
   ```
3. Add excerpt separator `<!--description-->` after the intro paragraph
4. Write content using Markdown + kramdown syntax
5. Run `bundle exec jekyll serve` to preview
6. Commit and push

## Common Issues

- **Gems fail to install:** Run `bundle update` to resolve dependency conflicts
- **SASS compilation fails:** Check `_sass/` syntax; ensure no Unicode or special characters without escaping
- **Images not showing:** Verify jekyll_picture_tag plugin is installed and image paths in `assets/` exist

## Deployment

- **Auto-deploy:** Any push to `main` triggers a Netlify build (configured in `netlify.toml`)
- **Live site:** https://www.jnyeholt.dev
- **Build logs:** View at https://app.netlify.com/sites/reverent-aryabhata-74e98b/deploys

## Key Site Features

- Weblog with category and tag archives: `/weblog/`
- Wiki section: `/wiki/`
- Responsive design via Minima theme
- Autoprefixer for cross-browser CSS compatibility
- Disqus comments (configured in `_config.yml`)
- Google Analytics support
