import { NextResponse } from 'next/server'
import { ADMIN_CONFIG } from '@/lib/config'

export async function POST(request) {
  try {
    const { pin } = await request.json()

    // Validate PIN
    if (!pin) {
      return NextResponse.json(
        { success: false, error: 'PIN is required' },
        { status: 400 }
      )
    }

    // Check if PIN matches
    if (pin === ADMIN_CONFIG.PIN) {
      return NextResponse.json(
        { success: true, message: 'Authentication successful' },
        { status: 200 }
      )
    } else {
      // Add small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return NextResponse.json(
        { success: false, error: 'Invalid PIN' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 