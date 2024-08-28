// Name could be specified if we had multiple models to control.
// The controller doesn't know its context. 

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

  #isValid(data) {
    return data.name && data.age && data.email
  }

  #onSubmit({ name, age, email}) {
    if (!this.#isValid({ name, age, email })) {
      this.#view.notify({ msg: 'Please, provide valid Name, Age, and Email!' })
      return
    }
    
    this.#view.addRow ({ name, age, email })

  }

  #init() {
    // Point to the current context with bind
    this.#view.configureFormSubmit(this.#onSubmit.bind(this))
    this.#view.configureFormClear()


    const initialData= [
      { name: 'Joe', age: 35, email: 'joe@joe.com'},
      { name: 'Mina', age: 14, email: 'mina@cat.com'},
      { name: 'Quade', age: 10, email: 'quade@cat.com'},
    ]

    this.#view.render(initialData)
  }

}