import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const {
      activity_type,
      activity_data,
      perspective,
      topic,
      stage,
      source_qr_code,
      source_initiative,
      session_duration,
    } = body

    // Validate required fields
    if (!activity_type) {
      return NextResponse.json(
        { error: 'Activity type is required' },
        { status: 400 }
      )
    }

    // Create activity log entry
    const activityLog = await prisma.userActivityLog.create({
      data: {
        userId: payload.userId,
        sessionId: `session_${Date.now()}_${payload.userId}`,
        activityType: activity_type,
        activityData: activity_data || {},
        perspective,
        topic,
        stage,
        sourceQrCode: source_qr_code,
        sourceInitiative: source_initiative,
        sessionDuration: session_duration,
        userAgent: request.headers.get('user-agent'),
        ipAddress: request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') ||
                  'unknown',
        referrerUrl: request.headers.get('referer'),
      }
    })

    // Update user's total session time if provided
    if (session_duration) {
      await prisma.user.update({
        where: { id: payload.userId },
        data: {
          totalSessionTime: { increment: session_duration },
          lastActive: new Date(),
        }
      })
    }

    return NextResponse.json({
      success: true,
      activityId: activityLog.id,
    }, { status: 201 })

  } catch (error) {
    console.error('Activity logging error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}