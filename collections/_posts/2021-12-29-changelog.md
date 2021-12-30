---
layout: post
title:  "Changelog: 29/12/2021"
date:   2021-12-29 09:00:00 -0700
author: "Jameson Nyeholt"
permalink: /:categories/:year/:month/:day/:title.html
type: changelog
category: changelog
tags:
- layout-updates
- wiki
- weblog
- Cascadia
---

## Summary
* The [Wiki](/wiki) was reorganized to include a main page and two initial hubs covering [Cascadia](/wiki/cascadia) & [Software Engineering](/wiki/software-engineering)
* Several new retroactive posts were added.
* All articles containing images were migrated to using `jekyll_picture_tag`

## All Changes

### General Changes
- The homepage status section was updated to indicate that I am currently on paternity leave.

### Weblog
#### New Posts:
* [Arch Cape Hike](/travelouge/2021/07/24/arch-cape-hike.html)
* [Tillamook Forest Foraging](/travelouge/2021/09/20/rachel-birthday-foraging.html)
* [Whalen Island Camping Trip Sep 2020](/travelouge/2020/09/22/whalen-island.html)

#### Updated Posts:
* Bug Fixes 
    * [Changelog: 02-12-2021](/changelog/2021/12/02/changelog.html) - Correct the date format
* Updates to article tags & migrate image tags to `jekyll_picture_tag` in the following posts:
    * [Whalen Island Camping Trip June 2021](/travelouge/2021/06/18/whalen-island.html)
    * [The Suttle Lodge](/travelouge/2021/05/28/the-suttle-lodge.html)
    * [Ramona Falls Hike](/travelouge/2021/05/15/ramona-falls.html)
    * [Hamilton Mountain Hike](/travelouge/2021/05/01/hamilton-mountain.html)
    * [The Oregon Garden](/travelouge/2021/04/23/the-oregon-garden.html)
    * [Lunar New Year & the Oregon Coast](/travelouge/2021/02/20/a-quick-escape-from-portland.html)
    * [Experimenting with the Bullet Journal system](/journal/2017/02/09/bullet-journal-experiment.html)
    * [Pair-programming at Jama Software](0/essay/2017/01/04/pair-programming-at-jama-software.html)

### Wiki
#### New Articles:
  * [Cascadia Hub](/wiki/cascadia/)
  * [Whalen Island - Tillamook, Oregon](/wiki/cascadia/camping/whalen-island)
  * [Software Engineering Hub](/wiki/software-engineering)

#### Wiki Improvements
  * Breadcrumb navigation was added to the Wiki.
  * Links to articles are prefixed with an article icon.

### Infrastructure Updates
* Images are now embedded via the [`jekyll_picture_tag`](https://github.com/rbuchberger/jekyll_picture_tag) plugin
* [`jekyll_admin`](https://github.com/jekyll/jekyll-admin) was added as a dependency to provide a UI for managing the site.





