import { z } from "zod"

const TransactionType = z.enum([
  'Deposit',
  'Withdrawal'
]);

export default TransactionType
