import axios from "axios"

export async function GET(req) {
  if (!process.env.TICKETMASTER_API_KEY) {
    return new Response(JSON.stringify({ error: "Ticketmaster API key is not configured" }), { status: 500 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get("q") || ""
    const location = searchParams.get("location") || ""
    const size = searchParams.get("size") || "20"

    const response = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
      params: {
        keyword,
        city: location,
        apikey: process.env.TICKETMASTER_API_KEY,
        sort: "relevance,desc",
        size,
        countryCode: "US",
      },
    })

    // Check if events exist in the response
    const events =
      response.data._embedded?.events?.map((event) => ({
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        image: event.images?.find((img) => img.width > 1000)?.url || event.images?.[0]?.url,
        venue: event._embedded?.venues?.[0]?.name,
        location: `${event._embedded?.venues?.[0]?.city?.name || ""}, ${event._embedded?.venues?.[0]?.state?.stateCode || ""}`,
        priceRange: event.priceRanges
          ? `$${event.priceRanges[0]?.min?.toFixed(2)} - $${event.priceRanges[0]?.max?.toFixed(2)}`
          : "Price information unavailable",
        url: event.url,
      })) || []

    return new Response(JSON.stringify({ events }), {
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

