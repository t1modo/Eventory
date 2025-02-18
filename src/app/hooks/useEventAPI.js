import { useEffect, useState } from "react";

export default function useEventAPI(query) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if running on the client-side
    if (typeof window !== "undefined") {
      // Initialize from localStorage if data exists (only on client-side)
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    }
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (!query.q && !query.location) {
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api?q=${query.q}&location=${query.location}`
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        const popularEvents = data
          .sort((a, b) => b.attendees - a.attendees)
          .slice(0, 5);

        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB; // This ensures ascending order
        });

        setEvents(sortedData);
        setEvents(popularEvents);
        
        // Store events in localStorage (only on the client-side)
        if (typeof window !== "undefined") {
          localStorage.setItem("events", JSON.stringify(sortedData));
        }
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [query]);

  return { events, loading, error };
}
