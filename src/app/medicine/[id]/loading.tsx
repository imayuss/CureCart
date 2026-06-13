export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-zinc-50 rounded-3xl aspect-square w-full max-w-2xl mx-auto animate-pulse border border-gray-100"></div>
          
          <div className="flex flex-col pt-4">
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-3"></div>
            <div className="h-10 w-3/4 bg-gray-100 rounded-lg animate-pulse mb-6"></div>
            <div className="h-8 w-40 bg-gray-100 rounded-lg animate-pulse mb-8"></div>
            
            <div className="h-px w-full bg-gray-100 my-8"></div>
            
            <div className="flex gap-4 mb-8">
              <div className="h-12 w-32 bg-gray-100 rounded-full animate-pulse"></div>
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
            
            <div className="space-y-4 mb-10">
              <div className="h-16 w-full bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
              <div className="h-16 w-full bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-5 w-48 bg-gray-100 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
