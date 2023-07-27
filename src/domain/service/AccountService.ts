import * as UserService from '@service/UserService'
import * as AccountDao from '@dao/AccountDao'
import CheckingAccount from '@model/account/CheckingAccount'
import SavingsAccount from '@model/account/SavingsAccount'
import InvestmentAccount from '@model/account/InvestmentAccount'
import AccountType from '@model/account/AccountType'
import ResourceNotFoundError from '../../infrastructure/error/ResourceNotFoundError'
import InvalidAccountOperationError from '../../infrastructure/error/InvalidAccountOperationError'

export const openAccount = (userUUID: string, accountType: AccountType) => {
  const owner = UserService.getOneUser(userUUID)
  let account
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
  }
  AccountDao.saveAccount(account)
  return account.uuid
}

export const fetchUsersAccounts = (
  userUUID: string,
  accountFilter?: AccountType,
) => {
  const user = UserService.getOneUser(userUUID)
  const accounts = AccountDao.getAllAccounts()

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

const fetchAccount = (userUUID: string, accUUID: string) => {
  const account = AccountDao.getAccount(accUUID)
  if (!account || account.owner.uuid !== userUUID) {
    throw new ResourceNotFoundError(accUUID)
  }
  return account
}

export const deposit = (userUUID: string, accUUID: string, amount: number) => {
  const account = fetchAccount(userUUID, accUUID)
  account.deposit(amount)
}

export const withdraw = (userUUID: string, accUUID: string, amount: number) => {
  const account = fetchAccount(userUUID, accUUID)
  account.withdraw(amount)
}

export const requestOverdraft = (userUUID: string, accUUID: string) => {
  const account = fetchAccount(userUUID, accUUID)
  if (!(account instanceof CheckingAccount)) {
    throw new InvalidAccountOperationError(
      'Overdraft is only possible on a checking account',
    )
  }
  account.requestOverdraft()
}

export const reviewOverdraft = (
  userUUID: string,
  accUUID: string,
  decision: boolean,
) => {
  const account = fetchAccount(userUUID, accUUID)
  if (!(account instanceof CheckingAccount)) {
    throw new InvalidAccountOperationError(
      'Overdraft is only possible on a checking account',
    )
  }
  account.reviewOverdraftRequest(decision)
}

export const closeAccount = (userUUID: string, accUUID: string) => {
  const account = fetchAccount(userUUID, accUUID)
  AccountDao.deleteAccount(account.uuid)
}
