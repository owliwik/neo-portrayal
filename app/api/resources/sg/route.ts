import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

const sgQuery = (await createServerClient())
  .from('resources')
  .select('*, publisher(id,last, first)')

export type SGQuery = typeof sgQuery

export async function POST(req: NextRequest) {
  const { year, semester } = await req.json()
  const { data: sgData, error: sgError } = await sgQuery
    .eq('metadata->year', year)
    .eq('metadata->>semester', semester)

  if (sgError) {
    return NextResponse.json({ message: sgError.message }, { status: 400 })
  }

  return NextResponse.json(sgData)
}
