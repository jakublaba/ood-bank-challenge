import { NextFunction, Request, Response } from 'express'
import * as AccountService from '@service/AccountService'
import AccountType from '@model/account/AccountType'
import { port } from '@entrypoint'
import InvalidAccountFilterError from '@error/InvalidAccountFilterError'

const extractUUIDs = (req: Request) => [req.params.userUUID, req.params.accUUID]

export const openAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userUUID = req.params.userUUID
  const accountType = req.body.accountType
  try {
    const accUUID = await AccountService.openAccount(userUUID, accountType)
    const resourcePath = `http://${req.hostname}:${port}/user/${userUUID}/account/${accUUID}`
    res.status(201).location(resourcePath).send()
  } catch (err) {
    next(err)
  }
}

const validateAccountFilter = (
  filter: string | undefined,
): AccountType | undefined => {
  if (!['checking', 'savings', 'investment', undefined].includes(filter)) {
    throw new InvalidAccountFilterError(
      `${filter} invalid accountFilter query param value`,
    )
  }
  return filter === undefined ? undefined : (filter as AccountType)
}

export const fetchUsersAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userUUID = req.params.userUUID
  try {
    const accountFilter = validateAccountFilter(
      req.query.accountFilter as string | undefined,
    )
    const accounts = await AccountService.fetchUsersAccounts(
      userUUID,
      accountFilter,
    )
    res.send(accounts)
  } catch (err) {
    next(err)
  }
}

export const fetchAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    const account = await AccountService.fetchAccount(userUUID, accUUID)
    res.send(account)
  } catch (err) {
    next(err)
  }
}

export const fetchBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    const balance = await AccountService.fetchBalance(userUUID, accUUID)
    res.send(balance)
  } catch (err) {
    next(err)
  }
}

export const deposit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const amount = req.body.amount
  try {
    await AccountService.deposit(userUUID, accUUID, amount)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const withdraw = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const amount = req.body.amount
  try {
    await AccountService.withdraw(userUUID, accUUID, amount)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const requestOverdraft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    await AccountService.requestOverdraft(userUUID, accUUID)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const reviewOverdraftRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const decision = req.body.decision
  try {
    await AccountService.reviewOverdraftRequest(userUUID, accUUID, decision)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const closeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    await AccountService.closeAccount(userUUID, accUUID)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
