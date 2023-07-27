import Account from '@model/account/Account'
import User from '@model/user/User'
import TransactionStatus from '@model/transaction/TransactionStatus'
import { createTransaction } from '@model/transaction/Transaction'
import TransactionType from '@model/transaction/TransactionType'

const DEPOSIT_LIMIT = 20_000

class SavingsAccount extends Account {
  constructor(owner: User) {
    super(owner)
  }

  deposit(amount: number) {
    const status = amount <= this.remainingDepositLimit() ?
      TransactionStatus.Values.Accepted :
      TransactionStatus.Values.Rejected
    const transaction = createTransaction(
      amount,
      TransactionType.Values.Deposit,
      status
    )
    this.transactions.push(transaction)
  }

  remainingDepositLimit(): number {
    const currentYear = new Date().getFullYear()
    const currentYearDepositAmount = this.transactions
      .filter(t => t.date.getFullYear() === currentYear)
      .filter(t => t.status === TransactionStatus.Values.Accepted)
      .map(t => t.amount)
      .reduce((a1, a2) => a1 + a2, 0)
    return DEPOSIT_LIMIT - currentYearDepositAmount
  }
}

export default SavingsAccount
