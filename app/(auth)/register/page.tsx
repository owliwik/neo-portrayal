import{ SignUpForm } from './signup-form'

const Page = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      {/* <div className='absolute inset-0 -z-10'>
        <BackgroundGradientAnimation {...gradientConfig} />
      </div> */}
      <SignUpForm />
    </div>
  )
}

export default Page
