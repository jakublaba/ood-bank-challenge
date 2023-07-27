import Account from '@model/account/Account'
import User from '@model/user/User'
import { createTransaction } from '@model/transaction/Transaction'
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'

const ALLOWED_OVERDRAFT_AMOUNT = 500

class CheckingAccount extends Account {
  private _overdraftAllowed: boolean = false
  private _overdraftRequested: boolean = false

  constructor(owner: User) {
    super(owner)
  }

  get overdraftAllowed(): boolean {
    return this._overdraftAllowed
  }

  get overdraftRequested(): boolean {
    return this._overdraftRequested
  }

  withdraw(amount: number) {
    const overdraft = Math.max(0, -this.balance)
    const status = this.overdraftAllowed ?
      overdraft + amount <= ALLOWED_OVERDRAFT_AMOUNT ?
        TransactionStatus.Values.Accepted :
        TransactionStatus.Values.Rejected :
      TransactionStatus.Values.Rejected
    const transaction = createTransaction(
      -amount,
      TransactionType.Values.Withdrawal,
      status
    )
    this._transactions.push(transaction)
  }

  requestOverdraft() {
    this._overdraftRequested = true
  }

  reviewOverdraftRequest(decision: boolean) {
    if (!this.overdraftRequested) {
      return
    }
    this._overdraftAllowed = decision
    this._overdraftRequested = false
  }
}

export default CheckingAccount
