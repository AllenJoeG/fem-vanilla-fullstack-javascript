import blessed from 'blessed'
import contrib from 'blessed-contrib'

export default class LayoutBuilder {
  #screen

  //to initialize blessed
  setScreen({ title }) {
    this.#screen = blessed.screen({
      // enables terminal to drag/drop, use mouse
      smartCSR: true,
      title
    })
    // Maps 3 keys to allow exit
    this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

    return this
  }

  //Constructor function
  build() {
    const components = {
      screen: this.#screen
    }

    return components
  }

}