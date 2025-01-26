import axios from "axios"; //Import axios so we can make HTTP requests

import dotenv from "dotenv";
dotenv.config(); //This will load variables from .env to process.env

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get('q') || '';
        const location = searchParams.get('location') || '';

        const response = await axios.get(
            "https://app.ticketmaster.com/discovery/v2/events.json",
            {
                params: {
                    keyword: keyword,
                    city: location,
                    apiKey: process.env.TICKETMASTER_API_KEY, //Ticketmaster API key
                },
            }
        );

        return new Response(JSON.stringify(response.data._embedded?.events || []), {
            status: 200,
        });
    }
    catch (error) {
        console.error("Error fetching events: ", error);
        return new Response("Error fetching events", { status: 500 });
    }
}