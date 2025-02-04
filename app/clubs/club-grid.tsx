import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

const people = [
  {
    name: '马卡龙物理学社',
    established: true,
    leaders: ['李为有', '龚禹霖'],
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: '马卡龙物理社',
    established: true,
    leaders: ['李为有', '龚禹霖'],
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: '马卡龙物社',
    established: false,
    leaders: ['李为有', '龚禹霖'],
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: '马卡龙社',
    established: true,
    leaders: ['李为有', '龚禹霖'],
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export const ClubGrid = () => {
  return (
    <ul
      role='list'
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-fit'
    >
      {people.map((person) => (
        <li
          key={person.name}
          className='w-[15rem] divide-gray-200 rounded-lg bg-white text-center shadow hover:shadow-lg transition-all'
        >
          <div className='relative flex flex-col items-center p-8'>
            <Badge
              className={cn(
                'absolute top-2 right-2',
                person.established
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-600'
              )}
            >
              {person.established ? '社团' : '兴趣小组'}
            </Badge>
            <img
              alt=''
              src={person.imageUrl}
              className='mx-auto size-32 shrink-0 rounded-full'
            />
            <h2 className='mt-3 text-lg font-medium text-gray-900'>
              {person.name}
            </h2>
            <h3 className='mt-2 text-sm text-gray-600'>
              {person.leaders.join(' ')}
            </h3>
          </div>
        </li>
      ))}
    </ul>
  )
}
