import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid';

const events = [
  {
    id: 1,
    title: 'Summer Art Workshop',
    date: 'July 15, 2024',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Activity Room',
    description: 'Join us for a fun-filled art session where kids explore their creativity through painting and crafts.',
    imageUrl: 'https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3',
  },
  {
    id: 2,
    title: 'Music & Movement',
    date: 'July 20, 2024',
    time: '2:00 PM - 3:30 PM',
    location: 'Music Room',
    description: 'An interactive session where children learn rhythm and coordination through music and dance.',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
  },
];

export default function Events() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Join us for these exciting activities designed for your child's growth and enjoyment.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={event.date} className="text-gray-500">
                    <CalendarIcon className="mr-1.5 h-5 w-5 inline-block" />
                    {event.date}
                  </time>
                  <span className="text-gray-500">
                    <MapPinIcon className="mr-1.5 h-5 w-5 inline-block" />
                    {event.location}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    <Link to={`/events/${event.id}`}>
                      <span className="absolute inset-0" />
                      {event.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{event.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}