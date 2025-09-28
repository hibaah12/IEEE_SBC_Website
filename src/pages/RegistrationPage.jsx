import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const RegistrationPage = () => {
  const { eventSlug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventSlug) return;
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("slug", "==", eventSlug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Assuming slugs are unique, we take the first document
          const eventDoc = querySnapshot.docs[0];
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          console.log("No such event found!");
          setEvent(null);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventSlug]); // Re-run the effect if the eventSlug changes

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 text-center">
        <p className="text-lg text-gray-600">Loading Event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pt-24 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-500">Event Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">The event you are looking for does not exist.</p>
          <Link to="/events" className="mt-6 inline-block rounded bg-ieee-blue px-6 py-3 font-bold text-white transition-colors hover:bg-blue-800">
            &larr; View All Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 pt-24 pb-16">
      <div className="mb-10 max-w-3xl text-center">
        <p className="text-lg text-gray-600">You are registering for:</p>
        <h1 className="text-4xl font-bold text-ieee-blue">{event.title}</h1>
        <p className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-md text-gray-700">
          {event.description}
        </p>
      </div>
      <RegistrationForm eventId={event.id} eventTitle={event.title} />
    </div>
  );
};

export default RegistrationPage;