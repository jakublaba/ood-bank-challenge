import * as UserService from '@service/UserService'
import * as AccountDao from '@dao/AccountDao'
import CheckingAccount from '@model/account/CheckingAccount'
import SavingsAccount from '@model/account/SavingsAccount'
import InvestmentAccount from '@model/account/InvestmentAccount'
import ResourceNotFoundError from '@error/ResourceNotFoundError'
import InvalidAccountOperationError from '@error/InvalidAccountOperationError'
import AccountType from '@model/account/AccountType'
import Account from '@model/account/Account'

export const openAccount = async (
  userUUID: string,
  accountType: AccountType,
) => {
  const owner = await UserService.getOneUser(userUUID)
  let account: Account
  switch (accountType) {
    case 'checking': {
      account = new CheckingAccount(owner)
      break
    }
    case 'savings': {
      account = new SavingsAccount(owner)
      break
    }
    case 'investment': {
      account = new InvestmentAccount(owner)
      break
    }
    default: {
      throw new Error('Unexpected accountType value')
    }
  }
  await AccountDao.saveAccount(account)
  return account.uuid
}

export const fetchUsersAccounts = async (
  userUUID: string,
  accountFilter?: AccountType,
) => {
  const user = await UserService.getOneUser(userUUID)
  const accounts = await AccountDao.getAllAccounts()

  return accounts
    .filter((acc) => acc.owner === user)
    .filter((acc) => {
      switch (accountFilter) {
        case 'checking': {
          return acc instanceof CheckingAccount
        }
        case 'savings': {
          return acc instanceof SavingsAccount
        }
        case 'investment': {
          return acc instanceof InvestmentAccount
        }
        default: {
          return true
        }
      }
    })
}

export const fetchAccount = async (userUUID: string, accUUID: string) => {
  const account = await AccountDao.getAccount(accUUID)
  if (!account || account.owner.uuid !== userUUID) {
    throw new ResourceNotFoundError(accUUID)
  }
  return account
}

export const fetchBalance = async (userUUID: string, accUUID: string) => {
  const account = await fetchAccount(userUUID, accUUID)
  return account.balance
}

export const deposit = async (
  userUUID: string,
  accUUID: string,
  amount: number,
) => {
  const account = await fetchAccount(userUUID, accUUID)
  account.deposit(amount)
}

export const withdraw = async (
  userUUID: string,
  accUUID: string,
  amount: number,
) => {
  const account = await fetchAccount(userUUID, accUUID)
  account.withdraw(amount)
}

export const requestOverdraft = async (userUUID: string, accUUID: string) => {
  const account = await fetchAccount(userUUID, accUUID)
  if (!(account instanceof CheckingAccount)) {
    throw new InvalidAccountOperationError(
      'Overdraft is only possible on a checking account',
    )
  }
  account.requestOverdraft()
}

export const reviewOverdraftRequest = async (
  userUUID: string,
  accUUID: string,
  decision: boolean,
) => {
  const account = await fetchAccount(userUUID, accUUID)
  if (!(account instanceof CheckingAccount)) {
    throw new InvalidAccountOperationError(
      'Overdraft is only possible on a checking account',
    )
  }
  account.reviewOverdraftRequest(decision)
}

export const closeAccount = async (userUUID: string, accUUID: string) => {
  const account = await fetchAccount(userUUID, accUUID)
  await AccountDao.deleteAccount(account.uuid)
}
