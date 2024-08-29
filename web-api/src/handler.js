//Express, FastAPI, use this model under the scenes
import { parse, fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { routes } from './routes/userRoutes.js'
import { DEFAULT_HEADERS } from './util/util.js'
import { generateInstance } from './factory/userFactory.js'

//an Engine for publishing entry points for user consumption
// import data from './../database/data.json' assert { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currentDir, '../', 'database', 'data.json')

const userFactory = generateInstance({ 
  filePath
})

const userRoutes = routes({
  userFactory
})

const allRoutes = {
  //takes all userRoutes and adds default
  ...userRoutes,

  defaultRoute(request, response) {
    response.writeHead(404, DEFAULT_HEADERS)
    response.write(
      JSON.stringify({
        message: "wat, it ain't here"
      })
    )

    response.end()
  }
}

function handler(request, response) {
  const {
    url, 
    method
  } = request
  
  const { pathname } = parse(url, true)

  // /users:get
  const key = `${pathname}:${method.toLowerCase()}`
  const chosen = allRoutes[key] ?? allRoutes.defaultRoute

  return Promise.resolve(chosen(request, response))
    .catch(handleError(response))
}

//global error handle
function handleError(response) {
  return error => {
    console.log('Something error has gone wrong', error.stack)
    response.writeHead(500, DEFAULT_HEADERS)
    response.write(
      JSON.stringify({
        error: "internal server error"
      })
    )
    return response.end()
  }
}

export default handler