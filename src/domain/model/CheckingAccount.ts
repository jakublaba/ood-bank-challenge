import Account from '@model/Account'

const OVERDRAFT_AMOUNT = 500

class CheckingAccount extends Account {
  private overdraftAllowed: boolean = false
  private overdraftRequested: boolean = false

  requestOverdraft() {
    // TODO
  }

  reviewOverdraftRequest(decision: boolean) {
    // TODO
  }
}

export default CheckingAccount
