import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, generateToken, generateReferralCode } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      firstName,
      lastName,
      bitcoinExperienceLevel,
      referredByCode,
      sourcePerspective,
      sourceTopic,
      sourceQrCode,
      sourceInitiative
    } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate unique referral code
    let referralCode = generateReferralCode()
    let codeExists = await prisma.user.findUnique({
      where: { referralCode }
    })

    while (codeExists) {
      referralCode = generateReferralCode()
      codeExists = await prisma.user.findUnique({
        where: { referralCode }
      })
    }

    // Find referring user if referral code provided
    let referredByUserId = null
    if (referredByCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referredByCode }
      })
      if (referrer) {
        referredByUserId = referrer.id
      }
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        bitcoinExperienceLevel,
        referralCode,
        referredByCode,
        referredByUserId,
        sourcePerspective,
        sourceTopic,
        sourceQrCode,
        sourceInitiative,
        portalEntries: 1, // First entry when registering
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        referralCode: true,
        bitcoinExperienceLevel: true,
        createdAt: true,
      }
    })

    // Create referral event if there was a referrer
    if (referredByUserId && referredByCode) {
      await prisma.referralEvent.create({
        data: {
          referrerUserId: referredByUserId,
          referredUserId: newUser.id,
          qrCodeUsed: sourceQrCode,
          initiativeSource: sourceInitiative,
          referralMethod: sourceQrCode ? 'qr_scan' : 'direct_link',
        }
      })
    }

    // Log portal entry activity
    await prisma.userActivityLog.create({
      data: {
        userId: newUser.id,
        sessionId: `session_${Date.now()}`, // Simple session ID for now
        activityType: 'user_registration',
        activityData: {
          registrationMethod: sourceQrCode ? 'qr_scan' : 'direct',
          bitcoinExperience: bitcoinExperienceLevel
        },
        perspective: sourcePerspective,
        topic: sourceTopic,
        sourceQrCode,
        sourceInitiative,
        userAgent: request.headers.get('user-agent'),
        referrerUrl: request.headers.get('referer'),
      }
    })

    // Generate JWT token
    const token = generateToken({ userId: newUser.id, email: newUser.email })

    return NextResponse.json({
      user: newUser,
      token,
      message: 'User registered successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}