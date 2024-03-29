---
layout: post
title:  "Changelog: 20/02/2021"
date:   2021-2-20 09:00:00 -0700
author: "Jameson Nyeholt"
type: changelog
category: changelog
tags:
- layout improvements
- styling improvements
- organization improvements
- build improvements
- new pages
---

I've recently been making major updates to the structure of this website.  

My primary goal in these changes is to transition my website from a generic personal / professional homepage to a 
[personal weblog](https://en.wikipedia.org/wiki/Blog) and [personal wiki](https://en.wikipedia.org/wiki/Personal_wiki).

This update will include numerous changes and additions.  I will only summarize a few here, however in
the future I plan to include a changelog post detailing new content, updates to existing content, and other new 
functionality.

## Summary of changes

### Structural
* jamesonnyeholt.com is now completely built via [Jekyll](https://jekyllrb.com), a static site generation tool.  
  Previously I maintained a homepage written in [React](https://reactjs.org), and a separate Jekyll blog.

### Design
* Dark Theme - This site will update to a dark-theme when that setting is detected.  This was implemented using the 
  `@media (prefers-color-scheme: dark)` CSS rule.  [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

### Features

* **Weblog**
  * The [Weblog]({% link weblog.html %}) now has a distinct ~~Changelog~~ section that will 
  include a list of change to the site.  Like this one!
  * The Weblog also includes a ~~Library~~ & ~~Links~~ section that includes an 
  index of books, articles, and websites that I think are interesting.
* **Wiki**
  * The website now features a [Wiki]({% link wiki.md %}) that I will begin using as a 
  [personal wiki](https://en.wikipedia.org/wiki/Personal_wiki) to document things I've learned.
* **About**
  * I've updated the [About]({% link about.md %}) section to include my personal [Mission]({% link about-mission.md %}) and 
  [Philosophy]({% link about-philosophy.md %}), and a page listing the technology [Stack]({% link about-philosophy.md %}) 
  used to built the website.
  
