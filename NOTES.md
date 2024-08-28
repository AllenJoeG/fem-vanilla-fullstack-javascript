Goal is to do a complete fullstack application ONLY with Javascript. No frameworks. No bundlers. No webpack.
Same core logic will be agnostic of frontend render.

![cover image](./cover.jpeg)

Acess the [slides](https://www.icloud.com/keynote/032Y1iBWTJMdLbFIw2A3F23VA#FullStack_Vanilla_JS_-_FEM_-_Erick_Wendel)


## Pre-reqs:
Node.js, VSCode, Terminal w Unix support

The patterns we're going to learn and cover will map to other languages/frameworks.

Different APIs by environments: browser DOM API, Node.js FileSystem API, Mobile Sensors API

re: Bundlers
https://byteofdev.com/posts/bundlers/

DOM:
<!-- <script type="module" src="index.js"> -->

OS:
//package.json
// {type: "module"}


## Design Patterns for Javascript:
Use Abstract Factory pattern to have a Controller handle platform identification.
(see controller.js, index.js, view.js)

## Roadmap:
  Building the Interfact
  Shared Layer
  Publishing on Github Pages

## Install dependencies
npm ci
npm install -g ntl

'ntl'
then I can select which scripts to launch

## Testing with Native Node.js Test Runner
- Similar API to popular test runners.

node --help | grep cov
(search through doc for text match)

