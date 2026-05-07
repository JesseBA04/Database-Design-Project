export default function RestaurantsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-2">Restaurants</h1>
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-5 border border-primary-100"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded-full" />
                <div className="h-4 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
