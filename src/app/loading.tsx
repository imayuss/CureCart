export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-20 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto py-24 px-4 text-center space-y-8 flex flex-col items-center">
        <div className="h-16 bg-gray-100 rounded-lg w-3/4 max-w-3xl animate-pulse"></div>
        <div className="h-16 bg-gray-100 rounded-lg w-1/2 max-w-xl animate-pulse"></div>
        <div className="h-6 bg-gray-100 rounded-md w-full max-w-2xl mt-4 animate-pulse"></div>
        <div className="h-14 bg-gray-100 rounded-full w-full max-w-2xl mt-8 animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-24 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="space-y-2 pt-28">
            <div className="h-4 bg-gray-100 rounded w-24 mb-6 animate-pulse"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg w-full animate-pulse"></div>
            ))}
          </div>
        </aside>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 bg-gray-100 rounded-md w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded-md w-24 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-100 rounded-lg w-32 animate-pulse"></div>
          </div>
          
          <div className="flex gap-2 mb-8 overflow-x-hidden">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-8 w-10 bg-gray-100 rounded-full animate-pulse shrink-0"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 h-64">
                <div className="aspect-square w-full bg-zinc-50 animate-pulse border-b border-gray-50"></div>
                <div className="p-4 flex flex-col flex-1 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                  <div className="mt-auto h-6 bg-gray-100 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
