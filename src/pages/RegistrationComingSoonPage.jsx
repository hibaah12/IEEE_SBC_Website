// src/pages/RegistrationComingSoonPage.jsx
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const RegistrationComingSoonPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 container mx-auto">
      <div className="text-center rounded-lg bg-gray-50 p-8 shadow-md md:p-12">
        <FaCalendarAlt className="mx-auto mb-6 text-6xl text-ieee-blue" />
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Registrations Will Open Soon!
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          We're getting things ready. Please check back later for registration details.
        </p>
        <Link 
          to="/events" 
          className="inline-block rounded bg-ieee-blue px-6 py-3 font-bold text-white transition-colors hover:bg-blue-800"
        >
          &larr; Go Back to Events
        </Link>
      </div>
    </div>
  );
};

export default RegistrationComingSoonPage;