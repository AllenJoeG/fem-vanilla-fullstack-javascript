//Used by both node.js and browser

import Controller from "../src/shared/controller.js";

const platform = globalThis.window ? "web" : "console";

//  
const { default: View } = await import(`./../src/platforms/${platform}/view.js`)

Controller.init({
  view: new View()
})