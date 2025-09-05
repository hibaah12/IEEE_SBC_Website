import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
    { title: 'Achievements', path: '/achievements' },
    { title: 'ExeCom', path: '/execom' },
    { title: 'Join Us', path: 'https://www.ieee.org/membership/join/index.html' },
  ];

  // A reusable component for nav links to avoid repetition
  const NavItem = ({ link }) => (
    <li>
      {link.path.startsWith('http') ? (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-white font-bold hover:bg-white/20 rounded-full transition-colors duration-300"
        >
          {link.title}
        </a>
      ) : (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `block px-4 py-2 font-bold rounded-full transition-colors duration-300 ${
              isActive ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'
            }`
          }
          onClick={() => setIsOpen(false)} // Close menu on link click
        >
          {link.title}
        </NavLink>
      )}
    </li>
  );

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-ieee-blue shadow-md md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:rounded-full">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between h-16 md:h-auto">
          
          {/* Logo/Brand for Mobile View */}
          <Link to="/" className="text-white text-xl font-bold md:hidden">
            PACE IEEE SB
          </Link>

          {/* Desktop Menu (Visible on medium screens and up) */}
          <ul className="hidden md:flex items-center gap-2 md:px-6 md:py-3 text-sm md:text-base">
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} />
            ))}
          </ul>

          {/* Mobile Menu Button (Visible on small screens) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-ieee-blue pb-4">
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;