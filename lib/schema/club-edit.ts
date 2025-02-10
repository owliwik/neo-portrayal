import { z } from 'zod'

export const clubEditSchema = z.object({
  id: z.string().trim().nonempty(),
  name: z.string().trim().nonempty(),
  alias_name: z.string().trim().nonempty().optional(),
  time: z.string().trim().optional(),
  location: z.string().trim().optional(),
  description: z.string().trim().optional(),
  activity_intro: z.string().optional(),
  contact: z.string().trim().optional(),
})

export type ClubEdit = z.infer<typeof clubEditSchema>