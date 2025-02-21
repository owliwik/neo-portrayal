'use client'

import { useEffect, useState, use } from 'react'

export default function Page({
  params,
}: {
  params: Promise<{ video: string }>
}) {
  const { video } = use(params)
  const [videoURL, setVideoURL] = useState(
    `https://d25vjrhdbnq9g0.cloudfront.net/${video}`
  )

  useEffect(() => {
    const fetchVideoURL = async () => {
      // const { data, error } = await storage
      //   .from('resources')
      //   .createSignedUrl('/1080p30fps.mp4', 3600)
      // if (error) {
      //   console.log(error.message)
      //   return
      // }
      // setVideoURL('')
      // console.log(data.signedUrl)
    }

    fetchVideoURL()
  }, [])

  return (
    <div className='my-20 w-full flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-semibold my-10'>Viewing: {video}</h1>
      {videoURL && (
        <div className='h-[40rem] aspect-video flex justify-center items-center'>
          <video className='w-full h-full' autoPlay controls src={videoURL} />
        </div>
      )}
    </div>
  )
}
