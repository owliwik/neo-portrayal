import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

const clubsQuery = (await createServerClient())
    .from('clubs')
    .select('*, leaders:clubs_leaders(profile:profiles(id, last, first))')

export type ClubsQuery = typeof clubsQuery

export const GET = async (req: NextRequest) => {
  const { data: clubsData, error: clubsError } = await clubsQuery

  if (clubsError) {
    return NextResponse.json({ message: clubsError.message }, { status: 400 })
  }

  return NextResponse.json(clubsData)
}
