import Account from '@model/Account'
import User from '@model/User'

const owner: User = {
  id: 'd4da3928-1436-4f85-8a5f-3e71babac32f',
  name: 'John'
}
const acc = new Account(owner)
console.log(acc)
