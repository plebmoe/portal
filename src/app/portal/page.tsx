import PortalIntegration from '@/components/PortalIntegration'

interface PageProps {
  searchParams: {
    perspective?: string
    topic?: string
    qr?: string
    initiative?: string
  }
}

export default function PortalPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Portal Integration Component */}
      <PortalIntegration
        sourcePerspective={searchParams.perspective}
        sourceTopic={searchParams.topic}
        sourceQrCode={searchParams.qr}
        sourceInitiative={searchParams.initiative}
      />

      {/* Portal Animation Container */}
      <div id="portal-container" className="w-full h-screen">
        {/* This is where the existing portal animation will be embedded */}
        <iframe
          src="/portal/v14.6.html"
          className="w-full h-full border-0"
          title="PlebMoe Portal"
        />
      </div>
    </div>
  )
}