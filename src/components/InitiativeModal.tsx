'use client'

import { useState, useEffect } from 'react'
import { initiativeModals, type ModalContent } from '@/data/initiativeModals'

interface InitiativeModalProps {
  initiativeId: string | null
  onClose: () => void
}

export default function InitiativeModal({ initiativeId, onClose }: InitiativeModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<ModalContent | null>(null)

  useEffect(() => {
    if (initiativeId && initiativeModals[initiativeId]) {
      setContent(initiativeModals[initiativeId])
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setTimeout(() => setContent(null), 300) // Wait for animation to complete
    }
  }, [initiativeId])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleExternalLink = (url: string, action: string) => {
    // Track analytics here if needed
    console.log(`User clicked: ${action} for ${content?.name}`)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!content) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4
                  transition-all duration-300 ease-out
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                    shadow-2xl border border-gray-700
                    transition-all duration-300 ease-out
                    ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${content.hero.backgroundGradient} p-6 rounded-t-xl relative`}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{content.hero.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{content.name}</h1>
              <p className="text-white/90 text-sm">{content.tagline}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-2">{content.hero.headline}</h2>
            <p className="text-white/90">{content.hero.subheadline}</p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExternalLink(content.callToAction.primary.url, content.callToAction.primary.action)}
              className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {content.callToAction.primary.text}
            </button>
            <button
              onClick={() => handleExternalLink(content.callToAction.secondary.url, content.callToAction.secondary.action)}
              className="border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {content.callToAction.secondary.text}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">

          {/* Bitcoin Principles */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">{content.bitcoinPrinciples.title}</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {content.bitcoinPrinciples.principles.map((principle, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">₿</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-1">{principle.principle}</h4>
                      <p className="text-gray-300 text-sm mb-2">{principle.application}</p>
                      <p className="text-green-400 text-sm font-medium">{principle.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Business Details */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">What We Provide</h3>
            <p className="text-gray-300 mb-6">{content.businessDetails.overview}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Services */}
              <div>
                <h4 className="font-semibold text-white mb-3">Services</h4>
                <ul className="space-y-2">
                  {content.businessDetails.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-cyan-400 mt-1">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unique Value */}
              <div>
                <h4 className="font-semibold text-white mb-3">Why Choose Us</h4>
                <ul className="space-y-2">
                  {content.businessDetails.uniqueValue.map((value, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400 mt-1">✓</span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">What Clients Say</h3>
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border-l-4 border-orange-500">
              <blockquote className="text-gray-200 mb-3 italic">
                "{content.businessDetails.socialProof.testimonial}"
              </blockquote>
              <div className="text-right">
                <cite className="text-orange-400 font-medium">
                  {content.businessDetails.socialProof.author}
                </cite>
                <p className="text-gray-400 text-sm">{content.businessDetails.socialProof.role}</p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Investment & Pricing</h3>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">{content.pricing.approach}</h4>
                  <p className="text-gray-300 text-sm mb-4">{content.pricing.structure}</p>

                  <h5 className="font-medium text-gray-300 mb-2">Payment Methods:</h5>
                  <ul className="space-y-1">
                    {content.pricing.paymentMethods.map((method, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                  <h5 className="font-semibold text-orange-400 mb-2">Bitcoin Advantage</h5>
                  <p className="text-gray-300 text-sm">{content.pricing.bitcoinAdvantage}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Next Steps */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Location & Getting Started</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-cyan-400 mb-2">Service Area</h4>
                <p className="text-gray-300 text-sm">{content.location.serviceArea}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Availability</h4>
                <p className="text-gray-300 text-sm">{content.location.availability}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-purple-400 mb-2">Next Steps</h4>
                <p className="text-gray-300 text-sm">{content.location.nextSteps}</p>
              </div>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="border-t border-gray-700 pt-6">
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm italic">{content.callToAction.qualifier}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleExternalLink(content.callToAction.primary.url, content.callToAction.primary.action)}
                className={`bg-gradient-to-r ${content.hero.backgroundGradient} text-white font-medium py-3 px-6 rounded-lg
                           hover:opacity-90 transition-opacity flex-1 sm:flex-none`}
              >
                {content.callToAction.primary.text}
              </button>

              <button
                onClick={() => handleExternalLink(content.callToAction.secondary.url, content.callToAction.secondary.action)}
                className="border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 px-6 rounded-lg
                           transition-colors flex-1 sm:flex-none"
              >
                {content.callToAction.secondary.text}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}