'use client'

import { useState } from 'react'

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

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  bitcoinExperienceLevel: string
  createdAt: string
}

interface JourneyProgressProps {
  activities: Activity[]
  user: User
}

const stageData = [
  {
    id: 0,
    name: 'Overview',
    title: 'Overview',
    description: 'Welcome to the portal experience',
    color: 'from-gray-500 to-gray-600',
    icon: '🌌'
  },
  {
    id: 1,
    name: 'Approach',
    title: 'Approach',
    description: 'Approaching the wormhole',
    color: 'from-blue-500 to-blue-600',
    icon: '🚀'
  },
  {
    id: 2,
    name: 'Orbit',
    title: 'Orbit',
    description: 'Universal principles across domains',
    color: 'from-purple-500 to-purple-600',
    icon: '🔄'
  },
  {
    id: 3,
    name: 'Dive',
    title: 'Dive',
    description: 'Proof-of-work in skill development',
    color: 'from-cyan-500 to-cyan-600',
    icon: '🏊'
  },
  {
    id: 4,
    name: 'AI',
    title: 'AI',
    description: 'Merit-based systems amplify potential',
    color: 'from-green-500 to-green-600',
    icon: '🤖'
  },
  {
    id: 5,
    name: 'Lifestyle',
    title: 'Lifestyle',
    description: 'Quality assets for daily life',
    color: 'from-yellow-500 to-yellow-600',
    icon: '🏡'
  },
  {
    id: 6,
    name: 'Energy',
    title: 'Energy',
    description: 'Own your production means',
    color: 'from-orange-500 to-orange-600',
    icon: '⚡'
  },
  {
    id: 7,
    name: 'Wealth',
    title: 'Wealth',
    description: 'Sound money foundation',
    color: 'from-amber-500 to-amber-600',
    icon: '💰'
  },
  {
    id: 8,
    name: 'Community',
    title: 'Community',
    description: 'Local action, global impact',
    color: 'from-pink-500 to-pink-600',
    icon: '🌐'
  }
]

export default function JourneyProgress({ activities, user }: JourneyProgressProps) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  // Calculate visited stages from activities
  const visitedStages = new Set(
    activities
      .filter(a => a.activity_type === 'stage_visit')
      .map(a => a.activity_data?.stage)
      .filter(stage => stage !== undefined)
  )

  // Find the furthest stage reached
  const maxStage = visitedStages.size > 0 ? Math.max(...Array.from(visitedStages)) : -1

  // Calculate time spent in each stage
  const stageTimeSpent = activities
    .filter(a => a.activity_type === 'stage_time' || a.activity_type === 'stage_visit')
    .reduce((acc, activity) => {
      const stage = activity.activity_data?.stage
      const timeSpent = activity.activity_data?.timeSpent || activity.activity_data?.duration || 0
      if (stage !== undefined) {
        acc[stage] = (acc[stage] || 0) + timeSpent
      }
      return acc
    }, {} as Record<number, number>)

  const getStageStatus = (stageId: number) => {
    if (visitedStages.has(stageId)) return 'completed'
    if (stageId <= maxStage + 1) return 'available'
    return 'locked'
  }

  const getStageColor = (stage: any, status: string) => {
    if (status === 'completed') return stage.color
    if (status === 'available') return 'from-gray-600 to-gray-700'
    return 'from-gray-800 to-gray-900'
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Your Portal Journey</h2>
        <p className="text-gray-400">
          Track your progress through the 8-stage Bitcoin ecosystem experience
        </p>
        <div className="mt-4 bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((visitedStages.size) / 9) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {visitedStages.size} of 9 stages explored ({Math.round(((visitedStages.size) / 9) * 100)}% complete)
        </p>
      </div>

      {/* Stage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stageData.map((stage) => {
          const status = getStageStatus(stage.id)
          const timeSpent = stageTimeSpent[stage.id] || 0
          const isSelected = selectedStage === stage.id

          return (
            <div
              key={stage.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                isSelected ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedStage(isSelected ? null : stage.id)}
            >
              <div className={`
                bg-gradient-to-r ${getStageColor(stage, status)}
                rounded-lg p-4 border-2 transition-all duration-200
                ${status === 'completed' ? 'border-orange-500 shadow-lg shadow-orange-500/20' :
                  status === 'available' ? 'border-gray-600' : 'border-gray-800'}
                ${isSelected ? 'ring-2 ring-orange-400' : ''}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stage.icon}</span>
                  <div className="flex items-center gap-2">
                    {status === 'completed' && (
                      <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                    {status === 'locked' && (
                      <div className="w-3 h-3 bg-gray-600 rounded-full" />
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-1">
                  Stage {stage.id}: {stage.title}
                </h3>

                <p className="text-sm text-gray-300 mb-2 leading-tight">
                  {stage.description}
                </p>

                {timeSpent > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>⏱️</span>
                    <span>{formatTime(timeSpent)} spent</span>
                  </div>
                )}

                {status === 'locked' && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span>🔒</span>
                    <span>Continue journey to unlock</span>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {isSelected && status === 'completed' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-4 z-10 shadow-xl">
                  <h4 className="font-semibold text-orange-400 mb-2">Stage Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Spent:</span>
                      <span className="text-white">{formatTime(timeSpent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">✓ Completed</span>
                    </div>
                    {activities.find(a => a.activity_data?.stage === stage.id) && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Visit:</span>
                        <span className="text-white">
                          {new Date(
                            activities.find(a => a.activity_data?.stage === stage.id)?.created_at || ''
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Journey Insights */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="font-semibold text-white mb-3">Journey Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-orange-400 font-semibold">
              {Math.round(((visitedStages.size) / 9) * 100)}%
            </div>
            <div className="text-gray-500">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 font-semibold">
              {Object.values(stageTimeSpent).reduce((sum, time) => sum + time, 0) > 0
                ? formatTime(Object.values(stageTimeSpent).reduce((sum, time) => sum + time, 0))
                : '0m'}
            </div>
            <div className="text-gray-500">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-semibold">
              {visitedStages.size}
            </div>
            <div className="text-gray-500">Stages Seen</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-semibold">
              {9 - visitedStages.size}
            </div>
            <div className="text-gray-500">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  )
}