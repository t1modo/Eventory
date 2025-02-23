<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9d083ed4d5a9cbbe388da41e5d75e2c331f4df64
import axios from "axios";
import { setTimeout } from 'timers/promises';

const ITEMS_PER_CATEGORY = 10;
const CATEGORY_ORDER = [
  "Sports",
  "Music",
  "Arts & Theatre",
  "Film",
  "Family",
  "Other",
  "Miscellaneous"
];

export async function GET(req) {
  if (!process.env.TICKETMASTER_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Ticketmaster API key is not configured" }), 
      { status: 500 }
    );
  }

=======
import axios from "axios"; //Import axios so we can make HTTP requests

export async function GET(req) {
>>>>>>> parent of bbe34ef (Massive reworks)
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9d083ed4d5a9cbbe388da41e5d75e2c331f4df64
    const categories = [];
    for (const category of CATEGORY_ORDER) {
      try {
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              keyword,
              city: location,
              apikey: process.env.TICKETMASTER_API_KEY,
              sort: "relevance,desc",
              size: ITEMS_PER_CATEGORY,
              countryCode: "US",
              segmentName: category === "Miscellaneous" ? "Undefined" : category,
            },
          }
        );

        const events = response.data._embedded?.events || [];
        categories.push({ category, events });

        // Add a delay between requests to avoid rate limiting
        await setTimeout(200);
      } catch (error) {
        console.error(`Error fetching events for category ${category}:`, error.message);
        categories.push({ category, events: [] });
      }
    }

    const processedCategories = categories.map(({ category, events }) => {
      // ... (rest of the processing logic remains the same)
    });

    const sortedCategories = processedCategories
      .filter(cat => cat.events.length > 0)
      .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));

    return new Response(
      JSON.stringify({ categories: sortedCategories }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch events",
        details: error.message 
      }), 
      { status: 500 }
    );
<<<<<<< HEAD
=======
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
>>>>>>> parent of bbe34ef (Massive reworks)
=======
>>>>>>> 9d083ed4d5a9cbbe388da41e5d75e2c331f4df64
  }
}
