'use client'

export default function Reports() {
  return (
    <div className="flex h-full bg-neutral-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-zinc-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="capitalize font-medium text-primary-hover text-sm">AI Ops Assistant</span>
              <span className="capitalize font-medium text-primary text-sm">Reports</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-6">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize font-semibold text-primary text-xl">
                Reports
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-lg font-medium text-primary mb-2">Coming Soon</h2>
              <p className="text-sm text-gray-500">Reports functionality will be available soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
