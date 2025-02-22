'use client'

import { passwordResetSchema, ResetData } from '@/lib/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { FormField } from '@/components/ui/form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import Link from 'next/link'
import { CgSpinnerAlt } from 'react-icons/cg'
import { toast } from 'sonner'

export function ResetForm() {
  const router = useRouter()
  const form = useForm<ResetData>({
    resolver: zodResolver(passwordResetSchema),
  })
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    const currentEmail = sessionStorage.getItem('email-reset')
    if (!currentEmail) return

    setValue('email', currentEmail)
  }, [])

  const onSubmit = async (formData: ResetData) => {
    const { data, error } = await auth.verifyOtp({
      type: 'recovery',
      token: formData.otp,
      email: formData.email,
    })

    if (error) {
      if (error.code === 'otp_expired') {
        toast.error('😭 验证码不正确或已过期', { duration: 2000 })
        return
      }

      toast.error(error.message)
      return
    }

    const { data: recoveryData, error: recoveryError } = await auth.updateUser({
      password: formData.password,
    })

    if (recoveryError) {
      toast.error(recoveryError.message)
      return
    }

    toast.success('成功重置密码 😄', { description: '已为您自动登录' })
    router.push('/')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>重置你的密码</CardTitle>
        <CardDescription>
          没有收到验证信息？
          <Link className='link' href='/forgot'>
            重试
          </Link>
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className='space-y-1'>
            <Label>验证码</Label>
            <FormField
              control={control}
              {...register('otp')}
              render={({ field }) => (
                <InputOTP autoFocus maxLength={6} pattern='^\d+$' {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>

          <Separator className='mt-6 mb-4 w-[30%] mx-auto' />

          <div className='space-y-4'>
            <div className='space-y-1'>
              <Label>新密码</Label>
              <Input type='password' {...register('password')} />
            </div>

            <div className='space-y-1'>
              <Label>确认密码</Label>
              <Input type='password' {...register('confirm')} />
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
  )
}
