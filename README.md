# Jameson Nyeholt - Weblog

The repository for my personal website, which contains a [Weblog](https://www.jnyeholt.dev/weblog) & a [Wiki](https://www.jnyeholt.dev/wiki/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/b41210aa-495b-4238-bf63-0c7e938f63fd/deploy-status)](https://app.netlify.com/sites/reverent-aryabhata-74e98b/deploys)

## Stack

- **Static site generator:** Jekyll 4
- **Theme:** Minima
- **Runtime:** Ruby 2.7+
- **Markdown:** Kramdown (GitHub Flavored Markdown)
- **Deployment:** Netlify (auto-deploys from `main` branch)

## Getting Started

### Prerequisites

- Ruby 2.7+
- Bundler (`gem install bundler`)

### Installation & Local Development

```bash
# Install dependencies
bundle install

# Start the development server (watch mode)
bundle exec jekyll serve --livereload

# View at http://localhost:4000
```

On Windows, use the setup and preview scripts documented below so libvips DLL
loading is configured before Jekyll starts.

### Build vs Serve

- `bundle exec jekyll build` builds static files into `_site/` and exits.
- `bundle exec jekyll build --watch` rebuilds on file changes, but does **not** start a web server.
- `bundle exec jekyll serve --livereload` builds, serves locally, and watches for changes.

If the site is not loading in a browser, make sure you are running `serve` (not only `build --watch`) and open `http://localhost:4000`.

### GitHub Copilot App

Repository settings and script commands live in `.github/github-app.yml`.
Review and accept this configuration in the app before using it; edits made
outside the app require acceptance again.

- **Setup** runs `ruby scripts/github-app-setup.rb` automatically when a session
  is created, checks Windows prerequisites, and installs gems through Bundler.
- **Preview** runs `ruby scripts/github-app-preview.rb` manually to start Jekyll
  through Bundler with live reload. The app detects Jekyll's
  server address and opens the preview in its integrated browser.

Install the Ruby version specified in `.ruby-version` and Bundler before setup.
Preview also requires Node.js for Autoprefixer on Windows, where `mini_racer` is
not installed, and libvips for responsive image generation with
`jekyll_picture_tag`. On Windows, add `node.exe` and `vips.exe` to PATH and use a
libvips distribution with `libvips-42.dll` beside `vips.exe`. The scripts resolve
the executable's real location (including WinGet links), configure the native
DLL search directory before loading gems, and check that Ruby can load libvips.
Missing prerequisites and DLL loading failures stop the command with an error.
On other platforms, the scripts leave native library loading unchanged.

Setup installs gems only; it does not install system tools
or the sibling `wintermuted-ui-theme` npm dependency, which the Jekyll workflow
does not install either.

Production builds remain in CI. Remote control is disabled, and there is no
automatic archive-cleanup script.

The same scripts can be run from a terminal. Extra arguments are forwarded to
Bundler install or Jekyll serve, respectively:

```powershell
ruby scripts\github-app-setup.rb
ruby scripts\github-app-preview.rb --port 4001
```

Run the focused script regressions without generating the site:

```powershell
ruby test\github-app-scripts-test.rb
```

The PR preview workflow runs these regressions before building. Development
scripts and tests are excluded from the published site.

### Building for Production

```bash
bundle exec jekyll build
```

Output will be in the `_site/` directory.

## Content

- **Posts** live in `collections/<category>/` with ISO date prefix: `YYYY-MM-DD-post-title.md`
- **Front matter excerpt marker:** Use `<!--description-->` to separate excerpt from full content
- **Post front matter template:**
  ```yaml
  ---
  layout: post
  title: Your Post Title
  date: YYYY-MM-DD HH:MM:SS +ZZZZ
  categories: [category]
  tags: [tag1, tag2]
  ---
  ```

## Styling

- SASS files in `_sass/` compile to `css/`
- Uses CSS custom properties and Minima base styles
- No additional CSS frameworks

## Images

Use the `jekyll_picture_tag` plugin for responsive images:
- Place source images in `assets/`
- The plugin automatically generates responsive variants

## Deployment

Any push to `main` triggers an automatic Netlify build and deploy.

- **Live site:** https://www.jnyeholt.dev
- **Build logs & status:** https://app.netlify.com/sites/reverent-aryabhata-74e98b/deploys

## Features

- Weblog with category and tag archives
- Wiki section
- Responsive design
- Disqus comments
- Google Analytics integration
- Auto-generated archive pages (year, month, category, tag)
