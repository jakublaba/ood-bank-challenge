import { z } from "zod"
import { TransactionSchema } from '@model/transaction/Transaction'

const AccountStatementSchema = z.object({
  id: z.string().uuid('Not a valid UUID'),
  transactions: z.array(TransactionSchema)
})

type AccountStatement = z.infer<typeof AccountStatementSchema>

export default AccountStatement
