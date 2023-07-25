import Account from '@model/Account'
import User from '@model/User'
import TransactionType from '@model/TransactionType'

describe('Account unit tests', () => {
  const owner: User = {
    id: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
    name: 'John'
  }
  let account: Account

  beforeEach(() => {
    account = new Account(owner)
  })

  it('Should create blank account', () => {
    expect(account.transactions).toEqual([])
    expect(account.balance).toEqual(0)
  })

  it('Deposit should add transaction to history and increase balance', () => {
    const depositAmount = 11.5
    account.deposit(depositAmount)

    expect(account.transactions.length).toEqual(1)
    expect(account.transactions[0].type).toEqual(TransactionType.Values.Deposit)
    expect(account.transactions[0].amount).toEqual(depositAmount)
    expect(account.balance).toEqual(depositAmount)
  })

  it('Valid withdrawal should add transaction to history and decrease balance', () => {
    const initialBalance = 20
    const withdrawalAmount = 15.5
    const expectedBalance = initialBalance - withdrawalAmount
    account.deposit(initialBalance)
    account.withdraw(withdrawalAmount)

    expect(account.transactions.length).toEqual(2)
    expect(account.transactions[1].type).toEqual(TransactionType.Values.Withdrawal)
    expect(account.transactions[1].amount).toEqual(withdrawalAmount)
    expect(account.balance).toEqual(expectedBalance)
  })
})
