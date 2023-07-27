import User from '@model/user/User'

const users: Map<string, User> = new Map()

export const saveUser = (user: User) => {
  users.set(user.uuid, user)
}

export const getUser = (uuid: string) => users.get(uuid)

export const deleteUser = (uuid: string) => users.delete(uuid)
