'use client'

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

interface RecentActivityProps {
  activities: Activity[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // Sort activities by date (most recent first) and take the last 10
  const recentActivities = activities
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'portal_session': return '🌀'
      case 'stage_visit': return '📍'
      case 'user_registration': return '✨'
      case 'stage_time': return '⏱️'
      case 'perspective_change': return '🔄'
      case 'topic_view': return '📖'
      case 'signup_modal': return '📝'
      case 'login_modal': return '🔐'
      case 'profile_update': return '👤'
      default: return '📊'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'portal_session': return 'text-orange-400'
      case 'stage_visit': return 'text-cyan-400'
      case 'user_registration': return 'text-green-400'
      case 'stage_time': return 'text-purple-400'
      case 'perspective_change': return 'text-blue-400'
      case 'topic_view': return 'text-yellow-400'
      case 'signup_modal': return 'text-pink-400'
      case 'login_modal': return 'text-indigo-400'
      case 'profile_update': return 'text-emerald-400'
      default: return 'text-gray-400'
    }
  }

  const formatActivityDescription = (activity: Activity) => {
    const { activity_type, activity_data, perspective, topic, source_qr_code } = activity

    switch (activity_type) {
      case 'portal_session':
        return `Started portal session${source_qr_code ? ` from ${source_qr_code.toUpperCase()} QR code` : ''}`

      case 'stage_visit':
        const stageName = ['Overview', 'Approach', 'Orbit', 'Dive', 'AI', 'Lifestyle', 'Energy', 'Wealth', 'Community'][activity_data?.stage]
        return `Visited Stage ${activity_data?.stage}: ${stageName || 'Unknown'}`

      case 'user_registration':
        return 'Joined the portal community'

      case 'stage_time':
        const timeSpent = activity_data?.timeSpent || activity_data?.duration || 0
        const timeStr = timeSpent > 60 ? `${Math.floor(timeSpent / 60)}m` : `${timeSpent}s`
        return `Spent ${timeStr} in stage ${activity_data?.stage}`

      case 'perspective_change':
        return `Switched to ${perspective} perspective`

      case 'topic_view':
        return `Explored ${topic} topic in ${perspective} perspective`

      case 'signup_modal':
        return 'Opened registration modal'

      case 'login_modal':
        return 'Opened login modal'

      case 'profile_update':
        return 'Updated profile information'

      default:
        return `${activity_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
    }
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const groupActivitiesByDate = (activities: Activity[]) => {
    const groups: { [key: string]: Activity[] } = {}

    activities.forEach(activity => {
      const date = new Date(activity.created_at).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activity)
    })

    return groups
  }

  const activityGroups = groupActivitiesByDate(recentActivities)

  const isToday = (dateString: string) => {
    return dateString === new Date().toLocaleDateString()
  }

  const isYesterday = (dateString: string) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return dateString === yesterday.toLocaleDateString()
  }

  const formatDateHeader = (dateString: string) => {
    if (isToday(dateString)) return 'Today'
    if (isYesterday(dateString)) return 'Yesterday'
    return dateString
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <span className="text-sm text-gray-400">{activities.length} total activities</span>
      </div>

      {recentActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-medium text-white mb-2">No Activity Yet</h3>
          <p className="text-gray-400 text-sm">
            Start exploring the portal to see your activity history here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(activityGroups).map(([date, activities]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-gray-400 mb-3 sticky top-0 bg-gray-900 py-1">
                {formatDateHeader(date)}
              </h3>

              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800
                               transition-colors cursor-default"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-lg">{getActivityIcon(activity.activity_type)}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-relaxed">
                        {formatActivityDescription(activity)}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${getActivityColor(activity.activity_type)}`}>
                          {formatRelativeTime(activity.created_at)}
                        </span>

                        {activity.source_qr_code && (
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                            {activity.source_qr_code.toUpperCase()}
                          </span>
                        )}

                        {activity.perspective && (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                            {activity.perspective}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Activity-specific details */}
                    {activity.activity_data?.stage !== undefined && (
                      <div className="flex-shrink-0 text-xs text-gray-500">
                        S{activity.activity_data.stage}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {activities.length > 10 && (
            <div className="text-center pt-4 border-t border-gray-700">
              <button className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                View All Activity ({activities.length - 10} more)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}