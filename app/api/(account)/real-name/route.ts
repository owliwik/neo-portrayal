import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createSSRClient } from '@/lib/supabase/ssr-client'
import { realNameSchema } from '@/lib/schema/profile'

export async function POST(req: NextRequest) {
  const supabaseSSR = await createSSRClient()
  const { data: userData, error: userError } = await supabaseSSR.auth.getUser()
  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 401 })
  }

  const body = await req.json()
  const { data: realNameData, error: parseError } =
    realNameSchema.safeParse(body)
  if (parseError) {
    return NextResponse.json({ error: parseError.issues }, { status: 400 })
  }

  const supabaseServer = await createServerClient()

  // Attempt to find an authenticated record
  const { data: completedProfileData, error: completedProfileError } =
    await supabaseServer
      .from('profiles')
      .update({
        first: realNameData.first,
        last: realNameData.last,
        student_id: realNameData.studentID,
      })
      .eq('auth_id', userData.user.id)
      .select()
      .maybeSingle()

  if (completedProfileError) {
    return NextResponse.json(
      { error: completedProfileError.message },
      { status: 500 }
    )
  }
  if (completedProfileData) {
    return NextResponse.json({
      message: 'Your authenticated profile is updated.',
      profile: completedProfileData
    })
  }

  // Attempting to find a record with matching names
  const { data: profileData, error: profileError } = await supabaseServer
    .from('profiles')
    .update({ auth_id: userData.user.id, student_id: realNameData.studentID })
    .eq('first', realNameData.first)
    .eq('last', realNameData.last)
    .select()
    .maybeSingle()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }
  if (profileData) {
    return NextResponse.json({
      message: 'A record with matching names is updated.',
      profile: profileData,
    })
  }

  // Creating a new record
  const { data: createProfileData, error: createProfileError } =
    await supabaseServer
      .from('profiles')
      .insert({
        first: realNameData.first,
        last: realNameData.last,
        student_id: realNameData.studentID,
        auth_id: userData.user.id,
      })
      .select()
      .single()

  if (createProfileError) {
    return NextResponse.json(
      { error: createProfileError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    message: 'Created a new profile record.',
    profile: createProfileData,
  })
}
