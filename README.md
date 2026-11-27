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

### Build vs Serve

- `bundle exec jekyll build` builds static files into `_site/` and exits.
- `bundle exec jekyll build --watch` rebuilds on file changes, but does **not** start a web server.
- `bundle exec jekyll serve --livereload` builds, serves locally, and watches for changes.

If the site is not loading in a browser, make sure you are running `serve` (not only `build --watch`) and open `http://localhost:4000`.

### GitHub Copilot App

Repository settings and script commands live in `.github/github-app.yml`.
Review and accept this configuration in the app before using it; edits made
outside the app require acceptance again.

- **Setup** runs `bundle install` automatically when a session is created.
- **Preview** manually starts Jekyll with live reload. The app detects Jekyll's
  server address and opens the preview in its integrated browser.

Install the Ruby version specified in `.ruby-version` and Bundler before setup.
Preview also requires Node.js for Autoprefixer on Windows, where `mini_racer` is
not installed, and libvips for responsive image generation with
`jekyll_picture_tag`. Setup installs gems only; it does not install system tools
or the sibling `wintermuted-ui-theme` npm dependency, which the Jekyll workflow
does not install either.

Production builds remain in CI. Remote control is disabled, and there is no
automatic archive-cleanup script.

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

Any push to `master` triggers the production Netlify deployment.

- **Live site:** https://www.jnyeholt.dev
- **Build logs & status:** https://app.netlify.com/sites/reverent-aryabhata-74e98b/deploys

### Resume publication

The CV repository produces a versioned `general` publication bundle. Review the
public content and PDF, then import the five-file bundle explicitly, using the
source revision and profile checksum from the reviewed manifest:

```powershell
node scripts/import-resume.mjs import <bundle-directory> --source-revision <40-hex-revision> --profile-sha256 <64-hex-profile-checksum>
```

Install the importer's HTML parser dependency before importing or verifying:

```powershell
npm ci --prefix scripts --ignore-scripts
```

The importer checks the allowlist, identity, checksums and paired HTML before
replacing `resume-bundle/`. Commit the reviewed result as one change. HTML
validation rejects decoded URL schemes outside HTTP, HTTPS, mailto and
tel (relative links are allowed), as well as active elements and event handlers.
An unsuccessful import leaves the previously approved bundle intact. The website reads only
the public bundle, not the CV master or private evidence; `/resume.pdf` is
generated from the same bundle as the embedded HTML. Publication still requires
human review of claims, privacy, PDF pagination and desktop/mobile previews.
Bundle files are stored without Git line-ending conversion so their checksums
remain valid across platforms.

Without a bundle, the resume page says it is pending and does not offer a PDF.
Preview validation accepts that state; production deployment requires a valid
bundle. CI prints the built resume page and checks its page count and text.
Project filter checks run even when the resume bundle is pending. Resume colors
stay isolated from the site theme on screen and in print.
The `Validate portfolio without deployment` workflow builds and checks
the site without publishing it. It can also be started manually for a branch.
Never use an old rich resume export to fill a missing compact bundle.

## Features

- Weblog with category and tag archives
- Wiki section
- Responsive design
- Disqus comments
- Google Analytics integration
- Auto-generated archive pages (year, month, category, tag)
