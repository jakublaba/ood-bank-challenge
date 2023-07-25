import User from '@model/User'
import Transaction, { createTransaction } from '@model/Transaction'
import TransactionType from '@model/TransactionType'

const Deposit = TransactionType.Values.Deposit
const Withdrawal = TransactionType.Values.Withdrawal

class Account {
  private readonly _transactions: Transaction[]

  constructor(
    private _owner: User
  ) {
    this._transactions = []
  }

  get transactions(): Transaction[] {
    return this._transactions
  }

  get balance(): number {
    return this._transactions
      .map(t => {
        switch (t.type) {
          case Deposit: return t.amount;
          case Withdrawal: return -t.amount;
        }
      })
      .reduce((a1, a2) => a1 + a2, 0)
  }

  deposit(amount: number) {
    const transaction = createTransaction(amount, Deposit)
    this._transactions.push(transaction)
  }

  withdraw(amount: number) {
    const transaction = createTransaction(amount, Withdrawal)
    this._transactions.push(transaction)
  }
}

export default Account
