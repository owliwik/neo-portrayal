'use client'

import { useUser } from '@/lib/hooks/use-user'
import { auth } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
  const userProfile = useUser()
  const [token, setToken] = useState<string>()
  useEffect(() => {
    console.log('hi')
    const fetchSession = async () => {
      const { data: sessionData, error: sessionError } = await auth.getSession()
      if (sessionError) {
        toast.error('😢 获取用户信息失败')
        return
      }

      setToken(sessionData.session?.access_token)
    }

    fetchSession()
  }, [userProfile])  

  return (
    <div className='w-full h-full relative'>
      {token && (
        <iframe
          src={`https://alumni.icportrayal.com/?authToken=${token}`}
          className='w-full h-full'
        ></iframe>
      )}
    </div>
  )
}