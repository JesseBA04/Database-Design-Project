export default function ProfileLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-lg p-6 border border-primary-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-5 rounded-lg border border-primary-100">
          <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="bg-white p-5 rounded-lg border border-primary-100">
          <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>

      {/* Addresses skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-40 mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg border border-primary-100">
            <div className="h-5 bg-gray-200 rounded w-28 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
          <div className="bg-white p-4 rounded-lg border border-primary-100">
            <div className="h-5 bg-gray-200 rounded w-28 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>

      {/* Payment skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-44 mb-3" />
        <div className="space-y-2">
          <div className="bg-white p-4 rounded-lg border border-primary-100 h-14" />
          <div className="bg-white p-4 rounded-lg border border-primary-100 h-14" />
        </div>
      </div>

      {/* Favorites skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg border border-primary-100 h-28" />
          <div className="bg-white p-5 rounded-lg border border-primary-100 h-28" />
          <div className="bg-white p-5 rounded-lg border border-primary-100 h-28" />
        </div>
      </div>

      {/* Notification prefs skeleton */}
      <div className="mt-8 mb-8">
        <div className="h-6 bg-gray-200 rounded w-52 mb-3" />
        <div className="flex gap-2">
          <div className="h-7 bg-gray-200 rounded-full w-20" />
          <div className="h-7 bg-gray-200 rounded-full w-16" />
          <div className="h-7 bg-gray-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
