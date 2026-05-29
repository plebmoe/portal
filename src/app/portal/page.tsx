import PortalIntegration from '@/components/PortalIntegration'

interface PageProps {
  searchParams: Promise<{
    perspective?: string
    topic?: string
    qr?: string
    initiative?: string
    returning?: string
    action?: string
  }>
}

export default async function PortalPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <div className="min-h-screen bg-black">
      {/* Portal Integration Component */}
      <PortalIntegration
        sourcePerspective={params.perspective}
        sourceTopic={params.topic}
        sourceQrCode={params.qr}
        sourceInitiative={params.initiative}
        returning={params.returning}
      />

      {/* Portal Animation Container */}
      <div id="portal-container" className="w-full h-screen">
        {/* This is where the existing portal animation will be embedded */}
        <iframe
          src={`/portal/v14.6.html?${new URLSearchParams({
            ...(params.perspective && { perspective: params.perspective }),
            ...(params.topic && { topic: params.topic }),
            ...(params.qr && { qr: params.qr }),
            ...(params.initiative && { initiative: params.initiative })
          }).toString()}`}
          className="w-full h-full border-0"
          title="PlebMoe Portal"
        />
      </div>
    </div>
  )
}