import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Note: This assumes we'll add password field to schema later
    // For now, we'll simulate password verification
    // TODO: Add password field to User model
    const isValidPassword = true // Placeholder - implement actual password verification

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last active timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastActive: new Date(),
        portalEntries: { increment: 1 }
      }
    })

    // Log login activity
    await prisma.userActivityLog.create({
      data: {
        userId: user.id,
        sessionId: `session_${Date.now()}`,
        activityType: 'user_login',
        activityData: {
          loginMethod: 'email_password'
        },
        userAgent: request.headers.get('user-agent'),
        referrerUrl: request.headers.get('referer'),
      }
    })

    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        referralCode: user.referralCode,
        bitcoinExperienceLevel: user.bitcoinExperienceLevel,
      },
      token,
      message: 'Login successful'
    }, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}