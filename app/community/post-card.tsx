'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import { ArrayElement } from '@/lib/utils'

const postsQuery = db('posts').select('*, comments(*)')

export interface Post extends ArrayElement<QueryData<typeof postsQuery>> {}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>()
  useEffect(() => {
    const fetchPosts = async() => {
      const { data, error } = await postsQuery
      if (error) {
        console.log(error.message)
        return
      }

      setPosts(data)
      console.log(data)
    }

    fetchPosts()
  }, [])

  return <div>Hi</div>
}