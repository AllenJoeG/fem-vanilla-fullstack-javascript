# Vanilla `node:http` API — patterns from `web-api/`

## No Express. Just `http.createServer(handler)`.

`web-api/src/index.js` is three lines: import `node:http`, import the handler, call `http.createServer(handler).listen(3000)`. There is no Express, no Fastify, no Hapi. The handler is the entire HTTP layer.

**Why:** The course makes the point explicitly — *"Express, FastAPI, use this model under the scenes."* Frameworks add a request/response abstraction and a routing DSL on top of `node:http`. Building one manually is the lesson.

## The route-key dispatch convention

The whole routing layer in `web-api/src/handler.js` is one trick:

```js
const key = `${pathname}:${method.toLowerCase()}`     // e.g. "/users:get", "/users:post"
const chosen = allRoutes[key] ?? allRoutes.defaultRoute
return Promise.resolve(chosen(request, response)).catch(handleError(response))
```

`allRoutes` is a flat object whose keys are `path:method` strings and whose values are async handler functions. A 404 fallback is just `defaultRoute` on the same object. Errors at any handler are caught and rewritten as 500 JSON via `handleError(response)`.

**Why:** Path+method as a string key collapses the entire framework abstraction (path matching, method matching, fallback) into a single object lookup. No tree walking, no regex compilation, no middleware chain. For small APIs without path parameters, this is genuinely sufficient.

**How to apply:** When you don't need path parameters or middleware, a `Record<pathColon method, handler>` is the simplest possible router. Reach for a framework only when you actually need the things frameworks provide (middleware composition, parameterized paths, content negotiation).

## Layered architecture: routes → service → repository, wired by a factory

`web-api/src/` follows a classic four-layer split:

- `routes/userRoutes.js` — HTTP shape (parse request, format response). Knows about `request`/`response`.
- `service/userService.js` — Business logic. Knows about domain operations but not HTTP.
- `repository/userRepository.js` — Data access against `database/data.json` (file-backed JSON "database").
- `factory/userFactory.js` — Wiring. Instantiates the repository with a filepath, injects it into the service, returns the service singleton.

The factory pattern in `web-api/` is a different use than in `app/` — here it's a **DI composition root**, not a runtime branch selector. `generateInstance({ filepath })` is called once at startup with the resolved DB path, and the returned service is handed to `routes()`.

**Why:** Mirroring this quartet (`xRoutes` / `xService` / `xRepository` / `xFactory`) for each resource keeps the per-resource code in one shape. Adding `posts/` means four files; no architectural decisions to make.

**How to apply:** When prototyping a small HTTP API, this four-file-per-resource pattern is a good default. It keeps HTTP concerns out of business logic and business logic out of data access without dragging in a DI framework.

## Path resolution: `import.meta.url` → `fileURLToPath` → `dirname`

The database path is resolved relative to the source file, not `cwd`:

```js
const currentDir = dirname(fileURLToPath(import.meta.url))
const filepath = join(currentDir, '..', 'database', 'data.json')
```

This makes the API work regardless of where the process is started from — `node src/index.js` and `node web-api/src/index.js` both resolve the JSON file correctly.

**Why:** `cwd` is a runtime-context property; `import.meta.url` is a source-position property. Anything that needs to find a sibling file should anchor on `import.meta.url`, never `process.cwd()`.

**How to apply:** In ESM Node code, treat `import.meta.url` + `fileURLToPath` + `dirname` as the canonical pattern for "relative to this source file." `__dirname` doesn't exist in ESM — this is the replacement.

## JSON-file "database"

`web-api/database/data.json` is the entire data layer. The repository reads/writes it as a flat file. No SQLite, no Postgres, no Redis.

**Why:** Adds zero infrastructure dependencies to the workshop. Lets the focus stay on patterns, not connection strings. For a workshop scope this is right; for production it obviously isn't.

## `run-api.sh` as a curl-based smoke test

`web-api/run-api.sh` is two curl commands: `GET /users` and `POST /users` with a JSON body. It's the manual smoke test — there are no automated tests for `web-api/` yet. `npm test` in `web-api/package.json` is a placeholder string: `"I'll implement this later"`. **The CI workflow still runs it**, which passes because `echo` returns 0.
