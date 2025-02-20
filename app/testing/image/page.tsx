'use client'

import { storage } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    const fetchVideoURL = async () => {
      const { data, error } = await storage
        .from('resources')
        .createSignedUrl('/catalina.jpeg', 3600)
      if (error) {
        console.log(error.message)
        return
      }

      setImageURL(data.signedUrl)
      console.log(data.signedUrl)
    }

    fetchVideoURL()
  }, [])

  return (
    <div className='my-20 w-full flex justify-center items-center'>
      {imageURL && (
        <div className='h-[40rem] aspect-video flex justify-center items-center rounded-2xl overflow-hidden'>
          <img className='w-full h-full rounded-2xl' src={imageURL} />
        </div>
      )}
    </div>
  )
}
