import Account from '@model/account/Account'

const accounts: Map<string, Account> = new Map()

export const saveAccount = async (account: Account) => {
  accounts.set(account.uuid, account)
}

export const getAllAccounts = async () => [...accounts.values()]

export const getAccount = async (uuid: string) => accounts.get(uuid)

export const deleteAccount = async (uuid: string) => accounts.delete(uuid)
