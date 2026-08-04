---
layout: page-about
title: About > About this website
permalink: /about/website
--- 

<p class="lead">This website is built with <a href="https://en.wikipedia.org/wiki/Open_source">open source</a> libraries, frameworks, and dependencies.</p>

## Frameworks and Libraries
- [Jekyll](https://jekyllrb.com) for static-site generation.
- [Minima](https://github.com/jekyll/minima) as the base Jekyll theme.
- [@wintermuted/ui-theme](https://github.com/wintermuted/ui-theme) for the design system foundation.
- [Font Awesome](https://fontawesome.com) for icon assets.

## Runtime and Dependency Ecosystem
- [Ruby](https://www.ruby-lang.org/en/) as the runtime used by Jekyll.
- Bundler-managed Ruby gems including: [jekyll-feed](https://github.com/jekyll/jekyll-feed), [jekyll-timeago](https://github.com/markets/jekyll-timeago), [jekyll-archives](https://github.com/jekyll/jekyll-archives), [jekyll_picture_tag](https://github.com/rbuchberger/jekyll_picture_tag), and [jekyll-autoprefixer](https://github.com/vwochnik/jekyll-autoprefixer).

## CI/CD Architecture
- [GitHub Actions](https://github.com/features/actions) orchestrates build and deployment workflows.
- Pushes to `master` trigger the production workflow (`.github/workflows/deploy.yml`).
- The production workflow builds the site with Jekyll, including image-processing dependencies for `jekyll_picture_tag`, then deploys `_site/` to [Netlify](https://www.netlify.com) using the `nwtgck/actions-netlify` action.
- Pull requests trigger a separate preview workflow (`.github/workflows/deploy-pr-preview.yml`) that publishes an isolated Netlify preview URL for validation before merge.
- Concurrency controls ensure only one production deployment runs at a time.
