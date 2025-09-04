import React, { useState } from 'react';
import { db } from '../firebase'; // Import the db instance from your firebase.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

const initialState = {
  fullName: '',
  usn: '',
  email: '',
  mobile: '',
  year: '',
  department: '',
  college: 'P.A. College of Engineering',
  isIeeeMember: false,
  memberId: '',
};

const RegistrationForm = ({ eventId, eventTitle }) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add the form data to a 'registrations' collection in Firestore
      await addDoc(collection(db, "registrations"), {
        ...formData,
        eventId: eventId, // Store which event this registration is for
        eventTitle: eventTitle,
        registeredAt: serverTimestamp() // Add a timestamp
      });

      alert('Thank you! Your registration has been submitted successfully.');
      setFormData(initialState); // Clear the form

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
        </div>

        {/* USN */}
        <div>
          <label htmlFor="usn" className="block text-gray-700 font-bold mb-2">USN</label>
          <input type="text" name="usn" id="usn" value={formData.usn} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
        </div>

        {/* Email ID */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email ID</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">Mobile Number</label>
          <input type="tel" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
        </div>

        {/* College Name */}
        <div>
          <label htmlFor="college" className="block text-gray-700 font-bold mb-2">College Name</label>
          <input type="text" name="college" id="college" value={formData.college} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-gray-700 font-bold mb-2">Year</label>
          <select name="year" id="year" value={formData.year} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required>
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-gray-700 font-bold mb-2">Department</label>
          <select name="department" id="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science and Engineering (CSE)</option>
            <option value="AIML">Artificial Intelligence and Machine Learning (AIML)</option>
            <option value="EC">Electronics and Communication (EC)</option>
            <option value="ME">Mechanical Engineering (ME)</option>
            <option value="CV">Civil Engineering (CV)</option>
            <option value="BT">Biotechnology (BT)</option>
            <option value="ICSB">IoT and Cyber Security including Blockchain (ICSB)</option>
          </select>
        </div>
        
        {/* IEEE Member Checkbox */}
        <div className="md:col-span-2 flex items-center gap-4 mt-4">
          <input type="checkbox" name="isIeeeMember" id="isIeeeMember" checked={formData.isIeeeMember} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-ieee-blue focus:ring-ieee-blue" />
          <label htmlFor="isIeeeMember" className="text-gray-700 font-bold">Are you an IEEE Member?</label>
        </div>
        
        {/* IEEE Member ID (Conditional) */}
        {formData.isIeeeMember && (
          <div className="md:col-span-2">
            <label htmlFor="memberId" className="block text-gray-700 font-bold mb-2">IEEE Member ID</label>
            <input type="text" name="memberId" id="memberId" value={formData.memberId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue" required />
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <button type="submit" disabled={isSubmitting} className="w-full bg-ieee-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400">
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>

    </form>
  );
};

export default RegistrationForm;