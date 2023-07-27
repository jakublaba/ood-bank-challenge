import express from 'express'
import UserRouter from "@router/UserRouter";
import AccountRouter from "@router/AccountRouter";
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())
app.use('/user', UserRouter)
app.use('/user/:id/accounts', AccountRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
