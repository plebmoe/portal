import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            PlebMoe Portal
          </h1>

          <p className="text-xl text-gray-300 mb-12">
            Interactive Bitcoin education through immersive wormhole experience
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Money Perspective</h3>
              <p className="text-gray-300">
                21 Million Cap, Self Custody, Proof of Work fundamentals
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Mental Perspective</h3>
              <p className="text-gray-300">
                Sovereignty, Low Time Preference, Personal Responsibility
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Media Perspective</h3>
              <p className="text-gray-300">
                Signal vs Noise, Verify Don't Trust, Narrative Independence
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Link
              href="/portal"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Enter the Portal
            </Link>

            <div className="text-gray-400 text-sm">
              <p>Permanent inscription on Bitcoin • Immutable education platform</p>
            </div>
          </div>

          <div className="mt-16 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Development Status</h3>
            <div className="text-left space-y-2">
              <div className="flex justify-between">
                <span>Portal Animation</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>User Authentication</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>Activity Logging</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>Referral System</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>NeonDB Integration</span>
                <span className="text-yellow-400">⚙ Ready</span>
              </div>
              <div className="flex justify-between">
                <span>Vercel Deployment</span>
                <span className="text-yellow-400">⚙ Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}