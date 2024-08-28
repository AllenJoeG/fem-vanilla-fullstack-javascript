//Name could be specified if we had multiple models to control.

// Decoration pattern allows Intellisense to populate dynamically 

//Dependency Injection design pattern

/**
 * @typedef {import('./viewBase.js').default} View
 */
export default class Controller {
  /** @type {View} */
  #view

  /** @param {{view: View}} deps */
  constructor({ view }) {
    this.#view = view
  }

  static init(deps) {
    const controller = new Controller(deps)
    controller.#init()
    
    return controller
  }

  #init( ) {
    this.#view.render([])
  }

}