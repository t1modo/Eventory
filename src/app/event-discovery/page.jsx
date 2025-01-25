'use client'

import { useState } from "react";
import useEventAPI from "../hooks/useEventAPI";
import EventCard from "../components/EventCard";

export default function EventDiscoveryPage() {
    const [query, setQuery] = useState({ q: '', location: '' }); //Creates a dynamic search query for the user
    const [searchInput, setSearchInput] = useState({ q: '', location: '' }); //Creates a controlled form state
    const { events, loading, error } = useEventAPI(query);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchInput); //This will update the state of the query whenever a form is submitted
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchInput((prev) => ({ ...prev, [name]: value })); //This will update the controlled form input
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-300 to-blue-400 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Discover Events</h1>

            {/* The Search Form */}
            <form
                className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-6"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    name="q"
                    placeholder="Search by keyword"
                    value={searchInput.q}
                    onChange={handleInputChange}
                    className="text-gray-900 flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={searchInput.location}
                    onChange={handleInputChange}
                    className="text-gray-900 flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </form>

            {/* The loading and Error States */}
            {loading && <p className="text-center">Loading Events...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* The Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}