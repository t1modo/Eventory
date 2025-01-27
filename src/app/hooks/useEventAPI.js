import { useEffect, useState } from "react";

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
                const response = await fetch(`/app/api/route?q=${query.q}&location=${query.location}`);
                if (!response.ok) throw new Error("Failed to fetch events");
                const data = await response.json();
                setEvents(data);
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