'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="w-full mb-12">

      <div
        className="
          relative
          overflow-hidden
          bg-white
          rounded-[30px]
          border
          border-gray-200
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
          focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          focus-within:scale-[1.01]
        "
      >

        <div
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        >
          <Search size={22} />
        </div>

        <input
          type="text"
          placeholder="Buscar sneaker, marca ou coleção..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            bg-transparent
            py-6
            pl-16
            pr-6
            text-lg
            font-medium
            outline-none
            placeholder:text-gray-400
          "
        />

        {search && (
          <button
            onClick={() =>
              setSearch('')
            }
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              rounded-full
              bg-black
              text-white
              font-bold
              hover:scale-110
              transition-all
              duration-300
            "
          >
            ✕
          </button>
        )}
      </div>

      <div
        className="
          flex
          flex-wrap
          gap-3
          mt-5
        "
      >

        {[
          'Nike',
          'Jordan',
          'Air Max',
          'Puma',
          'Adidas',
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setSearch(item)
            }
            className="
              bg-white
              px-5
              py-2
              rounded-full
              text-sm
              font-semibold
              shadow-md
              hover:bg-black
              hover:text-white
              transition-all
              duration-300
            "
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}