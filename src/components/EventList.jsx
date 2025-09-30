// src/components/EventList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // for Edit button

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate ? doc.data().date.toDate() : null
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events: ", error);
      toast.error('Failed to fetch events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      setEvents(events.filter(event => event.id !== eventId));
      setShowDeleteModal(false);
      setEventToDelete(null);
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error("Error deleting event: ", error);
      toast.error('Failed to delete event. Please try again.');
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await updateDoc(doc(db, 'events', eventId), { status: newStatus });
      setEvents(events.map(event =>
        event.id === eventId ? { ...event, status: newStatus } : event
      ));
      toast.success('Event status updated successfully!');
    } catch (error) {
      console.error("Error updating event status: ", error);
      toast.error('Failed to update event status. Please try again.');
    }
  };

  // NEW: Handles changing the registration status
  const handleRegistrationChange = async (eventId, newRegStatus) => {
    const originalEvents = [...events];
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, registration: newRegStatus } : event
    ));
    try {
      await updateDoc(doc(db, 'events', eventId), { registration: newRegStatus });
      toast.success('Registration status updated!');
    } catch (error) {
      console.error("Error updating registration status: ", error);
      toast.error('Failed to update status.');
      setEvents(originalEvents); // revert on error
    }
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(event => event.id));
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedEvents.length === 0) {
      toast.error('Please select events to update.');
      return;
    }
    try {
      const updatePromises = selectedEvents.map(eventId =>
        updateDoc(doc(db, 'events', eventId), { status: newStatus })
      );
      await Promise.all(updatePromises);
      setEvents(events.map(event =>
        selectedEvents.includes(event.id)
          ? { ...event, status: newStatus }
          : event
      ));
      setSelectedEvents([]);
      toast.success(`${selectedEvents.length} events updated successfully!`);
    } catch (error) {
      console.error("Error updating events: ", error);
      toast.error('Failed to update events. Please try again.');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Date", key: "date" },
    { label: "Status", key: "status" },
    { label: "Registration", key: "registration" },
    { label: "Slug", key: "slug" },
  ];

  const csvData = filteredEvents.map(event => ({
    ...event,
    date: event.date ? event.date.toLocaleDateString() : 'No date'
  }));

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename="events_export.csv"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Events</label>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSelectedEvents([]);
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedEvents.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              {selectedEvents.length} event(s) selected
            </span>
            <div className="flex space-x-2">
              <select
                onChange={(e) => handleBulkStatusChange(e.target.value)}
                className="px-3 py-1 border border-blue-300 rounded text-sm"
                defaultValue=""
              >
                <option value="" disabled>Bulk Status Change</option>
                <option value="upcoming">Set to Upcoming</option>
                <option value="ongoing">Set to Ongoing</option>
                <option value="past">Set to Past</option>
              </select>
              <button
                onClick={() => setSelectedEvents([])}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-ieee-blue focus:ring-ieee-blue"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleSelectEvent(event.id)}
                      className="rounded border-gray-300 text-ieee-blue focus:ring-ieee-blue"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {event.image && (
                        <img
                          className="h-10 w-10 rounded-lg object-cover mr-4"
                          src={event.image}
                          alt={event.title}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {event.date ? event.date.toLocaleDateString() : 'No date'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={event.status}
                      onChange={(e) => handleStatusChange(event.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${
                        event.status === 'upcoming'
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'ongoing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="past">Past</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={event.registration}
                      onChange={(e) => handleRegistrationChange(event.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 w-full ${
                        event.registration === 'open'
                          ? 'bg-green-100 text-green-800'
                          : event.registration === 'closed'
                            ? 'bg-red-100 text-red-800'
                            : event.registration === 'coming_soon'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="coming_soon">Coming Soon</option>
                      <option value="none">None Required</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-4">
                      <Link to={`/admin/edit-event/${event.id}`} className="text-ieee-blue hover:text-blue-800">
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setEventToDelete(event);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setEventToDelete(null);
                }}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(eventToDelete.id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
