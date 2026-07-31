---
layout: project-detail
title: Game of Life
permalink: /projects/game-of-life/
tagline: Interactive cellular automata playground
status: Active
role: Designer and Engineer
timeline: 2025-Present
project_type: web-app
header_logo: /assets/img/projects/game-of-life/gol-mark.svg
devlog_tag: game-of-life
project_links:
  - label: Live Demo
    url: https://wintermuted.github.io/game-of-life/
  - label: GitHub Repository
    url: https://github.com/wintermuted/game-of-life
tech_stack:
  - TypeScript
  - Nx
  - React
  - Vite
  - Vitest
  - HTML5 Canvas
screenshots:
  - src: /assets/img/projects/game-of-life/game-of-life-dark-demo.gif
    alt: 15-second animated Game of Life demo in dark mode showing simulation controls, live evolution, and panel switching
    caption: Dark mode animated demo (15s)
  - src: /assets/img/projects/game-of-life/game-of-life-dark-patterns.png
    alt: Game of Life in dark mode with the patterns tab open
    caption: Dark mode patterns view
  - src: /assets/img/projects/game-of-life/game-of-life-dark-rules.png
    alt: Game of Life in dark mode with the rules tab open
    caption: Dark mode rules view
  - src: /assets/img/projects/game-of-life/game-of-life-dark-running.png
    alt: Game of Life in dark mode while simulation is running
    caption: Dark mode running simulation
---

## Overview

Game of Life is an interactive cellular automata playground built to explore algorithmic simulation and front-end performance together. I used Conway's Game of Life as a known problem space, then treated the project like a production-style app with a modular architecture, automated tests, and continuous deployment to GitHub Pages.

### Key Features

I built a playable simulation app with controls, diagnostics, and pattern workflows:

- Start, pause, single-step, reset, and speed controls for generation playback.
- Pattern loading and custom board editing for quick experimentation.
- URL state sharing so current board state can be copied and reopened.
- Rule toggles (survival/birth variants) to inspect behavior changes.
- Stats and diagnostics (live cells, births, deaths, generations) surfaced during execution.
- Theming and localization support in the app shell for a more complete UX.

## Conway's Game of Life

### Rules

The universe of the Game of Life is [an infinite, two-dimensional orthogonal grid of square](https://en.wikipedia.org/wiki/Square_tiling) *cells*, each of which is in one of two possible states, *live* or *dead* (or *populated* and *unpopulated*, respectively). Every cell interacts with its eight *neighbours* (its [Moore neighborhood](https://en.wikipedia.org/wiki/Moore_neighborhood)), which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

<ol class="project-life-rules-list" aria-label="Rules table of contents">
  <li><a href="#rule-underpopulation">Underpopulation</a></li>
  <li><a href="#rule-survival">Survival</a></li>
  <li><a href="#rule-overpopulation">Overpopulation</a></li>
  <li><a href="#rule-reproduction">Reproduction</a></li>
</ol>

<div class="project-life-color-key" aria-label="Rules color key">
  <strong>Game state key</strong>
  <ul>
    <li><span class="project-life-color-key-swatch live" aria-hidden="true"></span>Live cell</li>
    <li><span class="project-life-color-key-swatch dead" aria-hidden="true"></span>Dead cell</li>
    <li><span class="project-life-color-key-swatch birth" aria-hidden="true"></span>Birth (becomes live)</li>
    <li><span class="project-life-color-key-swatch death" aria-hidden="true"></span>Death (becomes dead)</li>
  </ul>
</div>

<a id="rule-underpopulation"></a>
#### 1. Underpopulation

Any live cell with fewer than two live neighbours dies, as if by underpopulation.

<div class="project-life-rule-examples" aria-label="Underpopulation examples">
  <article class="project-life-transition-card">
    <h5>Two neighboring live cells die from underpopulation.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>An isolated live cell dies immediately from underpopulation.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>A horizontal pair dies because each cell has too few neighbors.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="death"></span><span class="death"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>
</div>

<a id="rule-survival"></a>
#### 2. Survival

Any live cell with two or three live neighbours lives on to the next generation.

<div class="project-life-rule-examples" aria-label="Survival examples">
  <article class="project-life-transition-card">
    <h5>A blinker rotates while the center cell survives.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
          <span class="birth"></span><span class="live"></span><span class="birth"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>An L-shape grows into a stable 2x2 block.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="birth"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>A 2x2 block remains stable across generations.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>
</div>

<a id="rule-overpopulation"></a>
#### 3. Overpopulation

Any live cell with more than three live neighbours dies, as if by overpopulation.

<div class="project-life-rule-examples" aria-label="Overpopulation examples">
  <article class="project-life-transition-card">
    <h5>A plus pattern overpopulates at the center and expands outward.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="birth"></span><span class="live"></span><span class="birth"></span>
          <span class="live"></span><span class="death"></span><span class="live"></span>
          <span class="birth"></span><span class="live"></span><span class="birth"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="live"></span><span class="live"></span><span class="live"></span>
          <span class="live"></span><span class="dead"></span><span class="live"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>A dense cluster sheds overcrowded center cells.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="live"></span><span class="death"></span><span class="birth"></span>
          <span class="death"></span><span class="death"></span><span class="live"></span>
          <span class="birth"></span><span class="live"></span><span class="birth"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="live"></span><span class="dead"></span><span class="live"></span>
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>A crowded corner cluster loses overpopulated cells.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="live"></span><span class="live"></span>
          <span class="live"></span><span class="live"></span><span class="live"></span>
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="birth"></span><span class="death"></span><span class="live"></span>
          <span class="live"></span><span class="death"></span><span class="death"></span>
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="live"></span><span class="dead"></span><span class="live"></span>
          <span class="live"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
        </div>
      </div>
    </div>
  </article>
</div>

<a id="rule-reproduction"></a>
#### 4. Reproduction

Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

<div class="project-life-rule-examples" aria-label="Reproduction examples">
  <article class="project-life-transition-card">
    <h5>Three neighbors reproduce a new center cell.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="live"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
          <span class="live"></span><span class="birth"></span><span class="dead"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="live"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>A diagonal trio reproduces at center while isolated cells die.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="live"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="death"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="birth"></span><span class="death"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>

  <article class="project-life-transition-card">
    <h5>The mirrored diagonal trio reproduces at center while isolated cells die.</h5>
    <div class="project-life-transition-row">
      <div class="project-life-state">
        <span>Before</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="live"></span>
          <span class="live"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Transform</span>
        <div class="project-life-rule-board">
          <span class="dead"></span><span class="dead"></span><span class="death"></span>
          <span class="death"></span><span class="birth"></span><span class="dead"></span>
          <span class="dead"></span><span class="death"></span><span class="dead"></span>
        </div>
      </div>
      <span class="project-life-transition-arrow" aria-hidden="true">→</span>
      <div class="project-life-state">
        <span>Final</span>
        <div class="project-life-rule-board project-life-rule-board--final">
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
          <span class="dead"></span><span class="live"></span><span class="dead"></span>
          <span class="dead"></span><span class="dead"></span><span class="dead"></span>
        </div>
      </div>
    </div>
  </article>
</div>

<script>
  (function () {
    var STEP_INTERVAL_MS = 1000;
    var LOOP_GENERATIONS = 10;
    var SOURCE_GRID_SIZE = 3;
    var DISPLAY_GRID_SIZE = 9;

    function cloneGrid(grid) {
      return grid.map(function (row) {
        return row.slice();
      });
    }

    function expandBoardToDisplayGrid(boardEl) {
      if (!boardEl) return;

      var cells = Array.from(boardEl.querySelectorAll('span'));
      if (cells.length !== SOURCE_GRID_SIZE * SOURCE_GRID_SIZE) return;

      var source = [];
      for (var row = 0; row < SOURCE_GRID_SIZE; row += 1) {
        source[row] = [];
        for (var col = 0; col < SOURCE_GRID_SIZE; col += 1) {
          source[row][col] = cells[row * SOURCE_GRID_SIZE + col].className;
        }
      }

      boardEl.innerHTML = '';
      var rowOffset = Math.floor((DISPLAY_GRID_SIZE - SOURCE_GRID_SIZE) / 2);
      var colOffset = Math.floor((DISPLAY_GRID_SIZE - SOURCE_GRID_SIZE) / 2);

      for (var outRow = 0; outRow < DISPLAY_GRID_SIZE; outRow += 1) {
        for (var outCol = 0; outCol < DISPLAY_GRID_SIZE; outCol += 1) {
          var sourceRow = outRow - rowOffset;
          var sourceCol = outCol - colOffset;
          var cell = document.createElement('span');
          if (
            sourceRow >= 0 &&
            sourceRow < SOURCE_GRID_SIZE &&
            sourceCol >= 0 &&
            sourceCol < SOURCE_GRID_SIZE
          ) {
            cell.className = source[sourceRow][sourceCol];
          } else {
            cell.className = 'dead';
          }
          boardEl.appendChild(cell);
        }
      }
    }

    function parseBeforeGrid(boardEl) {
      var cells = Array.from(boardEl.querySelectorAll('span'));
      var flat = cells.map(function (cell) {
        return cell.classList.contains('live') ? 1 : 0;
      });
      var size = Math.sqrt(flat.length);
      var grid = [];
      for (var row = 0; row < size; row += 1) {
        grid.push(flat.slice(row * size, row * size + size));
      }
      return grid;
    }

    function nextGeneration(grid) {
      var size = grid.length;

      function neighbors(row, col) {
        var count = 0;
        for (var dr = -1; dr <= 1; dr += 1) {
          for (var dc = -1; dc <= 1; dc += 1) {
            if (dr === 0 && dc === 0) continue;
            var rr = row + dr;
            var cc = col + dc;
            if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
            count += grid[rr][cc];
          }
        }
        return count;
      }

      var next = [];
      for (var row = 0; row < size; row += 1) {
        next[row] = [];
        for (var col = 0; col < size; col += 1) {
          var alive = grid[row][col] === 1;
          var count = neighbors(row, col);
          next[row][col] = alive
            ? (count === 2 || count === 3 ? 1 : 0)
            : (count === 3 ? 1 : 0);
        }
      }

      return next;
    }

    function hasLiveCells(grid) {
      for (var row = 0; row < grid.length; row += 1) {
        for (var col = 0; col < grid[row].length; col += 1) {
          if (grid[row][col] === 1) return true;
        }
      }
      return false;
    }

    function renderGrid(boardEl, grid) {
      var size = grid.length;
      boardEl.innerHTML = '';
      for (var row = 0; row < size; row += 1) {
        for (var col = 0; col < size; col += 1) {
          var cell = document.createElement('span');
          cell.className = grid[row][col] === 1 ? 'live' : 'dead';
          boardEl.appendChild(cell);
        }
      }
    }

    function createEmptyGrid(size) {
      var grid = [];
      for (var row = 0; row < size; row += 1) {
        grid[row] = [];
        for (var col = 0; col < size; col += 1) {
          grid[row][col] = 0;
        }
      }
      return grid;
    }

    function createPatternGrid(patternName) {
      var seeds = {
        block: [[0, 0], [0, 1], [1, 0], [1, 1]],
        beehive: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2]],
        loaf: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 3], [3, 2]],
        boat: [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1]],
        tub: [[0, 1], [1, 0], [1, 2], [2, 1]],
        pond: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 3], [3, 1], [3, 2]],
        blinker: [[0, 1], [1, 1], [2, 1]],
        toad: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]],
        beacon: [[0, 0], [0, 1], [1, 0], [2, 3], [3, 2], [3, 3]],
        glider: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
        lwss: [[0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]],
        'r-pentomino': [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]],
        diehard: [[0, 6], [1, 0], [1, 1], [2, 1], [2, 5], [2, 6], [2, 7]],
        acorn: [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]]
      };

      var coords = seeds[patternName] || seeds.block;
      var grid = createEmptyGrid(DISPLAY_GRID_SIZE);
      var maxRow = 0;
      var maxCol = 0;

      coords.forEach(function (pair) {
        if (pair[0] > maxRow) maxRow = pair[0];
        if (pair[1] > maxCol) maxCol = pair[1];
      });

      var height = maxRow + 1;
      var width = maxCol + 1;
      var rowOffset = Math.floor((DISPLAY_GRID_SIZE - height) / 2);
      var colOffset = Math.floor((DISPLAY_GRID_SIZE - width) / 2);

      coords.forEach(function (pair) {
        var row = rowOffset + pair[0];
        var col = colOffset + pair[1];
        if (row >= 0 && row < DISPLAY_GRID_SIZE && col >= 0 && col < DISPLAY_GRID_SIZE) {
          grid[row][col] = 1;
        }
      });

      return grid;
    }

    function attachSimulation(cardEl) {
      var states = cardEl.querySelectorAll('.project-life-state');
      if (states.length < 2) return;
      var row = cardEl.querySelector('.project-life-transition-row');

      var beforeBoard = states[0].querySelector('.project-life-rule-board');
      var transformState = states[1];
      if (!beforeBoard || !transformState || !row || row.querySelector('.project-life-mini-sim')) return;

      transformState.classList.add('project-life-state--transform');

      var simWrap = document.createElement('div');
      simWrap.className = 'project-life-mini-sim';

      var simLabel = document.createElement('span');
      simLabel.className = 'project-life-mini-sim-label';
      simLabel.textContent = 'Animation (1s)';

      var simBoard = document.createElement('div');
      simBoard.className = 'project-life-rule-board project-life-rule-board--animated';

      var simBoardWrap = document.createElement('div');
      simBoardWrap.className = 'project-life-mini-sim-board-wrap';

      var gameOverOverlay = document.createElement('span');
      gameOverOverlay.className = 'project-life-mini-sim-game-over';
      gameOverOverlay.textContent = 'Game Over';

      simBoardWrap.appendChild(simBoard);
      simBoardWrap.appendChild(gameOverOverlay);

      var simControls = document.createElement('div');
      simControls.className = 'project-life-mini-sim-controls';

      var simButtons = document.createElement('div');
      simButtons.className = 'project-life-mini-sim-buttons';

      var toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'project-life-mini-sim-button';
      toggleButton.textContent = 'Pause';

      var restartButton = document.createElement('button');
      restartButton.type = 'button';
      restartButton.className = 'project-life-mini-sim-button';
      restartButton.textContent = 'Restart';

      var simCount = document.createElement('span');
      simCount.className = 'project-life-mini-sim-count';

      simButtons.appendChild(toggleButton);
      simButtons.appendChild(restartButton);
      simControls.appendChild(simButtons);
      simControls.appendChild(simCount);

      simWrap.appendChild(simLabel);
      simWrap.appendChild(simBoardWrap);
      simWrap.appendChild(simControls);
      row.appendChild(simWrap);

      var initialState = parseBeforeGrid(beforeBoard);
      var state = cloneGrid(initialState);
      var generation = 0;
      var isPaused = false;
      var pendingResetAfterExtinction = false;

      function updateGenerationCount() {
        simCount.textContent = 'Generation: ' + generation;
      }

      function restartSimulation() {
        state = cloneGrid(initialState);
        generation = 0;
        pendingResetAfterExtinction = false;
        simBoardWrap.classList.remove('is-game-over');
        renderGrid(simBoard, state);
        updateGenerationCount();
      }

      function tick() {
        if (isPaused) return;

        if (pendingResetAfterExtinction) {
          restartSimulation();
          return;
        }

        if (generation >= LOOP_GENERATIONS) {
          restartSimulation();
          return;
        } else {
          var next = nextGeneration(state);

          if (!hasLiveCells(next)) {
            state = next;
            generation += 1;
            pendingResetAfterExtinction = true;
            simBoardWrap.classList.add('is-game-over');
            renderGrid(simBoard, state);
            updateGenerationCount();
            return;
          }

          simBoardWrap.classList.remove('is-game-over');
          state = next;
          generation += 1;
        }

        renderGrid(simBoard, state);
        updateGenerationCount();
      }

      toggleButton.addEventListener('click', function () {
        isPaused = !isPaused;
        toggleButton.textContent = isPaused ? 'Play' : 'Pause';
      });

      restartButton.addEventListener('click', function () {
        restartSimulation();
      });

      renderGrid(simBoard, state);
      updateGenerationCount();

      window.setInterval(tick, STEP_INTERVAL_MS);
    }

    function attachPatternPreview(previewEl) {
      var board = previewEl.querySelector('.project-life-rule-board');
      var count = previewEl.querySelector('.project-life-mini-sim-count');
      var patternName = previewEl.getAttribute('data-pattern') || 'block';
      if (!board || !count) return;

      var initialState = createPatternGrid(patternName);
      var state = cloneGrid(initialState);
      var generation = 0;

      function updateGenerationCount() {
        count.textContent = 'Generation: ' + generation;
      }

      renderGrid(board, state);
      updateGenerationCount();

      window.setInterval(function () {
        if (generation >= LOOP_GENERATIONS) {
          state = cloneGrid(initialState);
          generation = 0;
        } else {
          var next = nextGeneration(state);
          if (!hasLiveCells(next)) {
            state = cloneGrid(initialState);
            generation = 0;
          } else {
            state = next;
            generation += 1;
          }
        }
        renderGrid(board, state);
        updateGenerationCount();
      }, STEP_INTERVAL_MS);
    }

    function initRuleCardAnimations() {
      var allBoards = document.querySelectorAll('.project-life-rule-board');
      allBoards.forEach(expandBoardToDisplayGrid);

      var cards = document.querySelectorAll('.project-life-transition-card');
      cards.forEach(attachSimulation);

      var patternPreviews = document.querySelectorAll('.project-life-pattern-preview');
      patternPreviews.forEach(attachPatternPreview);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRuleCardAnimations);
    } else {
      initRuleCardAnimations();
    }
  })();
</script>

### Patterns

Patterns are organized using the same category model as the live app pattern library, with examples aligned to the Conway wiki taxonomy.

#### Still Life

Still lifes are stable patterns that remain unchanged from one generation to the next.

<div class="project-patterns-table-wrap">
  <table class="project-patterns-table">
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Notes</th>
        <th>Animated Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Block</td><td>Minimal 2x2 stable structure.</td><td><div class="project-life-pattern-preview" data-pattern="block"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Beehive</td><td>Common 6-cell still life.</td><td><div class="project-life-pattern-preview" data-pattern="beehive"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Loaf</td><td>Stable asymmetric 7-cell form.</td><td><div class="project-life-pattern-preview" data-pattern="loaf"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Boat</td><td>Compact 5-cell stable pattern.</td><td><div class="project-life-pattern-preview" data-pattern="boat"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Tub</td><td>4-cell diamond still life.</td><td><div class="project-life-pattern-preview" data-pattern="tub"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Pond</td><td>Larger stable hollow shape.</td><td><div class="project-life-pattern-preview" data-pattern="pond"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
    </tbody>
  </table>
</div>

#### Oscillator

Oscillators repeat a fixed cycle of states over a predictable period.

<div class="project-patterns-table-wrap">
  <table class="project-patterns-table">
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Notes</th>
        <th>Animated Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Blinker</td><td>Period-2 line flip.</td><td><div class="project-life-pattern-preview" data-pattern="blinker"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Toad</td><td>Period-2 six-cell oscillator.</td><td><div class="project-life-pattern-preview" data-pattern="toad"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Beacon</td><td>Period-2 corner interaction.</td><td><div class="project-life-pattern-preview" data-pattern="beacon"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
    </tbody>
  </table>
</div>

#### Spaceship

Spaceships translate across the grid while repeating their shape after a set number of generations.

<div class="project-patterns-table-wrap">
  <table class="project-patterns-table">
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Notes</th>
        <th>Animated Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Glider</td><td>Canonical diagonal spaceship.</td><td><div class="project-life-pattern-preview" data-pattern="glider"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>LWSS</td><td>Lightweight orthogonal spaceship.</td><td><div class="project-life-pattern-preview" data-pattern="lwss"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
    </tbody>
  </table>
</div>

#### Methuselah

Methuselahs begin as small seeds but evolve for many generations before stabilizing or vanishing.

<div class="project-patterns-table-wrap">
  <table class="project-patterns-table">
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Notes</th>
        <th>Animated Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>R-pentomino</td><td>Classic long-running seed.</td><td><div class="project-life-pattern-preview" data-pattern="r-pentomino"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Diehard</td><td>Dies out after many generations.</td><td><div class="project-life-pattern-preview" data-pattern="diehard"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
      <tr><td>Acorn</td><td>Small seed with long evolution.</td><td><div class="project-life-pattern-preview" data-pattern="acorn"><div class="project-life-rule-board"></div><span class="project-life-mini-sim-count">Generation: 0</span></div></td></tr>
    </tbody>
  </table>
</div>

Additional wiki categories for advanced exploration:

- Guns: Gosper glider gun, Simkin glider gun
- Puffers: puffer train variants
- Breeders: puffer-type breeder constructions

## Overview

<!--tab:architecture-->

The Game of Life project is structured as a layered monorepo: a deterministic simulation core and a separate React application shell for rendering and interaction. This separation keeps rule logic testable, keeps UI iteration fast, and allows performance tuning of simulation and rendering paths independently.

## Planning

### Problem Space

I wanted a project that did more than render a toy grid. The intent was to build an implementation that demonstrates practical engineering decisions around correctness, performance, and maintainability in a simulation-driven UI.

### Architecture Goals

1. Preserve deterministic, testable simulation behavior independent of UI code.
2. Use sparse-state data structures so work scales with active cells instead of full-grid size.
3. Provide interactive controls and shareable state without coupling product UX to rule execution.
4. Keep package boundaries explicit so simulation and presentation layers can evolve independently.

### Key Decisions

Key decisions that shaped the project:

- **Monorepo split (`core` + `app`)**: made game logic independently testable and reusable.
- **Sparse grid model**: optimized for typical Game of Life patterns where most cells are dead.
- **Canvas-oriented rendering path**: chosen to better support larger boards than naive DOM-cell rendering.
- **URL-encoded state sharing**: improved collaboration and reproducibility of interesting board states.
- **CI + GitHub Pages deploys**: ensured the project is always runnable from a public URL.

### Challenges

The most persistent challenge has been UI performance as grid size and update cadence increase. I addressed this by keeping simulation logic decoupled from rendering, using a sparse state model in the core, and iterating on the rendering path separately from rule execution.

Another challenge was balancing feature depth with maintainability. Splitting into `core` and `app` packages, plus backing rules/pattern behavior with tests, helped reduce regressions while still allowing rapid UI iteration.

## Architectural Overview

The implementation separates simulation concerns from presentation concerns so performance work and UX work can evolve independently.

<figure class="project-diagram project-diagram--compact">
  <pre class="mermaid">flowchart LR
    U[User input] --> A[React app shell]
    A --> G[Game wrapper]
    G --> C[Core simulation engine]
    C --> A
  </pre>
  <figcaption>Basic view of how user actions flow through the app and core simulation.</figcaption>
</figure>

### Core Simulation Engine

The core engine executes Conway rules as pure transformations: given a current sparse state map, it computes the next generation plus derived stats. Keeping this logic side-effect free makes behavior deterministic and straightforward to unit test.

This engine operates directly on the `LifeGrid` structure described in `State and Data Model`, so the data model and simulation step logic are intentionally paired.

Relevant core simulation code:

- [`calculateNextGeneration` + default rules](https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/core/game.ts)
- [`countLiveNeighborCoordinates` and coordinate helpers](https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/core/coordinates.ts)
- [`LifeGrid` and simulation interfaces](https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/interfaces/index.ts)
- [Coordinate parser utilities](https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/core/coordinateParser.ts)

### State and Data Model

The foundational board data structure is `LifeGrid`, which lives in the `@game-of-life/core` package at `packages/core/src/interfaces/index.ts`. `LifeGrid` is a coordinate-keyed hash map where each key is an `"x,y"` coordinate string and each value is a boolean cell state.

Board state is represented sparsely with this coordinate map instead of a dense full-grid matrix. This keeps both memory use and per-tick computation proportional to active regions, which is critical for larger boards where most cells are dead.

In practice, each simulation tick in the core engine accepts a `LifeGrid`, applies neighbor/rule evaluation, and returns the next `LifeGrid`, making this model the contract between data representation and rule execution.

<div class="code-sample has-source-link" data-lang="ts">
  <div class="code-sample-header">
    <span class="code-sample-lang">ts</span>
    <a class="code-sample-source" href="https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/interfaces/index.ts" target="_blank" rel="noopener noreferrer">View source</a>
  </div>
{% highlight typescript %}
// @game-of-life/core/packages/core/src/interfaces/index.ts
export interface LifeGrid {
  [coordinate: string]: boolean;
}
{% endhighlight %}
</div>

<div class="code-sample" data-lang="ts">
{% highlight typescript %}
// Example sparse state using LifeGrid.
const gliderSeed: LifeGrid = {
  '1,0': true,
  '2,1': true,
  '0,2': true,
  '1,2': true,
  '2,2': true,
};
{% endhighlight %}
</div>

### Rendering and Interaction Layer

The app package owns playback controls, user interactions, and canvas drawing. A thin `Game` wrapper adapts core outputs for the UI, so rendering concerns (frame pacing, viewport, theming, controls) can evolve without changing rule execution.

<div class="code-sample has-source-link" data-lang="ts">
  <div class="code-sample-header">
    <span class="code-sample-lang">ts</span>
    <a class="code-sample-source" href="https://github.com/wintermuted/game-of-life/blob/master/packages/core/src/class/Game.ts" target="_blank" rel="noopener noreferrer">View source</a>
  </div>
{% highlight typescript %}
// @game-of-life/core/packages/core/src/class/Game.ts
class Game {
  constructor(grid: LifeGrid, rules: GameRules = DEFAULT_RULES) {
    this.grid = grid;
    this.rules = rules;
    this.generations = 0;
  }

  next() {
    const previousGrid = this.grid;
    this.grid = calculateNextGeneration(this.grid, this.rules);
    const stats = calculateStats(previousGrid, this.grid);
    this.generations += 1;
    return { grid: this.grid, stats };
  }

  getStatus() {
    return this.grid;
  }
}
{% endhighlight %}
</div>

### Validation and Delivery Pipeline

The repository uses package-level testing for simulation correctness and CI-backed deployments for repeatable release quality. This supports fast iteration while preserving confidence that rule logic and core behavior remain stable over time.

<figure class="project-diagram project-diagram--compact">
  <pre class="mermaid">flowchart TD
    PR[Pull request to master/main] --> TESTS[Run Unit Tests]
    PR --> PREVIEW[Deploy Pages preview]
    PREVIEW --> COMMENT[Post preview URL to PR]

    MERGE[Push/merge to master/main] --> TESTS_MAIN[Run Unit Tests]
    MERGE --> PAGES[Deploy to GitHub Pages]
    MERGE --> CODEQL[CodeQL analysis]

    CLOSE[PR closed] --> CLEANUP[Cleanup PR preview]
  </pre>
  <figcaption>GitHub Actions pipelines for test, preview deploy, production deploy, security scan, and preview cleanup.</figcaption>
</figure>

Current workflow files:

- [`run-tests.yml`](https://github.com/wintermuted/game-of-life/blob/master/.github/workflows/run-tests.yml)
- [`deploy-pages.yml`](https://github.com/wintermuted/game-of-life/blob/master/.github/workflows/deploy-pages.yml)
- [`cleanup-pr-preview.yml`](https://github.com/wintermuted/game-of-life/blob/master/.github/workflows/cleanup-pr-preview.yml)
- [`codeql-analysis.yml`](https://github.com/wintermuted/game-of-life/blob/master/.github/workflows/codeql-analysis.yml)
- [`canonical-path-guard.yml`](https://github.com/wintermuted/game-of-life/blob/master/.github/workflows/canonical-path-guard.yml)

### Test Pyramid and Coverage

The test pyramid is intentionally weighted toward the core simulation layer. Unit tests cover rule evaluation, coordinate handling, and sparse state transitions at the base of the pyramid, while a smaller set of integration tests exercises the `Game` wrapper and key UI flows.

Coverage is strongest where behavior is deterministic and easiest to verify: the core package, pattern seed behavior, and transition logic. The UI layer keeps a lighter coverage profile focused on smoke tests, user controls, and regression checks around rendering and state syncing, which keeps the suite fast without losing confidence in the app shell.

### Runtime Generation Loop

The core simulation uses a sparse dictionary/grid representation keyed by coordinates, keeping work proportional to active areas instead of a fixed full-board matrix. Rule execution and neighbor checks stay in the core package, while the UI consumes results through a `Game` wrapper and renders the snapshot to canvas.

<figure class="project-diagram">
  <pre class="mermaid">sequenceDiagram
    box rgba(45, 79, 128, 0.95) Presentation Layer
    participant User
    participant App as React App
    end

    box rgba(47, 124, 83, 0.95) Simulation Engine
    participant Game as Game Wrapper
    participant Core as Core Engine
    end

    box rgba(125, 74, 168, 0.95) Render Output
    participant Render as Canvas Renderer
    end

    User->>App: Start simulation
    loop each generation tick
      App->>Game: step()
      Game->>Core: calculateNextGeneration(state)
      Core-->>Game: next state + stats
      Game-->>App: updated snapshot
      App->>Render: draw(snapshot)
      Render-->>User: updated board and metrics
    end
  </pre>
  <figcaption>Generation loop from user action to rendered frame</figcaption>
</figure>

## Packages

The project is organized as an Nx monorepo with clear package boundaries and explicit TypeScript project references.

### @game-of-life/core

[`@game-of-life/core`](https://github.com/wintermuted/game-of-life/tree/master/packages/core) is the simulation engine package. It owns deterministic rule evaluation, sparse grid transitions, coordinate utilities, and reusable pattern seed data, and remains framework-agnostic so it can be tested in isolation.

### @game-of-life/app

[`@game-of-life/app`](https://github.com/wintermuted/game-of-life/tree/master/packages/app) is the product-facing UI package. It owns the React + Vite interface, playback controls, canvas rendering, and URL-based state sharing, and consumes the core package through a thin `Game` adapter layer.

<figure class="project-diagram">
  <pre class="mermaid">flowchart LR
    UI["@game-of-life/app\nReact + Vite UI"] --> GAME["Game class\nadapter layer"]
    GAME --> CORE["@game-of-life/core\nPure simulation logic"]
    CORE --> RULES["Rule engine\nneighbor checks + transitions"]
    CORE --> PATTERNS["Pattern library\nseed presets"]
    UI --> CANVAS["Canvas renderer\nviewport + draw loop"]
    UI --> CONTROLS["Controls + URL state\nplayback, speed, sharing"]
    classDef app fill:#2d4f80,stroke:#88a9d8,stroke-width:1.5px,color:#ffffff;
    classDef core fill:#2f7c53,stroke:#9fd7b8,stroke-width:1.5px,color:#ffffff;
    classDef supporting fill:#a86f12,stroke:#f3c97a,stroke-width:1.5px,color:#ffffff;
    classDef output fill:#7d4aa8,stroke:#d9b3f7,stroke-width:1.5px,color:#ffffff;
    class UI app;
    class GAME supporting;
    class CORE core;
    class RULES supporting;
    class PATTERNS supporting;
    class CANVAS output;
    class CONTROLS output;
    click UI "https://github.com/wintermuted/game-of-life/tree/master/packages/app" "Open app package" _blank
    click CORE "https://github.com/wintermuted/game-of-life/tree/master/packages/core" "Open core package" _blank
    click PATTERNS "https://github.com/wintermuted/game-of-life/tree/master/packages/core/src/data" "Open pattern data" _blank
    click CONTROLS "https://wintermuted.github.io/game-of-life/" "Open live demo" _blank
  </pre>
  <figcaption>Monorepo package boundaries and runtime data flow</figcaption>
</figure>

## Outcomes

The project now functions as both an interactive demo and a maintainable engineering sample:

- Rules and canonical patterns are validated by automated tests.
- The simulation is publicly deployed on GitHub Pages for easy sharing.
- Pull request preview deployments support faster iteration and review.
- The architecture provides a clear path for future optimization work without rewriting core logic.

## Roadmap

The next phase focuses on performance headroom, richer scenario authoring, and stronger collaboration workflows.

<figure class="project-diagram">
  <pre class="mermaid">gantt
    title Game of Life Future Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %b '%y

    section Performance
    Profile render + tick loop            :p1, 2026-07-05, 21d
    Canvas batching + redraw minimization :p2, after p1, 28d
    Worker-based simulation experiments   :p3, after p2, 21d

    section Features
    Scenario presets + metadata model     :f1, 2026-08-10, 20d
    Rule-set editor UX improvements       :f2, after f1, 24d
    Replay timeline and scrub controls    :f3, after f2, 18d

    section Quality and Delivery
    Expanded benchmark and regression suite :q1, 2026-09-01, 20d
    PR preview UX polish pass               :q2, after q1, 14d
    Release hardening + docs refresh        :q3, after q2, 10d
  </pre>
  <figcaption>Planned milestones for the next optimization and feature cycle</figcaption>
</figure>

