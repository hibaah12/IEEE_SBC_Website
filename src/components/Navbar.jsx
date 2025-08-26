// src/components/Navbar.jsx (FINAL version)
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link

const Navbar = () => {
  // Update paths for routing
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
    { title: 'ExeCom', path: '/#execom' },
    { title: 'Join Us', path: '/#join-us' },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-2 bg-ieee-blue rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg text-sm md:text-base">
        {navLinks.map((link) => (
          <li key={link.title}>
            {/* Use the Link component instead of <a> */}
            <Link 
              to={link.path} 
              className="text-white font-bold px-3 py-1.5 hover:bg-white/20 rounded-full transition-colors duration-300"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;