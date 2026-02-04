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
      {/* DESKTOP NAVBAR */}
      <header className="w-full hidden md:block sticky top-3 z-50">
        <nav className="flex items-center justify-between px-6 py-3 mx-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
          <div className="logo flex items-center space-x-3">
            <img
              className="h-8 w-8 object-contain transition-all duration-300 cursor-pointer hover:scale-110"
              src="/Robosoc logo 1080x1080.png"
              alt="RoboSoc Logo"
            />
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent transition-all duration-300">
              RoboSoc
            </h2>
          </div>
          <ul className="flex flex-row space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className={`px-3 py-1.5 text-sm transition-all duration-300 rounded-lg border border-transparent ${
                    location.pathname === link.path
                      ? 'bg-white/10 text-white border-white/20 shadow-lg'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* IMPROVED MOBILE SIDEBAR */}
      <header className="fixed left-0 top-0 h-screen w-14 z-50 block md:hidden">
        <nav className="flex flex-col items-center py-8 h-full bg-black/40 backdrop-blur-md border-r border-white/10 shadow-2xl">
          <div className="logo mb-10">
            <img
              className="h-8 w-8 object-contain"
              src="/Robosoc logo 1080x1080.png"
              alt="Logo"
            />
          </div>
          <ul className="flex flex-col items-center space-y-8 flex-1">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className={`[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-[2px] bg-white shadow-[0_0_8px_white]" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
