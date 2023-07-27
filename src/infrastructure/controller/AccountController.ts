import { Request, Response } from 'express'
import * as AccountService from '@service/AccountService'
import ResourceNotFoundError from '@error/ResourceNotFoundError'
import InvalidAccountOperationError from '@error/InvalidAccountOperationError'
import AccountType from '@model/account/AccountType'
import { port } from '@entrypoint'

const extractUUIDs = (req: Request) => [req.params.userUUID, req.params.accUUID]

export const openAccount = async (req: Request, res: Response) => {
  const userUUID = req.params.userUUID
  const accountType = req.body.accountType
  try {
    const accUUID = await AccountService.openAccount(userUUID, accountType)
    const resourcePath = `http://${req.hostname}:${port}/user/${userUUID}/account/${accUUID}`
    res.status(201).location(resourcePath).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const fetchUsersAccounts = async (req: Request, res: Response) => {
  const userUUID = req.params.userUUID
  const accountFilter = req.query.accountFilter as AccountType | undefined
  if (
    !['checking', 'savings', 'investment', undefined].includes(accountFilter)
  ) {
    res.status(400).send('Invalid accountFilter query param value')
  }
  try {
    const accounts = await AccountService.fetchUsersAccounts(
      userUUID,
      accountFilter,
    )
    res.send(accounts)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const fetchAccount = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    const account = await AccountService.fetchAccount(userUUID, accUUID)
    res.send(account)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const fetchBalance = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    const balance = await AccountService.fetchBalance(userUUID, accUUID)
    res.send(balance)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const deposit = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const amount = req.body.amount
  try {
    await AccountService.deposit(userUUID, accUUID, amount)
    res.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const withdraw = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const amount = req.body.amount
  try {
    await AccountService.withdraw(userUUID, accUUID, amount)
    res.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const requestOverdraft = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    await AccountService.requestOverdraft(userUUID, accUUID)
    res.status(204).send()
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof InvalidAccountOperationError
    ) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const reviewOverdraftRequest = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  const decision = req.body.decision
  try {
    await AccountService.reviewOverdraftRequest(userUUID, accUUID, decision)
    res.status(204).send()
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof InvalidAccountOperationError
    ) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const closeAccount = async (req: Request, res: Response) => {
  const [userUUID, accUUID] = extractUUIDs(req)
  try {
    await AccountService.closeAccount(userUUID, accUUID)
    res.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}
