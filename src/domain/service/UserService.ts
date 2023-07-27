import * as UserDao from '@dao/UserDao'
import { v4 } from 'uuid'
import ResourceNotFoundError from '@error/ResourceNotFoundError'

export const createUser = async (name: string) => {
  const user = {
    uuid: v4(),
    name: name,
  }
  await UserDao.saveUser(user)
  return user.uuid
}

export const getAllUsers = async () => await UserDao.getAllUsers()

export const getOneUser = async (uuid: string) => {
  const user = await UserDao.getUser(uuid)
  if (!user) {
    throw new ResourceNotFoundError(uuid)
  }
  return user
}

export const updateUser = async (uuid: string, name: string) => {
  const user = { uuid, name }
  await UserDao.saveUser(user)
  return user.uuid
}

export const deleteUser = async (uuid: string) => await UserDao.deleteUser(uuid)
