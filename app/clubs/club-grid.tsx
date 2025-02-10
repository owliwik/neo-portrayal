'use client'

import { Tables } from '@/lib/types/db'
import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/supabase/client'

import { Badge } from '@/components/ui/badge'
import { ArrayElement, cn } from '@/lib/utils'
import { ClubDialog } from './club-dialog'
import { QueryData } from '@supabase/supabase-js'

// Query used ONLY for Typescript definitions
const clubsQuery = db('clubs').select('*, leaders:clubs_leaders(profile:profiles(id, last, first))')
export type Club = ArrayElement<QueryData<typeof clubsQuery>>

export const ClubGrid = () => {
  const [clubs, setClubs] = useState<Club[]>()
  const [currentClub, setCurrentClub] = useState<Club>()
  const [dialogOpened, setDialogOpened] = useState(false)

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch('/api/clubs')
      const data = await res.json()
      if (data) {
        setClubs(data)
      }
    }

    fetchClubs()
  }, [])

  return (
    <>
      <ClubDialog
        currentClub={currentClub}
        opened={dialogOpened}
        setOpened={setDialogOpened}
      />

      <ul
        role='list'
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-fit'
      >
        {clubs &&
          clubs.map((club) => (
            <li
              key={club.id}
              onClick={() => {
                setCurrentClub(club)
                setDialogOpened(true)
              }}
              className='w-[15rem] divide-gray-200 rounded-lg bg-white text-center cursor-pointer shadow hover:shadow-lg transition-all'
            >
              <div className='relative flex flex-col items-center p-8'>
                <Badge
                  className={cn(
                    'absolute top-2 right-2',
                    club.is_established
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-600'
                  )}
                >
                  {club.is_established ? '社团' : '兴趣小组'}
                </Badge>
                {/* <img
              alt=''
              src={club.imageUrl}
              className='mx-auto size-32 shrink-0 rounded-full'
            /> */}
                <h2 className='mt-3 text-lg font-medium text-gray-900'>
                  {club.name}
                </h2>
                <h3 className='mt-2 text-sm text-gray-600'>
                  {club.leaders
                    .map(
                      ({ profile }) =>
                        (profile.last || '') + profile.first || ''
                    )
                    .join(' ')}
                </h3>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
