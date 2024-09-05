#!/usr/bin/env node

//Used by both node.js and browser
import Controller from "../src/shared/controller.js";
import Service from "../src/shared/service.js";

//Checks for window object to know if we're on web or console
const platform = globalThis.window ? "web" : "console";

// Pipes which import to View based on platform
const { default: View } = await import(`./../src/platforms/${platform}/view.js`)

// TODO: abstract to environmental variable
const API_URL = 'http://localhost:3000'

await Controller.init({
  view: new View(),
  service: new Service({ url: API_URL })
})

