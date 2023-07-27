import User from '@model/User'
import Transaction, { createTransaction } from '@model/Transaction'
import TransactionType from '@model/TransactionType'
import TransactionStatus from '@model/TransactionStatus'
import {v4} from "uuid";

abstract class Account {
  protected readonly _uuid: string
  protected readonly _transactions: Transaction[]

  protected constructor(
    protected _owner: User
  ) {
    this._uuid = v4()
    this._transactions = []
  }

  get uuid(): string {
    return this._uuid
  }

  get transactions(): Transaction[] {
    return this._transactions
  }

  get balance(): number {
    return this.transactions
      .filter(t => t.status === TransactionStatus.Values.Accepted)
      .map(t => t.amount)
      .reduce((a1, a2) => a1 + a2, 0)
  }

  deposit(amount: number) {
    const transaction = createTransaction(
      amount,
      TransactionType.Values.Deposit,
      TransactionStatus.Values.Accepted
    )
    this.transactions.push(transaction)
  }

  withdraw(amount: number) {
    const status = amount <= this.balance ? TransactionStatus.Values.Accepted : TransactionStatus.Values.Rejected
    const transaction = createTransaction(
      -amount,
      TransactionType.Values.Withdrawal,
      status
    )
    this.transactions.push(transaction)
  }

  generateStatement(): string {
    let statement = " Date | Type | Status | Amount | Balance \n"
    let statementBalance = this.balance
    this.transactions.reverse().forEach(t => {
      statement += ` ${t.date.toISOString()} | ${t.type} | ${t.status} | ${t.amount} | ${statementBalance} \n`
      statementBalance -= t.status === TransactionStatus.Values.Accepted ? t.amount : 0
    })
    return statement
  }
}

export default Account
