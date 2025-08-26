import React from 'react';

const Navbar = () => {
  const navLinks = [
    { title: 'Home', path: '#home' },
    { title: 'Events', path: '#events' },
    { title: 'ExeCom', path: '#execom' },
    { title: 'Join Us', path: '#join-us' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
        {navLinks.map((link) => (
          <li key={link.title}>
            <a 
              href={link.path} 
              className="text-white font-medium px-3 py-1.5 hover:bg-ieee-blue/20 rounded-full transition-colors duration-300"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;