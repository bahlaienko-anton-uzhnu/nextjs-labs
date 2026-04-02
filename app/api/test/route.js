import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API бібліотеки працює!',
    timestamp: new Date().toISOString()
  })
}