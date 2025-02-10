import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (req: NextRequest) => {
  const supabase = await createServerClient()
  const { data: clubsData, error: clubsError } = await supabase
    .from('clubs')
    .select('*, leaders:clubs_leaders(profile:profiles(id, last, first))')

  if (clubsError) {
    return NextResponse.json({ message: clubsError.message }, { status: 400 })
  }

  return NextResponse.json(clubsData)
}
