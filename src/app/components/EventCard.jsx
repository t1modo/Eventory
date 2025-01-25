export default function EventCard({ event }) {
    const { name, start, end, url, venue } = event;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-bold">{name?.next}</h2>
            <p className="text-gray-600">
                {new Date(start?.local).toLocaleString()} - {new Date(end?.local).toLocaleString()}
            </p>
            {venue && <p className="text-gray-500">{venue.address.localized_address_display}</p>}
            <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
            >
                View Event
            </a>
        </div>
    );
}