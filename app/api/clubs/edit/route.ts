import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { clubEditSchema } from '@/lib/schema/club-edit'

export const POST = async (req: NextRequest) => {
  let body
  try {
    body = await req.json()
  } catch (parseError) {
    return NextResponse.json(parseError)
  }

  const supabase = await createServerClient()

  const { data: editedClub, error: parseError } = clubEditSchema.safeParse(body)
  if (parseError) {
    return NextResponse.json(parseError.flatten(), { status: 400 })
  }

  const {
    data: originalClub,
    error: fetchError,
    status: fetchStatus,
  } = await supabase.from('clubs').select('*').eq('id', editedClub.id).single()
  if (fetchError) {
    return NextResponse.json(fetchError, { status: fetchStatus })
  }

  const edits: [string, string][] = []
  for (const key of Object.keys(editedClub) as (keyof typeof editedClub)[]) {
    if (!editedClub[key] && !originalClub[key]) continue

    if (editedClub[key]?.trim() !== originalClub[key]?.trim()) {
      edits.push([key, editedClub[key] || ''])
    }
  }

  const {
    data: dbRes,
    error: dbError,
    status: dbStatus,
  } = await supabase
    .from('club_edits')
    .insert(
      edits.map((edit) => ({
        club_id: originalClub.id,
        field: edit[0],
        value: edit[1],
      }))
    )
    .select()

  if (dbError) {
    return NextResponse.json(dbError, { status: dbStatus })
  }

  return NextResponse.json(dbRes)
}
