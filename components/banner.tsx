import React from 'react'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { IoClose } from 'react-icons/io5'

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void
}

export const Banner = React.forwardRef(
  ({ children, className, onClose, ...props }: BannerProps, ref) => {

    return (
      <div
        className={cn(
          'flex items-center mx-6 rounded-xl gap-x-2 bg-secondary-foreground py-2.5 px-3.5 sm:before:flex-1',
          className
        )}
        {...props}
      >
        {children}
        <div className='flex flex-1 justify-end mr-4'>
          <Button
            size='icon'
            variant='ghost'
            className='w-5 h-5 text-white hover:text-white hover:bg-transparent'
            onClick={() => onClose()}
          >
            <IoClose className='' />
          </Button>
        </div>
      </div>
    )
  }
)
