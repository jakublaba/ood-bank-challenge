import { NextFunction, Request, Response } from 'express'
import ApiError from '@error/ApiError'

const ApiErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.status).send(err.message)
    return
  }
  res.status(500).send('Server has encountered a skill issue')
}

export default ApiErrorHandler
