import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLenis } from '../hooks/useLenis'

const Header: React.FC = () => {
  const { scrollToTop } = useLenis();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/achievements' },
    // { name: 'Events', path: '/Events' },
    { name: 'Members', path: '/members' },
    // { name: 'Merch', path: '/merch' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="w-full hidden md:block sticky top-3 z-50">
        <nav className="flex items-center justify-between px-6 py-3 mx-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="logo flex items-center space-x-3">
            <img
              className="h-8 w-8 object-contain transition-transform duration-300 hover:scale-110"
              src="/Robosoc logo 1080x1080.png"
              alt="RoboSoc Logo"
            />
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              RoboSoc
            </h2>
          </div>
          <ul className="flex flex-row space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === link.path
                      ? 'bg-white/15 text-white ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Improved Mobile Bottom Navbar */}
      <header className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden px-4">
        <nav className="flex items-center justify-around w-full max-w-sm py-3 px-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={scrollToTop}
              className={`relative flex flex-col items-center px-2 transition-all duration-300 ${
                location.pathname === link.path ? 'text-white scale-110' : 'text-gray-400'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {link.name}
              </span>
              {location.pathname === link.path && (
                <div className="absolute -bottom-2 h-1 w-4 bg-white rounded-full shadow-[0_0_10px_#fff]" />
              )}
            </Link>
          ))}
        </nav>
      </header>
    </>
  )
}

export default Header
