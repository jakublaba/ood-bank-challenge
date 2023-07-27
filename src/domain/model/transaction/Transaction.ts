import { z } from "zod"
import TransactionType from '@model/transaction/TransactionType'
import TransactionStatus from '@model/transaction/TransactionStatus'
import {v4} from "uuid";

export const createTransaction = (
  amount: number,
  type: z.infer<typeof TransactionType>,
  status: z.infer<typeof TransactionStatus>): Transaction => {
  const uuid = v4()
  const date = new Date()

  return { uuid, type, status, amount, date }
}

export const TransactionSchema = z.object({
  uuid: z.string().uuid('Not a valid UUID'),
  type: TransactionType,
  status: TransactionStatus,
  amount: z.number().positive('Transaction amount must be positive'),
  date: z.date()
})

type Transaction = z.infer<typeof TransactionSchema>

export default Transaction
