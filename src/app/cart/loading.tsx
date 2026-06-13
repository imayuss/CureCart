export default function Loading() {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="h-10 w-64 bg-gray-100 rounded-lg animate-pulse mb-2"></div>
          <div className="h-5 w-32 bg-gray-100 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl animate-pulse shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-5 w-1/2 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-6 w-20 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-10 w-32 bg-gray-100 rounded-full animate-pulse"></div>
                      <div className="h-8 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-32">
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-8"></div>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
                <div className="flex justify-between items-end">
                  <div className="h-6 w-16 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="h-14 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
