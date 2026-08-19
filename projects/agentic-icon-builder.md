---
layout: project-detail
title: Agentic Icon Builder
permalink: /projects/agentic-icon-builder/
header_logo: /assets/img/projects/agentic-icon-builder/agentic-icon-builder-mark-v2.svg
tagline: Agentic workspace for designing, inspecting, and exporting SVG icon systems
status: Active
role: Workflow designer and engineer
timeline: 2026-Present
project_type: web-app
project_links:
  - label: GitHub Repository
    url: https://github.com/wintermuted/wm-asset-workflows
tech_stack:
  - Node.js
  - JavaScript
  - npm Workspaces
  - Python
  - Playwright
  - Pillow
  - Mermaid
  - Lucide
  - "@wintermuted/ui-theme"
screenshots:
  - src: /assets/img/projects/agentic-icon-builder/projects-home.png
    alt: Agentic Icon Builder projects home showing project cards and asset counts
    caption: Multi-project workspace with per-project asset counts
  - src: /assets/img/projects/agentic-icon-builder/project-detail.png
    alt: Project detail view with steering source material and web and app icon slots
    caption: Steering source material and web and app icon slots
  - src: /assets/img/projects/agentic-icon-builder/asset-editor.png
    alt: Asset editor showing SVG diagnostics, canvas, and the element editor layer list
    caption: SVG diagnostics, canvas, and layer-level element editor
  - src: /assets/img/projects/agentic-icon-builder/size-comparison.png
    alt: Size comparison grid rendering the same icon from 16px through 512px
    caption: Size comparison from 16px to 512px in a single pass
  - src: /assets/img/projects/agentic-icon-builder/canvas-grid.png
    alt: Canvas with grid overlay enabled and configurable grid spacing
    caption: Grid overlay with configurable spacing and snap-to-grid
  - src: /assets/img/projects/agentic-icon-builder/asset-editor-dark.png
    alt: Asset editor rendered in dark theme
    caption: Dark theme for evaluating marks on dark surfaces
---

## Overview

Agentic Icon Builder (formerly `wm-asset-workflows`) is an agentic workspace for designing icon and logo systems where SVG stays the editable source of truth. It combines a prompt-driven authoring loop in VS Code Copilot Chat with a browser app for inspecting, editing, and exporting the results.

What started as a small SVG-and-PNG pipeline has grown into a full editor: a multi-project workspace, a layer-aware SVG element editor, palette and icon-slot management, reference-image grounding, and deterministic export and capture.

## Problem

Icon work has an awkward middle step. Generating a mark is easy; knowing whether it actually *works* is not. A logo that reads well at 512px can turn to mush at 16px, and the tools that answer that question usually live somewhere other than the tools that create the asset.

I wanted one surface where I could author a mark by prompt, immediately see it across every real target size, inspect its underlying geometry, fix it in place, and export deterministically — without exporting to another app and losing the SVG as the source of truth.

## What I Built

**Multi-project workspace.** Projects are first-class. The home view lists each project with its asset count, and new projects are scaffolded server-side, including directory layout and manifest wiring. Projects can be renamed after the fact.

**Prompt-driven authoring.** The `/create-svg-asset` prompt interviews you for design intent, generates the SVG, registers it in the asset manifest, and runs the pipeline. A sample-prompt carousel in the UI seeds that loop with concrete starting points.

**Steering source material.** Reference images can be uploaded per project to ground generation, so variants stay visually consistent with an existing brand rather than drifting each time.

**Web and app icon slots.** Named, purpose-specific slots — favicon, web app icon, logo mark, wordmark, social preview — each describing where the asset is actually used, so a project's icon coverage is legible at a glance.

**SVG element editor.** The asset detail view is a real editor. A layer tree lists every primitive with fill and opacity, supports reordering and combining layers, and adds new elements from a shape picker. Geometry fields and transform-matrix math allow precise adjustment, with per-layer highlighting to keep selection unambiguous.

**Diagnostics and inspection.** Each asset reports viewBox, source size, accessibility metadata, element and path counts, subpaths, path commands, groups, effects, and file size. The viewBox is editable inline.

**Size and grid evaluation.** A comparison grid renders the same mark across twenty target sizes from 16px to 512px simultaneously. A configurable grid overlay with snap-to-grid supports alignment work directly on the canvas.

**Palettes.** Assets carry a derived palette, and colors can be promoted to a project palette via a custom picker, keeping a family of marks on a shared set of values.

**Deterministic export and capture.** Pillow generates reproducible PNG output; Playwright captures light and dark review screenshots. A single `workflow:logo` command runs spec indexing, PNG generation, and capture in sequence.

## Technical Architecture

The repo is an npm workspaces monorepo with package-aligned boundaries. `preview-app` holds the browser application, `preview-server` runs the HTTP server and handles scaffolding, grounding, manifest, and reload concerns, `workflows` owns spec indexing and screenshot capture, and `image-generation` owns the Pillow generators and palette analysis.

The server exposes narrow endpoints for the mutating operations — project scaffolding and rename, grounding image upload, and project color management — so the browser app can persist changes back to disk rather than holding them in memory. The app is a dependency-light vanilla JavaScript client styled with `@wintermuted/ui-theme` and Lucide icons, using hash-based deep links so any project, asset, or source image is directly addressable.

Mermaid specs are compiled from markdown into a preview index, keeping architecture diagrams in the same review surface as the brand assets.

## Key Decisions

Keeping SVG as the canonical source was the constraint everything else followed from. Scripts never overwrite `assets/svg/`, and `outputs/` is treated as disposable generated content. That means any generated artifact can be thrown away and rebuilt, which is what makes the loop safe to iterate in.

Building the editor into the preview app rather than deferring to a general-purpose vector tool was the other significant call. A general tool would be more powerful in isolation, but it would break the loop — the value here is that inspection, correction, and export all happen against the same file the agent just wrote.

Adopting npm workspaces early established package boundaries while keeping existing entrypoints and public commands stable, so the structure could evolve without a second migration.

## Challenges

The hardest part was scope discipline. Once the app had a layer tree and geometry fields, it was tempting to keep building toward a full vector editor. I kept the element editor deliberately focused on the operations icon work actually needs — reorder, combine, adjust geometry, adjust color — rather than chasing feature parity with tools that solve a different problem.

Balancing agent-generated output against manual correction also took iteration. The answer was making the manual path cheap: if fixing a generated asset takes seconds, imperfect generation stops being a blocker.

## Outcomes

The project is now a working authoring loop rather than a script collection. I can describe a mark in Copilot Chat, watch it appear in the workspace, immediately check it at every size it will ship at, correct its geometry in place, and export deterministic PNGs and review screenshots — all against a single SVG source of truth.

It currently manages several brand and product icon sets, and the rename from `wm-asset-workflows` to Agentic Icon Builder reflects that shift: from a pipeline that processed assets to a tool that helps design them.
