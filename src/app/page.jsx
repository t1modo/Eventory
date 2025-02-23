"use client";

import Link from "next/link";
import useEventAPI from "./hooks/useEventAPI";
import FeaturedEventCarousel from "./components/FeaturedEventsCarousel";

export default function HomePage() {
  const { events, loading, error } = useEventAPI({ q: "", location: "" });

  return (
<<<<<<< HEAD
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Discover Events Near You!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Find concerts, sports, and more in your city.
=======
    <div>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-start items-center text-white relative pt-16 md:pt-24 lg:pt-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
          Discover Events Near You!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 text-center">
          Find concerts, meetups, and more in your city.
>>>>>>> parent of bbe34ef (Massive reworks)
        </p>
        <Link
          href="/event-discovery"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mb-8"
        >
          Explore Events
        </Link>

        {/* Swiping Cards Positioned Below */}
        <div className="w-full max-w-7xl px-4 mt-3">
          <FeaturedEventCarousel events={events} />
        </div>
      </div>
    </div>
  );
}
