# Tooling and the native Node test runner

## Node 20.7.0 pinned everywhere

`.nvmrc` says `20.7.0`. Both `package.json` `engines` fields say `v20.7.0`. CI says `node-version: 20`. The pin matters because the course relies on stable forms of:

- `node:test` (Node 18 stable, Node 20 added watch + coverage flags)
- Top-level `await` (Node 14.8+ in ESM)
- Dynamic `import()` (Node 12+)
- Native `fetch` in Node (Node 18+, unflagged in 20)

**Why:** Newer Node features removed the need for third-party tools that the workshop's "no frameworks" rule would otherwise force out (Jest, axios, polyfills). The pin is what lets the no-bundler/no-framework constraint actually work.

## Native `node:test` runner — the testing decision

`app/test/` uses **the built-in Node test runner**, invoked via:

```bash
node --experimental-test-coverage --test test/
```

No Jest. No Mocha. No Vitest. No Chai. Assertions come from `node:assert`. Test files use `test('description', () => {...})` from `node:test`. Single test file: `node --test test/controller.test.js`. Watch + inspect during development: `node --inspect --watch --test test/` (the `test:dev` script).

**Why:** The runner is now feature-complete enough for most workshop-scale projects (describe/it, before/beforeEach, async tests, mocks via `t.mock`, coverage via `--experimental-test-coverage`). Choosing it over Jest avoids the entire `jest` + `@types/jest` + `babel-jest` + transform-config stack — fits the "no framework" rule and ships in the runtime you already have.

**How to apply:** For zero-build Node ESM projects, default to `node:test`. The only real reason to reach for Jest/Vitest is if you need their mock system or a specific reporter integration. Snapshot testing, hot-watch, coverage, and parallel runs are all in `node:test` now.

## CI: GitHub Actions, run on push to main

`.github/workflows/run_tests.yaml` triggers on push to `main` for `**.js`, `**.json`, or `**.yaml` changes. Steps: checkout, setup Node 20, then sequentially `npm ci && npm test` in `app/` then `web-api/`. Since `web-api/`'s `npm test` is a placeholder (`echo "I'll implement this later"`), CI passes for it but doesn't actually validate anything.

The path filter (`paths: [**.js, **.json, **.yaml]`) means README or markdown-only changes skip CI — useful, but also why the workflow trigger needed troubleshooting (some workflow file iterations didn't survive the filter).

## Dev script pattern: `--inspect --watch`

Both packages use the same dev script pattern: `node --inspect --watch <entry>`. `--watch` restarts on file change; `--inspect` opens the Chrome DevTools debugger port. No nodemon, no `tsx`, no third-party watcher.

**Why:** Node 19+ shipped `--watch` natively, removing the last reason to install `nodemon`. Combined with `--inspect`, the dev loop is a single CLI flag away from production behavior.

## `browser-sync` instead of a dev server

`app/`'s web dev script is `npx browser-sync './' ui/` — serves the project root and watches `ui/`. No Vite. No webpack-dev-server. The browser autoreloads when files change. The only npm dependency in `devDependencies` is `browser-sync`.

**Why:** The web entry is `ui/index.html` with a `<script type="module">` to native ES modules — there's nothing to bundle. The dev server just needs to serve files and trigger reload. `browser-sync` does both with zero config.

## NPM publishing flow for the CLI

`app/package.json` has:
- `name: @allenjoeg/vanilla-fullstack-nodejs` (scoped public package)
- `bin: { "vanilla-fullstack-nodejs": "./ui/index.js" }`
- `type: module`

Local install for testing: `chmod +x ui/index.js` then `npm link` — the CLI binary becomes globally available under its `bin` name. The `ui/index.js` shebang is `#!/usr/bin/env node`.

Publish step: `npm publish --access public` (scoped packages default to private; this flag makes the scoped package publicly installable).

**Why to remember:** Scoped npm packages (those starting with `@user/`) are private-by-default. Without `--access public` on first publish, `npm publish` fails with a 402 unless you have a paid npm account.

## A development quality-of-life note (`ntl`)

`NOTES.md` recommends installing `ntl` globally (`npm install -g ntl`) — an interactive npm script picker. Run `ntl` in any directory with a `package.json` and select scripts from a menu instead of remembering names. Useful for repos with many scripts.
