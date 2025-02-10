import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  let columns: string[]
  try {
    columns = (await req.json()).columns
  } catch (parseError) {
    return NextResponse.json(
      { message: 'invalid request body' },
      { status: 400 }
    )
  }

  const supabase = await createServerClient()
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select(columns.join(','))
    .eq('id', (await params).id)
    .maybeSingle()

  if (profileError) {
    return NextResponse.json({ message: profileError.message }, { status: 400 })
  }

  if (!profileData) {
    return NextResponse.json({ message: 'profile not found' }, { status: 404 })
  }

  return NextResponse.json(profileData)
}
