---
title: Functional Programming
topic: programming
layout: page-wiki
---

## Contents 

1. [Introduction](#introduction)
2. [Main Concepts](#main-concepts)
    1. [First Class Functions](#first-class-functions)
    2. [Higher Order Functions (HOC)](#higher-order-functions)
    3. [Pure Functions](#pure-functions)
    4. [Recursion](#recursion)
    5. [Types](#types)
<!-- 3. [Functional Programming in ECMAScript]() -->
4. [Sources](#sources)

---

## Introduction
  
Functional programming is a [programming paradigm](https://en.wikipedia.org/wiki/Programming_paradigm) in which a program is written using __Functions__ (also called [subroutines](https://en.wikipedia.org/wiki/Subroutine#Disadvantages)) as it's primary means of expressing the desired behavior of the program.  

Functional programming is highly related to the concept of a [Function in Mathematics](https://en.wikipedia.org/wiki/Function_(mathematics)), and traces it's origin to [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus), as introduced by [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church), and further developed by [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) in the 20th Century.

[Purely functional programming](https://en.wikipedia.org/wiki/Purely_functional_programming), is a subset of the functional programming paradigm in which each function acts as a [deterministic](https://en.wikipedia.org/wiki/Deterministic_system) mathematical function and should produce an identical result when identical arguments are passed in, meaning that it cannot be affected by [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) or mutable [state](https://en.wikipedia.org/wiki/State_(computer_science)).

As a programming paradigm, Functional programming exists in numerous languages; some which are considered functional languages, use functions as a key feature of the language, and languages which support functional programming alongside other programming paradigms via added added features in subsequent releases.  

In this article I use Typescript as the example language.

---

## Main Concepts

Functional Programming contains a few concepts that are not present in [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) or [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming).  Despite this, functional programming can often be adapted for use in settings and languages that primarily cater to imperative and object-oriented use-cases.  

The main concepts of integral to functional programming are:

- First Class Functions
- Higher Order Functions
- Pure Functions
- Recursion
- Types

### First Class functions

[First Class functions](https://en.wikipedia.org/wiki/First-class_function) is a feature of languages supporting functional programming in which a function: 

1. Can be passed as an argument to another functions.
2. Can be assigned to a variable or stored in a datastructure.
3. (Optionally) can be written without being assigned a name.

#### 1. Passing an argument to another function.

Because Functions are First Class, meaning they can be used in the same ways as other types, they can also be passed as arguments to other functions.

In the example below, two functions definitions are passed as arguments to another function:

{% highlight typescript linenos %}
function addition(a: number, b: number): number {
  return a + b;
}

function subtraction(a: number, b: number): number {
  return a - b;
}

type MathOperation = (a: number, b: number): number;

function addAndSubtract(a: number, b: number, add: MathOperation, sub: MathOperation) {
  return add(a, b) * sub(a, b)
}

addAndSubtract(1, 2, addition, subtraction)
{% endhighlight %}

#### 2. Assignment of functions

Functions can be assigned to variables:

{% highlight typescript linenos %}
const addition = (a: number, b: number): number => {
  return a + b;
}
{% endhighlight %}

Functions can also be assigned as values in data structures:

{% highlight typescript linenos %}
const basicMathOperations = {
  addition(a: number, b: number): number => {
    return a + b;
  },
  subtraction(a: number, b: number): number => {
    return a - b;
  }
};

basicMathOperations.addition(1, 2);
// result: 3

basicMathOperations.subtraction(2, 1);
// result: 1
{% endhighlight %}

### Higher Order Functions

A Higher Order Function is a function that can take a function as an argument.

**Example:**
{% highlight typescript linenos %}
const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = numberList.map((i: number) => i + 1);
// result: [1, 2, 3, 4, 5, 7, 8, 9, 10]
{% endhighlight %}


<!-- ### Pure Functions (no side-effects)

### Recursion

### Types -->

---

## Functional Programming in ECMAScript

# ECMAScript

### Standard function

### Anonymous function

### Lambda function

### Functional Programming with data structures

### array.map
### array.filter

---

## Sources

**Wikipedia**
- [Function (mathematics)](https://en.wikipedia.org/wiki/Function_(mathematics))
- [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)
- [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus)
- [Programming Paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)
- [Subroutine](https://en.wikipedia.org/wiki/Subroutine#Disadvantages)
