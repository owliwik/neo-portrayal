'use client'

import { auth } from '@/lib/supabase/client'
import { forgotSchema, ForgotData } from '@/lib/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { CgSpinnerAlt } from 'react-icons/cg'

export function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotData>({
    resolver: zodResolver(forgotSchema),
  })

  const router = useRouter()

  const onSubmit = async ({ email }: ForgotData) => {
    const { data, error } = await auth.resetPasswordForEmail(email)

    if (error) {
      toast.error(error.message)
      return
    }

    sessionStorage.setItem('email-reset', email)
    router.push('/recovery')
  }

  return (
    <Card className=''>
      <CardHeader className='text-center'>
        <div className='w-10 aspect-square mx-auto'>
          <img src='/icportrayal.png' alt='' />
        </div>
        <div>
          <CardTitle className='my-2'>重置你的密码</CardTitle>
          <CardDescription className=''>
            输入邮箱地址，即刻取得验证码
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className='space-y-1'>
            <Label>邮箱</Label>
            <Input {...register('email')} />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting} className='w-full'>
            {isSubmitting ? (
              <CgSpinnerAlt className='animate-spin' />
            ) : (
              <div>提交申请</div>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
