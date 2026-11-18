---
layout: project-detail
title: Reporting Copilot Chat Integration
permalink: /projects/reporting-copilot-chat-integration/
case_study: true
featured_order: 6
work_category: ai-prototype
tagline: A prototype for exploring natural-language report requests.
role: Innovation lead
status: Prototype
timeline: 2025
project_links:
  - label: Unified Reporting UI
    url: /projects/unified-reporting-ui/
---

I prototyped an end-to-end chat flow for asking questions about advertising performance data in the reporting experience. The prototype explored how a natural-language request could become a structured query and a formatted response; it is not presented as a completed production feature.

## Problem and ownership

Report-building workflows can be difficult to navigate for people who are less familiar with the available fields and query options. The prototype explored a conversational entry point alongside the existing reporting experience.

## Decisions and tradeoffs

I designed the prompt and context approach and prototyped the flow from user input, through intent interpretation and a structured data query, to a formatted response. The work focused on testing the interaction pattern without implying that generated responses replaced the reporting workflow or its checks.

## Validation and outcome

The result was an end-to-end prototype that informed exploration of AI-assisted report building. Its status here is explicitly prototype work, not a claim of production deployment.

## Architecture

<figure id="reporting-copilot-prototype-flow" class="project-diagram project-diagram--compact">
  <pre class="mermaid">flowchart LR
    Prompt["Natural-language request"] --> Intent["Interpret request"]
    Intent --> Query["Structured report query"]
    Query --> Result["Formatted response"]
    Result -.-> Review["User reviews result"]</pre>
  <figcaption>Prototype interaction flow; no customer prompts, report content, internal services, or deployment topology are shown.</figcaption>
</figure>
