import * as UserController from '@controller/UserController'
import express from 'express'
import { body } from 'express-validator'
import validateRequestBody from '@middleware/RequestBodyValidator'

const requestBodySchema = [body('name').isString()]

const UserRouter = express.Router()

UserRouter.post(
  '/register',
  requestBodySchema,
  validateRequestBody,
  UserController.register,
)
UserRouter.get('/', UserController.fetchAllUsers)
UserRouter.get('/:userUUID', UserController.fetchUser)
UserRouter.put(
  '/:userUUID',
  requestBodySchema,
  validateRequestBody,
  UserController.updateUser,
)
UserRouter.delete('/:userUUID', UserController.deleteUser)

export default UserRouter
