import User from '@model/user/User'
import Account from '@model/account/Account'
import InvestmentAccount from '@model/account/InvestmentAccount'
import Transaction from '@model/transaction/Transaction'
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'

describe('InvestmentAccount unit tests', function () {
  const owner: User = {
    uuid: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
    name: 'John',
  }
  let account: Account

  beforeEach(() => {
    account = new InvestmentAccount(owner)
  })

  it('Should increase balance by interest rate after a year', function () {
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

    expect(account.balance).toBe(20_000 * 1.02)
  })
})