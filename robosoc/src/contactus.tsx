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

          {/* Header Section */}
          <div ref={titleRef} className="mb-12 lg:mb-20">
            <div className='flex items-center w-full gap-4'>
              <div className='bg-white/20 h-[2px] flex-1 shadow-lg'></div>
              <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tighter text-center px-4'>
                GET IN TOUCH
              </h1>
              <div className='bg-white h-8 w-8 rounded-full border-4 border-white/20'></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
            
            {/* Info Panel */}
            <div ref={contactInfoRef} className="flex-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-10 border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 tracking-tight">System.Contact()</h2>
                  <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    Ready to build something legendary? Reach out for collaborations, project inquiries, or  membership details.
                  </p>

                  <div className="space-y-10">
                    <div className="group">
                      <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2 font-bold">Base of Operations</p>
                      <p className="text-white text-lg font-medium">NIT Hamirpur</p>
                      <p className="text-gray-400">Himachal Pradesh, 177005</p>
                    </div>

                    <div className="group">
                      <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2 font-bold">Direct Channel</p>
                      <a href="mailto:robonith@nith.ac.in" className="text-white text-xl font-medium hover:text-gray-300 underline underline-offset-8 decoration-white/20 transition-all">
                        robonith@nith.ac.in
                      </a>
                    </div>
                  </div>
                </div>

                <div ref={socialRef} className="mt-12 pt-8 border-t border-white/5">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {['LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                        <span key={social} className="text-white text-xs font-bold tracking-widest uppercase hover:text-gray-400 cursor-pointer transition-colors">
                          {social}
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="flex-[1.2]">
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-10 border border-white/10 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 font-bold mb-2 text-[10px] uppercase tracking-[0.2em]">Identification</label>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-2 text-[10px] uppercase tracking-[0.2em]">Return Address</label>
                    <input
                      type="email"
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-gray-400 font-bold mb-2 text-[10px] uppercase tracking-[0.2em]">Transmission Data</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full flex-1 px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all resize-none"
                    placeholder="Message Body..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-lg hover:bg-transparent hover:text-white border border-white transition-all duration-500 disabled:opacity-50 group overflow-hidden relative"
                >
                  <span className="relative z-10">{isSubmitting ? 'Processing...' : 'Execute Transmission'}</span>
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
