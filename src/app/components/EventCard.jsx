export default function EventCard({ event }) {
    const { name, date, time, url, venue, location, priceRange, image } = event;

    const formatTime = (timeString) => {
        if (!timeString) return ''; //Edge case to account for an event with no time label

        const [hours, minutes] = timeString.split(':'); //This is to extract the hours and minutes
        const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return formattedTime;
    }

    return (
        <div className="flex bg-slate-200 p-4 rounded-lg shadow-md hover:shadow-lg transition">

            {/* Include the Event Image on the left side */}
            {image && (
                <img
                    src={image}
                    alt={name || "Event Image"}
                    className="w-32 h-32 object-cover rounded-md mr-4"
                />
            )}

            {/* Include the Event Details on the right side */}
            <div className="flex flex-col justify-between">
                <h2 className="text-blue-400 text-lg font-bold">{name || 'Event Name Not Available'}</h2>
                <p className="text-gray-600">
                    {date ? `Date: ${new Date(date).toLocaleDateString()}` : 'Date not available'}
                    {time ? `, Time: ${formatTime(time)}` : ''}
                </p>
                <p className="text-gray-500">{venue || location || 'Location not available'}</p>
                <p className="text-gray-500">{priceRange || 'Price range not available'}</p>
                <a 
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-500 hover:underline mt-2 inline-block ${
                        url ? '' : 'pointer-events-none text-gray-400'
                    }`}
                >
                    {url ? 'View Event' : 'URL not available'}
                </a>
            </div>
        </div>
    );
}