---
layout: page-wiki-hub 
title: Cascadia
topic: cascadia
hub: cascadia
hub-label: Cascadia
permalink: /wiki/cascadia
---

{% picture /assets/img/wiki/cascadia/CascadiaMap.png 
   --alt A map of the Cascadia Bioregion 
   --img class="rounded float-right"
   --img width="200px"
%}

<p class="lead">
  Cascadia is a bioregion cented around the Pacific Northwest geography of North America that straddles Canada & 
  the United States and encompases portions of Alaska, Yukon Territory, British Columbia, Washington, Oregon, 
  California, Idaho, Montana, and Wyoming. It is bounded by the North Pacific Ocean and the 
  Cascade & Rocky mountain ranges.  Much of the region is forested, and it contains the 
  <a href="https://en.wikipedia.org/wiki/Pacific_temperate_rainforests">largest temperate rainforest</a> on Earth.
</p>

I've lived in this region since 2013 with my partner in Portland, Oregon.  The bioregion is both our backyard and important natural resource that we all depend upon.  In this wiki I document places we've explored and experienced together.

----

## Wiki

*Political Subdivisions*
{% assign sorted-posts = site.cascadia | where: "topic","political-subdivision" %}
<ul class="list-unstyled">
  {% for post in sorted-posts%}
    <li>
      <i class="fas fa-book"></i>
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
    </li>
{% endfor %}
</ul>


*Portland Metro*
{% assign sorted-posts = site.cascadia | where: "topic","portland-metro" %}
<ul class="list-unstyled">
  {% for post in sorted-posts%}
    <li>
      <i class="fas fa-book"></i>
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
    </li>
{% endfor %}
</ul>

*North Oregon Coast*

{% assign sorted-posts = site.cascadia | where: "topic","camping" %}
<ul class="list-unstyled">
  {% for post in sorted-posts%}
    <li>
      <i class="fas fa-book"></i>
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
    </li>
{% endfor %}
</ul>

----

## More Reading

- [Wikipedia: Cascadia (bioregion)](https://en.wikipedia.org/wiki/Cascadia_(bioregion))
- [Wikipedia: Cascadia (independence movement)](https://en.wikipedia.org/wiki/Cascadia_(independence_movement))


