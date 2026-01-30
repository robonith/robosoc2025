import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'

import SEO from './components/SEO'
import { breadcrumbSchema } from './utils/structuredData'

gsap.registerPlugin(ScrollTrigger)

const ContactUs: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    from_name: '',
    email_id: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const SERVICE_ID = 'service_d67fqdp';
    const TEMPLATE_ID = 'template_pu5s7ie';
    const PUBLIC_KEY = 'kRHXXlvor-vZq3rTy';

    if (!formRef.current) return;

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      alert('Message sent successfully!');
      
      setFormData({
        from_name: '',
        email_id: '',
        message: ''
      })
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message.');
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = [titleRef.current, contactInfoRef.current, formRef.current, socialRef.current];
      
      gsap.set(elements, { opacity: 0, y: 30 });

      elements.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO 
        title="Contact Us - RoboSoc NITH"
        description="Get in touch with RoboSoc NITH."
        url="/contact"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://robosoc-nith.com/" },
          { name: "Contact Us", url: "https://robosoc-nith.com/contact" }
        ])}
      />
      
      <div className="contact-us min-h-screen py-10 lg:py-16 px-4 sm:px-6 lg:px-8 relative bg-black">
        <div className="relative z-10 max-w-7xl mx-auto">

          <div ref={titleRef} className="mb-12 lg:mb-20">
            <div className='flex items-center w-full gap-4'>
              <div className='bg-white h-12 flex-1 rounded-sm shadow-lg'></div>
              <h1 className='text-3xl sm:text-5xl lg:text-8xl font-bold text-white tracking-wider text-center px-4'>
                CONTACT US
              </h1>
              <div className='bg-white h-12 w-24 rounded-sm shadow-lg'></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
            
            <div ref={contactInfoRef} className="flex-1">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-10 border border-white/10 h-full">
                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">Let's Talk</h2>
                <p className="text-gray-400 text-lg mb-10">
                  Have a project in mind or want to join the club? Fill out the form or use our direct contact info below.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Our Location</p>
                      <p className="text-gray-400">NIT Hamirpur, Himachal Pradesh</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Email Us</p>
                      <a href="mailto:robosoc@nith.ac.in" className="text-gray-400 hover:text-white transition-colors">
                        robosoc@nith.ac.in
                      </a>
                    </div>
                  </div>
                </div>

                <div ref={socialRef} className="flex gap-4 mt-12 pt-8 border-t border-white/10">
                   <p className="text-gray-500 text-sm tracking-widest uppercase">Follow Us: LinkedIn • Instagram • GitHub</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-10 border border-white/20 flex flex-col gap-6"
              >
                <div>
                  <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="name@nith.ac.in"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full flex-1 px-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
