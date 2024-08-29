//Single point gathering all dependencies and returning the single Instance we'll use for our routes

import UserRepository from "../repository/userRepository.js"
import UserService from "../service/userService.js"

const generateInstance = ({ filepath }) => {
  const userRepository = new UserRepository({ file: filepath })
  const userService = new UserService({
    userRepository
  })

  return userService
}

export {
  generateInstance
}

