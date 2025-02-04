export default function EventCard({ event, className, size = "large" }) {
    const { name, date, time, url, venue, location, priceRange, image } = event;
  
    const formatTime = (timeString) => {
      if (!timeString) return "";
      const [hours, minutes] = timeString.split(":");
      return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
  
    // Determine image classes based on size
    const imageClass =
      size === "small"
        ? "w-24 h-24 object-cover rounded-md mb-4" // Small square image
        : "w-full h-48 object-cover rounded-md mb-4"; // Default larger image
  
    return (
      <div
        className={`flex flex-col bg-slate-200 p-4 rounded-lg shadow-md hover:shadow-lg transition ${className}`}
      >
        {/* Event Image */}
        {image && (
          <img
            src={image}
            alt={name || "Event Image"}
            className={imageClass}
          />
        )}
  
        {/* Event Details */}
        <div className="flex flex-col justify-between">
          <h2 className="text-blue-400 text-lg font-bold">
            {name || "Event Name Not Available"}
          </h2>
          <p className="text-gray-600">
            {date
              ? `Date: ${new Date(date).toLocaleDateString()}`
              : "Date not available"}
            {time ? `, Time: ${formatTime(time)}` : ""}
          </p>
          <p className="text-gray-500">
            {venue || location || "Location not available"}
          </p>
          <p className="text-gray-500">
            {priceRange || "Price range not available"}
          </p>
          <a
            href={url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-500 hover:underline mt-2 inline-block ${
              url ? "" : "pointer-events-none text-gray-400"
            }`}
          >
            {url ? "View Event" : "URL not available"}
          </a>
        </div>
      </div>
    );
  }
  