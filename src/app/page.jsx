"use client"

import Link from "next/link"
import useEventAPI from "./hooks/useEventAPI"
import CategorySection from "./components/CategorySection"
import { AlertCircle } from "lucide-react"

export default function HomePage() {
  const { categories, loading, error } = useEventAPI({ size: "200" })

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Discover Events Near You!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Find concerts, sports, and more in your city.
        </p>
        <Link
          href="/event-discovery"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Explore Events
        </Link>
      </section>

      <div className="space-y-8">
        {loading && (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-48 text-red-500">
            <AlertCircle className="w-6 h-6 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col">
            {categories?.map((category) => (
              <CategorySection key={category.category} category={category.category} events={category.events} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}