# AGENTS.md

## Overview

Itmas is a browser-based three-view voxel modeling app. Most manual edits happen inside `js/`, `index.html`, and supporting assets (`index.css`, `images/`, etc.). `bundle.js` (plus its map) is the compiled output produced by `build.mjs` and should generally not be edited directly.

## Tooling & workflow

- Run `npm install` once to sync `package-lock.json` dependencies, then use `npm run build` for production or `npm run watch` during development.
- `build.mjs` drives the bundle output; avoid editing generated files such as `bundle.js`/`bundle.js.map` unless you adjust the bundler itself.
- Keep the repo in sync with the `js/` modules that feed the build, and prefer modifying source files before rebuilding.
- As the Agent, there is no need for you to rebuild. I have `npm run watch` running in the background.

## Conventions

- `js/` modules target the browser and use ES modules; keep exports/imports consistent with the existing style.
- Assets such as `images/` and `models/` are binary; do not modify them unless explicitly needed.

## Architecture

- `index.html` wires the three-view UI, including the palette, picker, layer list, and canvas placeholders rendered by the bundle.
- `js/index.js` is the entry point that bootstraps Three.js, connects UI controls to each cloth view, manages saving/loading/exporting models, and drives the 3D preview volume/worker pipeline.
- `js/cloth.js` defines the `itmas-cloth` custom element, handling drawing tools, undo stack, layer switching, and exposing 2D textures for the shared volume renderer.
- `js/palette.js`, `js/picker.js`, and `js/layer.js` implement the custom elements for color palettes, color picking, and layer tabs respectively.
- `js/volume.js` provides the shader-based `VolumeMaterial` that samples the cloth textures to render the voxel volume inside Three.js.
- `js/jumpflood.js` contains GPU jump-flood helpers for distance field computations used by export/preview shading experiments. Currently jump-flood is not in use.
- `js/vox.js` encodes MagicaVoxel `.vox` files, while `js/exportVox.worker.js` serializes the per-layer pixel buffers in a Web Worker before downloading.
