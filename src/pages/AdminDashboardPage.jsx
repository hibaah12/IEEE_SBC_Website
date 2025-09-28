// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import CreateEventForm from '../components/CreateEventForm';
import RegistrationsViewer from '../components/RegistrationsViewer';
import EventList from '../components/EventList';
import DashboardOverview from '../components/DashboardOverview';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      signOut(auth)
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          console.error("Error signing out: ", error);
          alert('Failed to logout. Please try again.');
        });
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'create-event', label: 'Create Event', icon: '➕' },
    { id: 'registrations', label: 'Registrations', icon: '👥' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'events':
        return <EventList />;
      case 'create-event':
        return <CreateEventForm />;
      case 'registrations':
        return <RegistrationsViewer />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-ieee-blue">Admin Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                activeTab === tab.id ? 'bg-ieee-blue text-white' : 'text-gray-700'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold text-ieee-blue">Admin Dashboard</h1>
          <div className="w-6"></div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>Admin</li>
              <li>/</li>
              <li className="text-gray-900 font-medium">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </li>
            </ol>
          </nav>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;