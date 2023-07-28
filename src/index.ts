import express from 'express'
import UserRouter from '@router/UserRouter'
import AccountRouter from '@router/AccountRouter'
import bodyParser from 'body-parser'
import ApiErrorHandler from '@middleware/ApiErrorHandler'


const app = express()
app.use(bodyParser.json())
app.use('/user/:userUUID/account', AccountRouter)
app.use('/user', UserRouter)
app.use(ApiErrorHandler)

export const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
