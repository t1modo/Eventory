"use client"

import { useState } from "react"
import useEventAPI from "../hooks/useEventAPI"
import EventCard from "../components/EventCard"
import { Search, MapPin } from "lucide-react"

export default function EventDiscoveryPage() {
  const [query, setQuery] = useState({ q: "", location: "" })
  const [searchInput, setSearchInput] = useState({ q: "", location: "" })
  const [hasSearched, setHasSearched] = useState(false)
  const { categories, loading, error } = useEventAPI(query)

  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
    setQuery(searchInput)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchInput((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 dark:text-purple-300">Discover Events</h1>

      <form className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mb-12" onSubmit={handleSearch}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="q"
            placeholder="Search events..."
            value={searchInput.q}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none dark:bg-gray-800 dark:border-purple-700 dark:text-white"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={searchInput.location}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none dark:bg-gray-800 dark:border-purple-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>

      {hasSearched && loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {hasSearched && error && <p className="text-center text-red-500">{error}</p>}

      {hasSearched && !loading && !error && (
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300">
                {category.category} Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}