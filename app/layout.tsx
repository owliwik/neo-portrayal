import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/nav'
import { UserProvider } from '@/components/context/user-context'
import { createSSRClient } from '@/lib/supabase/ssr-client'

import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'IC Portrayal',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabaseSSR = await createSSRClient()

  const {
    data: { user },
    error: userError,
  } = await supabaseSSR.auth.getUser()
  // const { data: profile, error: profileError } = await supabaseSSR
  //   .from('profiles')
  //   .select('*')
  //   .eq('auth_id', user?.id ?? '')
  //   .maybeSingle()

  let userProfile =
    user ? { user, profile: undefined } : undefined

  return (
    <html lang='en'>
      <body className={`font-sans antialiased`}>
        <div className='wrapper h-1 min-h-[100vh] relative flex flex-col'>
          <UserProvider init={userProfile}>
            <Navigation />
            <main className='flex-1'>{children}</main>
            <Toaster richColors position='top-right' duration={1500} />
          </UserProvider>
        </div>
      </body>
    </html>
  )
}
