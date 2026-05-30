export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F6F2] p-6 md:p-10">
      <div className="animate-pulse">
        <div className="h-16 w-72 bg-gray-300 rounded-2xl mb-4" />

        <div className="h-6 w-52 bg-gray-200 rounded-xl mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[32px] overflow-hidden shadow-lg"
            >
              <div className="h-80 bg-gray-300" />

              <div className="p-6">
                <div className="h-4 w-20 bg-gray-200 rounded mb-4" />

                <div className="h-10 w-52 bg-gray-300 rounded mb-4" />

                <div className="h-4 w-full bg-gray-200 rounded mb-2" />

                <div className="h-4 w-3/4 bg-gray-200 rounded mb-8" />

                <div className="flex justify-between items-center">
                  <div className="h-8 w-28 bg-gray-300 rounded" />

                  <div className="h-12 w-32 bg-gray-400 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}