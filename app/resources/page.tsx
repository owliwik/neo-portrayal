import { StudyGuideTable } from './(sg)/sg-table'

export default function Page() {
  return (
    <div className='flex justify-center items-center pt-36 pb-16'>
      <div className='w-[40rem]'>
        <StudyGuideTable />
      </div>
    </div>
  )
}
