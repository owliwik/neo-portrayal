import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className=''>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-60 -z-50 transform-gpu overflow-hidden blur-3xl'
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
        />
      </div>

      <div className='relative px-6 md:px-8'>
        <div className='mx-auto max-w-2xl pt-32'>
          <div className='mb-8 flex justify-center'>
            <div className='relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
              BHSFIC独家校友平台全新上线！{' '}
              <a href='https://alumni.icportrayal.com' className='link font-semibold text-secondary-3'>
                <span aria-hidden='true' className='absolute inset-0' />
                即刻体验 <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
              欢迎来到
              <br />
              BHSFIC人的据点
            </h1>
            <p className='mt-10 mx-4 sm:mx-28 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
              崭新的 IC Portrayal
              集成了校园工具、校友平台、社团区一连串的功能，快来四处转转吧！
            </p>
            <div className='mt-14 flex items-center justify-center gap-x-6'>
              <Link href='/register'>
                <Button className='button button-primary'>加入我们</Button>
              </Link>
              <Link href='/clubs' className='link'>
                社团页 <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
    </div>
  )
}
