// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ExeComPage from './pages/ExeComPage';
import AchievementsPage from './pages/AchievementsPage';
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;