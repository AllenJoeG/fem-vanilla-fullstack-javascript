import ViewBase from "../../shared/viewBase.js"
import LayoutBuilder from "./layoutBuilder.js"

export default class View extends ViewBase {
  #layoutBuilder
  #components
  #onFormSubmit = () => {}
  #onFormClear = () => {}

  //Calling constructor without params will initialize LayoutBuilder
  constructor( layoutBuilder = new LayoutBuilder() ) {
    //
    super()
    this.#layoutBuilder = layoutBuilder
  }
  
  

  notify({msg, isError }) {
    this.#components.alert.setMessage(msg)
  }

  configureFormSubmit(fn) {
    this.#onFormSubmit = (data) => {
      return fn(data)
    }
  }

  resetForm() {
    this.#components.form.reset()
    this.#components.screen.render()
  }

  configureFormClear(fn) {
    this.#onFormClear = () => {
      this.resetForm()
      return fn()
    }
  }

  // Facade design pattern to execute many building functions.
  #initializeComponentsFacade() {
    this.#components = this.#layoutBuilder
        .setScreen( {title: 'Fullstack Vanilla Javascript'})
        .setLayout()
        .setFormComponent({
          onClear: this.#onFormClear.bind(this),
          onSubmit: this.#onFormSubmit.bind(this),
        })
        .setAlertComponent()
        .build()
  }

  render(items) {
    this.#initializeComponentsFacade()
  }
}