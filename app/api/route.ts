import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    requestHeaders: req.headers,
    message: 'Welcome to IC Portrayal API!',
  })
}