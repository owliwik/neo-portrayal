'use client'

import { SGQuery } from '@/app/api/resources/sg/route'
import { QueryData } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const year = 2025
const semester = 'spring'

export function StudyGuideTable() {
  const [studyGuides, setStudyGuides] = useState<QueryData<SGQuery>>()
  useEffect(() => {
    const fetchSG = async () => {
      const res = await fetch('/api/resources/sg', {
        method: 'POST',
        body: JSON.stringify({ year, semester }),
      })

      const data = await res.json()
      if (data) {
        setStudyGuides(data)
        console.log(typeof data)
      }
    }

    fetchSG()
  }, [])

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studyGuides && studyGuides.map((sg) => (
          <TableRow key={sg.id}>
            <TableCell>{sg.metadata.name}</TableCell>
            <TableCell>{sg.metadata.authors.join(' ')}</TableCell>
            <TableCell>
              <Button variant={'outline'} size='sm'>
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
