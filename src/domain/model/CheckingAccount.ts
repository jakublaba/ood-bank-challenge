import Account from '@model/Account'
import User from '@model/User'

const OVERDRAFT_AMOUNT = 500

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

  requestOverdraft() {
    // TODO
  }

  reviewOverdraftRequest(decision: boolean) {
    // TODO
  }
}

export default CheckingAccount
