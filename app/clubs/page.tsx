import { ClubGrid } from './club-grid'

export default function Page() {
  return (
    <div>
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

      <div className='flex justify-center'>
        <ClubGrid />
      </div>
    </div>
  )
}
