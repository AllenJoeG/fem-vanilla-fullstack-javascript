# Vanilla Fullstack Javascript
![Build Status](https://github.com/AllenJoeG/fem-vanilla-fullstack-javascript/workflows/Run%20tests/badge.svg)

## Abstract Factory
```
.
├── src
│   ├── platforms
│   │   ├── console
│   │   │   └── view.js
│   │   └── web
│   │       └── view.js
│   └── shared
│       └── viewBase.js
└── ui
    └── index.html
```
platforms/ - Platform-Specific Implementations: You have different implementations (view.js files) for console and web platforms, indicating that your controller might instantiate these based on the context or platform

ui/index.js - Factory Behavior: Your controller is acting as a factory that decides which specific view to create based on the app running, which is the core of the Abstract Factory pattern.

---

## Key Takeaways

By participating along with us in the workshop, you'll learn:

- Develop web apps and CLI apps using Node.js without relying on bundlers
- Apply design patterns for building universal JavaScript applications
- Learn how to efficiently share code between the server and client
- Test your JavaScript code using the native Node.js test runner
- Deploy your CLI app to an npm registry and your web app to GitHub Pages


## Workshop Details

In this app-oriented course, you’ll create and deploy a complete multi-platform application that runs in the browser and the desktop, sharing JavaScript code. Each hour, you’ll refactor and advance your application, learning fundamental concepts about ES Modules, code sharing, design patterns, best practices, and testing along the way.
