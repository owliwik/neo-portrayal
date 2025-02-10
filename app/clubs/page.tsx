import { QueryData } from '@supabase/supabase-js'
import { ClubGrid } from './club-grid'
import { supabase } from '@/lib/supabase/server'
import { ArrayElement } from '@/lib/utils'

const clubsQuery = supabase
  .from('clubs')
  .select('*, leaders:clubs_leaders(profile:profiles(*))')

export type Club = ArrayElement<QueryData<typeof clubsQuery>>

export default async function Page() {
  const { data: clubsData } = await clubsQuery

  return (
    <div className=''>
      <div className='px-6 pt-36 pb-16 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-base/7 font-semibold text-indigo-600'>
            Our Enjoyable Student Life
          </p>
          <h2 className='mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl'>
            校内社团一览
          </h2>
          <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
            点击社团卡片来了解具体信息
          </p>
        </div>
      </div>

      {clubsData ? (
        <div className='flex justify-center'>
          <ClubGrid clubs={clubsData} />
        </div>
      ) : (
        <div>No clubs found</div>
      )}
    </div>
  )
}
