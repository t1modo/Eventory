import axios from "axios"; //Import axios so we can make HTTP requests

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";

    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          keyword: keyword,
          city: location,
          apikey: process.env.TICKETMASTER_API_KEY,
        },
      }
    );

    // Extract and format events
    const events =
      response.data._embedded?.events.map((event) => {
        return {
          id: event.id,
          name: event.name,
          date: event.dates.start.localDate,
          time: event.dates.start.localTime,
          image:
            event.images.find((img) => img.width > 1000)?.url ||
            event.images[0]?.url, // Pick the largest available image
          venue: event._embedded?.venues[0]?.name,
          location: `${event._embedded?.venues[0]?.city?.name}, ${event._embedded?.venues[0]?.state?.stateCode}`,
          priceRange: event.priceRanges
            ? `$${event.priceRanges[0]?.min} - $${event.priceRanges[0]?.max}`
            : "N/A",
          url: event.url,
        };
      }) || [];

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("Error fetching events: ", error);
    return new Response("Error fetching events", { status: 500 });
  }
}
