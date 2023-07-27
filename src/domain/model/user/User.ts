import { z } from 'zod'

const UserSchema = z.object({
  uuid: z.string().uuid('Not a valid UUID'),
  name: z.string(),
})

type User = z.infer<typeof UserSchema>

export default User
