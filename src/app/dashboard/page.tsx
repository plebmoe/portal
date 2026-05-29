'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardContent from '@/components/dashboard/DashboardContent'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  bitcoinExperienceLevel: string
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('user_session')

      if (!token) {
        router.push('/portal?action=login')
        return
      }

      try {
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          localStorage.removeItem('user_session')
          localStorage.removeItem('user_data')
          router.push('/portal?action=login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/portal?action=login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-400">Loading your journey...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Redirecting
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardContent user={user} />
    </div>
  )
}