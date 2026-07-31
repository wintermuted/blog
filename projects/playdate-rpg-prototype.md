---
layout: project-detail
title: Playdate RPG Prototype
permalink: /projects/playdate-rpg-prototype/
tagline: Turn-based RPG vertical slice for the Playdate handheld
status: Active prototype
role: Designer and Engineer
timeline: 2026-Present
project_type: game
project_links:
  - label: GitHub Repository
    url: https://github.com/wintermuted/playdate-rpg-prototype
tech_stack:
  - Lua
  - Playdate SDK
  - Desktop Lua tests
  - Shell scripts
---

## Overview

Playdate RPG Prototype is a combat-first vertical slice for the Playdate handheld. The project focuses on building a tight turn-based battle loop with strong architectural boundaries before expanding into a broader RPG.

## Problem

I wanted a focused way to explore Playdate development without overcommitting to world-building or content pipelines too early. The goal was to validate the core feel of combat, encounter flow, and save/load behavior in a constrained prototype.

## What I Built

The current prototype includes a title screen, a single battle encounter, victory and defeat states, speed-based turn order, and a single-slot save/load flow. It also keeps battle logic testable outside the Playdate runtime.

## Technical Architecture

The codebase is split by gameplay responsibility: models, systems, screens, UI, persistence, and data tables. Pure battle logic stays outside the Playdate API so unit tests can run in desktop Lua, while simulator-facing pieces are isolated to screen and UI layers.

## Key Decisions

I intentionally kept v0.1 narrow: one encounter loop, no world map, no progression systems, and no production art pass. That let me validate combat architecture and state-machine flow first.

## Challenges

The main challenge has been staying disciplined about scope. Constraining the prototype to a combat slice made architectural tradeoffs clearer and kept the testing story manageable.

## Outcomes

The project now has a repeatable build and simulator workflow, a clear module map, and a battle loop that can be expanded without rethinking the entire codebase.
