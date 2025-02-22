'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '@/lib/supabase/client'
import { SignUpSchema, signUpSchema } from '@/lib/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CgSpinnerAlt } from 'react-icons/cg'
import { SuccessMask } from '@/components/success-mask'
import { toast } from 'sonner'
import { LoginPopup } from '@/components/login'


export function SignUpForm() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (formData: SignUpSchema) => {
    console.log(formData)
    const { data, error } = await auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          display_name: formData.nickname,
        },
      },
    })

    if (data.user?.identities && !data.user.identities.length) {
      toast.error('你的邮箱已经注册😢', {
        description: '如果你认为这是个错误，请联系Portrayal管理员',
        duration: 3000,
      })
    } else if (error) {
      toast.error(error.message, {
        description: '如果你认为这是个错误，请联系Portrayal管理员',
        duration: 3000,
      })
    } else {
      console.log(data.user)
      setSuccess(true)
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      {success && (
        <SuccessMask>
          <div className='flex flex-col items-center'>
            <div>请查看邮箱并点击确认链接</div>
            <div>（别忘了查看垃圾邮件！）</div>
          </div>
        </SuccessMask>
      )}

      <LoginPopup
        open={loginOpen}
        setOpen={setLoginOpen}
        onSuccess={() => {
          router.refresh()
          router.push('/')
        }}
      />

      <div className='flex m-4 md:w-[50rem] xs:w-[25rem] bg-white rounded-xl shadow-2xl overflow-hidden'>
        {/* Left half - Background */}
        <div className='hidden w-1/2 from-primary md:block'>
          <img
            src='/auth-bg.jpg'
            alt='A background'
            className='w-full h-full object-fit'
          />
        </div>

        {/* Right half - Form */}
        <div className='w-full md:w-1/2 p-12 flex items-center justify-center'>
          <div className='w-full space-y-8'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>加入Portrayal 🙋🏻</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                建立一个账户获得最佳体验
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2'>
                <div className='flex gap-4'>
                  <div className='space-y-1 w-[6rem]'>
                    <Label htmlFor='name'>昵称</Label>
                    <Input
                      id='name'
                      placeholder='John'
                      {...register('nickname')}
                    />
                    <div className='text-sm text-red-500'>
                      {errors.nickname?.message}
                    </div>
                  </div>

                  <div className='space-y-1 flex-1'>
                    <Label htmlFor='email'>你的邮箱</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='john@example.com'
                      {...register('email')}
                    />
                    <div className='text-sm text-red-500'>
                      {errors.email?.message}
                    </div>
                  </div>
                </div>

                <div className='space-y-1'>
                  <Label htmlFor='password'>密码</Label>
                  <Input
                    id='password'
                    type='password'
                    {...register('password')}
                  />
                  <div className='text-sm text-red-500'>
                    {errors.password?.message}
                  </div>
                </div>

                <div className='space-y-1'>
                  <Label htmlFor='confirm-password'>确认密码</Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    {...register('confirm')}
                  />
                  <div className='text-sm text-red-500'>
                    {errors.confirm?.message}
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <div className='mb-4'>
                  {isSubmitting ? (
                    <Button disabled className='w-full'>
                      <CgSpinnerAlt className='h-4 w-4 animate-spin' />
                      正在提交...
                    </Button>
                  ) : (
                    <Button type='submit' className='w-full'>
                      立即提交 &rarr;
                    </Button>
                  )}
                </div>

                <div className='w-full flex justify-center text-slate-500'>
                  已经有账号了？
                  <a
                    className='link text-blue-600 cursor-pointer'
                    onClick={() => setLoginOpen(true)}
                  >
                    立即登录
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
