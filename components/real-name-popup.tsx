'use client'

import { useForm } from 'react-hook-form'
import { realNameSchema, RealNameData } from '@/lib/schema/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import sleep from '@/lib/sleep'
import { useRouter } from 'next/navigation'

import { Dialog, DialogTitle, DialogContent } from './ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { FormControl, FormField } from './ui/form'
import { Label } from './ui/label'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { CgSpinnerAlt } from 'react-icons/cg'
import Link from 'next/link'
import { SuccessMask } from './success-mask'
import { toast } from 'sonner'

interface RealNamePopupProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function RealNamePopup({ isOpen, setOpen }: RealNamePopupProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
  } = useForm<RealNameData>({
    resolver: zodResolver(realNameSchema),
  })

  const router = useRouter()
  const onSubmit = async (formData: RealNameData) => {
    const res = await fetch('/api/real-name', {
      method: 'POST',
      body: JSON.stringify({ ...formData }),
    })

    if (!res.ok) {
      toast.error('😢 发生了未知错误')
      return
    }

    window.location.reload()
    toast.success('实名认证成功')
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen((prevOpen) => !prevOpen)}>
      <DialogContent className='p-0 w-fit bg-transparent border-none'>
        <VisuallyHidden>
          <DialogTitle>完成实名认证</DialogTitle>
        </VisuallyHidden>

        <Card className=''>
          <CardHeader className='flex justify-center items-center'>
            <div className='w-10 h-10'>
              <img src='/icportrayal.png' alt='IC Portrayal Logo' />
            </div>
            <CardTitle className='mt-4 mb-1'>完成实名认证</CardTitle>
            <CardDescription className=''>
              <Link href='#' className='link text-slate-400'>
                了解我们为什么要收集这些信息&rarr;
              </Link>
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className='space-y-4 my-10'>
              <div className='flex flex-col gap-2'>
                <Label>你的学号</Label>
                <FormField
                  control={control}
                  {...register('studentID')}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={8}
                      {...field}
                      autoFocus
                      pattern='^\d+$'
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 8 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>

              <div className='flex gap-4'>
                <div className='w-30'>
                  <Label>中文姓</Label>
                  <Input {...register('last')} />
                </div>
                <div className='flex-1'>
                  <Label>中文名</Label>
                  <Input {...register('first')} />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button disabled={isSubmitting} className='w-full'>
                {isSubmitting ? (
                  <CgSpinnerAlt className='animate-spin' />
                ) : (
                  <div>提交</div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
