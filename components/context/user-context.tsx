'use client'

import { useState, useEffect, createContext, ReactNode, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { Tables } from '@/lib/types/db'
import { auth, db } from '@/lib/supabase/client'

export interface UserProfile {
  user: User
  profile?: Tables<'profiles'>
}

export const UserContext = createContext<UserProfile | undefined>(undefined)

export const UserProvider = ({
  children,
  init,
}: {
  children: ReactNode
  init?: UserProfile
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(init)

  useEffect(() => {
    const { subscription } = auth.onAuthStateChange(async (event, session) => {
      const fetchSession = async () => {
        if (!session) {
          setUserProfile(undefined)
          return
        }

        const user = session.user
        const { data: profile, error } = await db('profiles')
          .select('*')
          .eq('auth_id', user.id)
          .maybeSingle()

        const updatedProfile = { user, profile: profile ?? undefined }
        setUserProfile(updatedProfile)
      }

      fetchSession()
    }).data

    return () => subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={userProfile}>{children}</UserContext.Provider>
  )
}
