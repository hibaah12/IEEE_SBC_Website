import { Link } from 'react-router-dom';
import allEvents from '../data/events.js'; // Imports data from a central file

const EventsPage = () => {
  // Filter events based on their status
  const ongoingEvents = allEvents.filter(event => event.status === 'ongoing');
  const upcomingEvents = allEvents.filter(event => event.status === 'upcoming');
  const pastEvents = allEvents.filter(event => event.status === 'past');

  // A reusable component for rendering event cards
  const EventCard = ({ event }) => (
    <div className="group relative h-96 overflow-hidden rounded-lg border border-gray-200 bg-black shadow-md transition-shadow duration-300 hover:shadow-xl">
      <img 
        src={event.image} 
        alt={event.title} 
        className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <p className="mb-2 text-sm font-medium">{event.date}</p>
        <h3 className="mb-3 text-xl font-semibold">{event.title}</h3>
        {event.status !== 'past' && (
          <Link to={`/register/${event.slug}`} className="mt-2 inline-block w-fit rounded bg-ieee-blue px-4 py-2 font-bold text-white transition-colors hover:bg-blue-800">
            Register Now
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-ieee-blue mb-16">
        Our Events
      </h1>

      {/* Ongoing Events Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-ieee-blue mb-8 border-l-4 border-ieee-blue pl-4">Ongoing Events</h2>
        {ongoingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...ongoingEvents].reverse().map(event => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="text-gray-600">No ongoing events at the moment. Check back soon!</p>
        )}
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-ieee-blue mb-8 border-l-4 border-ieee-blue pl-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...upcomingEvents].reverse().map(event => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="text-gray-600">We're planning more exciting events. Stay tuned!</p>
        )}
      </section>

      {/* Past Events Section */}
      <section>
        <h2 className="text-3xl font-bold text-ieee-blue mb-8 border-l-4 border-ieee-blue pl-4">Past Events</h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...pastEvents].reverse().map(event => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="text-gray-600">Our past events archive will be updated here.</p>
        )}
      </section>
    </div>
  );
};

export default EventsPage;