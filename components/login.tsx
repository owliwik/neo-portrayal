'use client'

import { credentialsSchema, Credentials } from '@/lib/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/use-user'

import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { CgSpinnerAlt } from 'react-icons/cg'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

interface LoginPopupProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess?: () => void
}

export const LoginPopup = ({ open, setOpen, onSuccess }: LoginPopupProps) => {
  const userProfile = useUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
  })

  useEffect(() => {
    if (!isSubmitSuccessful || !userProfile) return

    const fullName = userProfile?.profile
      ? (userProfile.profile.last ?? '') + userProfile.profile.first
      : ''
    toast.success(`Hi👋 ${fullName && fullName + ', '}`, {
      description: '欢迎来到IC Portrayal!',
    })

    reset({}, { keepIsSubmitted: false })
  }, [isSubmitSuccessful, userProfile])

  const onSubmit = async (cred: Credentials) => {
    const {
      data: { session, user },
      error,
    } = await auth.signInWithPassword(cred)

    if (error) {
      if (error.code === 'invalid_credentials') {
        toast.error('啊🤔 你的登录凭证不正确')
      }

      return
    }

    setOpen(false)
    onSuccess && onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <VisuallyHidden>
        <DialogTitle>登录到Portrayal</DialogTitle>
      </VisuallyHidden>

      <DialogContent className='w-[22rem] py-12 px-12'>
        <div className='mx-auto'>
          <img
            alt='IC Portrayal Logo'
            src='/icportrayal.png'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-4 sm:mb-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            登录到Portrayal 🥸
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-2 space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              邮箱
            </label>
            <div className='mt-2'>
              <Input {...register('email')} className='' />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm/6 font-medium text-gray-900'
              >
                密码
              </label>
              <div className='text-sm'>
                <a href='/forgot' className='link'>
                  忘记了密码？
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <Input {...register('password')} type='password' className='' />
            </div>
          </div>

          <div>
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? (
                <CgSpinnerAlt className='animate-spin' />
              ) : (
                <div>登入 &rarr;</div>
              )}
            </Button>
          </div>
        </form>

        <p className='mt-6 text-center text-sm/6 text-gray-500'>
          还没有账号？{' '}
          <a href='/register' className='link'>
            加入 Portrayal&rarr;
          </a>
        </p>
      </DialogContent>
    </Dialog>
  )
}
