import User from '@model/User'
import Transaction from '@model/Transaction'

class Account {
  private _transactions: Transaction[]
  constructor(
    private _owner: User
  ) {
    this._transactions = []
  }

  get balance(): number {
    // TODO
    return 0
  }

  deposit(amount: number) {
    // TODO
  }

  withdraw(amount: number) {
    // TODO
  }
}

export default Account
