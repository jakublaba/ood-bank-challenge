# Bank

This challenge helps you practice your OO design skills.

You'll work alone, and you'll also review your own code, so you can practice reflecting on and improving your own work.

## Specification

### Requirements

* You should be able to interact with your code via a JavaScript REPL - Node REPL or browser console  (You don't need to
  implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, credit or debit amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see

```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```

#### Standard

- [x] Meets the spec
- [x] Developed test-first (commit your tests before your source code to provide evidence of this)
- [x] Passes tests
- [x] Encapsulates adding and storing Transactions in a class
- [x] Encapsulates Statement formatting in a class
- [x] Encapsulates Transaction data in a class

#### Extensions

- [ ] Generate ordered bank statements between 2 dates
- [x] Disable withdraws if the withdrawal amount exceeds the available funds. Available funds must be calculated based
  on
  a complete transaction history, not a variable that gets updated
- [x] Allow adding a 500 overdraft to the account
- [x] Different account types (Savings, Investment, Checking). Savings & Investment accounts cant have overdrafts,
  Checking accounts can. Investment accounts accumulate 2% interest every month.
- [x] Deposit limits of 20,000 per year on Savings accounts
- [ ] A front-end online banking app
- [ ] Generate PDFs of bank statements

### Bonus task

I have implemented a rest api using [express.js](https://expressjs.com/) framework.
The api allows accessing all the features implemented in core and extension exercises.

Build the project using:

```
npm run build
```

(Don't forget to `npm i` first)

And then run using

```
npm start
```

The server will start on port 3000, though you can change it with the `port` variable inside `index.ts`

#### Endpoints

Besides the responses listed in each endpoint, of course also `500` can always be returned if something unexpected
happens.

##### Create a new user

`POST /user/register` \
Request body:

```js
{
    name: string
}
```

Returns:

* `201 CREATED` with resource url in `Location` header.

##### Get all existing users

`GET /user`

Returns:

* `200 OK` with list of all existing users in response body (list can be empty)

##### Get one user

`GET /user/{userUUID}`

Returns:

* `200 OK` with specified user in response body upon success
* `404 NOT FOUND` for invalid `userUUID` in url

##### Update user data

`PUT /user/{userUUID}`

Request body:

```js
{
    name: string
}
```

Returns:

* `204 NO CONTENT` upon success
* `400 BAD REQUEST` for invalid request body
* `404 NOT FOUND` for invalid `userUUID` in url

##### Delete a user

`DELETE /user/{userUUID}`
Returns:

* `204 NO CONTENT` upon success
* `404 NOT FOUND` for invalid `userUUID` in url

##### Open a new account for specified user

`POST /user/{userUUID}/account/open`

Request body:

```js
{
    accountType: 'checking' | 'savings' | 'investment'
}
```

Returns:

* `201 CREATED` with resource url in `Location` header upon success
* `400 BAD REQUEST` for invalid request body
* `404 NOT FOUND` for invalid `userUUID` in url

##### Get all accounts of specified user

`GET /user/{userUUID}/account?accountFilter=...`

`accountFilter` query parameter is optional - when specified, only accounts of the given type will be fetched.
Otherwise,
all accounts will be fetched, regardless of type.
Allowed values are: `checking`, `savings`, 'investment'

Returns:

* `200 OK` with list of accounts in response body (list can be empty)
* `400 BAD REQUEST` for invalid `accountFiler` query param value

##### Get one account of specified user

`GET /user/{userUUID}/account/{accountUUID}`

Returns:

* `200 OK` with specified account in response body upon success
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url

##### Get balance of specified account

`GET /user/{userUUID}/account/{accountUUID}/balance`

Returns:

* `200 OK` with balance in response body upon success
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url

##### Deposit money on account

`POST /user/{userUUID}/account/{accountUUID}/deposit`

Request body:

```js
{
    amount: number
}
```

Returns:

* `204 NO CONTENT` upon success
* `400 BAD REQUEST` for invalid request body (including trying to deposit amount <= 0)
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url

##### Withdraw money from account

`POST /user/{userUUID}/account/{accountUUID}/withdraw`

Request body:

```js
{
    amount: number
}
```

Returns:

* `204 NO CONTENT` upon success
* `400 BAD REQUEST` for invalid request body (including trying to withdraw amount <= 0)
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url

Note that according to the domain model from earlier stage, rejected transactions will not return error http responses,
they will be added to history, marked as rejected.

##### Request overdraft on a checking account

`POST /user/{userUUID}/account/{accountUUID}/requestOverdraft`

Request body: None

Returns:

* `204 NO CONTENT` upon success
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url
* `405 METHOD NOT ALLOWED` when trying to request overdraft on other account types than Checking Account

##### Review an overdraft request on an account

`POST /user/{userUUID}/account/{accountUUID}/reviewOverdraftRequest`

Request body:

```js
{
    decision: boolean
}
```

Returns:

* `204 NO CONTENT` upon success
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url
* `405 METHOD NOT ALLOWED` when trying to review and overdraft request on other account types than Checking Account

##### Delete an account

`DELETE /user/{userUUID}/account/{accountUUID}`

Returns:

* `204 NO CONTENT` upon success
* `404 NOT FOUND` for invalid `userUUID` or `accountUUID` in url
