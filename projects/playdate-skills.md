---
layout: project-detail
title: playdate-skills
permalink: /projects/playdate-skills/
tagline: Structured AI skill library for Playdate SDK development
status: Active
role: Tooling and documentation author
timeline: 2026-Present
project_type: agent
project_links:
  - label: GitHub Repository
    url: https://github.com/wintermuted/playdate-skills
tech_stack:
  - Markdown
  - YAML frontmatter
  - Playdate SDK docs
  - Smithery
---

## Overview

playdate-skills is a curated library of AI skill files for Playdate SDK development. It packages domain knowledge into reusable `SKILL.md` units that can be consumed by GitHub Copilot or Smithery-compatible agents.

## Problem

General-purpose coding agents often miss the conventions and constraints that matter in Playdate projects. I wanted a reusable way to teach agents Playdate-specific build workflows, runtime patterns, and architectural norms.

## What I Built

The repository includes focused skills for Playdate core SDK behavior, build and simulator workflows, and game architecture guidance. Each skill is structured to trigger when a user asks for related help.

## Technical Architecture

Each skill lives in its own directory with a `SKILL.md` file and optional reference material. The format is lightweight but deliberate: frontmatter controls triggering, while the markdown content provides scoped operational guidance.

## Key Decisions

I kept each skill narrow rather than creating one large Playdate guide. That improves trigger quality and makes each skill easier to validate and maintain.

## Challenges

The main challenge is balancing specificity with reuse. Skills need to be detailed enough to help an agent make better decisions, but narrow enough that they trigger only when appropriate.

## Outcomes

The result is a reusable Playdate knowledge layer that complements live tooling like playdate-mcp and improves the quality of AI-assisted development sessions.
