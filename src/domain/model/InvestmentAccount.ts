import Account from '@model/Account'
import User from '@model/User'

const INTEREST_RATE = .02

class InvestmentAccount extends Account {
  constructor(owner: User) {
    super(owner)
  }
}

export default InvestmentAccount
