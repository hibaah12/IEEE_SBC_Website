// src/components/Navbar.jsx (FINAL version)
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Update paths for external and new page links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
    { title: 'ExeCom', path: '/execom' },
    // This is the official IEEE page to join
    { title: 'Join Us', path: 'https://www.ieee.org/membership/join/index.html' },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-2 bg-ieee-blue rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg text-sm md:text-base">
        {navLinks.map((link) => (
          <li key={link.title}>
            {link.path.startsWith('http') ? (
              // If it's an external link, use a standard <a> tag
              <a
                href={link.path}
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer" // Security best practice
                className="text-white font-bold px-3 py-1.5 hover:bg-white/20 rounded-full transition-colors duration-300"
              >
                {link.title}
              </a>
            ) : (
              // If it's an internal link, use React Router's <Link>
              <Link
                to={link.path}
                className="text-white font-bold px-3 py-1.5 hover:bg-white/20 rounded-full transition-colors duration-300"
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;