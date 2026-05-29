'use client'

import { useState } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  bitcoinExperienceLevel: string
  createdAt: string
}

interface ProfileSectionProps {
  user: User
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    bitcoinExperienceLevel: user.bitcoinExperienceLevel || 'beginner'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('user_session')
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage('Profile updated successfully!')
        setIsEditing(false)
        // Update local storage
        const updatedUserData = { ...user, ...formData }
        localStorage.setItem('user_data', JSON.stringify(updatedUserData))
      } else {
        setMessage('Failed to update profile')
      }
    } catch (error) {
      setMessage('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to Bitcoin' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some Bitcoin knowledge' },
    { value: 'advanced', label: 'Advanced', description: 'Deep Bitcoin understanding' },
    { value: 'expert', label: 'Expert', description: 'Bitcoin maximalist' }
  ]

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400'
      case 'intermediate': return 'text-yellow-400'
      case 'advanced': return 'text-orange-400'
      case 'expert': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getExperienceBadge = (level: string) => {
    switch (level) {
      case 'beginner': return '🌱'
      case 'intermediate': return '🌿'
      case 'advanced': return '🌳'
      case 'expert': return '🦬'
      default: return '❓'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-white">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          {/* Profile Display */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full
                            flex items-center justify-center text-2xl font-bold text-white">
              {(user.firstName?.[0] || user.email[0]).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email.split('@')[0]}
              </h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Bitcoin Experience</label>
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {getExperienceBadge(user.bitcoinExperienceLevel)}
                </span>
                <span className={`capitalize font-medium ${getExperienceColor(user.bitcoinExperienceLevel)}`}>
                  {user.bitcoinExperienceLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Member Since</label>
              <p className="text-white">{memberSince}</p>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Portal Status</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400">Active Explorer</span>
              </div>
            </div>
          </div>

          {/* Bitcoin Learning Path */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="font-medium text-white mb-3">Learning Path</h4>
            <div className="space-y-2">
              {experienceLevels.map((level, index) => {
                const isActive = level.value === user.bitcoinExperienceLevel
                const isPassed = experienceLevels.findIndex(l => l.value === user.bitcoinExperienceLevel) > index

                return (
                  <div
                    key={level.value}
                    className={`flex items-center gap-3 p-2 rounded ${
                      isActive ? 'bg-orange-500/20 border border-orange-500/30' :
                      isPassed ? 'bg-green-500/10' : 'bg-gray-800/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isActive ? 'bg-orange-500 text-white' :
                      isPassed ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {isPassed ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${
                        isActive ? 'text-orange-400' :
                        isPassed ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {level.label}
                      </span>
                      <p className="text-xs text-gray-500">{level.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Edit Form */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white
                         focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white
                         focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Bitcoin Experience Level</label>
            <select
              value={formData.bitcoinExperienceLevel}
              onChange={(e) => setFormData({...formData, bitcoinExperienceLevel: e.target.value})}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white
                         focus:border-orange-500 focus:outline-none transition-colors"
            >
              {experienceLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {getExperienceBadge(level.value)} {level.label} - {level.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                         disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-2 px-4 rounded-lg
                         transition-all duration-200 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg
                         transition-all duration-200"
            >
              Cancel
            </button>
          </div>

          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  )
}