import { useEffect, useState } from "react"

export default function SearchBar({ onQuery }) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query)
    }, 700)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, onQuery])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSearch = () => {
    onQuery(query)
    setQuery("")
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row py-5">
        <input
          type="text"
          placeholder="Busca por nombre de usuario o titulo"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#02216B] focus:ring-2 focus:ring-[#02216B]/20"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="rounded-lg bg-[#02216B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#031a54] active:scale-95 sm:w-auto"
        >
          Buscar
        </button>
      </div>
    </>
  )
}
