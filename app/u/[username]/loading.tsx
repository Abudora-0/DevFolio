export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0c10]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Top nav */}
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-20 rounded-lg" />
          <div className="skeleton h-8 w-20 rounded-xl" />
        </div>

        {/* Hero skeleton */}
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="skeleton w-20 h-20 sm:w-24 sm:h-24 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-8 w-48 rounded-lg" />
              <div className="skeleton h-4 w-28 rounded-lg" />
              <div className="skeleton h-4 w-full max-w-sm rounded-lg" />
              <div className="skeleton h-4 w-3/4 max-w-xs rounded-lg" />
              <div className="flex gap-4 mt-2">
                <div className="skeleton h-4 w-20 rounded-lg" />
                <div className="skeleton h-4 w-20 rounded-lg" />
                <div className="skeleton h-4 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="glass rounded-2xl p-1">
          <div className="flex divide-x divide-[#21262d]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 p-4">
                <div className="skeleton h-4 w-4 rounded" />
                <div className="skeleton h-7 w-14 rounded-lg" />
                <div className="skeleton h-3 w-16 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="skeleton h-4 w-32 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-2xl p-4 space-y-3">
                  <div className="skeleton h-4 w-3/4 rounded-lg" />
                  <div className="skeleton h-3 w-full rounded-lg" />
                  <div className="skeleton h-3 w-2/3 rounded-lg" />
                  <div className="flex gap-3">
                    <div className="skeleton h-3 w-16 rounded-lg" />
                    <div className="skeleton h-3 w-10 rounded-lg" />
                    <div className="skeleton h-3 w-10 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="skeleton h-4 w-24 rounded-lg" />
            <div className="skeleton h-2.5 w-full rounded-full" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="skeleton w-2.5 h-2.5 rounded-full" />
                  <div className="skeleton h-3 flex-1 rounded-lg" />
                  <div className="skeleton h-2 w-8 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
