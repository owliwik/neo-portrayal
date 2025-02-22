'use client'

import { ReactNode } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

const SuccessMask = ({ children }: { children: ReactNode }) => {
  return (
    <div className='absolute bg-white w-full h-full z-50 top-0 left-0 flex justify-center items-center bg-inherit animate-fade-in'>
      <div className='flex flex-col gap-8 justify-center items-center'>
        <div>
          <FaCircleCheck className='text-6xl text-green-600' />
        </div>

        <div className='text-2xl text-green-600'>
          {children}
        </div>
      </div>
    </div>
  )
}

export { SuccessMask }
