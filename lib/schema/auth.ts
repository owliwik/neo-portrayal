import { z } from 'zod'

export const signUpSchema = z
  .object({
    nickname: z.string().min(1, '请输入昵称').max(8, '昵称最多8位'),
    email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
    password: z
      .string({ message: '请设置一个密码' })
      .min(6, '密码长度不小于6位')
      .max(64, '密码长度不大于64位'),
    confirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm
    },
    { message: '密码和确认密码不一致', path: ['confirm'] }
  )
export type SignUpSchema = z.infer<typeof signUpSchema>

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type Credentials = z.infer<typeof credentialsSchema>

export const forgotSchema = z.object({
  email: z.string().email(),
})
export type ForgotData = z.infer<typeof forgotSchema>

export const passwordResetSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string({ message: '请设置一个密码' })
      .min(6, '密码长度不小于6位')
      .max(64, '密码长度不大于64位'),
    confirm: z.string(),
    otp: z.string().length(6)
  })
  .refine(
    (data) => {
      return data.password === data.confirm
    },
    { message: '密码和确认密码不一致', path: ['confirm'] }
  )
export type ResetData = z.infer<typeof passwordResetSchema>