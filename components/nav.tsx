'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LoginPopup } from './login'
import { Button } from './ui/button'

const navigation = [
  { name: '资源', href: '#' },
  { name: '校友平台', href: '#' },
  { name: '社团', href: '/clubs' },
  { name: '关于', href: '#' },
]

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <LoginPopup open={loginOpen} setOpen={setLoginOpen} />

      <nav className='flex items-center justify-between px-12 py-4'>
        <div className='flex md:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img
              alt=''
              src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
              className='h-8 w-auto'
            />
          </a>
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
            <a
              key={item.name}
              href={item.href}
              className='text-md font-semibold text-gray-900'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden md:flex md:flex-1 md:justify-end'>
          <Button
            variant={'secondary'}
            className=''
            onClick={() => setLoginOpen(true)}
          >
            登入<span aria-hidden='true'>&rarr;</span>
          </Button>
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
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                alt=''
                src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
                className='h-8 w-auto'
              />
            </a>
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
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLoginOpen(true)
                  }}
                  className='w-full'
                >
                  登入
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
