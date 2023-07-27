import * as UserDao from '@dao/UserDao'
import { v4 } from 'uuid'
import ResourceNotFoundError from '@error/ResourceNotFoundError'

export const createUser = (name: string) => {
  const user = {
    uuid: v4(),
    name: name,
  }
  UserDao.saveUser(user)
  return user.uuid
}

export const getOneUser = (uuid: string) => {
  const user = UserDao.getUser(uuid)
  if (!user) {
    throw new ResourceNotFoundError(uuid)
  }
  return user
}

export const updateUser = (uuid: string, name: string) => {
  const user = { uuid, name }
  UserDao.saveUser(user)
  return user.uuid
}

export const deleteUser = (uuid: string) => UserDao.deleteUser(uuid)
