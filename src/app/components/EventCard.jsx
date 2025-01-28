export default function EventCard({ event }) {
    const { name, start, end, url, venue } = event;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-bold">{name?.next || 'Event Name Not Available'}</h2>
            <p className="text-gray-600">
                {start?.local ? new Date(start.local).toLocaleString() : 'Start time not available'} -
                {end?.local ? new Date(end.local).toLocaleString() : ' End time not available'}
            </p>
            {venue?.address?.localized_address_display ? (
                <p className="text-gray-500">{venue.address.localized_address_display}</p>
            ) : (
                <p className="text-gray-500">Address not available</p>
            )}
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