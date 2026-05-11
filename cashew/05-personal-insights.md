# Joe's takeaways from the vanilla-fullstack workshop

## C#/.NET design patterns transferred to JS

Joe's README framing: *"Using core design patterns (inspired by C#/.NET) to build an Abstract Factory controller that can handle the DOM and CLI agnostically."* He recognizes the patterns as language-agnostic OO ideas adapted to vanilla JS. The Controller class uses private fields (`#view`, `#service`), DI via constructor, and a static `init()` async factory method — all familiar from C#.

**Why this matters:** Joe approaches JS architecture from a background that's more comfortable with explicit class structures and contracts than functional/closure-based patterns. The workshop confirms that those patterns translate cleanly to modern JS once you have ES2022 private fields and ESM dynamic imports.

## Bundlers are a choice, not a default

Joe captured Erick's framing on bundlers (with a reference link: byteofdev.com/posts/bundlers/). The point isn't "bundlers are bad" — it's that bundlers exist to solve specific problems (legacy browser support, code splitting, minification, non-JS asset import) and most workshop/small-app scenarios don't have those problems. When the browser supports `<script type="module">` and Node supports `--watch`, the bundler is optional.

**How to apply:** When starting a new small project, default to no bundler. Add one only when a specific pain point surfaces (e.g. you actually need to support a browser that doesn't do ESM, or you actually need tree-shaking benchmarks).

## Different APIs by environment

Joe's note: *"Different APIs by environments: browser DOM API, Node.js FileSystem API, Mobile Sensors API."* The abstract factory pattern works precisely because the *shape* of what you're doing (rendering, accepting input, persisting data) is consistent across environments even when the *APIs* are completely different. The View contract abstracts the shape; the per-platform implementation maps the contract onto the local API.

## The roadmap shape

Joe captured Erick's roadmap in two phases:
- **Day 1**: Building the interface + Shared Layer + Publishing on GitHub Pages
- **Day 2**: Building the interface (CLI) + Integrating with the Web API + Publishing on npm

The symmetry is the point — Day 2 is Day 1 again with a different view implementation, proving the architecture lets the second platform ship as a near-mechanical exercise.

## Things the repo records about Joe's working style

- Joe annotated his own `NOTES.md` with progress markers ("# Day 2") rather than rewriting older sections — same pattern as in his other study repos.
- Joe's last commits (Sep 5-6, 2024) were a CI debugging spiral (`meh`, `yaml scrambl`, `scram(l), yaml.`, `troubleshooting CI`). He paused mid-fight rather than reverting and starting over. When resuming this repo, the CI is the unfinished thread to pick up.
- He published a real npm package (`@allenjoeg/vanilla-fullstack-nodejs`) — followed through on the "ship it" step, not just the "build it" step.
