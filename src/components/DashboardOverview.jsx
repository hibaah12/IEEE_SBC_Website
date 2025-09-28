// src/components/DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    recentRegistrations: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch events
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch registrations
        const registrationsSnapshot = await getDocs(collection(db, 'registrations'));
        const registrationsList = registrationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Calculate statistics
        const now = new Date();
        const upcomingEvents = eventsList.filter(event => {
          if (event.date && event.date.toDate) {
            return event.date.toDate() > now;
          }
          return false;
        });

        // Recent registrations (last 7 days)
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentRegistrations = registrationsList.filter(reg => {
          if (reg.registeredAt && reg.registeredAt.toDate) {
            return reg.registeredAt.toDate() > sevenDaysAgo;
          }
          return false;
        });

        setStats({
          totalEvents: eventsList.length,
          upcomingEvents: upcomingEvents.length,
          totalRegistrations: registrationsList.length,
          recentRegistrations: recentRegistrations.length,
        });

        // Get recent events (last 5)
        const sortedEvents = eventsList
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
          })
          .slice(0, 5);

        setRecentEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: '📅',
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: '⏰',
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Registrations',
      value: stats.totalRegistrations,
      icon: '👥',
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Recent Registrations',
      value: stats.recentRegistrations,
      icon: '📈',
      color: 'bg-orange-500',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className={`text-sm ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change} from last month
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
        </div>
        <div className="p-6">
          {recentEvents.length > 0 ? (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {event.image && (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.date && event.date.toDate ? 
                          event.date.toDate().toLocaleDateString() : 
                          'No date set'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                      event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.registration === 'open' ? 'bg-green-100 text-green-800' :
                      event.registration === 'closed' ? 'bg-red-100 text-red-800' :
                      event.registration === 'coming_soon' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.registration.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No events found. Create your first event!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Create New Event</h3>
          <p className="text-blue-100 mb-4">Start organizing your next IEEE event</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">View Registrations</h3>
          <p className="text-green-100 mb-4">Manage and export participant data</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
            View All
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Event Management</h3>
          <p className="text-purple-100 mb-4">Edit, update, and organize events</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            Manage Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
