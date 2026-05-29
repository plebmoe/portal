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

interface AttributionInsightsProps {
  activities: Activity[]
}

const initiativeData = {
  psab: {
    name: 'Premium Spas & Billiards',
    icon: '🛁',
    color: 'from-blue-500 to-blue-600',
    stage: 5,
    focus: 'Lifestyle & Wellness',
    description: 'Quality assets for health and family',
    insights: [
      'Quality over quantity investments',
      'Therapeutic wellness infrastructure',
      'Family recreation spaces'
    ]
  },
  pqr: {
    name: 'Penn Quarter Rules',
    icon: '🗣️',
    color: 'from-purple-500 to-purple-600',
    stage: 8,
    focus: 'Community & AI',
    description: 'Proof-of-work applied to discourse',
    insights: [
      'AI-moderated debate systems',
      'Merit-based discussion',
      'Local community building'
    ]
  },
  solar: {
    name: 'Solar Strive',
    icon: '⚡',
    color: 'from-yellow-500 to-yellow-600',
    stage: 6,
    focus: 'Energy Sovereignty',
    description: 'Energy independence enables monetary independence',
    insights: [
      'Own your production means',
      'Energy sovereignty solutions',
      'Sustainable independence'
    ]
  },
  pop: {
    name: 'Proof of Putt',
    icon: '⛳',
    color: 'from-green-500 to-green-600',
    stage: 4,
    focus: 'AI & Gamification',
    description: 'Merit-based recognition systems',
    insights: [
      'AI-powered competition',
      'Skill verification systems',
      'Gamified learning'
    ]
  },
  boats: {
    name: 'Better Boat Brokers',
    icon: '🛥️',
    color: 'from-cyan-500 to-cyan-600',
    stage: 7,
    focus: 'Bitcoin Assets',
    description: 'Sound money for premium assets',
    insights: [
      'Bitcoin-based transactions',
      'Premium asset marketplace',
      'Alternative payment systems'
    ]
  }
}

export default function AttributionInsights({ activities }: AttributionInsightsProps) {
  // Find the primary attribution source
  const attributionActivity = activities.find(a => a.source_qr_code && a.source_initiative)
  const primarySource = attributionActivity?.source_qr_code
  const primaryInitiative = attributionActivity?.source_initiative

  // Get all QR sources user has interacted with
  const allSources = new Set(
    activities
      .filter(a => a.source_qr_code)
      .map(a => a.source_qr_code)
  )

  // Calculate engagement with attributed initiative
  const attributedActivities = activities.filter(a =>
    a.source_qr_code === primarySource || a.source_initiative === primaryInitiative
  )

  const getInitiativeInfo = (qrCode: string | undefined) => {
    if (!qrCode) return null
    return initiativeData[qrCode as keyof typeof initiativeData] || null
  }

  const primaryInfo = getInitiativeInfo(primarySource)

  // Personalized recommendations based on attribution
  const getPersonalizedContent = () => {
    if (!primaryInfo) return []

    const baseContent = [
      {
        title: 'Continue Your Journey',
        description: `Explore Stage ${primaryInfo.stage} to dive deeper into ${primaryInfo.focus}`,
        action: 'Visit Portal',
        actionUrl: `/portal?stage=${primaryInfo.stage}`,
        color: primaryInfo.color
      }
    ]

    // Add related initiatives
    const relatedInitiatives = Object.entries(initiativeData)
      .filter(([key, data]) => key !== primarySource && data.stage !== primaryInfo.stage)
      .slice(0, 2)
      .map(([key, data]) => ({
        title: `Explore ${data.name}`,
        description: `Discover how ${data.focus.toLowerCase()} connects to your interests`,
        action: 'Learn More',
        actionUrl: `/portal?qr=${key}&stage=${data.stage}`,
        color: data.color
      }))

    return [...baseContent, ...relatedInitiatives]
  }

  const personalizedContent = getPersonalizedContent()

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Your Discovery Path</h2>

      {primaryInfo ? (
        <div className="space-y-6">
          {/* Primary Attribution Source */}
          <div className={`bg-gradient-to-r ${primaryInfo.color} rounded-lg p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{primaryInfo.icon}</span>
              <div>
                <h3 className="font-semibold text-white">{primaryInfo.name}</h3>
                <p className="text-white/80 text-sm">{primaryInfo.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <span className="font-medium">Focus Area:</span>
                <p>{primaryInfo.focus}</p>
              </div>
              <div>
                <span className="font-medium">Portal Stage:</span>
                <p>Stage {primaryInfo.stage}</p>
              </div>
            </div>
          </div>

          {/* Attribution Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Related Activities</h4>
              <p className="text-xl font-bold text-orange-400">{attributedActivities.length}</p>
              <p className="text-xs text-gray-500">Actions from this source</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Discovery Sources</h4>
              <p className="text-xl font-bold text-cyan-400">{allSources.size}</p>
              <p className="text-xs text-gray-500">QR codes explored</p>
            </div>
          </div>

          {/* Key Insights */}
          <div>
            <h4 className="font-medium text-white mb-3">Key Insights</h4>
            <div className="space-y-2">
              {primaryInfo.insights.map((insight, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div>
            <h4 className="font-medium text-white mb-3">Recommended for You</h4>
            <div className="space-y-3">
              {personalizedContent.map((content, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-white text-sm">{content.title}</h5>
                    <button
                      onClick={() => window.open(content.actionUrl, '_self')}
                      className={`text-xs bg-gradient-to-r ${content.color} text-white px-2 py-1 rounded
                                 hover:opacity-90 transition-opacity`}
                    >
                      {content.action}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{content.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Map */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-white mb-3">Ecosystem Connections</h4>
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Universal Pattern:</span> All initiatives
                demonstrate the same Bitcoin principles applied to different domains.
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Proof-of-work → Value creation through service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Verification → Trust through transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Decentralization → Local circular economies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🌀</div>
          <h3 className="font-medium text-white mb-2">No Attribution Source</h3>
          <p className="text-gray-400 text-sm mb-4">
            You entered the portal directly. Explore with QR codes to unlock personalized insights.
          </p>
          <button
            onClick={() => window.open('/portal', '_self')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                       text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Continue Portal Journey
          </button>
        </div>
      )}
    </div>
  )
}