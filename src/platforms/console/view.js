import ViewBase from "../../shared/viewBase.js"
import LayoutBuilder from "./layoutBuilder.js"

export default class View extends ViewBase {
  #layoutBuilder
  #components

  //Calling constructor without params will initialize LayoutBuilder
  constructor( layoutBuilder = new LayoutBuilder() ) {
    //
    super()
    this.#layoutBuilder = layoutBuilder
  }
  
  configureFormSubmit() {}
  configureFormClear() {}

  // Facade design pattern to execute many building functions.
  #initializeComponentsFacade() {
    this.#components = this.#layoutBuilder
        .setScreen( {title: 'Fullstack Vanilla Javascript'})
        .setLayout()
        .setFormComponent({
          onClear: () => {},
          onSubmit: () => {},
        })
        .build()
  }

  render(items) {
    this.#initializeComponentsFacade()
  }
}