'use client'

import { UserContext } from '@/components/context/user-context'
import { useContext } from 'react'

export const useUser = () => {
  return useContext(UserContext)
}
