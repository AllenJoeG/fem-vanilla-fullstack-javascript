import ViewBase from "../../shared/viewBase.js"
import LayoutBuilder from "./layoutBuilder.js"

export default class View extends ViewBase {
  #layoutBuilder

  //Calling constructor without params will initialize LayoutBuilder
  constructor( layoutBuilder = new LayoutBuilder() ) {
    //
    super()
    this.#layoutBuilder = layoutBuilder
  }
  
  configureFormSubmit() {}
  configureFormClear() {}

  render(items) {
    this.#layoutBuilder
      .setScreen( {title: 'Fullstack Vanilla Javascript'})
      .build()
  }
}