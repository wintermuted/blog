---
layout: post
title:  "Why Pair-Programming?"
date:   2016-11-03 19:57:46 -0700
categories: software programming pair-programming
---
Software Engineering is a discipline that is often stereotyped for being inhabited with non-communicative neckbeards that enjoy typing away at their keyboards with abandon while in the "zone".  Earphones in, volume up; ignore the world. For many, this is one of the appeals of the job; the privilege of solving problems on your own, with minimal outside interference, as an 'individual contributor' to a larger project.  Getting into this 'flow state' is a well-known ideal for programmers.  

When in this focused state of mind, solutions come easily and work moves briskly along, all while enjoying your favorite playlist; happily plugging away at the task, away from the from the difficulties of communicating with others and annoying things like planning meetings.  When all is said and done, you can proudly look upon your masterpiece of code, and say "I did this!"

This mode of work handles great for many software engineers, until it doesn't.  Building meaningful & useful software is a complex and expensive task.  There are numerous stakeholders to please, numerous colleagues to coordinate with, and as a result a lot of room for things to go pear-shaped.  

As companies scale and build a more complex software product, there often comes a time where the weight of this complexity begins to collapse upon itself.  Words like 'technical debt', 'rewrite', and 'new framework' begin to circulate amongst the engineering pit, frightening product and engineering managers alike. How will we deliver on our road map they say?  Why aren't we able to reuse this component you built? Why can't our system handle this many users?  

New hires are flabbergasted by the backwardness and complexity of the code, afraid to try anything novel after encountering brittleness with minor changes, while seasoned veterans exit the company for greener pastures.  Morale drops, confidence in the engineering organization dwindles.  A retrospective is held with pointing fingers, but no blame is easily assigned.

This is a dismal picture, but also a common one.  The collective design-debt of a software project comes back to haunt it as more and more contributors are on-boarded, and long-time contributors phase out of the company.  

When asked why the software is in such a poor state, many engineers will blame external factors.  It was Product's fault for not letting us build it right!  It was the fault of that cowboy coder whom added this (whom is conveniently no longer around to defend herself).  We didn't have time for code reviews!  We didn't have time for unit tests!

We could attempt to get the bottom of why most projects encounter problems over time, but it would be an academic endeavor at best.  Software projects fall into disarray for numerous reasons, but it is more often a death by a thousand cuts. While some do warrant a rewrite, that is often not viable business strategy.  In the same way that technical debt is accrued incrementally, progress must be made incrementally.

Let us revisit our earlier description of our typical programmer in his zen. What if I told you that most problems could be solved here?
