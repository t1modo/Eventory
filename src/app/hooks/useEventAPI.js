import { useEffect, useState } from "react";
import axios from "axios";


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
                    `https://www.eventbriteapi.com/v3/events/search`,
                    {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_EVENTBRITE_API_KEY}` },
                        params: { q: query.q, 'location.address': query.location },
                    }
                );
                setEvents(response.data.events);
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