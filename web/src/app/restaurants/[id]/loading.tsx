export default function RestaurantDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back link skeleton */}
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

      {/* Name skeleton */}
      <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse mb-3" />

      {/* Tags skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Location skeleton */}
      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="bg-white p-4 rounded-lg border border-primary-100 mb-8">
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Menu heading skeleton */}
      <div className="h-7 w-20 bg-gray-200 rounded animate-pulse mb-4" />

      {/* Menu card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg border border-primary-100"
          >
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-1/2 bg-gray-200 rounded" />
                <div className="h-5 w-12 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
              <div className="flex justify-end">
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
