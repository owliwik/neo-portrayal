import { z } from 'zod'

export const realNameSchema = z.object({
  studentID: z.string().length(8),
  first: z.string().min(1).max(32),
  last: z.string().min(1).max(32)
})
export type RealNameData = z.infer<typeof realNameSchema>