'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import JourneyProgress from './JourneyProgress'
import ProfileSection from './ProfileSection'
import AttributionInsights from './AttributionInsights'
import RecentActivity from './RecentActivity'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  bitcoinExperienceLevel: string
  createdAt: string
}

interface Activity {
  id: string
  activity_type: string
  activity_data: any
  perspective?: string
  topic?: string
  source_qr_code?: string
  source_initiative?: string
  created_at: string
}

interface DashboardContentProps {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('user_session')
        const response = await fetch('/api/activity/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    localStorage.removeItem('user_data')
    router.push('/')
  }

  const handleReturnToPortal = () => {
    // Preserve user state and return to portal
    router.push('/?returning=true')
  }

  const getJourneyStats = () => {
    const stageVisits = activities.filter(a => a.activity_type === 'stage_visit')
    const uniqueStages = new Set(stageVisits.map(a => a.activity_data?.stage)).size
    const totalTime = activities
      .filter(a => a.activity_type === 'portal_session')
      .reduce((sum, a) => sum + (a.activity_data?.duration || 0), 0)

    return {
      stagesVisited: uniqueStages,
      totalStages: 8,
      totalTimeMinutes: Math.round(totalTime / 60),
      sessionsCount: activities.filter(a => a.activity_type === 'portal_session').length
    }
  }

  const stats = getJourneyStats()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-400">
            Welcome back, {user.firstName || user.email.split('@')[0]}
          </h1>
          <p className="text-gray-400 mt-2">
            Continue your journey through the Bitcoin ecosystem
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleReturnToPortal}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                       text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200
                       transform hover:scale-105"
          >
            🌀 Return to Portal
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg
                       transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Journey Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Journey Progress</h3>
          <p className="text-2xl font-bold text-orange-400">
            {stats.stagesVisited}/{stats.totalStages}
          </p>
          <p className="text-sm text-gray-500">Stages Explored</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Time Invested</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {stats.totalTimeMinutes}m
          </p>
          <p className="text-sm text-gray-500">Learning Time</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Experience Level</h3>
          <p className="text-2xl font-bold text-purple-400 capitalize">
            {user.bitcoinExperienceLevel}
          </p>
          <p className="text-sm text-gray-500">Bitcoin Knowledge</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Sessions</h3>
          <p className="text-2xl font-bold text-green-400">
            {stats.sessionsCount}
          </p>
          <p className="text-sm text-gray-500">Portal Visits</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Journey Progress */}
        <div className="lg:col-span-2 space-y-8">
          <JourneyProgress activities={activities} user={user} />
          <RecentActivity activities={activities} />
        </div>

        {/* Right Column - Profile & Attribution */}
        <div className="space-y-8">
          <ProfileSection user={user} />
          <AttributionInsights activities={activities} />
        </div>
      </div>
    </div>
  )
}