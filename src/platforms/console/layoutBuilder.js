import blessed from 'blessed'
import contrib from 'blessed-contrib'

export default class LayoutBuilder {
  #screen
  #layout
  #form

  //to initialize blessed
  setScreen({ title }) {
    this.#screen = blessed.screen({
      // enables terminal to drag/drop, use mouse
      smartCSR: true,
      title
    })
    // Maps 3 keys to allow exit
    this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

    //allows us to chain functions
    return this
  }

  //This is where we'll draw all the components
  setLayout() {
    this.#layout = blessed.layout({
      parent: this.#screen,
      width: '100%',
      height: '100%',
    })

    //allows us to chain functions
    return this
  }

  // 
  setFormComponent({
    onSubmit,
    onClear
  }) {
    //set parent element. Allow keyboard input. 
    const form = blessed.form({
      parent: this.#layout,
      keys: true,
      vi: false,
      width: '100%',
      height: '40%',
      top: 0,
      left: 'center',
      label: 'Users form',
      border: { type: 'line' },
      style: {
        fg: 'white',
        bg: 'black'
      },
    })

    this.#form = form

    //always return the instance to chain functions
    return this
  }


  //Constructor function
  build() {
    const components = {
      screen: this.#screen,
      layout: this.#layout,
      form: this.#form,
    }

    return components
  }

}