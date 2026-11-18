---
layout: project-detail
title: Copilot-assisted AKS migration
permalink: /projects/aks-migration/
case_study: true
featured_order: 1
work_category: platform-delivery
tagline: A practical migration path for applications with a fixed decommission deadline.
role: Principal software engineer and individual contributor
status: In progress
timeline: 2026–present
project_links:
  - label: All projects
    url: /projects/
  - label: Resume
    url: /resume
---

The migration spans approximately 100 applications across 16 repositories. I helped shape the platform approach and built Copilot-assisted workflows for the repetitive work; the migration remains in progress.

## Problem and ownership

The team needed to move applications from on-premises Kubernetes to Azure Kubernetes Service without turning a time-bound infrastructure migration into a simultaneous redesign of every service. I worked as a hands-on principal engineer with application and platform partners, rather than as the team's manager.

## Decision and tradeoffs

I shifted the initial multi-cluster-per-region proposal to one cluster per region. The simpler regional boundary avoided bundling a broader rearchitecture with hard on-premises decommission dates. It also respected partner commitments around horizontal services and existing assumptions about in-cluster scraping. The tradeoff was to defer more ambitious isolation and service restructuring rather than add that risk to the migration deadline.

I built an assisted workflow to examine existing application configurations and help produce migration artifacts, with checks and human review rather than treating generated output as automatically deployable. Shared build and release patterns support a gradual transition instead of requiring a single cutover.

## Validation and outcome

The workflow checks generated configuration and deployment artifacts before engineers review them. Deployment verification and approval gates are part of the migration process. These checks reduce repetitive work, but do not replace application-specific testing or operational judgment. The scope describes the migration target, not completed production rollout; no current deployment count is claimed here.

Read more about [pipeline performance]({{ site.baseurl }}/projects/ci-cd-performance/).

## Architecture

<figure id="aks-migration-workflow" class="project-diagram project-diagram--compact">
  <pre class="mermaid">flowchart LR
    Source["Existing application configuration"] --> Workflow["Copilot-assisted workflow"]
    Workflow --> Artifacts["Migration artifacts"]
    Artifacts --> Checks["Automated configuration checks"]
    Checks --> Review["Engineer review"]
    Review --> Release["Deployment verification and approval gates"]</pre>
  <figcaption>Migration workflow at a high level; internal systems and routing are omitted.</figcaption>
</figure>
