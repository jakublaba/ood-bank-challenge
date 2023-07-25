import User from '@model/User'
import Transaction, { createTransaction } from '@model/Transaction'
import TransactionType from '@model/TransactionType'
import TransactionStatus from '@model/TransactionStatus'

const Deposit = TransactionType.Values.Deposit
const Withdrawal = TransactionType.Values.Withdrawal
const Accepted = TransactionStatus.Values.Accepted
const Rejected = TransactionStatus.Values.Rejected

abstract class Account {
  protected readonly _transactions: Transaction[]

  protected constructor(
    protected _owner: User
  ) {
    this._transactions = []
  }

  get transactions(): Transaction[] {
    return this._transactions
  }

  get balance(): number {
    return this._transactions
      .filter(t => t.status === Accepted)
      .map(t => {
        switch (t.type) {
          case Deposit: return t.amount;
          case Withdrawal: return -t.amount;
        }
      })
      .reduce((a1, a2) => a1 + a2, 0)
  }

  deposit(amount: number) {
    const transaction = createTransaction(amount, Deposit, Accepted)
    this._transactions.push(transaction)
  }

  withdraw(amount: number) {
    const status = amount <= this.balance ? Accepted : Rejected
    const transaction = createTransaction(amount, Withdrawal, status)
    this._transactions.push(transaction)
  }

  generateStatement(): string {
    let statement = " Date | Type | Status | Amount | Balance \n"
    let statementBalance = this.balance
    this.transactions.reverse().forEach(t => {
      statement += ` ${t.date} | ${t.type} | ${t.status} | ${t.amount} | ${statementBalance} \n`
      statementBalance -= t.status === Accepted ? t.amount : 0
    })
    return statement
  }
}

export default Account
