---
title: Refactoring
topic: programming
layout: page-wiki
---
Refactoring is the process of restructuring existing code without changing it's external behavior.  This is a process that is performed with the primary purpose of restructuring code to make it easier to understand and maintain.

The process of refactoring is idealized as small incremental changes to code, each of which is done with the purpose of maintaining the quality and functionality of the system that is being restructured.  Paired with other techniques, such as [unit testing](), this approach can produce fundamental restructuring in a methodical and safe way.

## Examples:

### Extract Variable:
Extract an expression to a named variable.

**Before:**

{% highlight typescript linenos %}
function calculate(a: number, b: number, c: number): number {
  return Math.floor(a) + Math.ceil(b) + Math.floor(c);
}
{% endhighlight %}

**After:**

{% highlight typescript linenos %}
function calculate(a: number, b: number, c: number): number {
  const resultA = Math.floor(a);
  const resultB = Math.ceil(b);
  const resultC = Math.floor(c);

  return resultA + resultB + resultC;
}
{% endhighlight %}


## Background

Refactoring as a technique was popularized by [Martin C. Fowler](https://martinfowler.com) in his book 2000 book [Refactoring](https://martinfowler.com).  Over the two decades that have passed since its publishing, it's become a well known technique, however it's origins come from computer science & mathematics and the related concept of factoring and decomposition of functional models.

## Prerequisites to refactoring

Understanding computer science & mathematical concepts is not essential to the practice of refactoring; however it does require some sense of programming fundamentals & decent sense for the logic of the code you apply this technique to.  

Refactoring blindly doesn't magically lead to better code.  Analysis and awareness are an important part of the process.  Breaking up the act of analysis & change into small chunks of effort helps reduce the mental load of understanding a complex program, and makes it possible for 

## How to refactor

There are a large number of possible refactorings you can do on code.  Which refactoring you use is going to depend on the type of code you are working with, and what you are aiming to achieve. 

Martin Fowler's Refactoring microsite contains a catalog of the potential refactorings you can apply to different types of situations.  There are a wide range of options, covering general purpose, object-oriented, and functional paradigms.

## Additional Reading
- [Refactoring.com](https://refactoring.com) - A microsite for Martin Fowler's Refactoring book