// src/pages/RegistrationPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import allEvents from '../data/events.js';

const RegistrationPage = () => {
  const { eventSlug } = useParams();
  const event = allEvents.find(e => e.slug === eventSlug);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center px-4 pt-24">
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
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center px-4">
      <div className="text-center mb-10 max-w-3xl"> {/* Added max-w-3xl for better text wrapping */}
        <p className="text-lg text-gray-600">You are registering for:</p>
        <h1 className="text-4xl font-bold text-ieee-blue">{event.title}</h1>
        
        <p className="mt-4 text-md text-gray-700 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          {event.description}
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;