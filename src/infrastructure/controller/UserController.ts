import * as UserService from '@service/UserService'
import { Request, Response } from 'express'
import ResourceNotFoundError from '@error/ResourceNotFoundError'
import { port } from '@entrypoint'

export const register = async (req: Request, res: Response) => {
  const name: string = req.body.name
  const userUUID = await UserService.createUser(name)
  const resourcePath = `http://${req.hostname}:${port}/user/${userUUID}`
  res.status(201).location(resourcePath).send()
}

export const fetchAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  res.send(users)
}

export const fetchUser = async (req: Request, res: Response) => {
  const uuid = req.params.userUUID
  try {
    const user = await UserService.getOneUser(uuid)
    res.send(user)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server encountered a skill issue')
    }
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const uuid = req.params.userUUID
  const name = req.body.name
  try {
    await UserService.updateUser(uuid, name)
    res.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const uuid = req.params.userUUID
  try {
    await UserService.deleteUser(uuid)
    res.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(err.status).send(err.message)
    } else {
      res.status(500).send('Server has encountered a skill issue')
    }
  }
}
