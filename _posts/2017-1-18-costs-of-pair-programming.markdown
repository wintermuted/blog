---
layout: post
title:  "Costs, challenges, and common pitfalls of pair-programming"
date:   2017-1-18 09:57:46 -0700
location: "Portland"
author: "Jameson Nyeholt"
categories:
- pair-programming
- agile software development
- XP
- extreme programming
---
In my [prior blog post](http://jamesonnyeholt.com/blog/agile%20software%20development/pair-programming/xp/extreme%20programming/2017/01/04/pair-programming-at-jama-software.html) about [pair-programming](https://www.agilealliance.org/glossary/pairing/), I introduced the concept and explained why Jama Software adopted it as a practice in our engineering group.  While we have seen many benefits from pair-programming, the practice may not be appropriate for every organization or team, and also does not come without costs and challenges.  
<!--description-->

In the year or more that we have had teams utilizing pair-programming, we have become familiar with the costs and challenges.  This has been helpful for learning how to adjust to the practice on an individual and team-level and ensure that its application has been successful.

## Costs

At first glance, pair-programming appears to be an incredibly inefficient use of expensive software engineering talent.  Organizations that have no experience with pair-programming will often be initially skeptical for the obvious fact that two engineers are working on the same task.  The apparent overhead of pair-programming tends to be the primary factor in push-back from engineering management when pair-programming is being considered for adoption.  

It is indisputable that pair-programming adds an overhead to development efforts by increasing the man-hours required.  However, assuming that pair-programming doubles the cost is a reductive misconception that equates programming with time typing on the keyboard; ignoring the analytical aspects of it.

Empirical studies have yet to quantify the exact costs or benefits of systematic pair programming as compared to individualized work.  The most commonly cited statistic indicates that it can add a [15% increase](http://www.cs.utexas.edu/users/mckinley/305j/pair-hcs-2006.pdf) to the time it takes to complete a task over an individual developer working on it.

Our experience has shown that this additional cost is minimal in comparison to the benefits it provides our teams; better quality, better understanding of the code, and lower risk.  It is these benefits that allow us to become more agile in the long-term.  In this sense, pair-programming is a strategic investment in the software and the team charged with improving and maintaining it.  Despite increasing the time to complete a task, pair-programming also aids in [reducing the count of bugs](https://collaboration.csc.ncsu.edu/laurie/Papers/XPSardinia.PDF) not caught during the development process, and improving the extensibility of the system over time.

Pair-programming, just like any other [Agile Software Development](https://www.agilealliance.org/agile101/) technique, is one that should be applied to the appropriate situation.  While pair-programming provides a great way to ensure better design in the codebase and lower the risk associated with having one person responsible for a system, it is not the right instrument for every task.  

Poorly applied pair-programming leads to the worst-case outcome of doubling the time needed to complete a task.  In order to use pair-programming effectively within your organization, it is important to be cognizant of situations where it is unnecessary and can be an unproductive use of knowledge workers.

## Challenges & common pitfalls

There exist some common situations & indicators of non-performance for pair-programming that are important to bear in mind.  Being mindful of these circumstances can help identify necessary adjustments to make pair-programming more successful within your organization.

### Situational issues

**Pair-programming is NOT the right tool for every task**  

When a task is simple enough, such as a dev-chore, a defect writeup, or a spike, pair-programming is not always appropriate.  Adopting pair-programming in all cases is not efficient and can severely limit the productivity of a team and increase the costs of development efforts exponentially.  When a Scrum team discusses new development work, is it important to identify whether or not pair-programming would be beneficial for a particular task.  Being dogmatic in applying pair-programming is never appropriate.  A good rule of thumb is that pair-programming is best applied to production code that needs to be maintained.

**Pair-programming is NOT right for everyone**

Pair-programming is an activity that takes place outside of the comfort level of some engineers, and it cannot be forced upon them.  Deciding to engage in pair-programming needs to be a mutual decision of the [scrum team](https://www.mountaingoatsoftware.com/agile/scrum/roles/team), and the practice needs to be open to criticism within [Sprint Retrospectives](https://www.mountaingoatsoftware.com/agile/scrum/sprint-retrospective) for potential refinement.  It is best to gradually introduce the practice, as with every Agile concept, for those who are tentative on the idea.

There can also exist other issues within a team that make pair-programming a difficult undertaking.  Pair-programming puts two engineers in very close contact with one another, and can be problematic if relationship issues, or personal hygiene issues are present.

**Remote pair-programming**  

Pair-programming benefits immensely from team members being co-located.  When teams do not share the same workspace, difficulties such as delays in coordination, the integration of technical tools, internet connection speeds, and the possible need for additional technology to support pairing are introduced.  Remote pairing can add immensely to the existing overhead cost of pair-programming.

### Indicators of non-performance

**Lack of engagement**

Both engineers must be actively engaged throughout the pairing session in order to gain the benefits of pair-programming.  To mitigate potential distractions, some pairs agree to not check their phones or emails during the session, leaving that for breaks.  Many also use the [Pomodoro Technique](http://cirillocompany.de/pages/pomodoro-technique), to ensure that energized work and breaks take place at regular intervals during a pairing session.

**Silence**

If the driver is silently typing code without consulting the navigator, or the navigator is not providing insights, then something is awry. Pair-programming is about active and candid analysis of the existing code and all new modifications being made to it.  This is best performed through conversation.

**"Watch the Master"**

"Watch the Master" is a scenario that often occurs when one person in the pair is more experienced that the other.  A common situation for this phenomena is a senior engineer working with a novice engineer.  The senior engineer may skip what they think to be unnecessary explanation, while the novice engineer may feel to timid to ask questions or challenge the approach taken, deferring to the senior member of the pair.  This is similar to the aforementioned problem of silent disengagement, and does not provide the benefits of mentoring that pair-programming provides.

### Side-effects

**Loss of Confidence**

When first being introduced to pair-programming, some engineers feel that they lack the same understanding of their work than what is produced when they work as individuals.  This is a circumstance that is especially common for the novice programmer in a senior-novice pair.  

It is important within a pair-programming setting for each participant to be honest about their understanding before moving onto the next major phase.  This loss of confidence is in many ways a side-effect of pair-programming’s primary effect of reducing strong code-ownership in favor of collective code-ownership.  

Lack of confidence can also indicate of a lack of trust for their counterpart in a pair.  As individuals work together, it takes time for trust and mutual confidence to build.  Pair-programming can be a great exercise for improving rapport between team members, but it takes time and effort.

**Lack of code-ownership**

Related to the loss of confidence one might have about pair-programming is the perspective that it erodes code-ownership over implemented features.  [Code-ownership](https://martinfowler.com/bliki/CodeOwnership.html) is a nuanced concept, that has both meaning to engineerings and managers.

Code-ownership can be a source of pride for the engineer who implemented a feature as an individual contributor.  For managers, knowing the sole point-person for a portion of the code base is is useful when trying to put out fires.  Letting go of these landmarks in favor of a team-focused ownership concept can be a tough cultural change for an engineering group.

Two engineers being responsible for the code output of a user story may at first glance seem as though it reduces accountability and responsibility.    Reducing accountability or responsibility is NOT one of the goals of pair-programming; instead it is a tool to increase accountability of the entire team by moving the needle towards collective code-ownership.

Pair-programming, at least in the case of Jama, was a way to push us towards a culture of collective code-ownership, where every member of the team feels both responsible and capable of contributing towards the progression of the software, rather than particular individuals.  Having one engineer too tightly coupled to code they have written in the past is an organizational anti-pattern and a risk to the business.

## What's next?

For many engineers & software engineering organizations, pair-programming is a novel way of working that turns the commonplace individual-contributor mode of working on its head.

As I explained above, adopting it as a practice is not without it's challenges.  If you are still convinced after reading this post that it is something you would like to try, do so on as small of a scale as possible.  You might first try pair-programming on an individual level with a fellow team-member, and then branch out by trying it at a scrum-team level.  If you are feeling very confident, you might even try [mob-programming](http://mobprogramming.org/), an approach that involves the entire team.

***

A version of this [post](https://www.jamasoftware.com/blog/costs-challenges-and-common-pitfalls-of-pair-programming/) was originally published on the [Jama Software Developer Insights Blog](https://www.jamasoftware.com/blog/category/developer-insights/) on January 18th, 2017.

Jama Software is the developer of Jama Product Delivery Platform, a collaborative web-based application designed to help companies manage projects that relate to the development and introduction of products.
