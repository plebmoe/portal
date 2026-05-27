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
}

export default function PortalIntegration({
  sourcePerspective,
  sourceTopic,
  sourceQrCode,
  sourceInitiative
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
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm z-40">
          Welcome, {user.firstName || user.email}!
          <button
            onClick={handleLogout}
            className="ml-2 text-green-600 hover:text-green-800"
          >
            ×
          </button>
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