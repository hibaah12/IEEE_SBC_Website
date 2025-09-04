// src/pages/RegistrationClosedPage.jsx
import { Link } from 'react-router-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

const RegistrationClosedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 container mx-auto">
      <div className="text-center rounded-lg bg-gray-50 p-8 shadow-md md:p-12">
        <FaRegTimesCircle className="mx-auto mb-6 text-6xl text-red-500" />
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Registrations for this Event are Closed
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Thank you for your interest. Keep an eye on our events page for future opportunities.
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

export default RegistrationClosedPage;