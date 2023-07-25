import { z } from "zod"
import TransactionType from '@model/TransactionType'
import { v4 as uuid } from 'uuid'
import TransactionStatus from '@model/TransactionStatus'

export const createTransaction = (
  amount: number,
  type: z.infer<typeof TransactionType>,
  status: z.infer<typeof TransactionStatus>): Transaction => {
  const id = uuid()
  const date = new Date()

  return { id, type, status, amount, date }
}

export const TransactionSchema = z.object({
  id: z.string().uuid('Not a valid UUID'),
  type: TransactionType,
  status: TransactionStatus,
  amount: z.number().positive('Transaction amount must be positive'),
  date: z.date()
})

type Transaction = z.infer<typeof TransactionSchema>

export default Transaction
