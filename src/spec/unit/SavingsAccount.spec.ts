import User from '@model/user/User'
import Account from '@model/account/Account'
import SavingsAccount from '@model/account/SavingsAccount'
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'
import Transaction from '@model/transaction/Transaction'

describe('SavingsAccount unit tests', function () {
  const owner: User = {
    uuid: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
    name: 'John',
  }
  let account: Account

  beforeEach(() => {
    account = new SavingsAccount(owner)
  })

  it('Should allow deposits up to limit', () => {
    account.deposit(10_000)
    account.deposit(10_000)

    account.transactions.forEach((t) => {
      expect(t.type).toEqual(TransactionType.Values.Deposit)
      expect(t.status).toEqual(TransactionStatus.Values.Accepted)
    })
    expect(account.balance).toBe(20_000)
  })

  it('Should not allow deposits above limit', () => {
    account.deposit(20_000)
    account.deposit(10_000)
    account.deposit(30_000)

    account.transactions.slice(1).forEach((t) => {
      expect(t.type).toEqual(TransactionType.Values.Deposit)
      expect(t.status).toEqual(TransactionStatus.Values.Rejected)
    })
  })

  it('Should reset deposit limit after a year', () => {
    const yearAgo = new Date()
    yearAgo.setFullYear(new Date().getFullYear() - 1)
    const pastTransaction: Transaction = {
      uuid: 'f06ad5b1-17cb-4c7d-941e-3e9b9f03a0af',
      type: TransactionType.Values.Deposit,
      status: TransactionStatus.Values.Accepted,
      amount: 20_000,
      date: yearAgo,
    }
    account.transactions.push(pastTransaction)

    account.deposit(10_000)
    account.deposit(10_000)
    account.transactions.slice(1).forEach((t) => {
      expect(t.type).toEqual(TransactionType.Values.Deposit)
      expect(t.status).toEqual(TransactionStatus.Values.Accepted)
    })
    expect(account.balance).toBe(40_000)
  })
})
