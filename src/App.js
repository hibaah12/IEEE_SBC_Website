// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ExeComPage from './pages/ExeComPage';
import AchievementsPage from './pages/AchievementsPage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationComingSoonPage from './pages/RegistrationComingSoonPage';
import RegistrationPlaceholderPage from './pages/RegistrationClosedPage';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/execom" element={<ExeComPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/register/:eventSlug" element={<RegistrationPage />} />
          <Route path="/registration-coming-soon" element={<RegistrationComingSoonPage />} />
          <Route path="/registration-closed" element={<RegistrationPlaceholderPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;