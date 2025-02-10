'use client'

import { User } from '@supabase/supabase-js'
import { createContext, ReactNode } from 'react'

export const UserContext = createContext<User | null>(null)
