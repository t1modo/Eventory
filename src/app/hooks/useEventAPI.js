import { useEffect, useState } from "react";

export default function useEventAPI(query) {
  const [events, setEvents] = useState(() => {
    // Initialize from localStorage if data exists. This way we can save loaded content on the page
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
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
          return dateA - dateB; //This is to ensure ascended order
        });

        setEvents(popularEvents);
        setEvents(sortedData);
        localStorage.setItem("events", JSON.stringify(sortedData));
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
