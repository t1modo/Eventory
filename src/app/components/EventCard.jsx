import Link from "next/link";
import { Calendar, MapPin, DollarSign, Ticket } from "lucide-react";

export default function EventCard({ event, className, size = "large" }) {
  const { name, events = [], venue, location, priceRange, image, id } = event || {}; // Ensure events is at least an empty array

  const imageClass =
    size === "small" ? "w-full h-32 object-cover rounded-t-lg" : "w-full h-48 object-cover rounded-t-lg";

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg border-2 border-white  ${className}`}
    >
      {image && (
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={name} className={imageClass} />
          {events?.length > 1 && (
            <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
              {events.length} events
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{name}</h2>
        <div className="space-y-2">
          {events.length > 0 && (
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              Next event: {new Date(events[0]?.date).toLocaleDateString()}
            </p>
          )}
          <p className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            {venue || location || "Unknown Venue"}
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300">
            <DollarSign className="w-4 h-4 mr-2" />
            {priceRange || "N/A"}
          </p>
          {events.length > 1 && (
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Ticket className="w-4 h-4 mr-2" />
              {events.length} upcoming events available
            </p>
          )}
        </div>
        <Link
          href={`/series/${id}`}
          className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          View All Events
        </Link>
      </div>
    </div>
  );
}