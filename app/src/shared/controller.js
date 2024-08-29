// Name could be specified if we had multiple models to control.
// The controller doesn't know its context. 

// Decoration pattern allows Intellisense to populate dynamically 

// Dependency Injection design pattern

/**
 * @typedef {import('./viewBase.js').default} View
 * @typedef {import('./service.js').default} Service
 */
export default class Controller {
  /** @type {View} */
  #view

  /** @type {Service} */
  #service

  /** @param {{view: View, service: Service}} deps */
  constructor({ view, service }) {
    this.#view = view
    this.#service = service
  }

  static async init(deps) {
    const controller = new Controller(deps)
    await controller.#init()

    return controller
  }

  #isValid(data) {
    return data.name && data.age && data.email
  }

  async #onSubmit({ name, age, email}) {
    if (!this.#isValid({ name, age, email })) {
      this.#view.notify({ msg: 'Please, provide valid Name, Age, and Email!' })
      return
    }
    
    this.#view.addRow ({ name, age, email })
    this.#view.resetForm()

    try {
      await this.#service.createUser({ name, age, email })
    } catch (error) {
      this.#view.notify({ msg: "Server is unavailable" })
    }
  }

  #onClear() {

  }

  async #getUsersFromAPI() {
    try {
      debugger
      const result = await this.#service.getUsers()
      return result
    } catch (error) {
      this.#view.notify({ msg: "Server is unavailable" })
      return []
    }
  }

  async #init() {
    // Point to the current class context with bind
    this.#view.configureFormSubmit(this.#onSubmit.bind(this))
    this.#view.configureFormClear(this.#onClear.bind(this))

    const data = await this.#getUsersFromAPI()
    const initialData = [
      { name: 'Joe', age: 35, email: 'joe@joe.com'},
      { name: 'Mina', age: 14, email: 'mina@cat.com'},
      { name: 'Quade', age: 10, email: 'quade@cat.com'},
      ...data
    ]

    this.#view.render(initialData)
  }

}