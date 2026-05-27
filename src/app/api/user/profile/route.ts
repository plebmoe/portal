import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user profile with referral stats
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        bitcoinExperienceLevel: true,
        referralCode: true,
        totalSessionTime: true,
        portalEntries: true,
        createdAt: true,
        lastActive: true,
        referredUsers: {
          select: {
            id: true,
            firstName: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            referredUsers: true,
            activityLogs: true,
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user,
      stats: {
        totalReferrals: user._count.referredUsers,
        totalActivities: user._count.activityLogs,
        sessionTimeMinutes: Math.round(user.totalSessionTime / 60),
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}