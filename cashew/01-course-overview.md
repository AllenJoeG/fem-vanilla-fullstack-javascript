# Course context — Vanilla Fullstack JavaScript (Erick Wendel, Frontend Masters)

- Joe is working through Erick Wendel's two-day Frontend Masters workshop **"Vanilla Fullstack JavaScript"**. Repo: `/Users/joe.allen/SelfStudy/fem-vanilla-fullstack-javascript`. Published to GitHub as `AllenJoeG/fem-vanilla-fullstack-javascript` (public, with a Run tests badge in the README).
- The course's hard constraint is the entire point: **no frameworks, no bundlers, no webpack.** No Express. No Vite. No Jest. Every dependency must be justified. The goal is to demonstrate that vanilla JavaScript with the standard Node + browser APIs is sufficient for a real fullstack application.
- Stated learning goals (from README):
  1. Develop web apps and CLI apps with Node.js without bundlers.
  2. Apply design patterns (Abstract Factory, View/Controller) for universal JS.
  3. Share core logic between server and client.
  4. Test with the native Node.js test runner.
  5. Publish the CLI app to npm and the web app to GitHub Pages.
- The capstone demonstrates **one codebase, two renderers**: the same `Controller` + `Service` + `View` contract powers both a terminal app (via `blessed`/`blessed-contrib`) and a browser app (via raw DOM manipulation). The same `ui/index.js` file is both the npm `bin` entry (CLI) and the `<script type="module">` entry in `index.html` (web).
- Joe published the CLI to the public npm registry as `@allenjoeg/vanilla-fullstack-nodejs` via `npm publish --access public`. `npm link` is the local development equivalent — installs the bin globally so the package name (matching the `bin` field) runs the CLI.
- Repo has two independent npm packages — `app/` (universal client) and `web-api/` (Node HTTP server) — that are run as separate processes, not npm workspaces. They communicate over HTTP at `http://localhost:3000` (currently hardcoded in `app/ui/index.js` with a TODO for env-var extraction).
- Repo is in a **paused/mid-CI-fight state**: last commits from Sep 5-6, 2024 are titled `meh`, `yaml scrambl`, `scram(l), yaml.`, `troubleshooting CI`. When resuming, check CI status before assuming the workflow is green.
- Tooling pins: Node `20.7.0` via `.nvmrc` and both `engines` fields; ES Modules everywhere (`"type": "module"`).

**Why:** The "no frameworks" constraint isn't dogma — it forces the student to internalize the patterns that frameworks normally hide. The same Abstract Factory and route-dispatch patterns are what Express, FastAPI, and React routers implement under the hood.
