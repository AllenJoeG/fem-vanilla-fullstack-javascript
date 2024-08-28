// Name could be specified if we had multiple models to control.

// Decoration pattern allows Intellisense to populate dynamically 

// Dependency Injection design pattern

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

  #init() {
    const initialData= [
      { name: 'Joe Allen', age: 35, email: 'joe@joe.com'},
      { name: 'Kelly', age: 42, email: 'kelly@kelly.com'},
      { name: 'Sasha', age: 43, email: 'sasha@sasha.com'},
    ]

    this.#view.render(initialData)
  }

}