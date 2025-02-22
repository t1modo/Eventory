"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Calendar, MapPin, DollarSign, ExternalLink } from "lucide-react"

export default function SeriesPage() {
  const { id } = useParams()
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(`/api/series/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch series details")
        }
        const data = await response.json()
        setSeries(data.series)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSeriesDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (!series) {
    return (
      <div className="text-center py-10">
        <p>Series not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <img
          src={series.image || "/placeholder.svg"}
          alt={series.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{series.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          {series.venue}, {series.location}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {series.games.map((game) => (
          <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">{game.name}</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(game.date).toLocaleDateString()} at {game.time}
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <DollarSign className="w-4 h-4 mr-2" />
                {game.priceRange}
              </p>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Buy Tickets
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}