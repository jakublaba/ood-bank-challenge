import Account from "@model/account/Account";

const accounts: Map<string, Account> = new Map()

export const saveAccount = (account: Account) => {
    accounts.set(account.uuid, account)
}

export const getAllAccounts = () => [...accounts.values()]

export const getAccount = (uuid: string) => accounts.get(uuid)

export const deleteAccount = (uuid: string) => accounts.delete(uuid)
