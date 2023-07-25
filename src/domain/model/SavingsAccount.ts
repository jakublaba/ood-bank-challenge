import Account from '@model/Account'
import User from '@model/User'

const DEPOSIT_LIMIT = 20_000

class SavingsAccount extends Account {
  constructor(owner: User) {
    super(owner)
  }
}

export default SavingsAccount
