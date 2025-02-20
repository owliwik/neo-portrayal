import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/db'

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const auth = supabase.auth
export const db = supabase.from.bind(supabase)
export const storage = supabase.storage