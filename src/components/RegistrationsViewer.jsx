// src/components/RegistrationsViewer.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { CSVLink } from 'react-csv';

const RegistrationsViewer = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);

  // Fetch both events (for the filter dropdown) and registrations
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);

        // Fetch registrations, ordered by newest first
        const regsQuery = query(collection(db, 'registrations'), orderBy('registeredAt', 'desc'));
        const regsSnapshot = await getDocs(regsQuery);
        const regsList = regsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            registeredAt: data.registeredAt ? data.registeredAt.toDate().toLocaleString() : 'N/A'
          };
        });
        setRegistrations(regsList);
        setFilteredRegistrations(regsList); // Initially, show all
      } catch (error) {
        console.error("Error fetching data: ", error);
        alert('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle filtering when the dropdown selection changes
  const handleFilterChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    applyFilters(eventId, searchTerm);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    applyFilters(selectedEvent, searchValue);
  };

  const applyFilters = (eventId, searchValue) => {
    let filtered = registrations;

    // Filter by event (support by id, title, or slug to accommodate older records)
    if (eventId !== 'all') {
      const selectedEventObj = events.find(ev => ev.id === eventId);
      const selectedTitle = selectedEventObj?.title?.toLowerCase().trim();
      const selectedSlug = selectedEventObj?.slug?.toLowerCase().trim();

      filtered = filtered.filter(reg => {
        const regEventId = reg.eventId;
        const regEventTitle = (reg.eventTitle || '').toLowerCase().trim();
        const regEventSlug = (reg.eventSlug || '').toLowerCase().trim();
        return (
          regEventId === eventId ||
          (selectedTitle && regEventTitle === selectedTitle) ||
          (selectedSlug && regEventSlug === selectedSlug)
        );
      });
    }

    // Filter by search term
    if (searchValue) {
      const needle = searchValue.toLowerCase();
      filtered = filtered.filter(reg => 
        (reg.fullName || '').toLowerCase().includes(needle) ||
        (reg.email || '').toLowerCase().includes(needle) ||
        (reg.usn || '').toLowerCase().includes(needle) ||
        (reg.eventTitle || '').toLowerCase().includes(needle)
      );
    }

    setFilteredRegistrations(filtered);
  };

  const handleSelectRegistration = (regId) => {
    setSelectedRegistrations(prev => 
      prev.includes(regId) 
        ? prev.filter(id => id !== regId)
        : [...prev, regId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRegistrations.length === filteredRegistrations.length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(filteredRegistrations.map(reg => reg.id));
    }
  };

  const showRegistrationDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowDetailsModal(true);
  };

  // Define headers for the CSV file
  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "USN", key: "usn" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobile" },
    { label: "Event Title", key: "eventTitle" },
    { label: "College", key: "college" },
    { label: "Year", key: "year" },
    { label: "Department", key: "department" },
    { label: "IEEE Member", key: "isIeeeMember" },
    { label: "Member ID", key: "memberId" },
    { label: "Registered At", key: "registeredAt" },
  ];

  const csvData = selectedRegistrations.length > 0 
    ? filteredRegistrations.filter(reg => selectedRegistrations.includes(reg.id))
    : filteredRegistrations;

  const selectedEventObj = events.find(e => e.id === selectedEvent);
  const selectedEventTitle = selectedEventObj?.title || '';

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-16 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Registration Management</h2>
        <div className="flex flex-wrap gap-2">
          {selectedEvent !== 'all' && (
            <CSVLink
              data={filteredRegistrations}
              headers={csvHeaders}
              filename={`registrations_${selectedEventTitle.replace(/\s+/g,'-').toLowerCase()}.csv`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export This Event
            </CSVLink>
          )}
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`registrations_${selectedRegistrations.length > 0 ? 'selected' : 'all'}.csv`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {selectedRegistrations.length > 0 
              ? `Export Selected (${selectedRegistrations.length})` 
              : 'Export All'
            }
          </CSVLink>
        </div>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Registrations</label>
            <input
              type="text"
              placeholder="Search by name, email, USN, or event..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Event</label>
            <select 
              onChange={handleFilterChange} 
              value={selectedEvent} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedEvent('all');
                setSelectedRegistrations([]);
                setFilteredRegistrations(registrations);
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Selected Registrations Info */}
      {selectedRegistrations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              {selectedRegistrations.length} registration(s) selected
            </span>
            <button
              onClick={() => setSelectedRegistrations([])}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRegistrations.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-ieee-blue focus:ring-ieee-blue"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map(reg => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRegistrations.includes(reg.id)}
                      onChange={() => handleSelectRegistration(reg.id)}
                      className="rounded border-gray-300 text-ieee-blue focus:ring-ieee-blue"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reg.fullName}</div>
                      <div className="text-sm text-gray-500">{reg.usn}</div>
                      <div className="text-sm text-gray-500">{reg.college}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{reg.eventTitle}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{reg.email}</div>
                      <div className="text-sm text-gray-500">{reg.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reg.registeredAt}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => showRegistrationDetails(reg)}
                      className="text-ieee-blue hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRegistrations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No registrations found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Registration Details Modal */}
      {showDetailsModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedRegistration(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {selectedRegistration.fullName}</div>
                  <div><span className="font-medium">USN:</span> {selectedRegistration.usn}</div>
                  <div><span className="font-medium">Email:</span> {selectedRegistration.email}</div>
                  <div><span className="font-medium">Mobile:</span> {selectedRegistration.mobile}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Academic Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">College:</span> {selectedRegistration.college}</div>
                  <div><span className="font-medium">Year:</span> {selectedRegistration.year}</div>
                  <div><span className="font-medium">Department:</span> {selectedRegistration.department}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Event Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Event:</span> {selectedRegistration.eventTitle}</div>
                  <div><span className="font-medium">Registered At:</span> {selectedRegistration.registeredAt}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">IEEE Membership</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">IEEE Member:</span> {selectedRegistration.isIeeeMember ? 'Yes' : 'No'}</div>
                  {selectedRegistration.memberId && (
                    <div><span className="font-medium">Member ID:</span> {selectedRegistration.memberId}</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedRegistration(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsViewer;