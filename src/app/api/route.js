import axios from "axios"

const ITEMS_PER_CATEGORY = 6 // Set a consistent number of items per category
const CATEGORY_ORDER = ["Sports", "Music", "Arts & Theatre", "Film", "Family", "Other", "Miscellaneous"]

export async function GET(req) {
  if (!process.env.TICKETMASTER_API_KEY) {
    return new Response(JSON.stringify({ error: "Ticketmaster API key is not configured" }), { status: 500 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get("q") || ""
    const location = searchParams.get("location") || ""

    // Increase size to ensure we get enough events for each category
    const response = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
      params: {
        keyword,
        city: location,
        apikey: process.env.TICKETMASTER_API_KEY,
        sort: "relevance,desc",
        size: 200, // Fetch more events to ensure we have enough for each category
        countryCode: "US",
      },
    })

    const events = response.data._embedded?.events || []

    // First, group events by category
    const eventsByCategory = events.reduce((acc, event) => {
      let category = event.classifications?.[0]?.segment?.name || "Other"

      // Normalize category names
      if (category === "Undefined" || category === "Unknown") {
        category = "Other"
      }
      if (category === "Other") {
        category = "Miscellaneous"
      }

      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(event)
      return acc
    }, {})

    // Process each category
    const categorizedEvents = Object.entries(eventsByCategory).map(([category, categoryEvents]) => {
      // Group similar events within each category
      const groupedEvents = categoryEvents.reduce((acc, event) => {
        const attractionName = event._embedded?.attractions?.[0]?.name
        const key = attractionName || event.name.split(" vs.")[0].trim()

        if (!acc[key]) {
          acc[key] = {
            id: `series-${event.id}`,
            name: attractionName || event.name.split(" vs.")[0].trim(),
            type: event.type,
            image: event.images?.find((img) => img.width > 1000)?.url || event.images?.[0]?.url,
            venue: event._embedded?.venues?.[0]?.name,
            location: `${event._embedded?.venues?.[0]?.city?.name || ""}, ${event._embedded?.venues?.[0]?.state?.stateCode || ""}`,
            priceRange: {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            },
            games: [],
          }
        }

        // Update price range
        if (event.priceRanges) {
          acc[key].priceRange.min = Math.min(
            acc[key].priceRange.min,
            event.priceRanges[0]?.min || Number.POSITIVE_INFINITY,
          )
          acc[key].priceRange.max = Math.max(
            acc[key].priceRange.max,
            event.priceRanges[0]?.max || Number.NEGATIVE_INFINITY,
          )
        }

        // Add event to the series
        acc[key].games.push({
          id: event.id,
          name: event.name,
          date: event.dates?.start?.localDate,
          time: event.dates?.start?.localTime,
          opponent: event.name.includes(" vs.") ? event.name.split(" vs.")[1]?.trim() : null,
          priceRange: event.priceRanges
            ? `$${event.priceRanges[0]?.min?.toFixed(2)} - $${event.priceRanges[0]?.max?.toFixed(2)}`
            : "Price information unavailable",
          url: event.url,
        })

        return acc
      }, {})

      // Format price ranges and sort events by date
      const formattedEvents = Object.values(groupedEvents)
        .map((event) => ({
          ...event,
          priceRange:
            event.priceRange.min !== Number.POSITIVE_INFINITY
              ? `$${event.priceRange.min.toFixed(2)} - $${event.priceRange.max.toFixed(2)}`
              : "Price information unavailable",
          games: event.games.sort((a, b) => new Date(a.date) - new Date(b.date)),
        }))
        // Limit the number of events per category
        .slice(0, ITEMS_PER_CATEGORY)

      return {
        category,
        events: formattedEvents,
      }
    })

    // Sort categories according to the defined order and filter out empty categories
    const sortedCategories = categorizedEvents
      .filter((cat) => cat.events.length > 0)
      .sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a.category)
        const indexB = CATEGORY_ORDER.indexOf(b.category)
        return indexA - indexB
      })

    return new Response(JSON.stringify({ categories: sortedCategories }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to fetch events",
        details: error.message,
      }),
      { status: 500 },
    )
  }
}