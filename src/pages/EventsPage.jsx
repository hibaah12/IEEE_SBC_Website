import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setAllEvents(eventList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="pt-24 min-h-screen text-center">Loading Events...</div>;
  }
  
  const now = new Date();

  // An event is "Ongoing" if its status is manually set to 'ongoing'.
  const ongoingEvents = allEvents.filter(event => event.status === 'ongoing');

  // An event is "Upcoming" if its status is 'upcoming' AND its date is in the future.
  const upcomingEvents = allEvents.filter(event => 
    event.status === 'upcoming' && event.date && event.date.toDate() > now
  );

  // An event is "Past" if its status is 'past' OR if its date has passed (and it's not ongoing).
  const pastEvents = allEvents.filter(event => 
    event.status === 'past' || (event.date && event.date.toDate() < now && event.status !== 'ongoing')
  );

  const EventCard = ({ event }) => {
    // Convert Firestore timestamp to a readable date string
    const displayDate = event.date && typeof event.date.toDate === 'function' 
      ? event.date.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Date TBD';

    const getRegistrationLink = () => {
      switch (event.registration) {
        // open: A blue "Register Now" button linking to the form.
        case 'open':
          return <Link to={`/register/${event.slug}`} className="mt-2 inline-block w-fit rounded bg-ieee-blue px-4 py-2 font-bold text-white transition-colors hover:bg-blue-800">Register Now</Link>;
        
        // coming_soon: A yellow "Coming Soon" button linking to the placeholder page.
        case 'coming_soon':
          return <Link to="/registration-coming-soon" className="mt-2 inline-block w-fit rounded bg-yellow-500 px-4 py-2 font-bold text-white transition-colors hover:bg-yellow-600">Coming Soon</Link>;
        
        // closed: A red "Registrations Closed" button linking to the other placeholder page.
        case 'closed':
          return <Link to="/registration-closed" className="mt-2 inline-block w-fit rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600">Registrations Closed</Link>;
        
        // none: A gray, unclickable "No Registration Required" message.
        case 'none':
          return <div className="mt-2 inline-block w-fit cursor-not-allowed rounded bg-gray-400 px-4 py-2 font-bold text-white">No Registration Required</div>;
        
        default:
          return null;
      }
    };

    return (
      <div className="group relative h-96 overflow-hidden rounded-lg border border-gray-200 bg-black shadow-md transition-shadow duration-300 hover:shadow-xl">
        <img 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <p className="mb-2 text-sm font-medium">{displayDate}</p>
          <h3 className="mb-3 text-xl font-semibold">{event.title}</h3>
          {getRegistrationLink()}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-ieee-blue mb-16">
        Our Events
      </h1>

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