---
layout: post
title:  "Pair-programming at Jama Software"
date:   2016-11-03 19:57:46 -0700
categories: software programming pair-programming
---

Over the past two years Jama Software has taken steps to make pair-programming a greater part of our engineering culture.  Our product-development organization produces software according to the [Agile Software Development](https://www.agilealliance.org/agile101/) framework of [Scrum](https://www.scrumalliance.org/why-scrum), with regular iterations, and self-organizing teams.   

Within the agile principle of incremental refinement, we have continued to adopt practices that help us produce quality software.  The adoption of pair-programming emerged from from the ground-up, through initiative of individual contributors within the engineering team, but also enjoyed support from product & engineering leadership.  

Today pair-programming, along with test-driven development, read-by-refactoring, continuous integration, and self-organizing teams is an important part of our development efforts.  It has also found its way into our larger engineering culture, becoming part of the  [hiring](http://www.jamasoftware.com/blog/jamas-hiring-process-the-technical-interview/), and on-boarding processes.  Today, we have several [self-organizing](http://www.jamasoftware.com/blog/self-selecting-agile-teams/) teams in the engineering organization that have adopted pair-programming in their team working agreement, especially across [feature-development teams](https://less.works/less/structure/feature-teams.html).

# What is pair-programming?

[Pair-programming](https://www.agilealliance.org/glossary/pairing/) is a technique in Agile Software Development where two engineers share a single workstation.  In this technique, one engineer is the *driver*, whom has control of the mouse and keyboard to write the code, while the other serves as the *navigator*, reviewing the code that the other is writing while providing tactical and analytical feedback.  This pair will trade-off on these roles at regular intervals, giving each other equal chance to both execute on the work or direct it.

Pairs are typically formed between two individuals on the same [scrum team](https://www.mountaingoatsoftware.com/agile/scrum/team), and exist as long as it takes to complete a single [user story](https://www.mountaingoatsoftware.com/agile/user-stories).  Once the story is completed, team members are given the opportunity to reform a pair with another available team member, work on a task that requires a single engineer, or engage in a [slack time](http://www.jamesshore.com/Agile-Book/slack.html) activity.  

The ultimate goal of pair-programming is to provide a means to achieve better quality in software, while providing many secondary benefits that improve the ability of a team to continue delivering useful features to customers.

# Why we adopted pair-programming

The initial decision to adopt pair-programming came out of necessity.  As Jama scaled from a small startup to a venture-backed company with numerous customers, the engineering team grew.  Naturally, communication, coordination, and understanding the software became more difficult with the additional headcount.  In the early stages of a startup it is very common for silos to exist out of necessity; you only have so much financial runway, so many staff, and yet you still need to deliver valuable features to customers in a timely manner.  

Due to these set of circumstances, individual engineers are often assigned to implementing the entirety of a particular feature or component on their own.  Multiple engineers are assigned disparate tasks by the [Product Owner](https://www.mountaingoatsoftware.com/agile/scrum/product-owner), with the goal of coming up with a Minimum Viable Product.  While [code reviews](https://blog.codinghorror.com/code-reviews-just-do-it/) are utilized as a way to protect technical quality, they do not provide a means to ensure that the implications of a particular implementation are well-understood by the rest of the team.  

Code reviews often find typos and simple mistakes, but they do not provide the same level of insight into questions about the quality of software architecture and design.  Due to this, the engineer who wrote the code becomes inextricably bound to their work, despite employing all of the best-practices and techniques available to them.  

At worst, the engineer responsible for this code might feel that it belongs to them, and the organization might reinforce this by only allowing a certain developer to work on particular parts of the code-base.  This is an example of "[strong code ownership](http://martinfowler.com/bliki/CodeOwnership.html)."

The result of this is a situation where only a few individuals within your initial staff of trail-blazing engineers are capable of working on a particular portion of the code base.  Silos create a situation where if an engineer is sick, on vacation, or chooses to leave the organization can suddenly create the "platform inexperience" flavor of [technical debt](http://martinfowler.com/bliki/TechnicalDebt.html) for the software.  

Having a situation within your organization where a singular person is essential to it's continued progress is an immense liability, and makes it difficult to scale the product-development organization.  You can always choose to onboard an engineer unfamiliar with the code later on, but much of the context of the program is lost, even to the original author, and the same benefits will not be realized.

In many ways, pair-programming is one of the best techniques we have in our arsenal to fight the war against technical debt within our software.  Technical debt emerges inevitably within a software systems for myriad reasons.  Unmitigated, technical debt can cause development efforts to slow to a crawl, thereby delaying the release of valuable features to customers and endangering the viability of the business.  

# Benefits of pair-programming

For Jama, pair-programming was our solution to this immediate problem of having accumulated technical silos.  By utilizing pair-programming, we were able to steer ourselves closer to a model of "collective-code ownership", where more individuals had expertise in a particular area of the our systems.  In doing so, we lowered the risk associated with the long-term maintenance of Jama's software.  This is one of the obvious and primary benefits to pair-programming; the diffusion of knowledge.

Pair-programming has also provided our engineering organization with a variety of other benefits:  

- **Quality**: We have seen a marked increase the quality of our code.  Having two eyes on a problem and performing code-review as we progress is invaluable.  Some organizations have seen a [15% reduction](http://collaboration.csc.ncsu.edu/laurie/Papers/XPSardinia.PDF) in defect counts.  It has also allowed us to be more agile by discovering potential issues, and dealing with them appropriately, earlier on in the development process.
- **Satisfaction**:  Many engineers find pair-programming to be more engaging than programming alone, and feel more confident in solutions they came up with during the work.  It also provides an easy way to get to know your coworkers better while in the office.
- **On-boarding**: Pair-programming has become an essential part of our new-hire on-boarding process.  It provides a much more productive way for new hires to become familiar with a new code-base, acclimated into Jama's technical practices, and become socialized into their new team.  New hires work with
- **Integration**: Reduction in coordination efforts.  Because developers are paired up, code reviews become easier.  It also becomes easier for another pair to pick up a subsequent story if one of the participants have experience in the area of development.
- **Mentoring & Learning**: Pair-programming provides a good laboratory scenario for junior engineers to receive mentoring from senior engineers, and for senior engineers to develop mentoring skills.  It also provides an opportunity for engineers of similar skill levels to trade ideas drawing from their differing experiences.
- **Flexibility**: Better flexibility from interruptions: one developer can leave the pair to provide short-term help to an external issue (like a service outage) while the other developer continues working.

# Costs & common pitfalls of pair-programming

Pair-programming does not come without it's costs or risks.  Those unfamiliar with it or whom have never seen it adopted within an organization will often be initially skeptical for the obvious fact that two engineers are working on the same task.  

At first glance, this appears to be an incredibly inefficient use of software engineering talent.  It is indisputable that pair-programming adds an overhead to development efforts by increasing the man-hours required;  A team of 24 now becomes 12.  This is an acknowledged reality of pair-programming.  

The most commonly cited statistic indicates that it can add a [15% increase](http://www.cs.utexas.edu/users/mckinley/305j/pair-hcs-2006.pdf) to the time it takes to complete a task over an individual developer working on it.  However, our experience has shown that this additional cost is minimal in comparison to the benefits it provides our teams; better quality, better understanding, and lower risk.  It is these benefits that allow us to become more agile in the long-term.  In this sense, pair-programming is a strategic investment in the software and the team whom is helping improve and maintain it.

Implementing and performing pair-programing in an organization also has the potential to be counter-productive if not done appropriately.  Some common pitfalls include the following:

- **Lack of engagement**: Both programmers must be actively engaged throughout the pairing session in order to gain the benefits of pair-programming.  To mitigate potential distractions, some pairs agree to not check their phones or emails during the session, leaving that for breaks.  Many also use the [Pomodoro Technique](http://cirillocompany.de/pages/pomodoro-technique), to ensure that energized work and breaks take place at regular intervals during a pairing session.
- **Silence**: If the driver is silently typing code without consulting the navigator, or the navigator is not providing insights, then something is wrong. Pair-programming is about active and candid analysis of the existing code and all new modifications being made to it.  This is best performed through conversation.
- **"Watch the Master"**:  This is a scenario that often occurs when one person in the pair is more experienced that the other.  A common scenario is a senior engineer working with a novice engineer.  The senior engineer may skip what they think to be unnecessary explanation, and the novice engineer may feel to timid to ask questions or challenge the approach taken, deferring to the senior member of the pair.  This is similar to the aforementioned problem of silent disengagement, and does not provide the benefits of mentoring that pair-programming provides.
- **Remote pair-programming**:  Pair-programming benefits immensely from team members being colocated.  When teams are not colocated, difficulties such as delays in coordination, the integration of technical tools, internet connection speeds, and the possible need for additional technology to support pairing are introduced.  Remote pairing can add immensely to the existing overhead cost of pair-programming.
- **Pair-programming is not right for every task**:  When a task is simple enough, such as a dev-chore, a defect writeup, or a dive, pair-programming is not alway appropriate.  Adopting pair-programming in all cases is not efficient and can severely limit the productivity of the team and increase the costs of development efforts.
- **Pair-programming is not for everyone**: Pair-programming is an activity that takes place outside of the comfort level of some engineers, and it cannot be forced upon them.  Deciding to engage in pair-programming needs to be a mutual decision of the team, and the practice needs to be open to criticism within [Sprint Retrospectives](https://www.mountaingoatsoftware.com/agile/scrum/sprint-retrospective) for potential refinement.  It is best to gradually introduce the practice, as with every Agile concept, for those who are tentative on the idea.

# Is pair-programming right for you?

At Jama Software we have gained many benefits from pair-programming, but that doesn't mean that it is an easy task to adopt it as a practice.  For many software organizations, adopting an Agile Software Development mindset over a traditional waterfall project management approach can be a tough transition.  Pair-programming is no different, and benefits from having a well-established Agile culture within an organization.  

For us, pair-programming was a ground-up initiative, but it also took the support and trust of our product and engineering leadership team.  Without this support, it would not have been possible.  Today, pair-programming is used in our organization where appropriate and we are benefiting from it's positive effects.
