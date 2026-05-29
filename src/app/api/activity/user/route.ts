import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Fetch user activities
    const activities = await prisma.userActivityLog.findMany({
      where: {
        userId: payload.userId
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 50 // Limit to last 50 activities
    })

    // Transform the data to match our interface
    const transformedActivities = activities.map(activity => ({
      id: activity.id,
      activity_type: activity.activityType,
      activity_data: activity.activityData as any,
      perspective: activity.perspective,
      topic: activity.topic,
      source_qr_code: activity.sourceQrCode,
      source_initiative: activity.sourceInitiative,
      created_at: activity.timestamp.toISOString()
    }))

    return NextResponse.json(transformedActivities)
  } catch (error) {
    console.error('Error fetching user activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}