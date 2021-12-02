---
layout: post
title:  "Changelog: 29/11/2021"
date:   2021-11-29 09:00:00 -0700
author: "Jameson Nyeholt"
permalink: /:categories/:year/:month/:day/:title.html
type: changelog
category: changelog
tags:
- bug-fixes
- infrastructure-updates
---

## Summary
* Updates to the hosting setup for the website.
* Improves & Bug Fixes for Weblog Categories & Tags.


## Infrastructure Changes
* Change hosting from [Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) to [Netlify](https://www.netlify.com).
* Domain changed from [jamesonnyeholt.com](http://www.jamesonnyeholt.com) to [jnyeholt.dev](http://www.jnyeholt.dev).
* SSL enabled.

## Weblog
* Migrate from `jekyll-tagging` to `jekyll-archives`.
* Fixed bug in the archive page where Jekyll frontmatter was being rendered on the [Archive](/archive) page.
* Tagging now works in the deployed environment.  Despite a lot of thrash attempting to get it to work with Github Pages, I ended up settling on moving hosting providers.



