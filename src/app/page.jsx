"use client"

import Link from "next/link"
import useEventAPI from "./hooks/useEventAPI"
import FeaturedEventCarousel from "./components/FeaturedEventsCarousel"
import { AlertCircle } from "lucide-react"

export default function HomePage() {
  const { events, loading, error, hasEvents } = useEventAPI({
    size: "10", // Make sure size is a string
  })

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Discover Events Near You
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Find concerts, meetups, and more in your city
        </p>
        <Link
          href="/event-discovery"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Explore Events
        </Link>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Featured Events</h2>

        {loading && (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-48 text-red-500 p-4">
            <AlertCircle className="w-6 h-6 mr-2" />
            <p>Unable to load events. Please try again later.</p>
          </div>
        )}

        {!loading && !error && !hasEvents && (
          <div className="flex items-center justify-center h-48 text-gray-500">
            <p>No events found. Please try again later.</p>
          </div>
        )}

        {!loading && !error && hasEvents && (
          <div className="w-full">
            <FeaturedEventCarousel events={events} />
          </div>
        )}
      </section>
    </div>
  )
}