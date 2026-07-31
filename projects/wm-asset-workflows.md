---
layout: project-detail
title: wm-asset-workflows
permalink: /projects/wm-asset-workflows/
tagline: SVG-first authoring workflow for logos, glyphs, and diagram previews
status: Active
role: Workflow designer and engineer
timeline: 2026-Present
project_type: tooling
project_links:
  - label: GitHub Repository
    url: https://github.com/wintermuted/wm-asset-workflows
tech_stack:
  - Node.js
  - Python
  - Playwright
  - Pillow
  - Mermaid
---

## Overview

wm-asset-workflows is a standalone pipeline for designing SVG logos and glyphs, previewing markdown-driven Mermaid diagrams, generating deterministic PNG outputs, and capturing browser screenshots for review.

## Problem

I wanted an asset workflow that treated SVG as the editable source of truth while still making preview, PNG generation, and review artifacts easy to produce. Existing flows often split authoring and review across too many disconnected tools.

## What I Built

The repo supports SVG authoring, asset manifest registration, markdown-based diagram specs, a browser preview app, deterministic PNG generation, and screenshot capture in light and dark themes.

## Technical Architecture

Node scripts orchestrate preview serving, spec indexing, and screenshot capture; Python handles deterministic image generation with Pillow; Mermaid specs are compiled into previewable index data; and the preview UI provides a consistent review surface.

## Key Decisions

I centered the workflow on source SVG files and scripted outputs rather than manual export steps. That keeps the pipeline reproducible and makes iterative design changes easier to review.

## Challenges

The main challenge is keeping the workflow flexible enough for both logos and diagrams while preserving deterministic outputs. The split between manifest-driven assets and spec-driven diagrams helps maintain that balance.

## Outcomes

The project now provides a repeatable authoring loop for design assets and review screenshots, with tooling tailored for agent-assisted workflows inside VS Code.
