import { useEffect, useState } from "react";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config(); //This will load variables from .env to process.env

export default function useEventAPI(query) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query.q && !query.location) {
            return;
        }

        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    "https://app.ticketmaster.com/discovery/v2/events.json", //Ticketmaster Discovery API
                    {
                        params: {
                            keyword: query.q, //Uses query for keyword search
                            city: query.location, //Location can be a city
                            apiKey: process.env.TICKETMASTER_API_KEY, //Ticketmaster API key
                        },
                    }
                );
                setEvents(response.data._embedded.events || []);
            }
            catch (err) {
                setError(err.message || 'Failed to fetch events');
            }
            finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [query]);

    return { events, loading, error };
}