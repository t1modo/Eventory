"use client"

import { useState, useEffect } from "react"

const useEventAPI = (query = {}) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (!isMounted) return

      setLoading(true)
      setError(null)

      try {
        const queryParams = new URLSearchParams({
          q: query.q || "",
          location: query.location || "",
          size: query.size || "20",
        })

        const response = await fetch(`/api?${queryParams}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!isMounted) return

        if (data.error) {
          throw new Error(data.error)
        }

        setCategories(data.categories || [])
      } catch (err) {
        if (!isMounted) return
        console.error("Error fetching events:", err)
        setError(err.message || "Failed to fetch events")
        setCategories([])
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [query.q, query.location, query.size])

  return {
    categories,
    loading,
    error,
    hasCategories: categories.length > 0,
  }
}

export default useEventAPI