//Used by both node.js and browser

import Controller from "../src/shared/controller.js";

//Checks for window object to know if we're on web or console
const platform = globalThis.window ? "web" : "console";

// 
const { default: View } = await import(`./../src/platforms/${platform}/view.js`)

Controller.init({
  view: new View()
})