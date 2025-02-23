import axios from "axios"

export async function GET(req, { params }) {
  if (!process.env.TICKETMASTER_API_KEY) {
    return new Response(JSON.stringify({ error: "Ticketmaster API key is not configured" }), { status: 500 })
  }

  try {
    const seriesId = params.id.replace("series-", "")

    // Fetch the initial event to get the attraction ID
    const eventResponse = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${seriesId}.json`, {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
      },
    })

    const attractionId = eventResponse.data._embedded?.attractions?.[0]?.id

    // Fetch all events for this attraction
    const seriesResponse = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
      params: {
        attractionId,
        apikey: process.env.TICKETMASTER_API_KEY,
        sort: "date,asc",
      },
    })

    const events = seriesResponse.data._embedded?.events || []
    const firstEvent = events[0]

    const series = {
      id: `series-${firstEvent.id}`,
      name: firstEvent._embedded?.attractions?.[0]?.name || firstEvent.name.split(" vs.")[0].trim(),
      image: firstEvent.images?.find((img) => img.width > 1000)?.url || firstEvent.images?.[0]?.url,
      venue: firstEvent._embedded?.venues?.[0]?.name,
      location: `${firstEvent._embedded?.venues?.[0]?.city?.name}, ${firstEvent._embedded?.venues?.[0]?.state?.stateCode}`,
      games: events.map((event) => ({
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        opponent: event.name.split(" vs.")[1]?.trim(),
        priceRange: event.priceRanges
          ? `$${event.priceRanges[0]?.min?.toFixed(2)} - $${event.priceRanges[0]?.max?.toFixed(2)}`
          : "Price information unavailable",
        url: event.url,
      })),
    }

    return new Response(JSON.stringify({ series }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching series details:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to fetch series details",
        details: error.message,
      }),
      { status: 500 },
    )
  }
}