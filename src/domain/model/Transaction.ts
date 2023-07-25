import { z } from "zod"
import TransactionType from '@model/TransactionType'

export const TransactionSchema = z.object({
  id: z.string().uuid('Not a valid UUID'),
  type: TransactionType,
  amount: z.bigint().positive('Transaction amount must be positive'),
  date: z.date()
})

type Transaction = z.infer<typeof TransactionSchema>

export default Transaction
