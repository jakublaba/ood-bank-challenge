import Account from '@model/account/Account'
import User from '@model/user/User'
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'

class AccountImpl extends Account {
  constructor(owner: User) {
    super(owner)
  }
}

describe('Account unit tests', () => {
  const owner: User = {
    uuid: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
    name: 'John'
  }
  let account: Account

  beforeEach(() => {
    account = new AccountImpl(owner)
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
    expect(account.transactions[0].status).toEqual(TransactionStatus.Values.Accepted)
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
    expect(account.transactions[1].status).toEqual(TransactionStatus.Values.Accepted)
    expect(account.transactions[1].amount).toEqual(-withdrawalAmount)
    expect(account.balance).toEqual(expectedBalance)
  })

  it('Invalid withdrawal should add transaction to history and not affect balance', () => {
    const withdrawalAmount = 12.5
    account.withdraw(withdrawalAmount)

    expect(account.transactions.length).toEqual(1)
    expect(account.transactions[0].type).toEqual(TransactionType.Values.Withdrawal)
    expect(account.transactions[0].status).toEqual(TransactionStatus.Values.Rejected)
    expect(account.transactions[0].amount).toEqual(-withdrawalAmount)
    expect(account.balance).toEqual(0)
  })

  it('Should contain correct information in account statement', () => {
    const depositAmount = 2.5
    const withdrawalAmount = 3.5
    account.deposit(depositAmount)
    account.withdraw(withdrawalAmount)
    const statement = account.generateStatement()

    expect(statement).toContain("Date")
    expect(statement).toContain("Type")
    expect(statement).toContain("Status")
    expect(statement).toContain("Amount")
    expect(statement).toContain("Accepted")
    expect(statement).toContain("Rejected")
    expect(statement).toContain(depositAmount.toString())
    expect(statement).toContain(withdrawalAmount.toString())
  })
})
