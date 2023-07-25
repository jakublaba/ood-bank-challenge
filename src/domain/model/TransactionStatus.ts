import { z } from "zod"

const TransactionStatus = z.enum([
  "Accepted",
  "Rejected"
])

export default TransactionStatus
