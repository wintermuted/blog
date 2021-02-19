---
layout: post
title:  "Changelog: 14/02/2021"
date:   2021-2-14 09:00:00 -0700
author: "Jameson Nyeholt"
permalink: /:categories/:year/:month/:day/:title.html
type: changelog
categories:
- changelog
---

I've recently been making major updates to the structure of this website.  

My primary goal in these changes is to transition my website from a generic personal / professional homepage to a 
[personal weblog](https://en.wikipedia.org/wiki/Blog) and [personal wiki](https://en.wikipedia.org/wiki/Personal_wiki).

This update will include numerous changes and additions.  I will only summarize a few here, however in
the future I plan to include a changelog post detailing new content, updates to existing content, and other new 
functionality.

## Summary of changes

**Structural**
* jamesonnyeholt.com is now completely built via [Jekyll](https://jekyllrb.com), a static site generation tool.  
  Previously I maintained a homepage written in [React](https://reactjs.org), and a separate Jekyll blog.

**Design**
* Dark Theme - This site will update to a dark-theme when that setting is detected.  This was implemented using the 
  `@media (prefers-color-scheme: dark)` CSS rule.  [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
  
