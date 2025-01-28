export default function EventCard({ event }) {
    const { name, date, time, url, venue, location, priceRange } = event;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-blue-400 text-lg font-bold">{name || 'Event Name Not Available'}</h2>
            <p className="text-gray-600">
                {date ? `Date: ${new Date(date).toLocaleDateString()}` : 'Date not available'}
                {time ? `, Time: ${time}` : ''}
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
    );
}