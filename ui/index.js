//Used by both node.js and browser

const platform = globalThis.window ? "web" : "console";

//  
await import(`./../src/platforms/${platform}/view.js`)