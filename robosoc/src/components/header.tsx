import React from 'react'
import { Link } from 'react-router-dom'
import { useLenis } from '../hooks/useLenis'

const Header: React.FC = () => {
  const { scrollToTop } = useLenis();

  return (
    <>
      <header className="w-full hidden md:block sticky top-3 z-50">
        <nav className="flex items-center justify-between px-6 py-3 mx-3 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
          <div className="logo flex items-center space-x-3">
            <img
              className="h-8 w-8 object-contain transition-all duration-300 cursor-pointer hover:scale-110"
              src="/Robosoc logo 1080x1080.png"
              alt="RoboSoc Logo"
            />
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-white hover:to-blue-200 transition-all duration-300 cursor-pointer">
              RoboSoc
            </h2>
          </div>
          <ul className="flex flex-row space-x-1">
            <li>
              <Link
                to="/"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/achievements"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Achievements
              </Link>
            </li>
            {/* <li>
              <Link
                to="/Events"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Events
              </Link>
            </li> */}
            <li>
              <Link
                to="/members"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Members
              </Link>
            </li>
            {/* <li>
              <Link
                to="/merch"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Merch
              </Link>
            </li> */}
            <li>
              <Link
                to="/about"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <header className="fixed left-0 top-0 h-screen w-16 z-50 block md:hidden">
        <nav className="flex flex-col items-center py-6 h-full bg-black/30 backdrop-blur-sm border-r border-gray-700/50 shadow-xl">
          <div className="logo mb-8">
            <img
              className="h-10 w-10 object-contain"
              src="/Robosoc logo 1080x1080.png"
              alt="RoboSoc Logo"
            />
          </div>
          <ul className="flex flex-col items-center space-y-6">
            <li>
              <Link to="/" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Home</Link>
            </li>
            <li>
              <Link to="/projects" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Projects</Link>
            </li>
            <li>
              <Link to="/achievements" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Achievements</Link>
            </li>
            {/* <li>
              <Link to="/Events" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Events</Link>
            </li> */}
            <li>
              <Link to="/members" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Members</Link>
            </li>
            {/* <li>
              <Link to="/merch" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Merch</Link>
            </li> */}
            <li>
              <Link to="/about" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">About Us</Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop} className="text-gray-200 hover:text-white text-sm">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
