import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { databases, DB_ID  } from '../appwrite';
import type { Models } from 'appwrite';

import SEO from './components/SEO';
import { breadcrumbSchema } from './utils/structuredData';

gsap.registerPlugin(ScrollTrigger);

interface Member extends Models.Document {
  name: string;
  post: string;
  profilepic: string;
  linkedin?: string;
  instagram?: string; 
  insta?: string;
  github?: string;
  techstack?: string[];
}

const Members: React.FC = () => {
  const [members4, setMembers4] = useState<Member[]>([]);
  const [members3, setMembers3] = useState<Member[]>([]);
  const [members2, setMembers2] = useState<Member[]>([]);
  const [members1, setMembers1] = useState<Member[]>([]);
  
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const allMembers = [...members4, ...members3, ...members2, ...members1];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res4 = await databases.listDocuments<Member>(DB_ID, '689cefca0001449d5204');
        const res3 = await databases.listDocuments<Member>(DB_ID, "689cef0d003da89eebea");
        const res2 = await databases.listDocuments<Member>(DB_ID, "689cef3200167375be28");
        const res1 = await databases.listDocuments<Member>(DB_ID, "689cef460005804b0484");
        
        setMembers4(res4.documents);
        setMembers3(res3.documents);
        setMembers2(res2.documents);
        setMembers1(res1.documents);
      } catch (err) {
        console.error('Error fetching members', err);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!titleRef.current || !cardsRef.current) return;

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      if (allMembers.length > 0) {
        gsap.to(cardsRef.current.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    return () => ctx.revert();
  }, [allMembers]);

  return (
    <>
      <SEO 
        title="Members - RoboSoc NITH"
        description="Meet the brilliant minds behind RoboSoc NITH."
        url="/members"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://robosoc-nith.com/" },
          { name: "Members", url: "https://robosoc-nith.com/members" }
        ])}
      />
      <div className="min-h-screen py-10 px-4 relative bg-black">
        <div className="relative z-10">
          <div ref={titleRef} className="max-w-6xl mx-auto mb-16 opacity-0 translate-y-[50px]">
            <div className='flex items-center w-full gap-4'>
              <div className='bg-white h-12 flex-1 rounded-sm'></div>
              <h1 className='text-4xl md:text-7xl font-bold text-white tracking-wider'>MEMBERS</h1>
              <div className='bg-white h-12 w-24 rounded-sm'></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {allMembers.length === 0 ? (
                <p className="text-white col-span-full">Loading members...</p>
              ) : (
                allMembers.map((member) => (
                  <div key={member.$id} className="group relative w-full max-w-[300px] opacity-0 translate-y-[50px] scale-[0.9]">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500">
                      <div className="relative h-72 overflow-hidden group/image">
                        <img 
                          src={member.profilepic || '/placeholder.webp'} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 backdrop-blur-sm">
                          <h3 className="text-white font-bold mb-2">Tech Stack</h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {member.techstack?.map((tech, i) => (
                              <span key={i} className="text-[10px] bg-white/20 px-2 py-1 rounded-full text-white">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white flex flex-col gap-2">
                        <div>
                          <h2 className="text-black font-bold text-lg leading-tight">{member.name}</h2>
                          <p className="text-gray-600 text-xs font-medium">{member.post}</p>
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noreferrer" className="p-2 bg-black rounded-lg hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-blue-600 rounded-lg hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                          )}
                          {(member.insta || member.instagram) && (
                            <a href={member.insta || member.instagram} target="_blank" rel="noreferrer" className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;
