import express from 'express'
import * as AccountController from '@controller/AccountController'
import { body } from 'express-validator'
import validateRequestBody from '@middleware/RequestBodyValidator'

const isValidAccountType = (type: string) => {
  return ['checking', 'savings', 'investment'].includes(type)
}

const isValidAmount = (amount: number) => amount > 0

const openAccountRequestBodySchema = [
  body('accountType').isString().custom(isValidAccountType),
]
const accountOperationRequestBodySchema = [
  body('amount').isNumeric().custom(isValidAmount),
]
const reviewOverdraftRequestBodySchema = [body('decision').isBoolean()]

const AccountRouter = express.Router({ mergeParams: true })

AccountRouter.post(
  '/open',
  openAccountRequestBodySchema,
  validateRequestBody,
  AccountController.openAccount,
)
AccountRouter.get('/', AccountController.fetchUsersAccounts)
AccountRouter.get('/:accUUID', AccountController.fetchAccount)
AccountRouter.get('/:accUUID/balance', AccountController.fetchBalance)
AccountRouter.post(
  '/:accUUID/deposit',
  accountOperationRequestBodySchema,
  validateRequestBody,
  AccountController.deposit,
)
AccountRouter.post(
  '/:accUUID/withdraw',
  accountOperationRequestBodySchema,
  validateRequestBody,
  AccountController.withdraw,
)
AccountRouter.post(
  '/:accUUID/requestOverdraft',
  AccountController.requestOverdraft,
)
AccountRouter.post(
  '/:accUUID/reviewOverdraftRequest',
  reviewOverdraftRequestBodySchema,
  validateRequestBody,
  AccountController.reviewOverdraftRequest,
)
AccountRouter.delete('/:accUUID', AccountController.closeAccount)

export default AccountRouter
