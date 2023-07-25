import { z } from "zod"
import TransactionType from '@model/TransactionType'
import { v4 as uuid } from 'uuid'

export const createTransaction = (amount: number, type: z.infer<typeof TransactionType>): Transaction => {
  const id = uuid()
  const date = new Date()

  return { id, type, amount, date }
}

export const TransactionSchema = z.object({
  id: z.string().uuid('Not a valid UUID'),
  type: TransactionType,
  amount: z.number().positive('Transaction amount must be positive'),
  date: z.date()
})

type Transaction = z.infer<typeof TransactionSchema>

export default Transaction
