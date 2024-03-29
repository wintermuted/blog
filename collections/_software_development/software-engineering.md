---
layout: page-wiki-hub
title: Software Engineering
hub: software-engineering
hub-label: Software Engineering
topic: software-engineering
permalink: /wiki/software-engineering
---
<p class="lead">
    Software engineering is the systematic application of engineering approaches to the development of software.  I've been working in the software development industry professionally since 2012, with amatuer experience going back to the early 'aughts.  In this wiki I've documented some of my learnings.
</p>

<div class="row">
  <div class="col-md-4">
    {% assign sorted-posts = site.software_development | where: "topic","programming" %}
      <h3>Programming</h3>
      <ul class="list-unstyled">
      {% for post in sorted-posts%}
          <li>
          <i class="fas fa-book"></i>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
          </li>
    {% endfor %}
    </ul>

    {% assign sorted-posts = site.software_development | where: "topic","tools" %}
    <h3>Tools</h3>
    <ul class="list-unstyled">
      {% for post in sorted-posts%}
          <li>
          <i class="fas fa-book"></i>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
          </li>
    {% endfor %}
    </ul>
  </div>

  <div class="col-md-4">
  {% assign sorted-posts = site.software_development | where: "topic","methodology" %}
    <h3>Methodology</h3>
    <ul class="list-unstyled">
      {% for post in sorted-posts%}
          <li>
          <i class="fas fa-book"></i>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
          </li>
    {% endfor %}
    </ul>

    {% assign sorted-posts = site.software_development | where: "topic","software design" %}
    <h3>Design</h3>
    <ul class="list-unstyled">
      {% for post in sorted-posts%}
          <li>
          <i class="fas fa-book"></i>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
          </li>
      {% endfor %}
    </ul>
  </div>

  <div class="col-md-4">
    {% assign sorted-posts = site.software_development | where: "topic","philosophy" %}
    <h3>Philosophy</h3>
    <ul class="list-unstyled">
      {% for post in sorted-posts%}
          <li>
          <i class="fas fa-book"></i>
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a>
          </li>
    {% endfor %}
    </ul>
  </div>
</div>

----

## Links
- [One thing well](https://onethingwell.org) - A weblog about simple, useful software.
- [Project Gemini](https://gemini.circumlunar.space) - An alternative protocol for the web.
