'use client'

import { useState, useEffect } from 'react'
import SignupModal from './auth/SignupModal'
import LoginModal from './auth/LoginModal'

interface PortalIntegrationProps {
  // Portal context from URL params or localStorage
  sourcePerspective?: string
  sourceTopic?: string
  sourceQrCode?: string
  sourceInitiative?: string
  returning?: string
}

export default function PortalIntegration({
  sourcePerspective,
  sourceTopic,
  sourceQrCode,
  sourceInitiative,
  returning
}: PortalIntegrationProps) {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for existing user session
    const session = localStorage.getItem('user_session')
    const userData = localStorage.getItem('user_data')

    if (session && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user_session')
        localStorage.removeItem('user_data')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  const logActivity = async (activityType: string, activityData: any = {}) => {
    const session = localStorage.getItem('user_session')
    if (!session) return

    try {
      await fetch('/api/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session}`
        },
        body: JSON.stringify({
          activity_type: activityType,
          activity_data: activityData,
          perspective: sourcePerspective,
          topic: sourceTopic,
          source_qr_code: sourceQrCode,
          source_initiative: sourceInitiative,
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  }

  // Expose functions globally for portal to use
  useEffect(() => {
    // @ts-ignore
    window.portalAuth = {
      openSignup: () => setShowSignup(true),
      openLogin: () => setShowLogin(true),
      logout: handleLogout,
      logActivity,
      isLoggedIn: () => !!user,
      getUser: () => user
    }
  }, [user, sourcePerspective, sourceTopic, sourceQrCode, sourceInitiative])

  return (
    <>
      {/* User status indicator for portal */}
      {user && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full
                              flex items-center justify-center text-sm font-bold text-white">
                {(user.firstName?.[0] || user.email[0]).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-400">
                  Welcome back, {user.firstName || user.email.split('@')[0]}!
                </p>
                {returning && (
                  <p className="text-xs text-gray-400">Continue your journey</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => window.open('/dashboard', '_self')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                           text-white text-xs font-medium py-1 px-3 rounded transition-all duration-200
                           flex items-center gap-1"
              >
                📊 Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium py-1 px-2 rounded
                           transition-all duration-200"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        sourcePerspective={sourcePerspective}
        sourceTopic={sourceTopic}
        sourceQrCode={sourceQrCode}
        sourceInitiative={sourceInitiative}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
      />
    </>
  )
}

// Types for global portal integration
declare global {
  interface Window {
    portalAuth: {
      openSignup: () => void
      openLogin: () => void
      logout: () => void
      logActivity: (activityType: string, activityData?: any) => Promise<void>
      isLoggedIn: () => boolean
      getUser: () => any
    }
  }
}