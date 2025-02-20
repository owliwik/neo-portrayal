'use client'

import { storage } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [videoURL, setVideoURL] = useState('')

  useEffect(() => {
    const fetchVideoURL = async () => {
      const { data, error } = await storage
        .from('resources')
        .createSignedUrl('/1080p30fps.mp4', 3600)
      if (error) {
        console.log(error.message)
        return
      }

      setVideoURL(data.signedUrl)
      console.log(data.signedUrl)
    }

    fetchVideoURL()
  }, [])

  return (
    <div className='my-20 w-full flex justify-center items-center'>
      {videoURL && (
        <div className='h-[40rem] aspect-video flex justify-center items-center'>
          <video
            className='w-full h-full'
            autoPlay
            controls
            src={videoURL}
          />
        </div>
      )}
    </div>
  )
}
