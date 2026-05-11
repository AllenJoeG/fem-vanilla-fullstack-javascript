# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Joe's working copy of Erick Wendel's Frontend Masters workshop **"Vanilla Fullstack JavaScript"**. Hard constraint of the course: **no frameworks, no bundlers, no webpack** — every dependency must be justifiable, and core logic must be agnostic of the renderer (terminal CLI vs browser DOM). The shared controller layer is the same; the view layer is swapped at runtime.

Repo has two independent npm packages: `app/` (the universal client — CLI or web) and `web-api/` (the Node HTTP server). They are run as separate processes, not workspaces.

Node version is pinned to `20.7.0` via `.nvmrc` and both `engines` fields. ES Modules everywhere (`"type": "module"`).

## Commands

All commands run from inside the respective package directory.

### `app/`
```bash
npm ci                # restore deps
npm run web           # serve ui/ via browser-sync (browser mode)
npm run cli           # node ui/index.js (terminal mode)
npm run dev           # node --inspect --watch ui/index.js
npm test              # native node:test runner across test/ with --experimental-test-coverage
npm run test:dev      # node --inspect --watch --test test/
node --test test/controller.test.js     # run a single test file
```

The `bin` field exposes `vanilla-fullstack-nodejs` → `./ui/index.js`. Publishing target is `@allenjoeg/vanilla-fullstack-nodejs` on the public npm registry (`npm publish --access public`).

### `web-api/`
```bash
npm ci
npm run dev           # node --inspect --watch src/index.js — listens on :3000
./run-api.sh          # curl examples: GET /users and POST /users
npm test              # NOTE: stubbed to `echo "I'll implement this later"`. CI still runs this.
```

### CI

`.github/workflows/run_tests.yaml` triggers on push to `main` when `**.js`, `**.json`, or `**.yaml` change. It runs `npm ci && npm test` in `app/` then `web-api/` on Node 20. Recent commit history (`"meh"`, `"yaml scrambl"`, `"troubleshooting CI"`) indicates the last active session was fighting this workflow — when resuming, check the workflow status first.

## Architecture

### `app/` — Abstract Factory swap at startup

`app/ui/index.js` is the single entry that decides platform: `globalThis.window ? "web" : "console"`. It then `await import()`s `../src/platforms/${platform}/view.js`, hands the resulting `View` instance to `Controller.init({ view, service })`, and walks away. The controller never sees the platform name.

- `src/shared/` is platform-agnostic. `controller.js` owns the lifecycle: it calls `view.configureFormSubmit(...)`, `view.configureFormClear(...)`, fetches data via `service.getUsers()`, and renders. `viewBase.js` is the abstract View contract; both platform views must implement it. `service.js` is the API client (talks to `web-api/` over HTTP).
- `src/platforms/console/view.js` — `blessed` + `blessed-contrib` terminal UI.
- `src/platforms/web/view.js` — DOM manipulation against `ui/index.html`.
- `ui/index.html` is the web shell; `ui/index.js` doubles as both the npm `bin` entry and the browser entry. The `<script type="module">` in `index.html` loads it.

`API_URL` is currently hardcoded in `ui/index.js` to `http://localhost:3000`. A `TODO` flags it for env-var extraction — there is no env loading wired up yet.

### `web-api/` — vanilla `node:http` with manual routing

No Express, no framework. `src/index.js` boots `http.createServer(handler).listen(3000)`. `src/handler.js` implements the routing convention: it builds a key `${pathname}:${method.toLowerCase()}` (e.g. `/users:get`) and looks it up in `allRoutes`, falling back to `defaultRoute` (404 JSON). Errors are caught at the handler level and rewritten as 500 JSON via `handleError`.

Layered structure: `routes/` (HTTP shape) → `service/` (business logic) → `repository/` (file I/O against `database/data.json`). `factory/userFactory.js` is the wiring point — it instantiates the repository with a filepath, injects it into the service, and returns the service singleton consumed by `routes/`. To add a new resource, mirror the userFactory/userService/userRepository/userRoutes quartet.

The "database" is a JSON file (`database/data.json`) resolved via `import.meta.url` → `fileURLToPath` → `dirname` to keep the repository working regardless of `cwd`.

## Testing

`app/` uses the **native `node:test` runner** — there is no Jest, Mocha, or Vitest. Tests live in `app/test/` (`controller.test.js`, `web.test.js`) and use `--experimental-test-coverage` for coverage output. The course emphasis here is that the controller is testable precisely because it depends only on the View contract — mock the view, assert on the controller's calls into it.

`web-api/` has no real tests yet; `npm test` is a placeholder. When implementing them, stick to `node:test` for consistency with `app/`.

## Reference

- `README.md` — short course summary, build-status badge, abstract-factory diagram.
- `NOTES.md` — Joe's running workshop notes (pre-reqs, design-pattern reminders, npm publish flow).
- `cover.jpeg` — course thumbnail, referenced from `NOTES.md`.
