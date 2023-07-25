import Account from '@model/Account'
import User from '@model/User'
import SavingsAccount from '@model/SavingsAccount'

const owner: User = {
  id: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
  name: 'John'
}
const acc = new SavingsAccount(owner)
const deposits = [20_000, 10_000, 30_000, 40_000]
deposits.forEach(d => {
  acc.deposit(d)
  console.log(`Deposited: ${d}, Remaining: ${acc.remainingDepositLimit()}`)
})
