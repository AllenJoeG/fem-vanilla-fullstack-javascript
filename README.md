# Vanilla Fullstack Javascript
![Build Status](https://github.com/AllenJoeG/fem-vanilla-fullstack-javascript/workflows/Run%20tests/badge.svg)

Using core design patterns (inspired by C#/.NET) to build an Abstract Factory controller that can handle the DOM and CLI agnostically. 
- Abstract Factory
- View / Controller
- Native Node.js testing
- CI with Github Actions

## Key Takeaways

Following Erick Wendel's workshop - main goals from two days at FEM:

- Develop web apps and CLI apps using Node.js without relying on bundlers
- Apply design patterns for building universal JavaScript applications
- Learn how to efficiently share code between the server and client
- Test your JavaScript code using the native Node.js test runner
- Deploy your CLI app to an npm registry and your web app to GitHub Pages

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