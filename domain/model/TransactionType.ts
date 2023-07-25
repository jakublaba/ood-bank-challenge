import { z } from "zod"

const transactionTypes = [
  'Deposit',
  'Withdrawal'
] as const;

const TransactionType = z.enum(transactionTypes)

export default TransactionType
