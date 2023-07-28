import * as UserService from '@service/UserService'
import { NextFunction, Request, Response } from 'express'
import { port } from '@entrypoint'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const name: string = req.body.name
  try {
    const userUUID = await UserService.createUser(name)
    const resourcePath = `http://${req.hostname}:${port}/user/${userUUID}`
    res.status(201).location(resourcePath).send()
  } catch (err) {
    next(err)
  }
}

export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserService.getAllUsers()
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export const fetchUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = req.params.userUUID
  try {
    const user = await UserService.getOneUser(uuid)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = req.params.userUUID
  const name = req.body.name
  try {
    await UserService.updateUser(uuid, name)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = req.params.userUUID
  try {
    await UserService.deleteUser(uuid)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
