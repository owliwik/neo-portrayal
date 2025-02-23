'use client'

import { ReactNode } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const SuccessMask = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.1 }}
      className='absolute bg-white w-full h-full z-50 top-0 left-0 flex justify-center items-center animate-fade-in'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [0, 1.2, 1] }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
        className='flex flex-col gap-8 justify-center items-center'
      >
        <div>
          <FaCircleCheck className='text-6xl text-green-600' />
        </div>

        <div className='text-2xl text-green-600'>{children}</div>
      </motion.div>
    </motion.div>
  )
}

export { SuccessMask }
