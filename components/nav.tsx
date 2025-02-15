'use client'

import { useState } from 'react'
import { useUser } from '@/lib/hooks/use-user'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LoginPopup } from './login'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { IoExitOutline } from 'react-icons/io5'
import { Separator } from './ui/separator'
import { auth } from '@/lib/supabase/client'
import { CgSpinnerAlt } from 'react-icons/cg'
import Link from 'next/link'

const navigation = [
  { name: '资源', href: '/resources' },
  { name: '校友平台', href: '#' },
  { name: '社团', href: '/clubs' },
  { name: '关于', href: '#' },
]

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isSigningOut, setSigningOut] = useState(false)

  const userProfile = useUser()

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <LoginPopup open={loginOpen} setOpen={setLoginOpen} />

      <nav className='flex items-center justify-between px-20 py-4'>
        <div className='flex md:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img alt='' src='/icportrayal.png' className='h-10 w-auto' />
          </Link>
        </div>

        <div className='flex md:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon aria-hidden='true' className='size-6' />
          </button>
        </div>

        <div className='hidden md:flex md:gap-x-12'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-md font-semibold text-gray-900'
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden md:flex md:flex-1 md:justify-end'>
          {userProfile ? (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src='' alt='icon' className='' />
                  <AvatarFallback>{userProfile.profile?.last}</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>

              <HoverCardContent
                align='end'
                className='w-fit h-fit p-1 flex flex-col gap-1'
              >
                <div className='m-2'>
                  以
                  <span className='font-bold'>
                    {' '}
                    {userProfile.profile?.last}
                    {userProfile.profile?.first}{' '}
                  </span>
                  的身份登入
                </div>
                <Separator />
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  disabled={isSigningOut}
                  onClick={async () => {
                    setSigningOut(true)
                    await auth.signOut()
                    setSigningOut(false)
                  }}
                  className='text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-secondary/80 disabled:bg-secondary/60'
                >
                  {isSigningOut ? (
                    <CgSpinnerAlt className='animate-spin' />
                  ) : (
                    <IoExitOutline />
                  )}
                  退出登录
                </Button>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Button
              variant={'secondary'}
              className=''
              onClick={() => setLoginOpen(true)}
            >
              登入<span aria-hidden='true'>&rarr;</span>
            </Button>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='md:hidden'
      >
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full bg-background overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                alt=''
                src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
                className='h-10 w-auto'
              />
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='size-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className='py-6'>
                {userProfile ? (
                  <div className='flex justify-around items-center'>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src='' alt='icon' className='' />
                      <AvatarFallback>
                        {userProfile.profile?.last}
                      </AvatarFallback>
                    </Avatar>

                    <Button
                      variant={'secondary'}
                      size={'sm'}
                      disabled={isSigningOut}
                      onClick={async () => {
                        setSigningOut(true)
                        await auth.signOut()
                        setSigningOut(false)
                      }}
                      className=''
                    >
                      {isSigningOut ? (
                        <CgSpinnerAlt className='animate-spin' />
                      ) : (
                        <IoExitOutline />
                      )}
                      退出登录
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setLoginOpen(true)
                    }}
                    className='w-full'
                  >
                    登入
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
