import { describe, it, before } from 'node:test'
import Controller from '../src/shared/controller.js';
import View from './../src/platforms/web/view.js'

function getDocument(mock) {
  globalThis.alert = mock.fn()

  // Lying to JS, faking document exists
  globalThis.document = {
    createElement: mock.fn((name) => ({
        classList: {
          add: mock.fn((name) => {})
        }
      })),

    querySelector: mock.fn((id) => {
      return {
        addEventListener: mock.fn((event, fn) => {
          // event.preventDefault = () => {}
          return fn({
            preventDefault: () => {}
          })
        }),
        reset: mock.fn(() => {}),
        appendChild: mock.fn((child) => {
          return {
            
          }
        })
      }
    }),
    
  }
}



describe('Web app test suite', () => {
  let _controller 

  before(() => {
    
  })

  it('Given valid inputs, should update the table data', async (context) => {
    const document = getDocument(context.mock)
    _controller = Controller.init({
      view: new View()
    })

    document.querySelector.mock
  })
})