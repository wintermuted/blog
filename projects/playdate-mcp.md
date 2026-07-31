---
layout: project-detail
title: playdate-mcp
permalink: /projects/playdate-mcp/
tagline: MCP server for Playdate SDK development workflows
status: Active
role: Tooling Engineer
timeline: 2026-Present
project_type: agent
project_links:
  - label: GitHub Repository
    url: https://github.com/wintermuted/playdate-mcp
tech_stack:
  - TypeScript
  - MCP SDK
  - Zod
  - Node.js
---

## Overview

playdate-mcp is a Model Context Protocol server that gives AI agents direct access to Playdate development workflows. It exposes build, simulator, test, and metadata operations in a form that coding agents can call safely.

## Problem

There was no equivalent tool in the Playdate ecosystem for AI-native development workflows. I wanted a way for agents to build games, run the simulator, execute Lua tests, and inspect project files without treating everything as raw shell automation.

## What I Built

The server exposes tools for compiling a Playdate project, launching the simulator, running desktop Lua tests, surfacing structured build errors, and reading `pdxinfo` metadata. The result is a tighter feedback loop for Playdate-focused coding sessions.

## Technical Architecture

The project is a small TypeScript MCP server built on `@modelcontextprotocol/sdk` with Zod schemas for input validation. Each tool resolves paths, executes a well-scoped Playdate workflow, and returns structured text content that an agent can reason about.

## Key Decisions

I kept the initial tool surface narrow and practical: build, run, test, and inspect. That keeps the server immediately useful while preserving room to expand once the core workflows prove stable.

## Challenges

The hardest part is translating Playdate's local toolchain expectations into predictable agent-facing behavior. Strong path validation and structured error responses help keep failures understandable.

## Outcomes

playdate-mcp establishes a foundation for AI-assisted Playdate development and fills a gap that previously required ad hoc terminal scripting.
