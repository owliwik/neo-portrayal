import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let columns: string[]
  let ids: string[]

  try {
    ;({ columns, ids } = await req.json())
  } catch (parseError) {
    return NextResponse.json(
      { message: 'invalid request body' },
      { status: 400 }
    )
  }

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(columns.join(','))
    .in('id', ids)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
