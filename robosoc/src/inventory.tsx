import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from './components/SEO'
import { breadcrumbSchema } from './utils/structuredData'

gsap.registerPlugin(ScrollTrigger)

const POSTER =
  'https://res.cloudinary.com/dkqaesntp/image/upload/v1756899649/Biggest_Fresher_Workshop_1_nuy4sx.png'
const GOOGLE_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScDfk7nYUGrsX7tpfXm16PEA8f_0fzZfj1yLF0QPSpJWfh5cQ/viewform'

const Inventory: React.FC = () => {
  const [open, setOpen] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const card = cardRef.current
    if (!title || !card) return

    gsap.set([title, card], { opacity: 0, y: 40, scale: 0.95 })

    gsap.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <SEO
        title="Campaigns - RoboSoc NITH | Our Initiatives & Events"
        description="Explore RoboSoc NITH's ongoing campaigns, initiatives, and events. Join our mission to promote robotics education and innovation at National Institute of Technology Hamirpur."
        keywords="RoboSoc campaigns, NIT Hamirpur events, robotics initiatives, technology events, student activities, innovation programs, robotics awareness"
        url="/Campaign's"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: 'https://robosoc-nith.com/' },
          { name: 'Campaigns', url: "https://robosoc-nith.com/Campaign's" }
        ])}
      />

      <div className="inventory min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div ref={titleRef} className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Campaign's
            </h1>
          </div>

      
          <div
            ref={cardRef}
            className="relative bg-black/70 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl shadow-black/50 overflow-hidden cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img
              src={POSTER}
              alt="RoboSoc Campaign Banner"
              className="w-full object-cover"
            />

            <div className="absolute bottom-3 right-3 flex flex-col sm:flex-row gap-2">
              <a
                href={GOOGLE_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                onClick={(e) => e.stopPropagation()}
              >
                Register Now
              </a>
              <button
                disabled
                className="px-4 py-2 bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg shadow-md cursor-not-allowed"
                onClick={(e) => e.stopPropagation()}
              >
                Stay tuned – First Glimpse
              </button>
            </div>
          </div>

          {open && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={POSTER}
                  alt="RoboSoc Campaign Poster Large"
                  className="w-full h-full object-contain"
                />

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-5 right-5 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full text-lg font-bold"
                >
                  ✕
                </button>

              
                <a
                  href={GOOGLE_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 px-5 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                  Register Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Inventory
