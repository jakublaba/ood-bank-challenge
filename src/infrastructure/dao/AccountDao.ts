import Account from '@model/account/Account'
import ResourceNotFoundError from '@error/ResourceNotFoundError'

const accounts: Map<string, Account> = new Map()

export const saveAccount = async (account: Account) => {
  accounts.set(account.uuid, account)
}

export const getAllAccounts = async () => [...accounts.values()]

export const getAccount = async (uuid: string) => accounts.get(uuid)

export const deleteAccount = async (uuid: string) => {
  if (!accounts.delete(uuid)) {
    throw new ResourceNotFoundError(uuid)
  }
}
