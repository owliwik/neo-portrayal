import { Club } from './page'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClubEdit, clubEditSchema } from '@/lib/schema/club-edit'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LuCalendarClock } from 'react-icons/lu'
import { IoLogoWechat } from 'react-icons/io5'
import { FaLocationDot } from 'react-icons/fa6'
import { TbEdit } from 'react-icons/tb'
import { FaCheck } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CgSpinnerAlt } from 'react-icons/cg'

export function ClubDialog({
  currentClub: club,
  opened,
  setOpened,
}: {
  currentClub?: Club
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isEditing, setEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClubEdit>({
    resolver: zodResolver(clubEditSchema),
  })

  const onSubmit = async (formData: ClubEdit) => {
    const res = await fetch('/api/clubs/edit', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    const body = await res.json()
    console.log(body)
    setEditing(false)
  }

  useEffect(() => {
    reset()
  }, [opened, isEditing])

  return (
    <Dialog
      open={opened}
      onOpenChange={() => {
        setOpened(false)
        setEditing(false)
      }}
    >
      <DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-x-hidden overflow-y-auto bg-white rounded-xl p-8'>
        {club && (
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>
                {isEditing ? (
                  <Input
                    {...register('name')}
                    defaultValue={club.name || ''}
                    className='inline-input w-60'
                    autoFocus
                  />
                ) : (
                  <div>{club.name}</div>
                )}
              </DialogTitle>

              <div className='text-md text-gray-500 w-full'>
                {isEditing ? (
                  <Input
                    {...register('alias_name')}
                    defaultValue={club.alias_name || ''}
                    className='inline-input w-72'
                  />
                ) : (
                  <p>{club.alias_name}</p>
                )}
              </div>

              <div className='flex flex-wrap gap-4 mt-2 mb-3'>
                <div className='flex items-center gap-2 text-sm font-medium bg-gray-100 rounded-full px-4 py-2'>
                  <LuCalendarClock className='text-xl text-blue-600' />
                  {isEditing ? (
                    <Input
                      {...register('time')}
                      defaultValue={club.time || ''}
                      className='inline-input w-[10ch]'
                    />
                  ) : (
                    <span className=''>{club.time || '不定'}</span>
                  )}
                </div>
                <div className='flex items-center gap-2 text-sm font-medium bg-gray-100 rounded-full px-4 py-2'>
                  <FaLocationDot className='text-xl text-blue-600' />
                  {isEditing ? (
                    <Input
                      {...register('location')}
                      defaultValue={club.location || ''}
                      className='inline-input w-[10ch]'
                    />
                  ) : (
                    <span className=''>{club.location || '不定'}</span>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className='my-4'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                关于我们
              </h2>
              <div className='text-gray-600'>
                {isEditing ? (
                  <Textarea
                    {...register('description')}
                    defaultValue={club.description || ''}
                    className='inline-input w-full h-24'
                  />
                ) : (
                  <p>{club.description || '什么也没有留下'}</p>
                )}
              </div>
            </div>

            <div className='my-4'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                活动介绍 & 计划
              </h2>
              <div className='text-gray-600'>
                <div className='text-gray-600'>
                  {isEditing ? (
                    <Textarea
                      {...register('activity_intro')}
                      defaultValue={club.activity_intro || ''}
                      className='inline-input h-24'
                    />
                  ) : (
                    <p>{club.activity_intro || '空空如也'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className='w-full mt-8 flex'>
              <div className='flex items-center gap-2 bg-green-100 text-sm font-medium text-green-800 rounded-full px-4 py-2'>
                <IoLogoWechat className='text-xl text-green-600' />
                {isEditing ? (
                  <Input
                    {...register('contact')}
                    defaultValue={club.contact || ''}
                    className='inline-input w-[15ch]'
                  />
                ) : (
                  <span className=''>{club.contact || '未知'}</span>
                )}
              </div>

              <div className='ml-auto self-center flex gap-1'>
                {isEditing ? (
                  <>
                    <Button
                      variant={'outline'}
                      type='button'
                      onClick={(e) => {
                        e.preventDefault()
                        setEditing(false)
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      variant={'default'}
                      type='submit'
                      onClick={() => {
                        setValue('id', club.id)
                      }}
                    >
                      {isSubmitting ? (
                        <CgSpinnerAlt className='animate-spin' />
                      ) : (
                        <FaCheck />
                      )}
                      提交申请
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={'secondary'}
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      setEditing(true)
                    }}
                  >
                    <TbEdit />
                    编辑
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
