import User from '@model/user/User'
import Account from '@model/account/Account'
import CheckingAccount from '@model/account/CheckingAccount'
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'

describe('CheckingAccount unit tests', function() {
  const owner: User = {
    uuid: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
    name: 'John'
  }
  let account: CheckingAccount

  beforeEach(() => {
    account = new CheckingAccount(owner)
  })

  it('Should create checking account with correct initial state', () => {
    expect(account.overdraftAllowed).toBe(false)
    expect(account.overdraftRequested).toBe(false)
  })

  it('Should properly update state when requesting overdraft', () => {
    account.requestOverdraft()

    expect(account.overdraftAllowed).toBe(false)
    expect(account.overdraftRequested).toBe(true)
  })

  it('Should properly update state when approving overdraft request', () => {
    account.requestOverdraft()
    account.reviewOverdraftRequest(true)

    expect(account.overdraftAllowed).toBe(true)
    expect(account.overdraftRequested).toBe(false)
  })

  it('Should properly update state when declining overdraft request', () => {
    account.requestOverdraft()
    account.reviewOverdraftRequest(false)

    expect(account.overdraftAllowed).toBe(false)
    expect(account.overdraftRequested).toBe(false)
  })

  it('Should do nothing when requesting overdraft with already pending request', () => {
    account.requestOverdraft()
    const accountState = [account.overdraftAllowed, account.overdraftRequested]
    account.requestOverdraft()

    expect([account.overdraftAllowed, account.overdraftRequested]).toEqual(accountState)
  })

  it('Should do nothing when reviewing with no pending overdraft request', () => {
    account.requestOverdraft()
    account.reviewOverdraftRequest(true)
    const accountState = [account.overdraftAllowed, account.overdraftRequested]
    account.reviewOverdraftRequest(false)

    expect([account.overdraftAllowed, account.overdraftRequested]).toEqual(accountState)
  })

  it('Should allow withdrawal up to overdraft limit and decreasing balance below 0', () => {
    account.requestOverdraft()
    account.reviewOverdraftRequest(true)
    account.withdraw(300)
    account.withdraw(200)

    expect(account.transactions.length).toBe(2)
    account.transactions.forEach(t => {
      expect(t.type).toEqual(TransactionType.Values.Withdrawal)
      expect(t.status).toEqual(TransactionStatus.Values.Accepted)
    })
    expect(account.balance).toBe(-500)
  })

  it('Should not allow withdrawal above overdraft limit', () => {
    account.withdraw(1)
    account.requestOverdraft()
    account.reviewOverdraftRequest(true)
    account.withdraw(600)

    expect(account.transactions.length).toBe(2)
    account.transactions.forEach(t => {
      expect(t.type).toEqual(TransactionType.Values.Withdrawal)
      expect(t.status).toEqual(TransactionStatus.Values.Rejected)
    })
    expect(account.balance).toBe(0)
  })
})