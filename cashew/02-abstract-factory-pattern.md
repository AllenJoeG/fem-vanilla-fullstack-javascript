# Abstract Factory pattern as taught in this course

## The shape of the pattern

A single shared `Controller` orchestrates business logic against an abstract `ViewBase` contract. Concrete `View` implementations live one per platform (`app/src/platforms/console/view.js`, `app/src/platforms/web/view.js`) and implement the abstract methods (`configureFormSubmit`, `configureFormClear`, `resetForm`, `notify`, `addRow`, `render`). The base class throws `'not implemented!'` for each method — making the contract enforced at runtime when a platform forgets to implement one.

## The runtime platform swap

`app/ui/index.js` is the single entry point and where the factory selection happens. It detects the platform with `globalThis.window ? "web" : "console"`, then **dynamic-imports** the matching view:

```js
const { default: View } = await import(`./../src/platforms/${platform}/view.js`)
```

Dependency injection happens at this same site: a `View` instance and a `Service` instance are passed to `Controller.init({ view, service })`. The controller never sees the platform name, never sees `globalThis.window`, never imports anything platform-specific. **The entire platform abstraction is one ternary and one dynamic import.**

This file doubles as the npm `bin` entry (declared in `app/package.json` as `vanilla-fullstack-nodejs`) and the `<script type="module">` entry in `app/ui/index.html`. The same file boots both runtimes.

**Why:** Dynamic `import()` is the key — it's lazy, so the browser never tries to resolve the `console` view (which depends on `blessed`, a Node-only package) and the CLI never tries to resolve the `web` view (which references the DOM). Static imports would force both subtrees to be parseable in both environments.

**How to apply:** When you need the same business logic to span two runtimes with incompatible dependency trees, the pattern is: shared core depends only on an abstract contract; entry script picks the implementation via dynamic import at startup. Avoid trying to make a "universal" module that imports both branches conditionally — bundlers and parsers won't tolerate it.

## Why this makes the controller testable

`app/src/shared/controller.js` is testable in isolation precisely because it depends only on the `ViewBase` and `Service` contracts — no DOM, no `blessed`, no `fetch`. Tests at `app/test/controller.test.js` and `app/test/web.test.js` use the **native `node:test` runner** with a mocked View, asserting the controller's calls into `view.configureFormSubmit(...)`, `view.render(...)`, etc.

**Why:** The pattern's main payoff is testability, not just renderer reuse. A View-and-Service-injected Controller can be tested without a browser, a terminal, a backend, or any framework — just `node --test`.

**How to apply:** When a class needs side effects (UI, network, file I/O), inject the side-effect provider via constructor. The class itself becomes pure logic that you can unit test by injecting test doubles.

## Decoration and JSDoc for type intelligence

The controller uses JSDoc `@typedef {import('./viewBase.js').default} View` and `@param {{view: View, service: Service}}` annotations so editors give IntelliSense without TypeScript. Combined with private class fields (`#view`, `#service`), the controller gets type hints, encapsulation, and zero compile step.

**Why:** The course explicitly avoids TypeScript and bundlers, but the loss of type intelligence would make refactoring painful. JSDoc with `@typedef` and `import('...')` syntax recovers most of the IntelliSense benefits with no tooling cost.

**How to apply:** In zero-build JS projects, lean on JSDoc `@typedef` + `@param` annotations. VS Code resolves them like TS types.

## Console-specific: `layoutBuilder.js`

The console view doesn't inline blessed setup — it uses a `layoutBuilder.js` helper that exposes a chained build API: build a screen, build a layout, build the form, build the buttons. This isolates the imperative terminal-UI plumbing from the View class itself, which stays focused on implementing the `ViewBase` contract.

**Why:** `blessed` has a verbose, imperative configuration API. Pushing it into a builder keeps the View readable as "here's what the contract says I do" rather than "here's 200 lines of widget instantiation."
