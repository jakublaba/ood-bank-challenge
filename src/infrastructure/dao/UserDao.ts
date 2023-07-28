import User from '@model/user/User'
import ResourceNotFoundError from '@error/ResourceNotFoundError'

const users: Map<string, User> = new Map()

export const saveUser = async (user: User) => {
  users.set(user.uuid, user)
}

export const getAllUsers = async () => [...users.values()]

export const getUser = async (uuid: string) => users.get(uuid)

export const deleteUser = async (uuid: string) => {
  if (!users.delete(uuid)) {
    throw new ResourceNotFoundError(uuid)
  }
}
